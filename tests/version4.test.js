import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {SETS,storageKey,freshAttempt,chooseAnswer,confirmAnswer,outcome,restoreAttempt,correctAnswers} from '../engine.js';
const bank=JSON.parse(readFileSync(new URL('../questions-v4.json',import.meta.url)));
const fidelity=JSON.parse(readFileSync(new URL('fixtures/v4-source-fidelity.json',import.meta.url)));
const hash=x=>createHash('sha256').update(x).digest('hex');
test('V4 preserves all three older banks byte-for-byte and has its own attempt/content identity',()=>{
  for(const [file,digest] of Object.entries(fidelity.preservedBankSha256))assert.equal(hash(readFileSync(new URL('../'+file,import.meta.url))),digest);
  assert.equal(storageKey('v4'),'cloud-fieldnotes-ace-attempt-v1:v4');
  assert.equal(bank.version,'ace-v4-2026-11-26');
  for(const s of SETS.filter(s=>s.id!=='v4')){
    const b=JSON.parse(readFileSync(new URL('../'+s.file,import.meta.url)));
    assert.notEqual(bank.version,b.version);
    assert.equal(restoreAttempt(JSON.stringify(freshAttempt(b.version,b.questions.length)),bank.version,17,bank.questions),null);
    for(const q of bank.questions){assert.ok(!b.questions.some(old=>old.question===q.question));if(s.id!=='v1')assert.ok(!b.questions.some(old=>old.source.question===q.source.question));}
  }
});
test('V4 matches every reviewed PDF stem and option in source order, including source typos and printed keys',()=>{
  assert.equal(bank.questions.length,17);assert.equal(SETS.find(s=>s.id==='v4').count,17);
  assert.equal(new Set(bank.questions.map(q=>q.source.question)).size,17);
  assert.equal(bank.questions.filter(q=>q.studyDay===5).length,9);
  assert.equal(bank.questions.filter(q=>q.studyDay===6).length,8);
  for(const q of bank.questions){
    const f=fidelity.questions.find(f=>f.number===q.source.question);assert.ok(f);
    assert.equal(hash(JSON.stringify([q.question,q.options.map(o=>o.text)])),f.sha256);
    assert.deepEqual(q.source.pages,f.pages);assert.equal(q.source.printedAnswer,f.printedAnswer);
    assert.equal(q.source.verifiedAnswer,correctAnswers(q).map(n=>'ABCDE'[n]).join(''));
    assert.ok(q.conceptRefs.every(n=>n>=61&&n<=85));
    assert.ok(q.options.every(o=>o.explanation.length>35));
    assert.ok(q.docs.length&&q.docs.every(d=>/^https:\/\/(docs\.)?cloud\.google\.com\//.test(d.url)));
    if(q.source.printedAnswer!==q.source.verifiedAnswer)assert.equal(q.reviewNote.kind,'corrected-key');
  }
  assert.deepEqual(bank.questions.filter(q=>q.reviewNote.kind==='corrected-key').map(q=>q.source.question).sort((a,b)=>a-b),[221,222]);
  const image=bank.questions.find(q=>q.source.question===94);
  assert.equal(hash(readFileSync(new URL('../'+image.questionImage.src,import.meta.url))),fidelity.statusImageSha256);
  assert.ok(image.questionCode.includes('myapp-deployment-58ddbbb995-qjpkg'));
  assert.ok(bank.questions.find(q=>q.source.question===283).question.includes('SOL'));
});
test('V4 choose-two keeps all five options, requires both answers and rejects every other set',()=>{
  const i=bank.questions.findIndex(q=>q.source.question===258),q=bank.questions[i];
  assert.equal(q.options.length,5);assert.deepEqual(q.answer,[0,4]);
  const a=freshAttempt(bank.version,bank.questions.length);
  chooseAnswer(a,i,[4],q);assert.equal(confirmAnswer(a,i,q),false);
  assert.deepEqual(restoreAttempt(JSON.stringify(a),bank.version,17,bank.questions),a);
  assert.equal(outcome(q,[0]),'incorrect');assert.equal(outcome(q,[0,4,2]),'incorrect');
  for(let x=0;x<5;x++)for(let y=x+1;y<5;y++)assert.equal(outcome(q,[y,x]),x===0&&y===4?'correct':'incorrect');
  chooseAnswer(a,i,[4,0],q);assert.equal(confirmAnswer(a,i,q),true);
  assert.deepEqual(restoreAttempt(JSON.stringify(a),bank.version,17,bank.questions),a);
});

test('the full-PDF audit accounts for every source question and only the 17 selected excerpts ship',()=>{
  const audit=JSON.parse(readFileSync(new URL('../VERSION_4_SELECTION_AUDIT.json',import.meta.url)));
  assert.equal(audit.sourceQuestionCount,322);assert.equal(audit.sourcePhysicalPages,202);
  assert.equal(audit.sourceSha256,fidelity.pdfSha256);
  assert.deepEqual(audit.decisions.map(d=>d.pdfQuestion),Array.from({length:322},(_,i)=>i+1));
  assert.equal(audit.decisions.filter(d=>d.decision==='selected').length,17);
  assert.deepEqual(audit.decisions.filter(d=>d.decision==='selected').map(d=>d.pdfQuestion),bank.questions.map(q=>q.source.question).sort((a,b)=>a-b));
  assert.ok(audit.decisions.every(d=>d.reason.length>35));
  assert.equal(Object.values(audit.summary).reduce((a,b)=>a+b,0),322);
  for(const [decision,count] of Object.entries(audit.summary))assert.equal(audit.decisions.filter(d=>d.decision===decision).length,count);
});

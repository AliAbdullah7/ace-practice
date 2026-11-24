import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {SETS,storageKey,freshAttempt,restoreAttempt,chooseAnswer,confirmAnswer,summarize} from '../engine.js';
const banks=SETS.map(s=>({...s,...JSON.parse(readFileSync(new URL('../'+s.file,import.meta.url)))}));
const v3=banks.find(b=>b.id==='v3'),v2=banks.find(b=>b.id==='v2');
const fidelity=JSON.parse(readFileSync(new URL('fixtures/v3-source-fidelity.json',import.meta.url)));
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('V3 appends 11 Day 5 questions to its preserved 19-question prefix',()=>{
  assert.equal(v3.questions.length,30);assert.equal(v3.count,30);
  assert.equal(v3.questions.filter(q=>q.conceptRefs.some(n=>n>=50&&n<=60)).length,9);
  assert.equal(v3.questions.filter(q=>q.conceptRefs.every(n=>n<50)).length,10);
  assert.equal(new Set(v3.questions.map(q=>q.source.question)).size,30);
  assert.deepEqual(v3.questions.slice(19).map(q=>q.source.question),[61,62,63,64,65,67,68,69,70,72,75]);
  assert.equal(digest(v3.questions.slice(0,19)),fidelity.originalPrefixSha256);
  for(const b of banks.filter(b=>b.id!=='v3'))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+b.file,import.meta.url))).digest('hex'),fidelity.preservedBankSha256[b.id]);
  for(const q of v3.questions){
    assert.ok(!v2.questions.some(old=>old.source.question===q.source.question));
    assert.ok(!banks.filter(b=>b.id!=='v3').flatMap(b=>b.questions).some(old=>old.question===q.question));
    assert.equal(q.source.file,'GCPACE 2.pdf');
    assert.ok(q.source.pages.length&&q.source.pages.every(p=>p>=1&&p<=202));
    assert.ok(q.conceptRefs.length&&q.conceptRefs.every(n=>n>=1&&n<=75));
    assert.equal(q.options.length,4);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
    for(const o of q.options)assert.ok(o.explanation.length>35);
    assert.ok(q.docs.length&&q.docs.every(d=>d.url.startsWith('https://docs.cloud.google.com/')));
    if(q.source.printedAnswer!=='ABCD'[q.answer])assert.equal(q.reviewNote.kind,'corrected-key');
  }
  assert.deepEqual(v3.questions.filter(q=>q.reviewNote?.kind==='corrected-key').map(q=>q.source.question).sort((a,b)=>a-b),[62,136,167,201,225]);
});
test('V3 stems, option wording/order, counts and code image match the reviewed PDF excerpts',()=>{
  assert.equal(fidelity.questions.length,30);
  for(const q of v3.questions){
    const f=fidelity.questions.find(f=>f.number===q.source.question);assert.ok(f);
    assert.equal(digest([q.question,q.options.map(o=>o.text)]),f.sha256);
    assert.deepEqual(q.source.pages,f.pages);assert.equal(q.source.printedAnswer,f.printedAnswer);
  }
  const q=v3.questions.find(q=>q.source.question===42);
  assert.equal(createHash('sha256').update(readFileSync(new URL('../'+q.questionImage.src,import.meta.url))).digest('hex'),fidelity.manifestImageSha256);
  const pending=v3.questions.find(q=>q.source.question===72);
  assert.equal(createHash('sha256').update(readFileSync(new URL('../'+pending.questionImage.src,import.meta.url))).digest('hex'),fidelity.pendingPodImageSha256);
  assert.ok(pending.questionCode.includes('myapp-deployment-58ddbbb995-lp86m'));
  assert.ok(q.questionCode.includes('value: "t0ugh2guess!"'));
});
test('all three versions preserve every other version on restart and reject cross-version restoration',()=>{
  const saved=new Map();
  for(const b of banks){
    const a=freshAttempt(b.version,b.questions.length);
    chooseAnswer(a,0,b.questions[0].answer,b.questions[0]);confirmAnswer(a,0,b.questions[0]);
    chooseAnswer(a,2,b.questions[2].answer,b.questions[2]);a.flags[2]=true;a.current=2;
    saved.set(storageKey(b.id),JSON.stringify(a));
  }
  assert.equal(new Set(banks.map(b=>storageKey(b.id))).size,3);
  for(const b of banks){
    const store=new Map(saved);store.set(storageKey(b.id),JSON.stringify(freshAttempt(b.version,b.questions.length)));
    for(const other of banks.filter(o=>o.id!==b.id)){
      assert.equal(store.get(storageKey(other.id)),saved.get(storageKey(other.id)));
      const restored=restoreAttempt(store.get(storageKey(other.id)),other.version,other.questions.length,other.questions);
      assert.equal(restored.current,2);assert.equal(restored.flags[2],true);assert.equal(summarize(other.questions,restored).correct,1);
      assert.equal(restoreAttempt(saved.get(storageKey(b.id)),other.version,other.questions.length,other.questions),null);
    }
  }
});
test('deployment output contains exactly the website files and required assets, with all sets registered',()=>{
  // CI runs tests before the build; verify packaging from a clean checkout too.
  execFileSync(process.execPath,[new URL('../scripts/build.js',import.meta.url).pathname]);
  const root=new URL('../dist/',import.meta.url);
  const walk=(dir,prefix='')=>readdirSync(dir).flatMap(f=>statSync(new URL(f,dir)).isDirectory()?walk(new URL(f+'/',dir),prefix+f+'/'):[prefix+f]);
  const files=walk(root).sort();
  assert.deepEqual(files,['.nojekyll','app.js','assets/pdf-q249-a.png','assets/pdf-q249-b.png','assets/pdf-q249-c.png','assets/pdf-q249-d.png','assets/pdf-q42-yaml.jpg','assets/pdf-q72-context.png','engine.js','icon.svg','index.html','questions-v2.json','questions-v3.json','questions.json','styles.css'].sort());
  const html=readFileSync(new URL('index.html',root),'utf8');
  for(const bank of banks){assert.ok(html.includes(`value="${bank.id}"`));assert.deepEqual(JSON.parse(readFileSync(new URL(bank.file,root))).questions,bank.questions);}
});

test('old 19-question V3 attempts are rejected after the content-version bump',()=>{
  const old=freshAttempt('ace-v3-2026-11-23',19);
  assert.equal(restoreAttempt(JSON.stringify(old),v3.version,30,v3.questions),null);
});

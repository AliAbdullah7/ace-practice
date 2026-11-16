import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {SETS,STORAGE_KEY,storageKey,freshAttempt,restoreAttempt,chooseAnswer,confirmAnswer,outcome,summarize,visibleIndices,correctAnswers} from '../engine.js';
const banks=SETS.map(set=>({...set,...JSON.parse(readFileSync(new URL('../'+set.file,import.meta.url)))}));
const v2=banks[1], multi=v2.questions.find(q=>Array.isArray(q.answer)), multiIndex=v2.questions.indexOf(multi);
test('Version 2 has 30 unique sourced questions, explained choices and official references',()=>{
  assert.equal(v2.questions.length,30);
  assert.equal(new Set(v2.questions.map(q=>q.id)).size,30);
  assert.equal(new Set(v2.questions.map(q=>q.source.question)).size,30);
  assert.equal(new Set(v2.questions.map(q=>q.question)).size,30);
  for(const q of v2.questions){
    assert.equal(q.source.file,'GCPACE 2.pdf');
    assert.ok(q.source.question>50&&q.source.question<=322);
    assert.ok(q.source.pages.length&&q.source.pages.every(p=>Number.isInteger(p)&&p>=1&&p<=202));
    assert.ok(q.conceptRefs.length&&q.conceptRefs.every(n=>Number.isInteger(n)&&n>=1&&n<=50));
    assert.ok(q.question.length>80);
    assert.ok(q.options.length>=4&&q.options.length<=5);
    assert.equal(new Set(q.options.map(o=>o.text)).size,q.options.length);
    for(const o of q.options){assert.ok(o.text.length>10);assert.ok(o.explanation.length>35);if(o.image)assert.ok(existsSync(new URL('../'+o.image,import.meta.url)));}
    assert.ok(correctAnswers(q).every(n=>Number.isInteger(n)&&n>=0&&n<q.options.length));
    assert.ok(q.docs.length&&q.docs.every(d=>d.url.startsWith('https://docs.cloud.google.com/')));
    if(q.source.printedAnswer!==correctAnswers(q).map(n=>'ABCDE'[n]).join(''))assert.equal(q.reviewNote.kind,'corrected-key');
  }
});
test('each version saves, restores, scores, filters and restarts independently; V1 keeps its original storage key',()=>{
  assert.equal(storageKey('v1'),STORAGE_KEY);assert.notEqual(storageKey('v1'),storageKey('v2'));
  const store=new Map();
  for(const bank of banks){
    const a=freshAttempt(bank.version,bank.questions.length);
    chooseAnswer(a,0,bank.questions[0].answer,bank.questions[0]);confirmAnswer(a,0,bank.questions[0]);
    a.flags[1]=true;a.current=1;store.set(storageKey(bank.id),JSON.stringify(a));
  }
  for(const bank of banks){
    const a=restoreAttempt(store.get(storageKey(bank.id)),bank.version,bank.questions.length,bank.questions);
    assert.equal(a.current,1);assert.equal(summarize(bank.questions,a).correct,1);
    assert.deepEqual(visibleIndices(bank.questions,a,'flagged'),[1]);
    const other=banks.find(b=>b.id!==bank.id), before=store.get(storageKey(other.id));
    store.set(storageKey(bank.id),JSON.stringify(freshAttempt(bank.version,bank.questions.length)));
    assert.equal(store.get(storageKey(other.id)),before);
    // Restore the test attempt for the next loop.
    store.set(storageKey(bank.id),JSON.stringify(a));
    assert.equal(restoreAttempt(store.get(storageKey(other.id)),bank.version,bank.questions.length,bank.questions),null);
  }
});
test('choose-two requires two choices, supports the fifth choice, locks on confirm and scores exact sets',()=>{
  const a=freshAttempt(v2.version,30),i=multiIndex;
  assert.equal(multi.options.length,5);
  assert.equal(chooseAnswer(a,i,[4],multi),true);
  assert.equal(confirmAnswer(a,i,multi),false);
  assert.equal(chooseAnswer(a,i,[4,2,1],multi),false);
  assert.equal(chooseAnswer(a,i,[0,0],multi),false);
  assert.equal(chooseAnswer(a,i,[5],multi),false);
  assert.equal(chooseAnswer(a,i,0,multi),false);
  assert.equal(chooseAnswer(a,i,[4,2],multi),true);
  assert.equal(confirmAnswer(a,i,multi),true);
  assert.equal(outcome(multi,a.answers[i]),'incorrect');
  assert.equal(chooseAnswer(a,i,[0,1],multi),false);
  assert.equal(outcome(multi,[1,0]),'correct');
  assert.equal(outcome(multi,[0]),'incorrect');
  assert.equal(outcome(multi,[0,1,4]),'incorrect');
});
test('partial and confirmed multiple selections restore; malformed sets and incomplete confirmations are rejected',()=>{
  const a=freshAttempt(v2.version,30),i=multiIndex;
  chooseAnswer(a,i,[4],multi);
  assert.deepEqual(restoreAttempt(JSON.stringify(a),v2.version,30,v2.questions),a);
  const bad=structuredClone(a);bad.confirmed[i]=true;
  assert.equal(restoreAttempt(JSON.stringify(bad),v2.version,30,v2.questions),null);
  for(const invalid of [[],[0,0],[0,1,2],[5],1]){
    const b=structuredClone(a);b.answers[i]=invalid;
    assert.equal(restoreAttempt(JSON.stringify(b),v2.version,30,v2.questions),null);
  }
  chooseAnswer(a,i,[0,1],multi);confirmAnswer(a,i,multi);
  assert.deepEqual(restoreAttempt(JSON.stringify(a),v2.version,30,v2.questions),a);
});
test('both complete sets score 100%, drafts do not contribute to results, and every question locks independently',()=>{
  for(const bank of banks){
    const a=freshAttempt(bank.version,bank.questions.length);
    bank.questions.forEach((q,i)=>{
      assert.equal(chooseAnswer(a,i,q.answer,q),true);
      assert.equal(summarize(bank.questions,a).confirmed,i);
      assert.equal(confirmAnswer(a,i,q),true);
      assert.equal(chooseAnswer(a,i,null,q),false);
    });
    assert.equal(summarize(bank.questions,a).percentage,100);
    assert.equal(summarize(bank.questions,a).confirmed,bank.questions.length);
    assert.deepEqual(visibleIndices(bank.questions,a,'pending'),[]);
    assert.deepEqual(restoreAttempt(JSON.stringify(a),bank.version,bank.questions.length,bank.questions),a);
  }
});

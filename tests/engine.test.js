import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {freshAttempt,restoreAttempt,summarize,visibleIndices,outcome,chooseAnswer,confirmAnswer} from '../engine.js';
const {questions:q,version}=JSON.parse(readFileSync(new URL('../questions.json',import.meta.url)));
test('40 unique questions cover all 40 source concept references, with four explained options and balanced keys',()=>{
  assert.equal(q.length,40);assert.equal(new Set(q.map(x=>x.id)).size,40);
  assert.deepEqual(q.map(x=>x.source).sort((a,b)=>a-b),Array.from({length:40},(_,i)=>i+1));
  for(const x of q){assert.equal(x.options.length,4);assert.ok(x.question.length>100);assert.ok(Number.isInteger(x.answer)&&x.answer>=0&&x.answer<4);assert.equal(new Set(x.options.map(o=>o.text)).size,4);for(const o of x.options){assert.ok(o.text.length>3);assert.ok(o.explanation.length>35);}assert.ok(x.docs.length);for(const d of x.docs)assert.ok(d.url.startsWith('https://docs.cloud.google.com/'));}
  assert.deepEqual([0,1,2,3].map(i=>q.filter(x=>x.answer===i).length),[10,10,10,10]);
});
test('questions confirm independently, require a choice and lock only that question',()=>{
  const a=freshAttempt(version,40);
  assert.equal(confirmAnswer(a,0),false);
  assert.equal(chooseAnswer(a,0,q[0].answer),true);
  assert.equal(summarize(q,a).correct,0);
  assert.deepEqual(visibleIndices(q,a,'incorrect'),[]);
  assert.equal(confirmAnswer(a,0),true);
  assert.equal(chooseAnswer(a,0,null),false);
  assert.equal(chooseAnswer(a,0,(q[0].answer+1)%4),false);
  assert.equal(confirmAnswer(a,0),false);
  assert.equal(chooseAnswer(a,1,2),true);
  assert.equal(chooseAnswer(a,1,null),true);
  assert.equal(a.confirmed[1],false);
  assert.equal(a.answers[0],q[0].answer);
  assert.equal(chooseAnswer(a,-1,0),false);
  assert.equal(confirmAnswer(a,40),false);
});
test('saved per-question confirmations, drafts, flags and position restore',()=>{
  const a=freshAttempt(version,40);chooseAnswer(a,0,1);confirmAnswer(a,0);chooseAnswer(a,4,2);a.flags[4]=true;a.current=4;
  assert.deepEqual(restoreAttempt(JSON.stringify(a),version,40),a);
});
test('legacy exam attempts migrate without losing selected answers or revealing drafts',()=>{
  const a=freshAttempt(version,40);a.answers[0]=1;a.current=3;delete a.confirmed;
  const draft=restoreAttempt(JSON.stringify({...a,submitted:false}),version,40);
  assert.equal(draft.answers[0],1);assert.equal(draft.current,3);assert.ok(draft.confirmed.every(v=>!v));
  const complete=restoreAttempt(JSON.stringify({...a,submitted:true}),version,40);
  assert.equal(complete.confirmed[0],true);assert.equal(complete.confirmed[1],false);
});
test('corrupt, outdated and inconsistent confirmations are rejected',()=>{
  for(const raw of ['{','null'])assert.equal(restoreAttempt(raw,version,40),null);
  for(const patch of [{version:'old'},{answers:[]},{answers:Array(40).fill(4)},{flags:Array(40).fill(1)},{current:-1},{current:40},{confirmed:Array(40).fill(true)},{confirmed:[]},{confirmed:Array(40).fill('yes')}]){
    assert.equal(restoreAttempt(JSON.stringify({...freshAttempt(version,40),...patch}),version,40),null);
  }
});
test('accuracy counts confirmed questions only; drafts never reveal correctness',()=>{
  const a=freshAttempt(version,40);
  assert.deepEqual(summarize(q,a),{correct:0,confirmed:0,answered:0,unanswered:40,percentage:0});
  chooseAnswer(a,0,q[0].answer);chooseAnswer(a,1,(q[1].answer+1)%4);chooseAnswer(a,2,q[2].answer);
  confirmAnswer(a,0);confirmAnswer(a,1);
  assert.deepEqual(summarize(q,a),{correct:1,confirmed:2,answered:3,unanswered:37,percentage:50});
  assert.deepEqual(visibleIndices(q,a,'incorrect'),[1]);
  assert.equal(visibleIndices(q,a,'pending').length,38);
  assert.equal(visibleIndices(q,a,'unanswered').length,37);
  a.flags[2]=true;assert.deepEqual(visibleIndices(q,a,'flagged'),[2]);
  assert.equal(outcome(q[0],a.answers[0]),'correct');
  const all=freshAttempt(version,40);q.forEach((x,i)=>{chooseAnswer(all,i,x.answer);confirmAnswer(all,i);});
  assert.equal(summarize(q,all).percentage,100);assert.equal(summarize(q,all).confirmed,40);
  assert.deepEqual(visibleIndices(q,all,'pending'),[]);
});

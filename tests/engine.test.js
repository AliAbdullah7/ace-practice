import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {freshAttempt,restoreAttempt,summarize,visibleIndices,outcome} from '../engine.js';
const {questions:q,version}=JSON.parse(readFileSync(new URL('../questions.json',import.meta.url)));
test('40 unique questions cover all 40 source concept references, with four explained options and balanced keys',()=>{
  assert.equal(q.length,40);assert.equal(new Set(q.map(x=>x.id)).size,40);
  assert.deepEqual(q.map(x=>x.source).sort((a,b)=>a-b),Array.from({length:40},(_,i)=>i+1));
  for(const x of q){assert.equal(x.options.length,4);assert.ok(x.question.length>100);assert.ok(Number.isInteger(x.answer)&&x.answer>=0&&x.answer<4);assert.equal(new Set(x.options.map(o=>o.text)).size,4);for(const o of x.options){assert.ok(o.text.length>3);assert.ok(o.explanation.length>35);}assert.ok(x.docs.length);for(const d of x.docs)assert.ok(d.url.startsWith('https://docs.cloud.google.com/'));}
  assert.deepEqual([0,1,2,3].map(i=>q.filter(x=>x.answer===i).length),[10,10,10,10]);
});
test('fresh attempts reveal no results and serialization restores answers, flags and position',()=>{
  const a=freshAttempt(version,40);assert.equal(a.submitted,false);assert.ok(a.answers.every(v=>v===null));
  a.answers[3]=2;a.answers[8]=0;a.flags[3]=true;a.current=8;
  assert.deepEqual(restoreAttempt(JSON.stringify(a),version,40),a);
  a.submitted=true;assert.equal(restoreAttempt(JSON.stringify(a),version,40).submitted,true);
});
test('malformed, outdated or invalid saved attempts are rejected safely',()=>{
  assert.equal(restoreAttempt('{',version,40),null);assert.equal(restoreAttempt('null',version,40),null);
  for(const patch of [{version:'old'},{answers:[]},{answers:Array(40).fill(4)},{flags:Array(40).fill(1)},{current:-1},{current:40},{submitted:'true'}]){
    assert.equal(restoreAttempt(JSON.stringify({...freshAttempt(version,40),...patch}),version,40),null);
  }
});
test('scoring counts incorrect and unanswered as zero and supports changing and clearing choices',()=>{
  const a=freshAttempt(version,40);assert.deepEqual(summarize(q,a),{correct:0,answered:0,unanswered:40,percentage:0});
  a.answers[0]=q[0].answer;a.answers[1]=(q[1].answer+1)%4;
  assert.deepEqual(summarize(q,a),{correct:1,answered:2,unanswered:38,percentage:2.5});
  a.answers[1]=q[1].answer;assert.equal(summarize(q,a).correct,2);
  a.answers[0]=null;assert.equal(summarize(q,a).correct,1);
  a.answers=q.map(x=>x.answer);assert.equal(summarize(q,a).percentage,100);
});
test('review filters distinguish incorrect, unanswered and flagged with empty states',()=>{
  const a=freshAttempt(version,40);a.answers[0]=q[0].answer;a.answers[1]=(q[1].answer+1)%4;a.flags[1]=true;
  assert.equal(outcome(q[0],a.answers[0]),'correct');assert.equal(outcome(q[1],a.answers[1]),'incorrect');
  assert.deepEqual(visibleIndices(q,a,'incorrect'),[1]);assert.equal(visibleIndices(q,a,'unanswered').length,38);
  assert.deepEqual(visibleIndices(q,a,'flagged'),[1]);assert.equal(visibleIndices(q,a,'all').length,40);
  a.answers=q.map(x=>x.answer);assert.deepEqual(visibleIndices(q,a,'incorrect'),[]);
});

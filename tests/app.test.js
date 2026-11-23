import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import * as engine from '../engine.js';
const banks=engine.SETS.map(s=>({...s,...JSON.parse(readFileSync(new URL('../'+s.file,import.meta.url)))}));
// Small event/element adapter runs the actual app controller with its real content banks.
// Browser QA additionally verifies native form submission, controls and visual layout.
async function appHarness(store=new Map()){
  class Element {
    constructor(){this.handlers={};this.value='';this.innerHTML='';this.textContent='';this.classList={toggle(){}};}
    addEventListener(name,fn){(this.handlers[name]??=[]).push(fn);}
    emit(name,event={}){for(const fn of this.handlers[name]||[])fn(event);}
    focus(){} scrollIntoView(){} showModal(){this.open=true;}
    querySelector(selector){return selector==='form'?(this.form??=new Element()):new Element();}
  }
  const elements=new Map(),get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id);};
  const context={...engine,document:{getElementById:get},localStorage:{getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,value)},console,fetch:async url=>({ok:true,json:async()=>banks.find(b=>'./'+b.file===url)})};
  const source=readFileSync(new URL('../app.js',import.meta.url),'utf8').replace(/^import .*?;\n/,'').replace(/init\(\);\s*$/,'globalThis.ready=init();');
  runInNewContext(source,context);await context.ready;
  const select=id=>get('exam-version').emit('change',{target:{value:id}});
  const click=id=>get('workspace').emit('click',{target:{closest:selector=>selector==='#'+id?{}:null}});
  const choose=index=>get('workspace').emit('change',{target:{name:'answer',value:String(index)}});
  return {get,store,select,click,choose};
}
test('actual app gates all answer notes, explanations, source metadata and links until confirmation',async()=>{
  const app=await appHarness();
  for(const b of banks){
    app.select(b.id);
    const before=app.get('workspace').innerHTML;
    assert.ok(before.includes('Confirm answer'));
    assert.ok(!/class="(?:explanation |review-note|docs|source-reference)/.test(before));
    app.choose(b.questions[0].answer);app.click('confirm-answer');
    const after=app.get('workspace').innerHTML;
    assert.equal((after.match(/<article class="explanation/g)||[]).length,4);
    assert.ok(after.includes('Read the official documentation'));
    if(b.questions[0].reviewNote)assert.ok(after.includes(b.questions[0].reviewNote.text));
  }
});
test('restart confirmation resets its set synchronously before a rapid switch; cancel and Escape preserve attempts',async()=>{
  const app=await appHarness();
  for(const b of banks){app.select(b.id);app.choose(b.questions[0].answer);app.click('confirm-answer');}
  const original=new Map(app.store);
  for(const b of banks){
    app.select(b.id);app.get('restart').emit('click');
    app.get('confirm-dialog').querySelector('form').emit('submit',{submitter:{value:'cancel'}});
    app.get('confirm-dialog').emit('close');
    assert.equal(app.store.get(engine.storageKey(b.id)),original.get(engine.storageKey(b.id)));
    app.get('restart').emit('click');app.get('confirm-dialog').emit('close');
    assert.equal(app.store.get(engine.storageKey(b.id)),original.get(engine.storageKey(b.id)));
  }
  app.select('v3');app.get('restart').emit('click');
  app.get('confirm-dialog').querySelector('form').emit('submit',{submitter:{value:'confirm'}});
  app.select('v1');app.get('confirm-dialog').emit('close');
  assert.equal(app.store.get(engine.storageKey('v1')),original.get(engine.storageKey('v1')));
  assert.equal(app.store.get(engine.storageKey('v2')),original.get(engine.storageKey('v2')));
  assert.equal(JSON.parse(app.store.get(engine.storageKey('v3'))).confirmed.filter(Boolean).length,0);
  const reloaded=await appHarness(app.store);reloaded.select('v1');
  assert.ok(reloaded.get('progress-text').textContent.startsWith('1 of 40 confirmed'));
  reloaded.select('v2');assert.ok(reloaded.get('progress-text').textContent.startsWith('1 of 30 confirmed'));
  reloaded.select('v3');assert.ok(reloaded.get('progress-text').textContent.startsWith('0 of 19 confirmed'));
});

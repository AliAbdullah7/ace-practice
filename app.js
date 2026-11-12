import {STORAGE_KEY, freshAttempt, restoreAttempt, outcome, summarize, visibleIndices} from './engine.js';
const $ = id => document.getElementById(id);
const letters = 'ABCD';
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let questions, attempt, version, reviewed, filter = 'all', storageOK = true, dialogAction = null;
function save() {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify(attempt)); storageOK=true; }
  catch { storageOK=false; }
  $('save-status').textContent = storageOK ? 'Saved on this browser' : 'Saving unavailable. Keep this page open to retain your attempt.';
  $('save-status').classList.toggle('save-warning',!storageOK);
}
function indices() { return visibleIndices(questions, attempt, attempt.submitted ? filter : 'all'); }
function go(index, focus = true) {
  attempt.current = index; save(); render();
  if (focus) { $('workspace').focus({preventScroll:true}); $('workspace').scrollIntoView({block:'start',behavior:'instant'}); }
}
function renderMap() {
  const visible = indices();
  $('navigator').innerHTML = questions.map((q,i) => {
    const result = attempt.submitted ? outcome(q,attempt.answers[i]) : null;
    const status = result || (attempt.answers[i] === null ? 'unanswered' : 'answered');
    const cls = ['map-button',attempt.answers[i] !== null ? 'answered':'',attempt.current===i && visible.includes(i) ? 'current':'', result === 'correct' ? 'right' : result === 'incorrect' ? 'wrong' : ''].join(' ');
    return `<button type="button" class="${cls}" data-go="${i}" ${attempt.current===i && visible.includes(i) ? 'aria-current="step"':''} aria-label="Question ${i+1}, ${status}${attempt.flags[i] ? ', flagged':''}">${i+1}${attempt.flags[i] ? '<span class="flag-mark" aria-hidden="true">⚑</span>':''}</button>`;
  }).join('');
}
function renderQuestion() {
  const visible=indices(), i=attempt.current, q=questions[i];
  if (!visible.length) {
    $('workspace').innerHTML='<div class="empty-state"><p class="eyebrow">REVIEW</p><h2>No questions in this filter.</h2><p>Choose another filter or return to the full review.</p><button class="primary" id="show-all">Review all questions</button></div>';
    $('previous').disabled=true; $('next').disabled=true; $('position').textContent='0 questions'; return;
  }
  const top=`<div class="question-top"><span class="question-count">QUESTION ${String(i+1).padStart(2,'0')} / ${questions.length}</span><button type="button" id="flag" class="flag-button" aria-pressed="${attempt.flags[i]}"><span aria-hidden="true">⚑</span> ${attempt.flags[i] ? 'Flagged for review':'Flag for review'}</button></div>`;
  let body=`${top}<h2 id="question-heading">${escape(q.question)}</h2>`;
  if (!attempt.submitted) {
    body+='<p class="answer-help" id="answer-help">Choose one answer. You can change it before submitting.</p><fieldset aria-describedby="answer-help"><legend class="sr-only">Answer choices for question '+(i+1)+'</legend>';
    body+=q.options.map((o,j)=>`<label class="option"><input type="radio" name="answer" value="${j}" ${attempt.answers[i]===j?'checked':''}><span class="letter" aria-hidden="true">${letters[j]}</span><span class="option-text"><span class="sr-only">${letters[j]}. </span>${escape(o.text)}</span></label>`).join('');
    body+=`</fieldset><button id="clear" class="clear-answer" ${attempt.answers[i]===null?'disabled':''}>Clear selection</button>`;
  } else {
    const result=outcome(q,attempt.answers[i]);
    body+=`<p class="review-meta"><span class="result-badge ${result}">${result[0].toUpperCase()+result.slice(1)}</span> · ${escape(q.topic)}<br>Your selection: <strong>${attempt.answers[i]===null?'Unanswered':letters[attempt.answers[i]]}</strong> · Correct answer: <strong>${letters[q.answer]}</strong></p>`;
    body+=q.options.map((o,j)=>`<article class="explanation ${j===q.answer?'correct':attempt.answers[i]===j?'selected-wrong':''}"><span class="option-badge">${j===q.answer?'Correct answer': 'Incorrect option'}${attempt.answers[i]===j?' · Your selection':''}</span><h3>${letters[j]}. ${escape(o.text)}</h3><p>${escape(o.explanation)}</p></article>`).join('');
    body+=`<div class="docs"><h3>Read the official documentation</h3>${q.docs.map(d=>`<a href="${escape(d.url)}" target="_blank" rel="noopener noreferrer">${escape(d.title)} ↗<span class="sr-only"> (opens in a new tab)</span></a>`).join('')}<p class="reviewed">Content reviewed ${escape(reviewed)}. Product behavior can change.</p></div>`;
  }
  $('workspace').innerHTML=body;
  const pos=visible.indexOf(i);
  $('previous').disabled=pos<=0; $('next').disabled=pos>=visible.length-1;
  $('position').textContent=attempt.submitted ? `${pos+1} of ${visible.length} in review` : `${i+1} of ${questions.length}`;
}
function render() {
  const s=summarize(questions,attempt);
  $('mode-label').textContent=attempt.submitted?'ATTEMPT COMPLETE':'IN PROGRESS';
  $('progress-text').textContent=`${s.answered} of ${questions.length} answered · ${attempt.flags.filter(Boolean).length} flagged`;
  $('progress').value=s.answered; $('progress').max=questions.length;
  $('submit').hidden=attempt.submitted; $('filter-area').hidden=!attempt.submitted; $('score').hidden=!attempt.submitted;
  if(attempt.submitted) $('score').innerHTML=`<div><span class="eyebrow">YOUR RESULTS</span><h2>${s.correct} correct out of ${questions.length}</h2><p>${s.answered-s.correct} incorrect · ${s.unanswered} unanswered<br>Each question carries equal weight. Unanswered questions earn no points.<br>This practice score is not an official exam result or a pass prediction.</p></div><div class="score-number">${s.percentage}%</div>`;
  renderMap(); renderQuestion();
}
function showDialog(action) {
  dialogAction=action;
  const unanswered=questions.flatMap((q,i)=>attempt.answers[i]===null?[i]:[]);
  $('dialog-title').textContent=action==='restart'?'Start a fresh attempt?':'Ready to submit?';
  $('dialog-description').textContent=action==='restart'?'This clears all answers, flags, results, and your current position for this exam in this browser. This cannot be undone.':`${unanswered.length} of ${questions.length} questions remain unanswered. Unanswered questions earn no points. Submit to reveal your score and explanations; answers will then be locked. You can also return to any unanswered question below.`;
  $('dialog-confirm').textContent=action==='restart'?'Clear & restart':'Submit exam';
  $('dialog-cancel').textContent=action==='restart'?'Cancel':'Keep practicing';
  $('unanswered-links').innerHTML=action==='submit'?unanswered.map(i=>`<button type="button" data-unanswered="${i}" aria-label="Return to unanswered question ${i+1}">Q${i+1}</button>`).join(''):'';
  $('confirm-dialog').showModal(); $('dialog-cancel').focus();
}
$('navigator').addEventListener('click',e=>{
  const b=e.target.closest('[data-go]'); if(!b)return;
  const i=Number(b.dataset.go);
  // Selecting a question outside a results filter returns to the complete review.
  if(!indices().includes(i)){filter='all';$('review-filter').value='all';}
  go(i);
});
$('workspace').addEventListener('change',e=>{
  if(attempt.submitted || e.target.name!=='answer')return;
  attempt.answers[attempt.current]=Number(e.target.value);save();
  // Keep the focused radio mounted so native arrow-key navigation stays intact.
  $('clear').disabled=false;
  const s=summarize(questions,attempt);
  $('progress').value=s.answered;
  $('progress-text').textContent=`${s.answered} of ${questions.length} answered · ${attempt.flags.filter(Boolean).length} flagged`;
  renderMap();
});
$('workspace').addEventListener('click',e=>{
  if(e.target.closest('#flag')){attempt.flags[attempt.current]=!attempt.flags[attempt.current];save();render();$('flag').focus({preventScroll:true});}
  if(e.target.closest('#clear') && !attempt.submitted){attempt.answers[attempt.current]=null;save();render();$('workspace input').focus({preventScroll:true});}
  if(e.target.closest('#show-all')){filter='all';$('review-filter').value='all';go(0);}
});
$('previous').addEventListener('click',()=>{const v=indices();const p=v.indexOf(attempt.current);if(p>0)go(v[p-1]);});
$('next').addEventListener('click',()=>{const v=indices();const p=v.indexOf(attempt.current);if(p<v.length-1)go(v[p+1]);});
$('submit').addEventListener('click',()=>showDialog('submit'));
$('restart').addEventListener('click',()=>showDialog('restart'));
$('review-filter').addEventListener('change',e=>{filter=e.target.value;const v=indices();go(v.includes(attempt.current)?attempt.current:(v[0]??attempt.current),false);});
$('unanswered-links').addEventListener('click',e=>{const b=e.target.closest('[data-unanswered]');if(b){$('confirm-dialog').close('cancel');go(Number(b.dataset.unanswered));}});
$('confirm-dialog').addEventListener('close',()=>{
  if($('confirm-dialog').returnValue!=='confirm')return;
  if(dialogAction==='restart'){attempt=freshAttempt(version,questions.length);filter='all';$('review-filter').value='all';}
  else{attempt.submitted=true;filter='all';}
  save();go(attempt.current);
  if(attempt.submitted)$('score').scrollIntoView({block:'start',behavior:'instant'});
});
async function init(){
  try{
    const response=await fetch('./questions.json'); if(!response.ok)throw Error('Content unavailable');
    const data=await response.json();questions=data.questions;version=data.version;reviewed=data.reviewed;
    let raw=null;try{raw=localStorage.getItem(STORAGE_KEY);}catch{storageOK=false;}
    attempt=restoreAttempt(raw,version,questions.length)||freshAttempt(version,questions.length);
    $('loading').hidden=true;$('app').hidden=false;save();render();
  }catch(error){$('loading').textContent='The exam could not load. Please check your connection and reload this page.';console.error(error);}
}
init();

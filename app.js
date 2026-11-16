import {SETS, ACTIVE_SET_KEY, storageKey, answerList, correctAnswers, isSelected, selectionComplete, freshAttempt, restoreAttempt, outcome, summarize, visibleIndices, chooseAnswer, confirmAnswer} from './engine.js';
const $ = id => document.getElementById(id);
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let questions, attempt, version, reviewed, activeSet = SETS[0], filter = 'all', storageOK = true;
const datasets = new Map(), attempts = new Map();
const answerLabel = answer => answerList(answer).map(i=>letters[i]).join(', ') || 'Unanswered';
const optionContent = o => o.image ? `<code class="command-text">${escape(o.text)}</code><img class="command-image" src="${escape(o.image)}" alt="Original PDF command image for this option">` : o.code ? `<code>${escape(o.text)}</code>` : escape(o.text);
function save() {
  try { localStorage.setItem(storageKey(activeSet.id),JSON.stringify(attempt)); localStorage.setItem(ACTIVE_SET_KEY,activeSet.id); storageOK=true; }
  catch { storageOK=false; }
  $('save-status').textContent = storageOK ? 'Saved on this browser' : 'Saving unavailable. Keep this page open to retain your attempt.';
  $('save-status').classList.toggle('save-warning',!storageOK);
}
function indices() { return visibleIndices(questions, attempt, filter); }
function go(index, focus = true) {
  attempt.current = index; save(); render();
  if (focus) { $('workspace').focus({preventScroll:true}); $('workspace').scrollIntoView({block:'start',behavior:'instant'}); }
}
function keepCurrentVisible() {
  if (!indices().includes(attempt.current)) { filter='all'; $('review-filter').value='all'; }
}
function renderNavigation() {
  const visible=indices(), pos=visible.indexOf(attempt.current);
  $('previous').disabled=pos<=0; $('next').disabled=pos<0 || pos>=visible.length-1;
  $('position').textContent=!visible.length ? '0 questions' : filter !== 'all' ? `${pos+1} of ${visible.length} filtered` : `${attempt.current+1} of ${questions.length}`;
}
function renderMap() {
  const visible = indices();
  $('navigator').innerHTML = questions.map((q,i) => {
    const result = attempt.confirmed[i] ? outcome(q,attempt.answers[i]) : null;
    const status = result || (attempt.answers[i] === null ? 'unanswered' : 'selected, not confirmed');
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
  if (!attempt.confirmed[i]) {
    const multiple=Array.isArray(q.answer);
    body+=`<p class="answer-help" id="answer-help">${multiple ? 'Choose '+q.answer.length+' answers.' : 'Choose one answer.'} Confirm to check this question and reveal its explanations.</p><fieldset aria-describedby="answer-help"><legend class="sr-only">Answer choices for question ${i+1}</legend>`;
    body+=q.options.map((o,j)=>`<label class="option"><input type="${multiple?'checkbox':'radio'}" name="answer" value="${j}" ${isSelected(attempt.answers[i],j)?'checked':''}><span class="letter" aria-hidden="true">${letters[j]}</span><span class="option-text"><span class="sr-only">${letters[j]}. </span>${optionContent(o)}</span></label>`).join('');
    body+=`</fieldset><div class="answer-actions"><button id="confirm-answer" class="primary" ${!selectionComplete(q,attempt.answers[i])?'disabled':''}>Confirm answer</button><button id="clear" class="clear-answer" ${attempt.answers[i]===null?'disabled':''}>Clear selection</button></div>`;
  } else {
    const result=outcome(q,attempt.answers[i]);
    body+=`<p class="review-meta"><span class="result-badge ${result}">${result[0].toUpperCase()+result.slice(1)}</span> · ${escape(q.topic)}<br>Your selection: <strong>${answerLabel(attempt.answers[i])}</strong> · Correct ${Array.isArray(q.answer)?'answers':'answer'}: <strong>${answerLabel(q.answer)}</strong></p>`;
    if(q.reviewNote)body+=`<aside class="review-note" aria-label="Source review note"><h3>${q.reviewNote.kind==='corrected-key'?'PDF answer key corrected':q.reviewNote.kind==='legacy'?'Historical question — current guidance':'Source clarification'}</h3><p>${escape(q.reviewNote.text)}</p></aside>`;
    body+=q.options.map((o,j)=>`<article class="explanation ${correctAnswers(q).includes(j)?'correct':isSelected(attempt.answers[i],j)?'selected-wrong':''}"><span class="option-badge">${correctAnswers(q).includes(j)?'Correct answer': 'Incorrect option'}${isSelected(attempt.answers[i],j)?' · Your selection':''}</span><h3>${letters[j]}. ${optionContent(o)}</h3><p>${escape(o.explanation)}</p></article>`).join('');
    if(q.source && typeof q.source==='object')body+=`<p class="source-reference">Source: ${escape(q.source.file)} · original question ${q.source.question} · PDF ${q.source.pages.length===1?'page':'pages'} ${q.source.pages.join(', ')}</p>`;
    body+=`<div class="docs"><h3>Read the official documentation</h3>${q.docs.map(d=>`<a href="${escape(d.url)}" target="_blank" rel="noopener noreferrer">${escape(d.title)} ↗<span class="sr-only"> (opens in a new tab)</span></a>`).join('')}<p class="reviewed">Content reviewed ${escape(reviewed)}. Product behavior can change.</p></div>`;
  }
  $('workspace').innerHTML=body;
  renderNavigation();
}
function renderProgress() {
  const s=summarize(questions,attempt);
  $('mode-label').textContent=s.confirmed===questions.length?'PRACTICE COMPLETE':'QUESTION-BY-QUESTION PRACTICE';
  $('progress-text').textContent=`${s.confirmed} of ${questions.length} confirmed · ${attempt.flags.filter(Boolean).length} flagged`;
  $('progress').value=s.confirmed; $('progress').max=questions.length;
  $('score').hidden=s.confirmed===0;
  if(s.confirmed) $('score').innerHTML=`<div><span class="eyebrow">CONFIRMED ANSWERS</span><h2>${s.correct} correct out of ${s.confirmed} checked</h2><p>${s.confirmed-s.correct} incorrect · ${questions.length-s.confirmed} still to confirm<br>Accuracy is based only on confirmed answers.</p></div><div class="score-number">${s.percentage}%</div>`;
}
function render() { renderProgress(); renderMap(); renderQuestion(); }
function showRestartDialog() {
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
  if(e.target.name!=='answer')return;
  const q=questions[attempt.current], value=Number(e.target.value);
  const selection=Array.isArray(q.answer) ? [...$('workspace').querySelectorAll('input[name=answer]:checked')].map(input=>Number(input.value)) : value;
  if(!chooseAnswer(attempt,attempt.current,Array.isArray(selection)&&!selection.length?null:selection,q)){e.target.checked=false;return;}
  save();
  // Keep the focused radio mounted so native arrow-key navigation stays intact.
  $('clear').disabled=attempt.answers[attempt.current]===null;
  $('confirm-answer').disabled=!selectionComplete(q,attempt.answers[attempt.current]);
  keepCurrentVisible();
  renderProgress();
  renderMap();
  renderNavigation();
});
$('workspace').addEventListener('click',e=>{
  if(e.target.closest('#flag')){attempt.flags[attempt.current]=!attempt.flags[attempt.current];keepCurrentVisible();save();render();$('flag').focus({preventScroll:true});}
  if(e.target.closest('#clear') && chooseAnswer(attempt,attempt.current,null,questions[attempt.current])){save();render();$('workspace input').focus({preventScroll:true});}
  if(e.target.closest('#confirm-answer') && confirmAnswer(attempt,attempt.current,questions[attempt.current])){keepCurrentVisible();save();render();$('workspace').focus({preventScroll:true});}
  if(e.target.closest('#show-all')){filter='all';$('review-filter').value='all';go(0);}
});
$('previous').addEventListener('click',()=>{const v=indices();const p=v.indexOf(attempt.current);if(p>0)go(v[p-1]);});
$('next').addEventListener('click',()=>{const v=indices();const p=v.indexOf(attempt.current);if(p<v.length-1)go(v[p+1]);});
$('restart').addEventListener('click',showRestartDialog);
$('review-filter').addEventListener('change',e=>{filter=e.target.value;const v=indices();go(v.includes(attempt.current)?attempt.current:(v[0]??attempt.current),false);});
$('confirm-dialog').addEventListener('close',()=>{
  if($('confirm-dialog').returnValue!=='confirm')return;
  attempt=freshAttempt(version,questions.length);attempts.set(activeSet.id,attempt);filter='all';$('review-filter').value='all';
  go(0);
});
function selectSet(id) {
  const next=SETS.find(set=>set.id===id) || SETS[0];
  id=next.id;
  if(attempt)save();
  activeSet=next;
  const data=datasets.get(id);questions=data.questions;version=data.version;reviewed=data.reviewed;
  if(!attempts.has(id)) {
    let raw=null;try{raw=localStorage.getItem(storageKey(id));}catch{storageOK=false;}
    attempts.set(id,restoreAttempt(raw,version,questions.length,questions)||freshAttempt(version,questions.length));
  }
  attempt=attempts.get(id);filter='all';$('review-filter').value='all';
  $('exam-version').value=id;
  $('edition').textContent=next.label.toUpperCase();
  $('intro-copy').textContent=`${next.label} · ${questions.length} scenarios. Check each answer. Learn at your own pace.`;
  $('brief-details').textContent=`${questions.length} questions · Untimed · ${id==='v2'?'Includes one choose-two question':'One best answer each'}`;
  $('map-range').textContent=`01—${questions.length}`;
  $('dialog-title').textContent=`Restart ${next.label}?`;
  $('dialog-description').textContent=`This clears ${next.label}'s selections, confirmed answers, flags, and current position in this browser. The other version's progress is preserved. This cannot be undone.`;
  $('version-status').textContent=`${next.label} selected. ${questions.length} questions. Progress is saved separately for each version.`;
  save();render();
}
$('exam-version').addEventListener('change',e=>selectSet(e.target.value));
async function init(){
  try{
    await Promise.all(SETS.map(async set=>{
      const response=await fetch('./'+set.file);if(!response.ok)throw Error('Content unavailable');
      datasets.set(set.id,await response.json());
    }));
    let selected='v1';try{selected=localStorage.getItem(ACTIVE_SET_KEY)||'v1';}catch{storageOK=false;}
    if(!SETS.some(set=>set.id===selected))selected='v1';
    selectSet(selected);
    $('loading').hidden=true;$('app').hidden=false;
  }catch(error){$('loading').textContent='The exam could not load. Please check your connection and reload this page.';console.error(error);}
}
init();

export const STORAGE_KEY = 'cloud-fieldnotes-ace-attempt-v1';
export const SETS = [
  {id:'v1', label:'Version 1', file:'questions.json', count:40},
  {id:'v2', label:'Version 2', file:'questions-v2.json', count:30},
  {id:'v3', label:'Version 3', file:'questions-v3.json', count:19}
];
export const ACTIVE_SET_KEY = 'cloud-fieldnotes-ace-active-set';
// Retain the original key so existing Version 1 attempts survive the upgrade.
export function storageKey(setId) { return setId === 'v1' ? STORAGE_KEY : `${STORAGE_KEY}:${setId}`; }
export const answerList = answer => answer === null ? [] : Array.isArray(answer) ? answer : [answer];
export const correctAnswers = question => answerList(question.answer);
export const isSelected = (answer, index) => answerList(answer).includes(index);
export const selectionComplete = (question, answer) => answerList(answer).length === correctAnswers(question).length;
function validAnswer(answer, question) {
  if (answer === null) return true;
  const count = question?.options.length ?? 4;
  if (Array.isArray(answer)) {
    return !!question && Array.isArray(question.answer) && answer.length > 0 &&
      answer.length <= question.answer.length && new Set(answer).size === answer.length &&
      answer.every(v => Number.isInteger(v) && v >= 0 && v < count);
  }
  return !Array.isArray(question?.answer) && Number.isInteger(answer) && answer >= 0 && answer < count;
}
export function freshAttempt(version, count) {
  return {version, answers:Array(count).fill(null), flags:Array(count).fill(false), confirmed:Array(count).fill(false), current:0};
}
export function restoreAttempt(raw, version, count, questions) {
  try {
    const a = JSON.parse(raw);
    if (!a || a.version !== version || !Array.isArray(a.answers) || a.answers.length !== count ||
      !a.answers.every((v,i) => validAnswer(v,questions?.[i])) ||
      !Array.isArray(a.flags) || a.flags.length !== count || !a.flags.every(v => typeof v === 'boolean') ||
      !Number.isInteger(a.current) || a.current < 0 || a.current >= count) return null;
    // Preserve existing exam-mode progress when moving to independent questions.
    const confirmed = a.confirmed ?? (typeof a.submitted === 'boolean' ? a.answers.map(v => a.submitted && v !== null) : null);
    if (!Array.isArray(confirmed) || confirmed.length !== count || !confirmed.every((v,i) => typeof v === 'boolean' && (!v || (a.answers[i] !== null && (!questions || selectionComplete(questions[i],a.answers[i])))))) return null;
    return {version, answers:a.answers, flags:a.flags, confirmed, current:a.current};
  } catch { return null; }
}
export function chooseAnswer(attempt, index, answer, question) {
  if (!Number.isInteger(index) || index < 0 || index >= attempt.answers.length || attempt.confirmed[index]) return false;
  if (!validAnswer(answer,question)) return false;
  attempt.answers[index] = Array.isArray(answer) ? [...answer].sort((a,b)=>a-b) : answer; return true;
}
export function confirmAnswer(attempt, index, question) {
  if (!Number.isInteger(index) || index < 0 || index >= attempt.answers.length || attempt.answers[index] === null || attempt.confirmed[index]) return false;
  if (question && !selectionComplete(question,attempt.answers[index])) return false;
  attempt.confirmed[index] = true; return true;
}
export function outcome(question, answer) {
  if (answer === null) return 'unanswered';
  const expected = correctAnswers(question), selected = answerList(answer);
  return selected.length === expected.length && expected.every(v=>selected.includes(v)) ? 'correct' : 'incorrect';
}
export function summarize(questions, attempt) {
  const confirmed = attempt.confirmed.filter(Boolean).length;
  const correct = questions.filter((q,i) => attempt.confirmed[i] && outcome(q,attempt.answers[i]) === 'correct').length;
  const answered = attempt.answers.filter(v => v !== null).length;
  return {correct, confirmed, answered, unanswered:questions.length-answered, percentage:confirmed ? Math.round(correct/confirmed*1000)/10 : 0};
}
export function visibleIndices(questions, attempt, filter = 'all') {
  return questions.flatMap((q,i) => {
    const matches = filter === 'all' || (filter === 'flagged' ? attempt.flags[i] : filter === 'pending' ? !attempt.confirmed[i] : filter === 'unanswered' ? attempt.answers[i] === null : attempt.confirmed[i] && outcome(q,attempt.answers[i]) === filter);
    return matches ? [i] : [];
  });
}

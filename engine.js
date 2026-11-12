export const STORAGE_KEY = 'cloud-fieldnotes-ace-attempt-v1';
export function freshAttempt(version, count) {
  return {version, answers:Array(count).fill(null), flags:Array(count).fill(false), confirmed:Array(count).fill(false), current:0};
}
export function restoreAttempt(raw, version, count) {
  try {
    const a = JSON.parse(raw);
    if (!a || a.version !== version || !Array.isArray(a.answers) || a.answers.length !== count ||
      !a.answers.every(v => v === null || (Number.isInteger(v) && v >= 0 && v < 4)) ||
      !Array.isArray(a.flags) || a.flags.length !== count || !a.flags.every(v => typeof v === 'boolean') ||
      !Number.isInteger(a.current) || a.current < 0 || a.current >= count) return null;
    // Preserve existing exam-mode progress when moving to independent questions.
    const confirmed = a.confirmed ?? (typeof a.submitted === 'boolean' ? a.answers.map(v => a.submitted && v !== null) : null);
    if (!Array.isArray(confirmed) || confirmed.length !== count || !confirmed.every((v,i) => typeof v === 'boolean' && (!v || a.answers[i] !== null))) return null;
    return {version, answers:a.answers, flags:a.flags, confirmed, current:a.current};
  } catch { return null; }
}
export function chooseAnswer(attempt, index, answer) {
  if (!Number.isInteger(index) || index < 0 || index >= attempt.answers.length || attempt.confirmed[index]) return false;
  if (answer !== null && (!Number.isInteger(answer) || answer < 0 || answer > 3)) return false;
  attempt.answers[index] = answer; return true;
}
export function confirmAnswer(attempt, index) {
  if (!Number.isInteger(index) || index < 0 || index >= attempt.answers.length || attempt.answers[index] === null || attempt.confirmed[index]) return false;
  attempt.confirmed[index] = true; return true;
}
export function outcome(question, answer) {
  return answer === null ? 'unanswered' : answer === question.answer ? 'correct' : 'incorrect';
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

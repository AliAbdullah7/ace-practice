export const STORAGE_KEY = 'cloud-fieldnotes-ace-attempt-v1';
export function freshAttempt(version, count) {
  return {version, answers:Array(count).fill(null), flags:Array(count).fill(false), current:0, submitted:false};
}
export function restoreAttempt(raw, version, count) {
  try {
    const a = JSON.parse(raw);
    if (!a || a.version !== version || !Array.isArray(a.answers) || a.answers.length !== count ||
      !a.answers.every(v => v === null || (Number.isInteger(v) && v >= 0 && v < 4)) ||
      !Array.isArray(a.flags) || a.flags.length !== count || !a.flags.every(v => typeof v === 'boolean') ||
      !Number.isInteger(a.current) || a.current < 0 || a.current >= count || typeof a.submitted !== 'boolean') return null;
    return {version, answers:a.answers, flags:a.flags, current:a.current, submitted:a.submitted};
  } catch { return null; }
}
export function outcome(question, answer) {
  return answer === null ? 'unanswered' : answer === question.answer ? 'correct' : 'incorrect';
}
export function summarize(questions, attempt) {
  const correct = questions.filter((q,i) => outcome(q,attempt.answers[i]) === 'correct').length;
  const answered = attempt.answers.filter(v => v !== null).length;
  return {correct, answered, unanswered:questions.length-answered, percentage:Math.round(correct/questions.length*1000)/10};
}
export function visibleIndices(questions, attempt, filter = 'all') {
  return questions.flatMap((q,i) => filter === 'all' || (filter === 'flagged' ? attempt.flags[i] : outcome(q,attempt.answers[i]) === filter) ? [i] : []);
}

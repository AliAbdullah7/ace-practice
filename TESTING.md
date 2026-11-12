# Verification record

## Automated checks

`npm test` and `npm run build` pass. JavaScript syntax checks pass. Tests cover all 40 question records, unique identifiers, four distinct explained choices, balanced keys, complete concept-reference coverage, official links, save/restore, invalid saved data, scoring, answer changes/clearing, and review filters including empty results.

The build creates an explicit seven-file deployment bundle without unrelated files.

## Browser checks

Verified in the in-app Chromium browser:

- Previous/Next, numbered navigation and boundary controls.
- Answer selection and changes, with native arrow keys retaining focus.
- Flag toggling and navigator status without correctness disclosure before submission.
- Reload restores answers, flags and current position.
- Submission reports unanswered count and returns to a chosen unanswered question.
- Confirmed submission locks answers and reveals every option’s explanation and official references.
- A controlled attempt with one correct, one incorrect and 38 unanswered scores 1/40 (2.5%).
- Incorrect, unanswered and flagged review filters select matching questions.
- Submitted results survive reload.
- Escape cancels restart without clearing results; confirmed restart clears the attempt.

Final responsive and deployment checks are appended below after completion.

## Final checks

- Phone widths 320 and 390 pixels: no horizontal overflow; navigator controls at least 44 pixels wide and tall. Laptop layout checked at 1280 × 900.
- Browser completed a controlled fully correct 40-question attempt: 40/40, 100%, zero unanswered. Every question’s review rendered four explanations, exactly one correct marker, an official documentation link and no answer inputs.
- Empty incorrect-results filter showed its empty state and disabled navigation.
- All original documentation links were checked; two broken links were replaced and redirects updated to current destinations.
- Browser console contained no application errors during the tested flows.
- Only the new website and project files are tracked; no source mock, PDFs, credentials or unrelated materials are included.

These were Chromium checks using phone-sized viewports, not tests on physical iOS/Android hardware or a screen reader.

# Version 2 verification — November 16, 2026

`npm test` passes all 11 tests. `npm run build`, JavaScript syntax checks and `git diff --check` pass. Version 1’s `questions.json` is unchanged.

- Indexed all 322 numbered PDF questions across 202 pages. Checked all 30 selected stems and 117 text choices against normalized PDF extraction. Visually inspected the four embedded command images; copied them without answer annotations. Other images on selected pages are outside the question prompts/options.
- Automated tests cover both banks, source references, official documentation URLs, separate storage keys, preserved Version 1 key, cross-set restore rejection, independent restart, five-option multiple selection, exact-set scoring, incomplete/corrupt selection rejection, and complete correct attempts for both banks.
- Browser completed all 30 Version 2 questions with 30/30 and 100%. Each unconfirmed question contained no explanations, review notes, source references or documentation links. Confirmation showed four explanations (five for choose-two), the proper result, and source metadata. Historical notices and corrected-key notices rendered only after confirmation.
- Verified draft selections, flags, position, confirmed results and the selected version survive switching and reload. Version 1’s pre-existing two confirmations, draft selection and position remained unchanged throughout the Version 2 tests.
- Confirm with one of the two required selections is disabled. Two selections confirm and lock only that question. The fifth choice is supported. Native controls remain mounted during selection.
- Restart Cancel preserves the attempt; confirmed restart resets only Version 2. Its test attempt was cleared afterward. Empty incorrect-results filter disables navigation. Flagged review works with choose-two.
- All four command images loaded. Added readable command text alongside them after observing that the source images alone were too small on a phone.
- Phone widths 320 and 390 pixels have no horizontal overflow in either set. Desktop layout checked in the existing preview viewport. Browser console reported no warnings/errors.
- Deployment bundle is an explicit allowlist: eight root website files (including `.nojekyll`) and four command images. No full PDF, original mock HTML, unrelated materials, or credentials are packaged.

These browser checks used Chromium with phone-size viewports, not physical iOS/Android devices or a screen reader. Source-answer and coverage limitations are recorded in [VERSION_2_NOTES.md](VERSION_2_NOTES.md).

---

# Independent-question verification

`npm test` (six tests), `npm run build`, JavaScript syntax and diff whitespace checks pass.

Automated coverage verifies independent confirmations, no confirmation without a selection, locking only the confirmed question, clearing drafts, confirmation-only accuracy, draft-safe results filters, saved-state validation and migration from the former whole-exam format.

Browser checks verified:

- No Finish & submit control; Confirm answer sits beside Clear selection and is disabled until a choice is selected.
- Confirming Q1 shows only its four explanations; Q2 remains unanswered with no explanation disclosure.
- Keyboard answer changes and clearing still work.
- Reload restores an unconfirmed selection without revealing correctness, and restores confirmed explanations.
- One correct and one incorrect confirmation produce 50% accuracy while remaining selections are excluded.
- Confirming within the pending filter retains the newly revealed explanation by returning to all questions.
- At a 390-pixel phone width, both controls share a row, have at least 44-pixel touch heights, and the page has no horizontal overflow.

Earlier verification below describes the previous whole-exam workflow and is retained as history.

# Historical exam-mode verification

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

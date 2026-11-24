# Version 3 Day 5 expansion — November 24, 2026

- Added 11 PDF excerpts as questions 20–30, matching mock 61–75. Reviewed each new key and all option explanations against current official Google Cloud documentation. The source/concept/page map and historical/ambiguous-key limits are in [VERSION_3_NOTES.md](VERSION_3_NOTES.md).
- `npm test`: **19/19 passed**. `npm run build`, JavaScript syntax checks and `git diff --check` passed. Fixtures verify all 30 stems/choice lists, source pages and printed keys, the unchanged 19-question prefix, byte-identical Version 1/2 banks, independent attempts/restarts, rejection of old Version 3 attempts, and exact-set scoring for the unchanged Version 2 choose-two question.
- The actual app controller and Chromium browser each exercised all 11 appended questions. Each was hidden before confirmation; confirming revealed exactly four explanations, its source and official links. The original 19 remained unconfirmed during that browser test. Reload preserved the 11 test confirmations and position; the preview-only Version 3 test attempt was cleared afterward.
- PDF 72’s two original embedded prompt images were inspected and combined without answer highlighting/watermarks, with an expandable faithful text transcription. The 763 × 568 composite loaded in Chromium. At 320 and 390 CSS pixels the image/transcription view had no document horizontal overflow; desktop layout retained the existing interface. No browser warnings/errors were reported. These are simulated phone widths, not physical-device or screen-reader tests.
- The built output contains exactly nine root website files and six required images. No full PDF, source mock HTML, notes, tests or unrelated materials are deployed. Versions 1 and 2 were not edited; Version 3’s content version is `ace-v3-2026-11-24`, and its older saved attempt resets without archival.
- Publishing continues through the existing `main` branch and GitHub Pages workflow. Render configuration is preserved; no verified Render URL or status is available from the repository’s deployment records. GitHub Pages success must not be described as Render success.

---

# Version 3 verification — November 23, 2026

`npm test` passes all **17 tests**. `npm run build`, JavaScript syntax checks and `git diff --check` pass. Version 1 and Version 2 content files are byte-for-byte unchanged from the previous commit, including their content versions.

- Indexed all 322 questions across all 202 PDF pages. Source hash matches Version 2's source. Compared all 19 selected stems and 76 options, in order, with normalized page-indexed extraction. Stored source fingerprints for regression checks without publishing additional source text. Inspected the original PDF 42 manifest and PDF 43 page visually; extracted the original manifest image without highlights or answer markings.
- Tests cover all three banks, pairwise saved-state separation and cross-version restore rejection, confirmed/draft/flag/position restoration, full-correct scoring, incomplete multi-selection rejection, fifth-option handling, exact-set scoring, source fidelity and corrected-key metadata. The actual app controller is also tested for confirmation-only disclosure and restart decisions.
- Found and fixed a restart timing bug: the old asynchronous dialog `close` handler could run after a rapid version switch and clear the new selection's attempt. Restart now captures its intended set and processes the confirmed form submission synchronously. Cancel and Escape do not clear progress. Regression tests include immediate switching after confirmation and subsequent reload.
- In the in-app browser, completed all 19 Version 3 questions: **19/19, 100%**. Before every confirmation, there were no explanation, review-note, source-reference or documentation elements. Each confirmation rendered exactly four option explanations. Reload preserved the completed score.
- Browser verified Version 2's five-choice choose-two question: one choice could not confirm; the fifth option was selectable; the exact correct pair confirmed. A sample Version 1 confirmation and Version 2 confirmations scored independently. Browser checks used an isolated `localhost` origin, separate from the user's live website and prior `127.0.0.1` attempts.
- Browser verified a Version 3 draft answer, flag and position survive reload, with no answer notes revealed. Cancel preserved the draft/flag. Confirmed restart immediately cleared Version 3 while Version 2's two confirmed results and position remained. Automated controller tests verify preservation of both other versions, including rapid switches, rather than relying on browser timing alone.
- Original YAML image loaded at 468 × 402 pixels, with a faithful expandable code transcription. At 390 px width, the open-code question had no document-level horizontal overflow; desktop layout retained the existing design. Browser console check reported no warnings/errors during the initial full-set run.
- Packaging test builds from a clean checkout, so the existing test-before-build deployment order works. The output contains exactly nine root website files and five required images. No full PDF, mock HTML, repository files, notes, tests, credentials or unrelated materials are published.

Selection/distribution: **9** upper-range and **10** lower-range questions; **11-question shortfall**, with reasons and coverage limits in [VERSION_3_NOTES.md](VERSION_3_NOTES.md). Four printed keys are corrected. Historical/ambiguous source limitations remain explicit after confirmation.

Publication uses the existing repository's `main` branch and existing deployment configuration. GitHub Pages build and deployment succeeded for the implementation commit (`11726d0`), and the live site displayed all three versions with Version 3 loaded and explanations hidden. A final page-reference audit added physical page 39 for PDF 55's printed key; its question/options are on page 38. Render status remains unverified; GitHub Pages success is not evidence of Render success.

---

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

# Maintaining this exam website

- This is the user's existing exam site in `AliAbdullah7/ace-practice`. Render Static Site is the preferred hosting destination, connected to GitHub branch `main` with Auto-Deploy On Commit.
- When asked to generate a replacement exam, update this repository and the same Render site rather than creating a new repository or hosting service. Follow the user's specified source range or topics; do not generate an exam unless requested.
- Keep the existing interface and update `questions.json` with original scenarios, four choices, one best answer and explanations for all options. Verify uncertain behavior against current official Google Cloud documentation.
- Bump the content `version` and update `reviewed` for a new exam, so the previous attempt is not scored against a different key. Explain that replacing an exam resets its local attempt and does not archive old results if relevant to the request.
- Run `npm test` and `npm run build`, then commit and push the authorized update to `main`. Keep the user informed of deployment status; claim a new Render deployment succeeded only after verification.
- Render dashboard settings: root directory empty, build command `npm test && npm run build`, publish directory `dist`, Auto-Deploy On Commit. The optional `render.yaml` provides equivalent Blueprint settings; it does not configure an existing manually created service by itself.
- Publish only this website and necessary project files. Never copy original mock questions, source PDFs, credentials or unrelated study materials into the repository.

- Each question is independent: Confirm answer beside Clear selection reveals only that question’s answer and explanations. Keep other questions unconfirmed; do not reintroduce whole-exam submission.

## Multiple question sets

- Version 1 stays in `questions.json`; Version 2 stays in `questions-v2.json`. Preserve both sets and the original Version 1 storage key when adding or changing sets. Bump only the affected content version.
- A new set must not replace an existing set unless explicitly requested. Restart affects only the selected set.
- Version 2 intentionally preserves user-requested selected PDF excerpts and the four image-only command choices. Do not publish the full PDF or mock HTML. Preserve original option counts/order, including the five-choice choose-two question.
- Record source pages/numbers and keep verified-key corrections, historical limitations and official references in the explanation-only view. See `VERSION_2_NOTES.md` for the source and concept map.

# Cloud fieldnotes · ACE Practice

[Take the practice exam](https://AliAbdullah7.github.io/ace-practice/)

An unofficial, untimed exam with 40 original scenarios covering a selected set of Google Cloud Associate Cloud Engineer concepts. It is not comprehensive ACE coverage, an official Google exam, or a predictor of certification results. No original source exams or PDFs are included.

## Taking the exam

Each question is independent. Choose an answer, then use **Confirm answer** beside **Clear selection** to reveal that question’s result and explanations immediately. You can change or clear a choice before confirming it. Confirmed answers are locked, while other questions remain available to answer independently. There is no whole-exam submission step.

Navigate with Previous/Next or the question map. Flag questions and filter to unconfirmed, incorrect, unanswered or flagged questions. Progress and accuracy count confirmed questions only. Restart requires confirmation; Cancel or Escape preserves the attempt. Existing saved selections are preserved when upgrading from the previous exam mode.

**Answers, flags, position and results are saved locally to one device, browser, browser profile and site origin. They do not sync across devices.** Private browsing, clearing site data, or a content version change may reset the attempt. If storage is unavailable, a warning appears and progress lasts only while the page remains open. With multiple tabs, the last saved tab wins.

Native radio buttons support Tab, arrow keys and Space. Controls have visible focus indicators, dialogs support Escape, and accessible navigator names identify status without depending on color. There is no timer.

## Run locally

Use an HTTP server because questions are loaded with fetch; do not open index.html directly as a file:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Taking the exam requires no installation, API key, paid backend, external fonts, analytics or external scripts. A connection is required to load the site; offline use is not promised. Documentation links open on Google's site.

Development checks use Node.js 22 or later and no npm packages:

```sh
npm test
npm run build
```

The build copies an explicit allowlist of seven website files into `dist/`, excluding tests, documentation, Git metadata and unrelated materials.

## Update content

Edit `questions.json`. A question contains a stable `id`, a maintainer `source` concept reference, a `topic`, a self-contained `question`, four `options` with individual `explanation` values, one zero-based `answer` index, and official `docs` links. Index 0 is A; index 3 is D.

Keep exactly one unambiguous best answer. Verify current official documentation, especially IAM scope and service deprecations. The fixed mixed topic order keeps saved attempts stable; answer positions currently occur ten times each. If changing that balance intentionally, update the matching test. Bump the top-level `version` whenever question meaning, order or answer indices change: old attempts are rejected rather than scored against a different key. Update `reviewed` after a content review. See [CONTENT_NOTES.md](CONTENT_NOTES.md) for coverage and modernization.

Answers and explanations are hidden in the interface until that question is confirmed. Like any static self-study site, its downloadable source contains the answer key; it is not a secure assessment system.

## Deploy with Render (preferred hosting)

Connect Render to your GitHub account and select `AliAbdullah7/ace-practice` from the connected repository list. Do not use Render's **Public Git Repository** URL-only option: automatic deployments require a connected Git provider.

Use these settings when creating a **Static Site**:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Root Directory | Leave empty (the website is at the repository root) |
| Build Command | `npm test && npm run build` |
| Publish Directory | `dist` |
| Auto-Deploy | **On Commit** |

Click **Deploy Static Site** (or **Create Static Site**, depending on the dashboard). Render runs the checks, creates `dist/` and publishes that directory. The resulting `onrender.com` URL stays the same for future updates. If you have already created the site, change its existing settings instead of creating a duplicate.

`render.yaml` records the equivalent settings for optional Blueprint setup. Adding that file alone does not create a Render service or configure a service created manually; use the dashboard values above for a manually created site. No backend, start command or secret is needed.

### Future exams on the same site

When requesting another exam, specify the concepts or source question range. Update the questions in this repository, verify the answers, bump the content `version`, run checks and push to `main`. Render then automatically rebuilds and publishes to the **same Render URL**. No new repository or site is needed. Bumping the content version starts a fresh attempt for the replacement exam; previous results are not archived by this single-exam app.

Official references: [Render static sites](https://render.com/docs/static-sites), [automatic deployments and connected Git provider requirement](https://render.com/docs/deploys).

## GitHub Pages (existing alternative)

`.github/workflows/pages.yml` runs checks and publishes after pushes to `main`, or a manual workflow dispatch. It uses GitHub's official Pages actions with scoped permissions and needs no token secret.

1. Open repository **Settings → Pages** and select **GitHub Actions** as the source.
2. Push to `main`, or run **Actions → Test and deploy practice exam → Run workflow**.
3. Wait for both jobs to succeed; the deployment environment links to the live site.

The repository and Pages site are public. Commit only this website and necessary project files. Do not copy source mocks, PDFs, credentials or study directories into it. If adapting to an existing repository, preserve unrelated content and adjust deployment paths deliberately. Relative asset paths support a project URL such as `/ace-practice/` with no custom domain or server routing.

See [TESTING.md](TESTING.md) for verification. Content was reviewed November 12, 2026; product behavior can change.

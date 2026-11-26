# Version 4 selection and review

Reviewed **November 26, 2026**. **17 qualifying questions: 9 Day 5 / 8 Day 6. Target 30; shortfall 13.** These are a practice bank, not a daily assignment. The selection preserves source wording rather than generating replacements or padding the count with repeated or merely adjacent tasks. Coverage is partial; the gaps below are deliberate.

Content file `questions-v4.json`, content version `ace-v4-2026-11-26`, storage key `cloud-fieldnotes-ace-attempt-v1:v4`. Versions 1–3, their content versions and content-file bytes, existing attempt keys and the active-set preference key are unchanged. Adding Version 4 does not reset any existing attempt. Restart still affects only the selected version.

## Full-source selection process

1. Read the root and repository `AGENTS.md`, README, testing/content notes, Version 2/3 reviews, and `Day-05.md` / `Day-06.md`. Day 5 is mock 61–75; Day 6 is 76–85. No extra completion or score is inferred.
2. Extracted the actual mock question records and reviewed their stems/choices, particularly 61–85. Compared candidates with mock **1–85** and all **100** existing questions (40 + 30 + 30), including Version 1's original scenarios rather than relying only on PDF numbers.
3. Indexed all **322 numbered questions on all 202 physical PDF pages**, then screened every stem for the actual operation, constraints and decision. Detailed candidates were checked against their complete choices and printed keys. Searches included IAM, workload credentials, logs/retention/SQL/export, memory sizing, hybrid APIs, event delivery, containers, billing, Kubernetes diagnosis/GPU pools/HTTP exposure, networks, calculator estimates, CLI inventory and external SQL. Selection was not limited to 61–85 or adjacent pages: retained sources span physical pages **64–197**.
4. Excluded every already-used PDF source, and every unchanged mock scenario in 1–85. Reviewed remaining near matches by scenario/constraint/decision, not string similarity alone. A new name, resource count, hardware name or option order did not count as novelty. Kept one representative from competing unused variants.
5. Checked current official Google Cloud documentation for the selected answers and affected exclusions. Corrected two printed keys without changing their original stems or options. Excluded ambiguous/currently incomplete candidate sets instead of inventing an answer or changing the required selection count.
6. Compared all **17 stems and 69 choices** in source order against page-indexed extraction and visually inspected all **24** source pages needed for those excerpts and their keys. The only essential prompt image is extracted directly from its original PDF image object, without page highlights, handwritten corrections or watermark. Its text transcription was checked against the original image. Source fingerprints and old-bank hashes are in `tests/fixtures/v4-source-fidelity.json`.

Source SHA-256: `dfb99260f18eb2b841605c448d33001ca1ff7858e3c3bedfc3231f2f22475432`.

[Complete 322-question disposition ledger](VERSION_4_SELECTION_AUDIT.json) records one decision/reason for every source number, including exclusions outside the nearby range. Totals: **17 selected, 60 already used, 60 other direct mock repeats, 58 near-duplicates, 122 outside the specific task scope, 5 invalid/ambiguous**. Categories are exclusive: an already-used question is counted there even if it also repeats a mock. This is an editorial application of the requested scope, not a claim that Google Cloud concepts have only one possible categorization.

## Selected source map — maintainer spoilers

Physical page numbers below are one-based PDF pages containing the stem, essential image, choices or printed key. A prior page containing only the question heading is omitted (146 / 315); later commentary and unrelated next questions are omitted. Letters refer to the original option order. The site shows mappings, explanations and corrections only after that individual question is confirmed.

| Practice # | PDF # | Physical pages | Day | Mock refs | Printed | Verified | Task / material difference from prior practice |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 94 | 64, 65 | 5 | 72 | B | B | Infer the most likely scheduling resource shortage from identical replicas and a single pool; mock/V3 72 asks which resource's events to inspect, not which cause is most likely. |
| 2 | 108 | 73 | 6 | 81 | A | A | Infrequent, long-running GPU jobs that cannot restart: on-demand pool creation/cleanup rather than adding a fixed specialist pool. |
| 3 | 221 | 138 | 5 | 63 | D | C | Internal-only cloud VMs reaching Storage APIs via a subnet setting; prior hybrid question requires on-premises DNS, VIP advertisement and hybrid routing. |
| 4 | 111 | 74, 75 | 6 | 80, 83 | C | C | Existing domain restriction blocks an outside auditor; solve identity eligibility as well as read-only scope. |
| 5 | 222 | 138, 139 | 5 | 66 | B | A | Acquisition explicitly requires moving the existing project into another organization plus changing billing; previous invoice consolidation did not require a hierarchy move. |
| 6 | 126 | 84, 85 | 6 | 77 | A | A | Build a monthly estimate across products before provisioning; related calculator workflow, not the same GKE IOPS/snapshot-entry question. |
| 7 | 152 | 101 | 5 | 74 | D | D | External Linux operations partner has no Google accounts; metadata SSH credentials versus granting an existing Google group OS Login. |
| 8 | 146 | 98 | 6 | 85 | D | D | Join two external sources and filter users for ad hoc analysis; mock 85 queries a single already-stored Avro file. |
| 9 | 276 | 166 | 5 | 61 | A | A | Protect department-specific aggregated logging controls above project Owners; organizational log governance rather than selecting an archival destination/class. |
| 10 | 229 | 141, 142 | 6 | 83 | B | B | Existing Workspace identities must scale tenfold with group-managed permissions and MFA; not the simple direct email-role binding in mock 83. |
| 11 | 283 | 169 | 5 | 68 | B | B | SQL over an analytics-enabled log bucket through a linked dataset, without exporting a second stored copy. |
| 12 | 258 | 156 | 6 | 84 | AE | AE | First-time CLI sign-in and target-project context before inventory; not named-configuration switching across already-configured environments. Original five choices / choose two. |
| 13 | 299 | 180, 181 | 5 | 68 | B | B | Low-delay third-party SaaS log streaming; Pub/Sub delivery requirements rather than SQL analysis or archival retention. |
| 14 | 312 | 193, 194 | 6 | 79 | D | D | Plan a production landing zone with shared networking and organization-wide TCP enforcement; not just connect two already-running isolated VPCs. |
| 15 | 296 | 177, 178 | 5 | 70 | D | D | Authenticate a workload to Google APIs with keys prohibited: bind Pod identity to an IAM account rather than use an on-premises key file. Related authentication operation; source environment and key constraint change the solution. |
| 16 | 315 | 197 | 6 | 78 | D | D | Expose an HTTP GKE backend privately to Cloud Run, including ingress, DNS and client VPC access; different visibility/client requirements from public GKE HTTPS or V3 60's cross-VPC raw TCP endpoint. |
| 17 | 310 | 191 | 5 | 64, 65 | D | D | Migrate both asynchronous intake and processing off managed VMs to managed messaging/compute; prior 64 starts with Cloud Run and asks for push authentication, and 65 asks about sparse HTTP hosting cost. |

## Fidelity and assets

All 16 four-choice single-answer sources remain single-answer. PDF 258 remains five-choice, choose-two, with **exact-set scoring and no partial credit**. Option order is never balanced or shuffled. Only whitespace/PDF line wraps and extraction-only headers/footers/watermarks were removed. No source question was shortened, simplified, modernized or rewritten. Examples deliberately preserved: `VerticalPodAutscaler` (108), `projects. move` / `lo` / `tor` / `protect` (222), `slorage.googleapis.com` (221), `1.000` / `Google Workplace` (229), and `SOL` / `lo` (283). Parentheses around the later source stems remain intact.

`assets/pdf-q94-status.jpg` is the original **725 × 110** embedded image (PDF object 709). It includes only the command/status table, not the printed answer or highlighted page. Its expandable text preserves the original command, names, values and `RESTART` header. No other selected question needs an image; none of their explanatory diagrams are part of the prompt. No full PDF, mock HTML, unused source text, tests or maintainer notes are included in `dist/`. Only selected excerpts and necessary website assets are deployed.

## Coverage across all target concepts

Mappings are task relationships, not claims that each question reproduces every constraint of its reference. A repeated concept is useful, but a repeated scenario is excluded.

| Mock | Target operation / constraint | Version 4 coverage or gap |
| --- | --- | --- |
| 61 | Cost-effective three-year organization audit-log retention | 276 covers hierarchy/protected aggregated sinks. Storage-class/three-year archival selection is already V3 61 and is not repeated. |
| 62 | Low-CPU, RAM-heavy proxy sizing | No new question; 198 is too close to the already-used memory-sizing decision. |
| 63 | Private Google API access from on-premises | 221 supplies the distinct VM-side private-access configuration; does not repeat hybrid DNS/VIP setup. |
| 64 | Authenticated Pub/Sub delivery to Cloud Run | 310 covers managed asynchronous architecture; delivery/IAM details are explained after confirmation. No second copy of the original push-invoker setup. |
| 65 | Sparse HTTP container, minimum idle cost | 310 covers managed consumer compute; the sparse-hosting runtime choice itself is not repeated. 163/230/234 rejected. |
| 66 | Consolidate acquired-company billing without unnecessary moves | 222 changes the requirement: an organization move is mandatory and billing remains a separate operation. |
| 67 | Monitor Spanner without table access | No new scoped-monitoring grant question. General Spanner tuning and unrelated IAM roles do not fill this gap. |
| 68 | Route VM logs to BigQuery cheaply | 283 queries native log storage through a link; 299 routes a low-delay third-party stream. Neither repeats the direct BigQuery-copy sink. |
| 69 | Extend the same Deployment Manager deployment into Kubernetes | No new type-provider question. Generic Terraform/cluster provisioning/Config Connector deletion are different operations. |
| 70 | Authenticate an external application to Google APIs | 296 tests keyless Pod identity under a key prohibition. External-key activation candidate 189 is now ambiguous. |
| 71 | Cross-project image-pull IAM | No new question; 215 is a near-repeat and retains historical registry terminology. Pod API authentication in 296 is explicitly a different operation. |
| 72 | Investigate Pending Pod events | 94 asks for a likely resource-capacity cause, with original status image and identical-replica constraints. |
| 73 | Generate Windows RDP credentials | Already in V2 73; no repeat. |
| 74 | Authorize a group to SSH to one VM | 152 changes the identity constraint to an external partner without Google accounts. |
| 75 | List enabled APIs for a known project | Already in V3 75. API enablement questions do not test listing, so none substituted. |
| 76 | Percentage canary release on App Engine | Already mock 56/76 and V3 167; 194/243/279 repeat the same traffic-split decision. Prewarming 294 is a different operation and also incomplete. |
| 77 | Estimate GKE IOPS/disk/snapshot costs in calculator | 126 practices the pre-provisioning monthly calculator process across products; no repeated copy of the IOPS entry task. Disk tuning and backup creation are not substitutes. |
| 78 | Public HTTPS GKE application exposure | 315 practices GKE HTTP load-balanced exposure with a private Cloud Run client. It does not reproduce the public Service/Ingress setup. |
| 79 | Cross-project private VM communication | 312 adds landing-zone-wide shared networking plus centrally enforced TCP rules. 280 repeats the two-existing-VPC scenario and is rejected. |
| 80 | Broad project resource viewing without modification | 111 adds an existing domain restriction. Narrow hierarchy browsing and custom two-permission roles are not used as filler. |
| 81 | Specialist GPU node pool and placement | 108 adds infrequent long-running non-restartable jobs and on-demand GPU pool lifecycle. 145/174 are too close to the fixed pool separation scenario. |
| 82 | Expand an exhausted primary subnet without rebuilding | 129/149/277/300 substantially repeat the original; no new representative. |
| 83 | Authorize existing Workspace identities | 229 practices scalable group-based access/MFA; 111 practices identity eligibility under existing restrictions. |
| 84 | Automated multi-project instance inventory with CLI configurations | 258 practices initial authentication/project context for inventory. Named-configuration variants already in V2 120 are excluded. |
| 85 | SQL over an existing large Avro object without first loading it | 146 uses two external sources and a join for ad hoc analysis; current-state/snapshot and format limits are explicit after confirmation. |

## Closest exclusions and the 13-question shortfall

The full ledger gives every disposition. Particularly relevant decisions:

- **61–85:** every exact scenario is excluded, whether or not it is already in an earlier website version. Version 3's Day 5 additions were not copied to Version 4.
- **129/149/277/300:** same exhausted-primary-subnet expansion decision as mock 82.
- **56/76/194/243/279:** same small-percentage canary decision as mock 56/76 and V3 167.
- **145/174:** fixed specialist node pools; substituting RAM/CPU hardware for GPU hardware does not justify repeating mock 81's pool separation. Selected 108 has different idle-cost and non-restartability constraints.
- **163/230/234:** another container-to-Cloud-Run runtime selection is too close to mock/V3 65. Selected 310 instead migrates the messaging-plus-processing architecture.
- **198:** another memory-dominant workload choice is too close to mock/V3 62.
- **278:** retain 126 only for the unused multi-product estimate family. Disk-throughput tuning 128/286 and disk backup setup 112/144/287 do not test calculator estimation.
- **280:** same existing-two-VPC communication scenario as mock 79; a different printed answer does not make it new. Retain 312 for new landing-zone and hierarchical-firewall constraints.
- **104/238:** hierarchy metadata/custom list-only role design is narrower than the target broad read-only resource audit; not padding with generic IAM questions.
- **138/204:** default-zone setup is not project inventory; named configuration switching already exists in V2 120. Retain 258's fresh-install authentication/context prerequisites.
- **211/236/282/313/314:** generic provisioning, reconciliation deletion or approved modules do not reproduce the specific same-deployment Kubernetes API integration task in 69.
- **259:** its separate restriction-plus-retrospective-removal approach is defensible; excluded because organization-wide domain-policy cleanup is a different task from authorizing known Workspace users or admitting an auditor under an existing restriction.
- **114:** no offered setup retrieves the already-existing 60-day history. New sinks do not automatically backfill old logs; assuming a sink was previously configured would change the scenario.
- **189:** current `gcloud auth login --cred-file=KEY_PATH` and `gcloud auth activate-service-account --key-file=KEY_PATH` can both use the supplied JSON service-account key. The unchanged single-answer format cannot represent that ambiguity faithfully.
- **214:** both Pub/Sub-triggered functions and Cloud Run can fit the unchanged serverless/scale-to-zero consumer requirements. No unique single-answer constraint remains.
- **294:** conservative exclusion: revision minimums require traffic or a traffic tag to start a revision. No offered choice explicitly supplies the zero-traffic prewarm prerequisite. It also tests prewarming, not target 76's percentage canary.
- **322:** damaged choice boundaries merge the apparent Cloud Run choice into another option. Do not fabricate another option, relabel the source or invent a scoring format to reach the count.

After the complete search and conservative task/duplicate/current-behavior review, **17 qualify and 13 target slots remain unfilled**. No generated scenarios, repeats, neighboring-number padding or unrelated service questions fill them.

## Key verification and current-behavior notes — maintainer spoilers

Every choice has a new explanation. All related metadata remains in the per-question result view.

- **221 D → C:** Private Google Access is a subnet feature for internal-only VMs reaching Google APIs. VPC Service Controls is not a route; Cloud NAT is not a dedicated-bucket-IP solution. Required DNS/routes/firewall/IAM remain separate prerequisites.
- **222 B → A:** project migration changes hierarchy, not billing. A supplies both operations; B omits the billing change and its Organization Administrator permissions alone are incomplete.
- **94:** B is a *most likely* cause, not proved by Pending. The running identical replica in one homogeneous pool makes a universally oversized request less likely; events must confirm an actual incident.
- **108:** the offered auto-provisioning choice still needs GPU limits/requests/drivers and standard rather than interruptible provisioning. Current node pool auto-creation naming is explained, without rewriting the original.
- **111/152:** broad Viewer is not all-data access; metadata SSH assumes OS Login is disabled and connectivity is present. These prerequisites are explicit after confirmation.
- **126:** a spreadsheet can estimate costs. A is the direct purpose-built workflow, not a claim that B is technically impossible. Calculator assumptions and historical Stackdriver branding are disclosed.
- **146:** external files reflect the last backup, not current Spanner state. Supported schemas/formats, IAM, locality and filtered Bigtable reads matter.
- **229/258:** Workspace managed identities still need IAM group bindings; modern CLI browser flows do not always require pasting a token. Project context can alternatively be supplied by a flag, absent from the source command. Two original answers remain required.
- **276:** configure aggregated sinks to include children and protect destination retention separately. Project Owners with additional ancestor privileges are outside the stated permission boundary.
- **283:** Log Analytics is now documented as Observability Analytics. A linked dataset is a read-only pointer, not another stored copy; native analytics SQL does not itself require a link.
- **296:** Kubernetes-to-IAM service-account impersonation remains supported; direct grants to federated Kubernetes principals are another modern pattern not offered by the unchanged choices.
- **299/310:** near-real-time delivery is not a zero-delay/exactly-once guarantee; configure sink/push permissions and idempotent durable processing. Sinks do not automatically backfill history.
- **312/315:** firewall policies need association and correct host-project hierarchy; connectors remain valid though Direct VPC egress is another current Cloud Run option. DNS, routes, regional reachability, ingress backends/health checks and firewall grants still require configuration.

## Official references reviewed

Each selected question includes the relevant subset as links after confirmation. The PDF's own explanations and answer highlights are not used as authoritative documentation.

- [GKE workload troubleshooting](https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/deployed-workloads), [node pools](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-pools), [GPU node auto-provisioning](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/node-auto-provisioning).
- [Domain-restricted sharing](https://docs.cloud.google.com/organization-policy/restrict-domains), [IAM role types](https://docs.cloud.google.com/iam/docs/roles-overview), [group best practices](https://docs.cloud.google.com/iam/docs/groups-best-practices), [identity security](https://docs.cloud.google.com/architecture/framework/security/implement-zero-trust).
- [Pricing Calculator](https://cloud.google.com/products/calculator).
- [External data sources](https://docs.cloud.google.com/bigquery/docs/external-data-sources), [Bigtable external queries](https://docs.cloud.google.com/bigquery/docs/external-data-bigtable), [external table limitations](https://docs.cloud.google.com/bigquery/docs/external-tables).
- [Metadata SSH keys](https://docs.cloud.google.com/compute/docs/connect/add-ssh-keys), [SSH connection methods](https://docs.cloud.google.com/compute/docs/connect/ssh-connections).
- [Private Google Access](https://docs.cloud.google.com/vpc/docs/private-google-access), [its configuration prerequisites](https://docs.cloud.google.com/vpc/docs/configure-private-google-access).
- [Project migration](https://docs.cloud.google.com/resource-manager/docs/project-migration), [migration execution/permissions](https://docs.cloud.google.com/resource-manager/docs/perform-migration), [changing billing](https://docs.cloud.google.com/billing/docs/how-to/modify-project).
- [CLI authentication including JSON keys](https://docs.cloud.google.com/sdk/docs/authenticate), [CLI sign-in](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login), [configuration properties](https://docs.cloud.google.com/sdk/gcloud/reference/config/set), [project-wide instance listing](https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/list).
- [Aggregated sink overview](https://docs.cloud.google.com/logging/docs/export/aggregated_sinks_overview), [folder sink configuration](https://docs.cloud.google.com/logging/docs/export/aggregated_sinks), [organization-policy hierarchy](https://docs.cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy), [linked log datasets](https://docs.cloud.google.com/logging/docs/analyze/query-linked-dataset), [Pub/Sub log export](https://docs.cloud.google.com/logging/docs/export/pubsub), [sink permissions](https://docs.cloud.google.com/logging/docs/export/configure_export_v2).
- [Shared VPC](https://docs.cloud.google.com/vpc/docs/shared-vpc), [hierarchical firewall policies](https://docs.cloud.google.com/firewall/docs/firewall-policies), [GKE workload authentication](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-identity), [Cloud Run with Pub/Sub](https://docs.cloud.google.com/run/docs/tutorials/pubsub), [internal GKE HTTP ingress](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/internal-load-balance-ingress), [VPC connectors](https://docs.cloud.google.com/run/docs/configuring/vpc-connectors).
- Excluded prewarm candidate: [minimum instances and traffic tags](https://docs.cloud.google.com/run/docs/configuring/min-instances), [tagged revision traffic migration](https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration).

## Implementation and validation

Registration adds a fourth selector entry and content fetch through the existing engine. The UI/controller, confirmation flow, flags, filters, navigation and storage behavior are retained. No timer or whole-exam submission step is added. The build allowlist adds only `questions-v4.json` and its necessary image; audit/notes/fixtures remain outside `dist/`. See [TESTING.md](TESTING.md) for executed checks, browser verification and deployment status.

# Version 3 selection and review

Reviewed November 23, 2026. **19 questions selected; shortfall: 11.** The requested target was 20 questions matching mock 50–60 and 10 matching mock 1–49. The retained distribution is **9 / 10** (47.4% / 52.6%). No questions were invented, taken from outside the mock 1–60 concept scope, or added merely to reach 30. The smaller set is deliberate under the no-substantial-repeat requirement.

## Search and selection method

Searched the entire 202-page `GCPACE 2.pdf`, indexed all **322** numbered questions, and reviewed their stems against the actual mock 1–60 scenarios. Source SHA-256: `dfb99260f18eb2b841605c448d33001ca1ff7858e3c3bedfc3231f2f22475432`. Read candidate choices and printed keys, then compared candidates with all 40 Version 1 scenarios and all 30 Version 2 source questions. Task/constraint matches are required: a database backup is not PITR, VPA is not resizing an existing VM, and subnet expansion is not selecting the largest initial subnet range.

The upper-range candidates were considered first. Retain one representative where several unused PDF questions substantially repeat the same scenario; do not turn variations of one canary release or global database choice into multiple slots. This is a conservative editorial selection, not a claim that no other interpretation of a borderline task match is possible.

All selected questions have four options and one intended answer, as in the PDF. Version 2's five-option choose-two question remains unchanged, and the shared engine continues to require exact-set scoring. No multi-answer source was converted to a single-answer question.

Question wording and option order are retained, including source typos and historical product names. Normalize line-wrap whitespace and join the extraction-only split words “dat / a.” and “subnet- / a.” No scenarios or options were rewritten to improve a defective key. Explanations and review notes are editorial additions, visible only after confirmation. The stem/option fidelity check compared all 19 questions and 76 choices with the page-indexed PDF extraction.

PDF 42 includes an image-only Deployment manifest. Its original embedded image is included without the page watermark, highlights, choices, or key. A faithful code transcription is available alongside it. No other selected prompt requires a diagram. Physical page references include pages containing the question, required image, choices, or printed key. No full PDF or original mock HTML is shipped.

## Selected questions

| Practice # | PDF # | Physical pages | Mock concepts | Range | Tested task |
| --- | --- | --- | --- | --- | --- |
| 1 | 225 | 139, 140 | 53 | 50–60 | Service-account firewall rules |
| 2 | 41 | 25, 26 | 41 | 1–49 | Parallel composite uploads |
| 3 | 55 | 38, 39 | 55 | 50–60 | Controlling container log volume |
| 4 | 42 | 26, 27 | 42 | 1–49 | Referencing Kubernetes Secrets |
| 5 | 57 | 39, 40 | 57 | 50–60 | Rolling VM updates without capacity loss |
| 6 | 43 | 28 | 43 | 1–49 | VM startup time and scaling |
| 7 | 60 | 41, 42 | 60 | 50–60 | Exposing a GKE TCP service across VPCs |
| 8 | 45 | 29 | 45 | 1–49 | App Engine version rollback |
| 9 | 167 | 110, 111 | 56 | 50–60 | App Engine canary releases |
| 10 | 47 | 30 | 47 | 1–49 | Maintenance migration and restart |
| 11 | 200 | 125 | 52 | 50–60 | Group-based BigQuery query execution |
| 12 | 48 | 31 | 48 | 1–49 | Object Content-Type metadata |
| 13 | 201 | 126 | 50, 53 | 50–60 | Public and private subnet design |
| 14 | 49 | 32 | 49 | 1–49 | Resizing a stopped VM |
| 15 | 217 | 136 | 51 | 50–60 | Diagnosing repeated autohealing |
| 16 | 90 | 61, 62 | 18, 6 | 1–49 | Lifecycle rules for previous object versions |
| 17 | 281 | 168 | 58 | 50–60 | Globally scalable relational transactions |
| 18 | 136 | 92 | 44 | 1–49 | Batch compute that cannot tolerate interruption |
| 19 | 155 | 104 | 25, 27 | 1–49 | Enabling storage read audit logs |

## Upper-range coverage and limits

| Mock concept | Selected PDF | Decision and limit |
| --- | --- | --- |
| 50 | 201 | One VPC with separate public/private tiers and subnet routing. Unlike V2 PDF 54's regional client addition, this requires DMZ ingress and private-tier separation. |
| 51 | 217 | Diagnose repeated autohealing replacement, rather than repeat V2 PDF 51's creation of the health policy. |
| 52 | 200 | Give a team permission to execute custom query jobs; V2 PDF 190 grants an external auditor table-read access. These are distinct BigQuery permission layers. |
| 53 | 225, 201 | Source/target service-account firewall selection; public/private inter-tier firewall design. PDF 225 is the focused service-account match; 201 is counted once under 50. |
| 54 | — | V2 PDF 54 already tests this exact regional same-VPC private-communication task. |
| 55 | 55 | Suppress the noisy container log stream without rebuilding the cluster. |
| 56 | 167 | Same-service version traffic split for a small real-user canary; one representative only. |
| 57 | 57 | Rolling-update surge/unavailable policy that preserves serving capacity. |
| 58 | 281 | Choose a globally scalable relational transaction store with SQL. |
| 59 | — | V2 PDF 59 already tests exactly the finance/engineering project-billing permission separation. |
| 60 | 60 | Expose replicated GKE TCP Pods to a client in another VPC with minimum setup. Preserve PDF key A and explicitly explain the conflicting mock key C and missing privacy requirement. |

Upper-range family counts: subnet/network segmentation 1, autohealing diagnosis 1, BigQuery query permissions 1, targeted firewall rules 1, log-volume control 1, canary release 1, MIG rolling updates 1, scalable relational storage 1, GKE TCP exposure 1. No family supplies more than one selected question. PDF 201 also overlaps firewall concept 53, but is counted only once.

## Lower-range coverage and limits

The ten lower-range questions cover: large-file parallel upload (41), Kubernetes Secret references (42), startup allowance versus autoscaling signals (43), version rollback (45), maintenance migration/restart (47), object MIME metadata (48), stopped-VM resizing (49), noncurrent-version lifecycle scope (18/6), non-interruptible long batch compute (44), and enabling read-audit logging before use (25/27).

These intentionally fill gaps or test changed constraints. PDF 90 targets **noncurrent versions**, unlike V1/V2 age-only live-object rules. PDF 136 needs **30 uninterrupted hours**, unlike V2's interruption-tolerant batch job. PDF 155 enables logging, whereas V1 investigates already-enabled logs and V2 grants log-reading access. PDF 43 diagnoses startup-sensitive measurements rather than provisioning an autoscaled app or repairing a hung process. Rollback sends all traffic to an old release; it is a separate task from directing a small cohort to a new release.

Mock 1–40 topics not listed above are largely already exercised in V1/V2. Version 3 does not promise comprehensive coverage of those 49 concepts. In particular, no new PITR, custom-role copying, fixed singleton MIG, or supported GKE version question is added when the matching scenario would repeat an existing set. Mock 46's deployment-target diagnosis substantially overlaps V2's active named-configuration exercise and was not added again.

## Candidate exclusions and shortfall

All 30 Version 2 source numbers are excluded without exception: 51, 54, 59, 73, 107, 110, 113, 120, 130, 140, 148, 154, 159, 164, 173, 177, 187, 190, 193, 202, 206, 220, 226, 240, 249, 262, 270, 303, 305, 307.

The following are the closest remaining candidates and explain why finding more questions about the same service does not fill the upper-range target:

| PDF candidates | Disposition |
| --- | --- |
| 50 | Substantially repeats V2 54's same-VPC subnet routing task. Retain 201 for the additional DMZ/firewall design. |
| 52, 102 | Group-based BigQuery query permissions overlap selected 200. 102 also introduces a custom-role deletion boundary rather than a clean new execution-permission scenario. |
| 53 | Same service-account tier firewall decision as selected 225. Keep one; 53 would additionally require its original architecture diagram. |
| 56, 76, 194, 243, 279 | Percentage canary rollout repeats selected 167's decision. Cloud Run/Anthos names alone do not make an additional task. |
| 58, 197, 219, 281, 298 | Retain 281 only. The other global/scalable transactional database selections substantially repeat that scenario; 298 changes the migration background, not the core database decision. |
| 79, 280, 312 | Existing VPC peering, Shared VPC, and organization-wide hierarchical policies do not test mock 50's native routing between subnets in one VPC. Adding these would broaden the task scope. |
| 87, 151 | A single UDP listener and default-deny egress priorities do not test source/target service-account tier rules. |
| 99, 227 | Viewing billing reports and enabling all engineers to associate billing are not mock 59's finance-only separation. 227 also repeats existing centralized billing/linking practice. |
| 124, 175, 273 | Spanner node tuning and a mixed-product migration are not selecting the scalable relational store for the mock 58 scenario. |
| 246 | Manually replacing one VM is not configuring or diagnosing automatic recreation from health checks. |
| 274, 304, 315 | Internal Cloud Run hosting, platform selection, and HTTP API connectivity through serverless networking are not the mock 60 cross-VPC GKE TCP Service decision. |
| 82, 129, 149, 277, 300 | Expanding exhausted address space is not choosing the largest initial subnet range (mock 2). |
| 96, 271 | Query quotas/cost controls are not estimating a specific on-demand query charge (mock 15). |
| 112, 144, 166, 287 | Snapshot/archival backups are not MySQL point-in-time recovery (mock 3). |
| 128, 198, 286, 288, 308 | Disk throughput, initial sizing, and Pod VPA differ from resizing an existing VM's memory (mock 49). |
| 69, 71, 72, 81, 94, 97, 145, 174, 186, 203, 211–215, 237, 242, 247, 267, 284, 285, 296, 311, 317, 318 | Related Kubernetes services, but the tasks are deployment provisioning, image-pull authorization, scheduling, isolation, resource choice, deletion, labels, identity, egress, or HA topology. They do not fill the specific unused mock tasks without broadening scope or repeating V2's image/Deployment/context questions. |
| 46, 138, 204, 258 | CLI configuration/targeting overlaps V1/V2 named configurations; initial authentication is not an additional matching target-switching task. |
| 143, 282, 313, 314 | Template review/sharing, standardization, Terraform provisioning or reusable modules overlap V1/V2 infrastructure-as-code practice; they do not fill an uncovered distinct task here. |
| 61, 68, 86, 95, 114, 117, 160, 176, 196, 250, 253, 283, 299, 301 | Log retention/export, query analysis, existing-log investigation, and alerts differ from suppressing noisy GKE container logging; applicable investigation tasks also repeat V1/V2. Retain 155 for enabling read audit records. |
| 66, 74, 80, 83, 84, 85, 91, 92, 106, 111, 116, 122, 133, 134, 137, 141, 150, 152, 161, 170, 172, 178, 181, 183, 185, 188, 191, 199, 205, 208, 216, 222, 228, 229, 231, 233, 238, 248, 251, 252, 254, 255, 257, 261, 263–266, 269, 275, 289, 292, 293, 297, 302, 306, 309, 319, 321 | Reviewed as related lower-range candidates: they either repeat covered permission/storage/batch/billing/provisioning scenarios or test a different operation. Do not use a new service/background alone as evidence of novelty. |

The first 40 PDF questions closely track the mock and predominantly the original V1 scenarios; they were not republished as substitutes. All other indexed questions were outside the specific 1–60 task scope. The result is **11 short of 30**, and **11 short of the desired upper-range 20**; the lower-range target remains 10. Do not silently expand the set with the excluded near-duplicates.

## Key corrections, ambiguity, and current behavior

Four printed keys are changed for scoring:

| PDF | Printed → scored | Reason |
| --- | --- | --- |
| 136 | D → C | A preemptible MIG cannot make a 30-hour non-checkpointed job survive the legacy 24-hour lifetime limit. |
| 167 | D → A | Same-service App Engine version splits implement the requested canary. A Kubernetes Service selector switch does not define a small percentage. |
| 201 | C → A | Firewall rules alone do not route between separate VPCs; the single-VPC option supplies the subnet path. |
| 225 | C → A | Service-account source/target selection identifies application VMs; broad subnet IP matching does not exclude web servers. |

Each corrected question displays the printed key, scored key, reason, and official references only after confirmation. PDF 60 retains printed **A**, despite mock 60's **C**: private-only connectivity is not stated, so the external endpoint uses fewer setup steps. This discrepancy is explicit in its explanation. PDF 57 retains intended **B**, while acknowledging that C can preserve capacity with blue/green replacement; the fixed surge count also has a regional-MIG limitation.

PDF 43 and 55 retain historical intended keys with prominent historical notices: health-check delay is not the autoscaler initialization control, and the old Stackdriver ingestion UI is no longer the current workflow. None of PDF 43's unchanged choices fully states the current remedy. PDF 200's best offered answer requires existing table-read permissions; explain the narrower modern query-job-plus-data-access pairing. PDF 41 discusses temporary-object early deletion costs; 42 retains the source Container Registry URL and explains current registry/Secret limitations; 47 limits automatic restart to eligible failures; 48 explains Content-Disposition; 49 clarifies supported stopped-VM configuration; 90 distinguishes noncurrent time from creation age; 155 identifies audit coverage exceptions. These notices never appear before confirmation.

## Official references checked

- [Service-account firewall rules — official guidance](https://docs.cloud.google.com/firewall/docs/firewalls)
- [Parallel composite uploads — official guidance](https://docs.cloud.google.com/storage/docs/parallel-composite-uploads)
- [Controlling container log volume — official guidance](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/exclude-logs)
- [Referencing Kubernetes Secrets — official guidance](https://docs.cloud.google.com/sql/docs/mysql/connect-kubernetes-engine)
- [Rolling VM updates without capacity loss — official guidance](https://docs.cloud.google.com/compute/docs/instance-groups/rolling-out-updates-to-managed-instance-groups)
- [VM startup time and scaling — official guidance](https://docs.cloud.google.com/compute/docs/autoscaler)
- [Autohealing initial delay is separate](https://docs.cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs)
- [Exposing a GKE TCP service across VPCs — official guidance](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service-load-balancer)
- [Internal GKE load balancers](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/internal-load-balancing)
- [App Engine version rollback — official guidance](https://docs.cloud.google.com/appengine/docs/standard/splitting-traffic)
- [Maintenance migration and restart — official guidance](https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview)
- [Group-based BigQuery query execution — official guidance](https://docs.cloud.google.com/bigquery/docs/running-queries)
- [BigQuery User role](https://docs.cloud.google.com/bigquery/docs/access-control)
- [Object Content-Type metadata — official guidance](https://docs.cloud.google.com/storage/docs/metadata)
- [Public and private subnet design — official guidance](https://docs.cloud.google.com/vpc/docs/vpc)
- [Resizing a stopped VM — official guidance](https://docs.cloud.google.com/compute/docs/instances/changing-machine-type-of-stopped-instance)
- [Lifecycle rules for previous object versions — official guidance](https://docs.cloud.google.com/storage/docs/lifecycle)
- [Lifecycle configuration examples](https://docs.cloud.google.com/storage/docs/lifecycle-configurations)
- [Globally scalable relational transactions — official guidance](https://docs.cloud.google.com/spanner/docs)
- [Batch compute that cannot tolerate interruption — official guidance](https://docs.cloud.google.com/compute/docs/instances/preemptible)
- [Enabling storage read audit logs — official guidance](https://docs.cloud.google.com/storage/docs/audit-logging)

## Implementation and verification

Version 1 and Version 2 content files and content versions remain byte-for-byte unchanged. Their browser storage keys are preserved. Version 3 uses `cloud-fieldnotes-ace-attempt-v1:v3`; the selected-set key remains unchanged. Restart uses the active attempt only. The original design and confirmation-only reveal flow are retained, including exact-set scoring for Version 2.

See `TESTING.md` for the actual test/build/browser results and deployment verification. The build explicitly includes only the three content banks and required website assets; neither source exam is copied into the repository or deployment output.

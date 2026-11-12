# Content coverage and modernization

Forty original scenarios cover the concepts in questions 1–40 of a private study source. No source question wording, key, PDFs or diagrams are published. The `source` number is a coverage reference, not the displayed question number. Topics are mixed and the four correct-answer positions occur ten times each.

| Concept reference | Tested concept |
| --- | --- |
| 1 | OS Login |
| 2 | VPC subnet planning |
| 3 | Cloud SQL recovery |
| 4 | Managed instance group autohealing |
| 5 | Kubernetes contexts |
| 6 | Cloud Storage classes |
| 7 | Centralized billing |
| 8 | Static internal addresses |
| 9 | App Engine scaling |
| 10 | Copying custom IAM roles |
| 11 | Infrastructure as code |
| 12 | Container deployment |
| 13 | Cloud Marketplace |
| 14 | Safe infrastructure updates |
| 15 | BigQuery query estimation |
| 16 | CPU-based VM autoscaling |
| 17 | Billing analytics |
| 18 | Storage lifecycle ages |
| 19 | VM workload identity |
| 20 | Windows VM access |
| 21 | gcloud configurations |
| 22 | Infrastructure previews |
| 23 | Streaming data architecture |
| 24 | App Engine environment isolation |
| 25 | Audit access for groups |
| 26 | Storage upload permissions |
| 27 | Investigating storage activity |
| 28 | Delegating Storage administration |
| 29 | Temporary object sharing |
| 30 | Per-node agents |
| 31 | Service API enablement |
| 32 | Multi-project monitoring |
| 33 | Fixed-size managed groups |
| 34 | Inspecting IAM bindings |
| 35 | Billing permission boundaries |
| 36 | Cross-project service accounts |
| 37 | App Engine regional placement |
| 38 | Spanner data access |
| 39 | GKE lifecycle management |
| 40 | HTTPS load balancing |

## Modernization decisions

- Deployment Manager scenarios now use Terraform and Infrastructure Manager for provisioning, tracked updates and previews. [Google’s deprecation notice](https://docs.cloud.google.com/deployment-manager/docs/deprecations) says normal support ended April 1, 2026, with migration-related extensions and a later shutdown. Updates are not inherently downtime-free; the planned resource actions determine impact. [Preview documentation](https://docs.cloud.google.com/infrastructure-manager/docs/preview-deployment-update).
- Container image deployment uses Artifact Registry rather than the retired Container Registry service. [Transition documentation](https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr). Artifact Registry-backed gcr.io endpoints are a distinct case.
- Cross-project Monitoring uses current [metrics scopes](https://docs.cloud.google.com/monitoring/settings/multiple-projects), replacing historical Stackdriver account linking.
- The backup-class scenario explicitly specifies seven-year retention and reads much less often than annually, making Archive appropriate. Disaster recovery alone does not determine a class. [Storage classes](https://docs.cloud.google.com/storage/docs/storage-classes).
- Audit access explicitly targets Data Access logs in the default Logging bucket, requiring Private Logs Viewer rather than Logs Viewer. Exported copies instead use destination permissions. [Audit-log permissions](https://docs.cloud.google.com/logging/docs/audit).
- Subnet size is bounded to RFC 1918 and the listed choices, avoiding the claim that /8 is the largest range accepted under all conditions. [Subnet ranges](https://docs.cloud.google.com/vpc/docs/subnets).
- App Engine idle scaling states warmup prerequisites and tests the setting’s intent, without guaranteeing instantaneous extra capacity under every burst. [app.yaml reference](https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml).
- A fixed size-one MIG can repair an application but cannot guarantee uninterrupted availability. [MIG behavior](https://docs.cloud.google.com/compute/docs/instance-groups).
- GKE uses a Stable release channel and managed upgrades, distinct from node auto-repair and a one-time version selection. [Release channels](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels).
- Storage lifecycle deletion is asynchronous eligibility; soft delete can retain recoverable data afterward. [Lifecycle documentation](https://docs.cloud.google.com/storage/docs/lifecycle).
- Billing scenarios specify both project-side and destination-account permission boundaries, and make read/view prerequisites explicit. [Billing access](https://docs.cloud.google.com/billing/docs/how-to/billing-access).

Each question links to relevant current official documentation in its results view. These references do not imply Google endorsement.

Spanner Database User includes schema-update permissions. The scenario explicitly requires approved schema changes; it does not imply that this predefined role is DML-only. [Spanner IAM](https://docs.cloud.google.com/spanner/docs/iam).

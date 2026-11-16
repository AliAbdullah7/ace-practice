# Version 2 selection and review

Reviewed November 16, 2026. Searched all 202 PDF pages and indexed all 322 numbered questions against the concepts in mock questions 1–50. Selected 30 existing questions, all numbered above 50, with no repeated question or scenario in Version 2. There is no question-count shortfall. This is balanced practice across available matching concepts, not one question for each of the 50 source concepts.

The PDF SHA-256 is `dfb99260f18eb2b841605c448d33001ca1ff7858e3c3bedfc3231f2f22475432`. The full PDF and mock HTML remain outside the website repository. Only the explicitly requested selected question/choice excerpts and four required command images are included.

## Selection method and fidelity

Match the operation, constraint or decision being tested, not just the service name. Prefer a different setting and objective: CMS instead of Jenkins, a company billing migration instead of initial billing setup, supplier uploads instead of temporary downloads, and Spot batch jobs instead of legacy preemptible-VM terminology. PDF 173 remains a close conceptual restatement of mock 12 because it directly tests the image-registry/Deployment workflow; it starts with an already built image rather than a Dockerfile.

Question and choice wording/order are retained, including source typos and old product names. Normalize PDF line-wrap whitespace, and join the PDF’s split “dat / a.” and “criteri / a.” text. Bullets in PDF 159 retain readable line breaks. Explanations and current-documentation notes are newly written and do not change the source scenarios or choices.

PDF 249 has image-only command choices. Extract the four embedded images, rather than screenshots containing handwritten corrections or highlighting. Show faithful text transcriptions alongside the images so the commands remain readable on phone-size screens. Its repeated “Option A” placeholders do not replace the actual command images. Other images on selected pages belong to preceding questions or to answer explanations (for example the storage-class table after PDF 107); they are not required question diagrams.

## Coverage

| Practice question | Original PDF question | Physical PDF pages | Mock concept references | Tested decision |
| --- | --- | --- | --- | --- |
| 1 | 307 | 188, 189 | 1 | OS Login |
| 2 | 270 | 163 | 8 | Static internal IP addresses |
| 3 | 51 | 33 | 4 | Managed instance group autohealing |
| 4 | 107 | 71, 72 | 6 | Cloud Storage classes |
| 5 | 193 | 122 | 7 | Centralized billing |
| 6 | 173 | 113 | 12 | Deploying container images to GKE |
| 7 | 226 | 140, 141 | 13 | Cloud Marketplace deployment |
| 8 | 164 | 109 | 11 | Infrastructure as code templates |
| 9 | 220 | 137, 138 | 17 | Billing export and analysis |
| 10 | 154 | 103 | 18 | Storage lifecycle transitions |
| 11 | 187 | 119, 120 | 19 | VM service account identity |
| 12 | 73 | 51 | 20 | Windows VM login |
| 13 | 120 | 80, 81 | 21, 46 | gcloud named configurations |
| 14 | 110 | 74 | 24 | Development and production isolation |
| 15 | 190 | 121 | 25 | Group-based BigQuery read access |
| 16 | 113 | 76 | 25, 27 | Audit log read permissions |
| 17 | 177 | 115 | 19, 26 | Dedicated VM identity for bucket access |
| 18 | 159 | 106, 107 | 18, 29 | Signed URLs and object expiry |
| 19 | 140 | 94, 95 | 32 | Monitoring multiple projects |
| 20 | 148 | 99 | 34 | Inspecting project IAM policy |
| 21 | 59 | 41 | 35 | Billing permission boundaries |
| 22 | 130 | 87, 88 | 36 | Cross-project workload data access |
| 23 | 206 | 129 | 37 | App Engine regional placement |
| 24 | 249 | 150 | 5 | GKE kubectl context and credentials |
| 25 | 303 | 185, 186 | 44 | Interruptible batch compute |
| 26 | 54 | 37, 38 | 50 | Private communication across VPC subnets |
| 27 | 305 | 187 | 40 | HTTPS web application load balancing |
| 28 | 240 | 146 | 23 | Streaming ingestion and processing |
| 29 | 262 | 158 | 16 | VM workload autoscaling |
| 30 | 202 | 126 | 31 | Enabling a service API |

Coverage spans IAM and workload data access (7), VM operation/scaling (5), storage (3), billing (3), GKE (2), application environments/regions (2), networking/load balancing (2), provisioning/CLI/API enablement (4), cross-project monitoring (1), and streaming ingestion/processing (1). These are editorial coverage groups, not exam scoring weights.

## Full mock concept map

“Not selected” means not represented in this 30-question selection, not proof that the PDF contains no related question. We do not pad coverage with a same-service question that tests a different operation. The first 50 PDF questions substantially repeat the mock and were avoided. In particular, archive backups do not substitute for Cloud SQL PITR, a memory-heavy instance choice does not test resizing an existing VM, and a GKE resource choice does not test Secret references.

| Mock question | Specific concept | Selected PDF question(s) / limit |
| --- | --- | --- |
| 1 | OS Login identity and administrative VM access | 307 |
| 2 | VPC subnet address range sizing | Not selected |
| 3 | Cloud SQL MySQL point-in-time recovery | Not selected |
| 4 | MIG application health checks and autohealing | 51 |
| 5 | kubectl contexts and cluster selection | 249 |
| 6 | Storage class based on access frequency | 107 |
| 7 | Centralizing project billing | 193 |
| 8 | Reserving static internal VM addresses | 270 |
| 9 | App Engine request scaling and idle instances | Not selected |
| 10 | Copying custom IAM roles between projects | Not selected |
| 11 | Declarative, repeatable VM/resource provisioning | 164 |
| 12 | Registry images and Kubernetes Deployments | 173 |
| 13 | Deploying packaged software through Marketplace | 226 |
| 14 | Updating a Deployment Manager deployment safely | Not selected |
| 15 | Estimating BigQuery on-demand query cost | Not selected |
| 16 | Autoscaling an application directly on VMs | 262; Direct-VM autoscaling; the PDF scenario does not specify CPU as its policy signal. |
| 17 | Billing export for SQL cost analysis | 220 |
| 18 | Age-based object lifecycle transitions and deletion | 154, 159 |
| 19 | Attaching a workload service account to a VM | 187, 177; 187: attach the intended VM identity; 177 additionally tests dedicated identity and bucket scope. |
| 20 | Windows VM RDP credentials | 73 |
| 21 | Named gcloud configurations per account/project | 120 |
| 22 | Previewing infrastructure changes and dependencies | Not selected |
| 23 | Streaming ingestion and processing pipeline roles | 240; Ingestion/processing roles (Pub/Sub + Dataflow); not the original Bigtable/BigQuery destination selection. |
| 24 | Separate development/production projects | 110 |
| 25 | Group-based external auditor data/log access | 190, 113; 190: group-based BigQuery read access; 113: audit-log reader permissions. No invented combined scenario. |
| 26 | VM service account permissions scoped to a bucket | 177 |
| 27 | Audit log permissions and activity investigation | 113 |
| 28 | Delegating Storage administration with predefined roles | Not selected |
| 29 | Time-limited object access through signed URLs | 159 |
| 30 | One monitoring Pod per node using a DaemonSet | Not selected |
| 31 | Enabling an API before calling its service | 202 |
| 32 | One monitoring view across projects | 140 |
| 33 | Fixed-size one-VM MIG with autohealing | Not selected |
| 34 | Inspecting current project IAM role bindings | 148 |
| 35 | Billing-account and project permission boundaries | 59 |
| 36 | Granting a cross-project service account access at the target resource | 130 |
| 37 | Immutable App Engine region and a new project | 206 |
| 38 | Spanner table data access roles | Not selected |
| 39 | GKE managed supported/stable versions | Not selected |
| 40 | Public HTTPS load balancing and TLS termination | 305 |
| 41 | Parallel composite upload of one large object | Not selected |
| 42 | Kubernetes Secret references for database credentials | Not selected |
| 43 | Autoscaler initialization delay versus VM startup time | Not selected |
| 44 | Discounted interruptible batch processing | 303 |
| 45 | App Engine rollback via version traffic routing | Not selected |
| 46 | Diagnosing gcloud deployment target configuration | 120; Switching and inspecting the active gcloud configuration, rather than reproducing the App Engine incident. |
| 47 | Live migration and automatic restart during maintenance | Not selected |
| 48 | Cloud Storage Content-Type for browser display | Not selected |
| 49 | Stopping and resizing an existing VM | Not selected |
| 50 | Private routing between distinct subnets in one VPC | 54 |

## Answer-key and currency review

Five printed keys are corrected for scoring: PDF 54, 177, 202, 249 and 270. Each result view shows the printed key, verified key, reason, and official reference. Handwritten corrections are kept distinct from printed keys. The source key is not treated as authoritative.

PDF 173 (Container Registry) and 164 (Deployment Manager) retain their historical intended answers for faithful practice, with explicit result-view notices that the unchanged choices do not describe a suitable new deployment today. Use Artifact Registry and Terraform/Infrastructure Manager for current work. PDF 140 explains metrics scopes instead of historical workspaces; 190 clarifies BigQuery Data Viewer; 148 corrects typographic command dashes in the explanation.

Documentation was checked for the affected behavior:

| Review | Official reference |
| --- | --- |
| PDF 270: corrected-key | [Configure static internal ip address](https://docs.cloud.google.com/compute/docs/ip-addresses/configure-static-internal-ip-address) |
| PDF 173: legacy | [Deploying workloads overview](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deploying-workloads-overview) · [Transition from gcr](https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr) |
| PDF 164: legacy | [Deprecations](https://docs.cloud.google.com/deployment-manager/docs/deprecations) · [Terraform overview](https://docs.cloud.google.com/docs/terraform/terraform-overview) |
| PDF 190: terminology | [Access control](https://docs.cloud.google.com/bigquery/docs/access-control) |
| PDF 177: corrected-key | [Service accounts](https://docs.cloud.google.com/compute/docs/access/service-accounts) |
| PDF 140: terminology | [Multiple projects](https://docs.cloud.google.com/monitoring/settings/multiple-projects) |
| PDF 148: source-typo | [Get iam policy](https://docs.cloud.google.com/sdk/gcloud/reference/projects/get-iam-policy) |
| PDF 249: corrected-key | [Get credentials](https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/get-credentials) |
| PDF 54: corrected-key | [Vpc](https://docs.cloud.google.com/vpc/docs/vpc) · [Routes](https://docs.cloud.google.com/vpc/docs/routes) |
| PDF 202: corrected-key | [Enable disable](https://docs.cloud.google.com/service-usage/docs/enable-disable) · [Create start instance](https://docs.cloud.google.com/compute/docs/instances/create-start-instance) |

For PDF 249, Google explicitly documents that get-credentials also changes the current kubectl context: [Configure cluster access](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl). All other selected questions include topic-specific official references in their explanation views.

The references show printed physical page numbers, including both pages when a question or answer crosses a page boundary. No links to a bundled PDF are supplied because the full study source is not published.

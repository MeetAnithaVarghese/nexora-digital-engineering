# Specification 003: Service Portfolio & Deep-Dive Detail Pages
**Document ID:** SPEC-003  
**Status:** Approved  
**Owner:** Product Manager & Technical Lead  

---

## 1. Business Context
Enterprise clients evaluate tech partners on depth of expertise. Nexora requires both a consolidated Services Landing Page (`/services`) and 6 dedicated Service Detail Pages (`/services/:slug`).

## 2. Six Core Service Domains
1. **AI and Data Engineering** (`/services/ai-data-engineering`): Real-time analytics pipelines, LLM fine-tuning, retrieval-augmented generation (RAG), and data governance.
2. **Software Product Engineering** (`/services/software-product-engineering`): Full-lifecycle microservices, event-driven architectures, modern frontends, and API platforms.
3. **Cloud and Platform Engineering** (`/services/cloud-platform-engineering`): Kubernetes orchestration, Terraform IaC, multi-cloud migration, and platform engineering.
4. **Cybersecurity and Governance** (`/services/cybersecurity-governance`): Zero-trust security models, DevSecOps pipelines, automated compliance, and penetration testing.
5. **Digital Transformation Consulting** (`/services/digital-transformation`): Legacy modernization, technology roadmapping, enterprise agility, and cloud cost optimization.
6. **Quality Engineering and Test Automation** (`/services/quality-engineering`): Adversarial test suites, CI/CD automated gates, performance benchmarking, and chaos engineering.

## 3. Acceptance Scenarios
- **Scenario 1:** Given a visitor visits `/services`, Then all 6 service domain cards are rendered with summaries and links.
- **Scenario 2:** Given a visitor clicks on a service card (e.g. `/services/ai-data-engineering`), Then the dedicated page loads with full architecture deliverables, toolchain list, and an enquiry button pre-selecting that service.

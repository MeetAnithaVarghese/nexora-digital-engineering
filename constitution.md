# Project Constitution: Nexora Digital Engineering
**Classification:** Highest-Level Technical Policy and System Governance  
**Authority:** Immutable Architectural Baseline (Human Approval Required for Amendments)  
**Version:** 1.0.0  
**Effective Date:** 2026-11-11  

---

## 1. Project Purpose and Product Vision
Nexora Digital Engineering is a premier fictional B2B technology consulting firm specializing in high-velocity, resilient digital systems. The website serves as Nexora's primary digital asset to showcase capabilities across AI & Data Engineering, Software Product Engineering, Cloud & Platform Engineering, Cybersecurity & Governance, Digital Transformation Consulting, and Quality Engineering & Test Automation.

The website must project technical authority, enterprise rigor, aesthetic refinement, and verifiable case-study credibility while delivering lightning-fast performance, accessible design, and seamless lead conversion.

## 2. Business Objectives and Success Criteria
- **Lead Generation:** Convert qualified enterprise prospects through frictionless, validated enquiry forms with automated SLA routing.
- **Brand Authority:** Establish market leadership through rigorous, evidence-backed insights, architectural blueprints, and demonstrable case studies.
- **Search and Discovery Supremacy:** Optimize for human search engines (SEO), conversational answer engines (AEO), and generative engine indexing (GEO).
- **Client & Admin Autonomy:** Provide a secure, streamlined content management and lead review capability with Role-Based Access Control (RBAC).
- **Core Web Vitals Thresholds:** Lighthouse scores ≥ 95 on Desktop, ≥ 90 on Mobile; Largest Contentful Paint (LCP) ≤ 1.8s; Cumulative Layout Shift (CLS) ≤ 0.05; First Input Delay (FID) / INP ≤ 100ms.

## 3. Architectural Principles
1. **Simplicity over Overengineering:** Favour clean, modular, maintainable architectures that a small, elite engineering team can manage without extraneous cloud dependencies.
2. **Specification-First Development:** No code is written without an approved specification (`specs/`), task breakdown (`tasks/`), and acceptance criteria.
3. **Strict Separation of Concerns:** Core domain logic, database persistence, API serialization, and presentation templates must remain cleanly decoupled.
4. **Resilient Failure Modes:** The application must degrade gracefully under partial service outages (e.g., mail delivery failure must not drop a persisted database lead).
5. **Zero Dead Code & Zero Technical Debt Creep:** Unused dependencies, dead functions, and unverified assumptions are strictly prohibited.

## 4. Technology-Selection Principles
- Use standard, proven technologies with long-term stability and active community support.
- Prioritize zero-daemon or lightweight embeddable persistence (e.g., SQLite via native `node:sqlite` or PostgreSQL via connection pools) for self-contained operational simplicity.
- Require zero third-party commercial SaaS dependencies for core MVP operational viability.
- Every architectural choice must be documented in an Architectural Decision Record (ADR) under `docs/adr/`.

## 5. Coding Standards
- **Language & Runtime:** Modern Node.js / TypeScript with strict typing (`"strict": true`, zero `any` types).
- **Formatting & Style:** 2-space indentation, semicolons mandatory, single-responsibility functions, explicit error handling.
- **Naming Conventions:**
  - Files and directories: `kebab-case.ts` / `kebab-case.js`.
  - Interfaces and types: `PascalCase` (e.g., `LeadSubmissionRequest`).
  - Functions and variables: `camelCase`.
  - Database tables and columns: `snake_case`.
- **Comments & Documentation:** Inline comments must document *intent* and *invariants*, not reiterate syntactical operations.

## 6. Security and Privacy Requirements
- **Input Sanitization & Validation:** All user inputs (forms, query parameters, URL path variables) must be rigorously validated against strict schemas before processing.
- **Injection Defense:** 100% parameterized SQL queries. String concatenation in queries is strictly prohibited and treated as a critical severity defect.
- **Secrets Management:** Zero plaintext secrets in code or git. Secrets must load exclusively from environment variables with `.env.example` as a template.
- **Authentication & RBAC:** Cryptographic password hashing using PBKDF2/Argon2/bcrypt with salt. Secure HTTP-only cookies with `SameSite=Strict`, `Secure`, and CSRF protection tokens.
- **Privacy Compliance:** Conform to GDPR/CCPA data minimization. Contact submissions must explicitly log consent and offer privacy policy disclosure.

## 7. Accessibility Requirements (a11y)
- Full conformance with **WCAG 2.1 Level AA** standards.
- Semantic HTML tags (`<main>`, `<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`) exclusively.
- Full keyboard navigation support (logical tab order, visible focus rings, escape keys on modals/menus).
- ARIA attributes used purposefully to enhance, never to compensate for bad markup (`aria-expanded`, `aria-live`, `aria-describedby`).
- Color contrast ratios must meet or exceed 4.5:1 for normal text and 3:1 for large text.

## 8. UI/UX Principles
- **Design System Consistency:** Coherent typographic scale, calibrated enterprise color palette (Navy Blue `#0A192F`, Electric Cyan `#00E5FF`, Slate Gray `#64748B`, Crisp White `#F8FAFC`).
- **State Completeness:** Every interactive component must handle five discrete states: `idle`, `loading`, `empty`, `error`, and `success`.
- **Responsive Layouts:** Fluid breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`). Zero horizontal scrollbars or clipped text on any device.

## 9. SEO, AEO, and GEO Requirements
- **SEO (Search Engine Optimization):** Unique meta titles (`<Brand> | <Target>`), meta descriptions (140-160 chars), Open Graph tags, canonical URLs, valid XML sitemap, and robots.txt.
- **AEO (Answer Engine Optimization):** Structured question-and-answer schemas (`FAQPage`), entity definitions (`Organization`, `TechArticle`, `Service`), direct-answer summaries for query snippets.
- **GEO (Generative Engine Optimization):** Machine-readable citation sources, unambiguous entity grounding, structured JSON-LD, tables, and verifiable factual assertions digestible by LLM search crawlers.

## 10. Content Quality and Factual Accuracy Requirements
- All case studies, testimonials, client names, and metrics must be grounded in approved source material.
- **Strict Prohibition on AI Hallucination:** Agents are strictly forbidden from fabricating enterprise client names, performance statistics, certifications, or regulatory guarantees.
- Any unverified metric must be tagged with `[PENDING_SOURCE_VERIFICATION]` and blocked from production publishing.

## 11. Testing and Quality Standards
- **Testing Pyramid:** Unit tests (core domain logic, validators, crypto), Integration tests (API endpoints, database transactions), Adversarial tests (boundary conditions, malicious payloads, role escalation).
- **Execution Mandate:** A test is only considered passed if it was actually executed by an automated test runner. Agents must never declare tests "passed" based on visual code inspection.
- **Coverage Target:** Minimum 85% branch coverage on domain validation, authentication, and database repositories.

## 12. Documentation Requirements
- All features must have bidirectional traceability: Business Requirement ↔ Specification ↔ Task ↔ Code ↔ Test.
- Any architectural change requires an approved ADR in `docs/adr/`.
- Every operational procedure must be documented in a step-by-step runbook in `docs/runbooks/`.

## 13. Database and API Design Principles
- **Database:** Normalized relational design (3NF), foreign key constraints enabled, explicit index definitions on query filters, timestamps (`created_at`, `updated_at`) on all tables.
- **API Contracts:** RESTful conventions, consistent JSON envelope format (`{ success: boolean, data?: any, error?: { code: string, message: string, details?: any } }`), explicit HTTP status codes (200, 201, 400, 401, 403, 404, 422, 500).

## 14. Performance and Scalability Expectations
- Page response time (Time To First Byte - TTFB) ≤ 150ms.
- Client bundle payload ≤ 120KB compressed.
- Database query execution time ≤ 15ms for 99th percentile of read operations.

## 15. AI Usage Policies
- AI agents function as autonomous execution engines operating inside predefined task envelopes.
- AI must inspect repository state, constitution, specifications, and existing tests prior to generating or modifying code.
- AI must never overwrite unrelated files, refactor working logic without explicit authorization, or bypass established linting/testing suites.

## 16. Human Approval Requirements (Non-Negotiable Gates)
Human approval is mandatory at the following gates:
1. **Gate 1: Requirements & Specification Sign-off:** Before task decomposition begins.
2. **Gate 2: Implementation Plan & ADR Approval:** Before writing application code.
3. **Gate 3: Pull Request & Diff Review:** Before merging code to protected branches.
4. **Gate 4: Production Deployment Authorization:** Before deploying any build to staging or production.

## 17. Definition of Ready (DoR)
A task is Ready for implementation when:
- It links directly to an approved specification.
- Acceptance criteria are defined in Given-When-Then format.
- Impact analysis identifies all affected files and database migrations.
- Dependencies are identified and resolved.
- Security and performance considerations are explicitly documented.

## 18. Definition of Done (DoD)
A task is Done when:
- Code implements all acceptance criteria without extraneous modifications.
- Automated unit, integration, and security tests execute and pass.
- Static analysis and linting report zero errors and zero warnings.
- Documentation, ADRs, and runbooks are updated.
- Independent AI code review and human architectural review are approved.

## 19. Release and Deployment Governance & Prohibited Actions
- Releases must use semantic versioning (`MAJOR.MINOR.PATCH`).
- Automated rollbacks must be tested and verified prior to production releases.
- **Prohibited AI Actions:**
  - AI agents must NEVER run `git push --force` or push directly to `main`/`production`.
  - AI agents must NEVER drop database tables or run destructive queries in production.
  - AI agents must NEVER fabricate testimonials, customer data, or security certifications.
  - AI agents must NEVER bypass failing tests or modify test assertions to force a passing build.
  - AI agents must NEVER merge pull requests without explicit human sign-off.

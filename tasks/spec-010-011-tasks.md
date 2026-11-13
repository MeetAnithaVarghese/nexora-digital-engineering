# Task Breakdown: SPEC-010 (Light-Mode Executive Design System) & SPEC-011 (Magic Link Auth)
**Document ID:** TASKS-010-011  
**Status:** Complete (Gate 3 Approved; Production Release Skipped)  
**Branch:** `feature/spec-010-011-ui-magic-link`  
**Governing Documents:** [constitution.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md), [ADR-006](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/docs/adr/ADR-006-magic-link-authentication.md), [SPEC-010](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/010-enterprise-ui-ux-design-system.md), [SPEC-011](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/011-magic-link-authentication.md)  

---

### Phase Sign-Off Record:
- **Gate 1 (Audit & Specs Approval):** Approved by Human Architect.
- **Gate 2 (Implementation Plan Approval):** Approved by Human Architect.
- **Gate 3 (Pull Request Diff & Verification Approval):** Approved by Human Architect ("accept all").
- **Gate 4 (Production Release Authorization):** Skipped / Not Required per user direction. Branch `feature/spec-010-011-ui-magic-link` holds all verified implementations.

---

### Task 1: SQLite WAL Fallback & In-Memory Test Isolation (Phase 1)
- **Description:** Implement defensive WAL fallback in `src/db/index.js` to prevent UNC locking. Update all test suites to use isolated `:memory:` databases with `resetDbForTesting(':memory:')` and `seedDatabase()` so all 21 existing tests pass deterministically.
- **Files Affected:** `src/db/index.js`, `tests/**/*.test.js`
- **Acceptance Criteria:** `node --test tests/**/*.test.js` executes with 100% pass rate (21/21 passing).

---

### Task 2: Magic Link Cryptographic Core & Dual-Horizon Sessions (Phase 2)
- **Description:** Update `src/db/schema.sql` with `magic_link_tokens` and dual-horizon columns in `sessions`. Implement `createMagicLink`, `verifyMagicLink`, `createSession`, and `validateSession` (72h hard cap, 24h idle timeout) in `src/server/auth.js`. Expose `/api/auth/magic-link`, `/api/auth/verify`, and update `/api/auth/logout` in `src/server/routes.js`.
- **Files Affected:** `src/db/schema.sql`, `src/config/index.js`, `src/server/auth.js`, `src/server/routes.js`, `tests/unit/magic-link-auth.test.js`
- **Acceptance Criteria:** Magic links expire in 15m, are single-use; sessions expire after 24h idle or 72h hard cap. Automated unit and security tests execute and pass.

---

### Task 3: Light-Mode Executive Design System & Bespoke SVG Architectural Diagrams (Phase 3)
- **Description:** 
  1. **Palette & Tokens (`src/public/css/styles.css`):**
     - Pure White background (`#FFFFFF`), Soft Ice-Blue surfaces (`#F8FAFC`, `#F0F7FF`), 1px hairline borders (`#E2E8F0`).
     - Deep Slate Navy headings (`#0A192F`), Cool Slate body text (`#334155`), Muted Slate text (`#475569`).
     - Cobalt Blue primary CTA (`#0052CC`) with white text (WCAG AAA), Teal/Cyan (`#0284C7`) technical accents.
     - 5 discrete constitutional UI states (`idle`, `loading`, `empty`, `error`, `success`).
  2. **De-Crowded Sticky Frosted Header (`src/views/layout.js`, `src/public/js/app.js`):**
     - Frosted white header (`rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(12px)`), hairline border `#E2E8F0`.
     - Skip-to-content accessible anchor, responsive mobile drawer toggle with `aria-expanded` and `aria-controls`.
  3. **Bespoke Light-Mode SVG Diagrams (`src/public/images/`):**
     - Hero: `hero-architecture.svg` (distributed enterprise topology).
     - 6 Services: `service-ai-data.svg`, `service-software-product.svg`, `service-cloud-platform.svg`, `service-cybersecurity.svg`, `service-digital-transformation.svg`, `service-quality-engineering.svg`.
     - 2 Case Studies: `case-study-fintech.svg`, `case-study-healthcare.svg`.
     - 1 Insight: `insight-ai-architecture.svg`.
  4. **Template Integration (`src/views/pages.js`, `src/views/admin.js`):**
     - Wire SVGs into Hero, Service Detail, Case Studies, and Insights pages.
     - Modernize `/login` in `src/views/admin.js` to passwordless Magic Link interface with clear feedback states.
- **Files Affected:** `src/public/css/styles.css`, `src/views/layout.js`, `src/views/pages.js`, `src/views/admin.js`, `src/public/js/app.js`, `src/public/images/*.svg`, `tests/unit/ui-ux-design-system.test.js`
- **Acceptance Criteria:** Contrast meets WCAG AAA/AA, diagrams render crisply in light mode, mobile drawer functions cleanly with keyboard accessibility.

---

### Task 4: Full Verification & Gate 3 Diff Review (Phase 4)
- **Description:** Run all existing and new test suites, verify syntax with `node --check`, compile git diff, and present Gate 3 PR review.
- **Files Affected:** All repository diffs
- **Acceptance Criteria:** Zero failing tests, clean working tree on `feature/spec-010-011-ui-magic-link`, ready for Gate 3 human sign-off.

---

### Task 5: Executive Glassmorphism, Custom SVG Prism Logo, Dropdowns & Contrast Hardening (Phase 5)
- **Description:** 
  1. Fix invisible button text: Enforce crisp pure white (`#FFFFFF !important`, `font-weight: 600 !important`) across `.btn-primary` and CTA buttons with no selector collisions, hover `#003E99`.
  2. Implement layered executive ambient mesh canvas (radial glows on `#F8FAFC`: `#E0F2FE` soft ice-blue and `#EEF2FF` soft periwinkle) paired with frosted glassmorphism cards (`background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(16px); box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08)`).
  3. Replace basic rectangular logo badge with custom 3D SVG isometric hexagonal prism icon + two-tone wordmark (`NEXORA` in bold `#0A192F` + `Digital Engineering` in refined `#475569`).
  4. Implement accessible top navigation dropdown menus for `Services` (all 6 practice areas with 1-line descriptions), `Industries` (4 sectors), and `Insights` (briefings, whitepapers, case studies) with dedicated search button and Client Portal link.
  5. Audit and eliminate all internal demo/engineering jargon across all public views, replacing them with polished B2B executive consulting copy.
- **Files Affected:** `specs/010-enterprise-ui-ux-design-system.md`, `specs/011-magic-link-authentication.md`, `src/public/css/styles.css`, `src/views/layout.js`, `src/views/pages.js`, `src/views/admin.js`, `tests/unit/ui-ux-design-system.test.js`
- **Acceptance Criteria:** All 34 automated tests pass with 0 failures, 100% readable contrast, zero internal jargon visible to clients.

---

### Task 6: Universal Clickable Cards, Executive Detail Routes & Bespoke Architecture Blueprints (Phase 6)
- **Description:**
  1. **Universal Clickable Cards:** Upgrade all cards across Home, Services, Case Studies, Insights, and Industries to navigate to dedicated detail routes (`/services/:slug`, `/case-studies/:slug`, `/insights/:slug`, `/industries/:slug`). Wrap titles and images in accessible anchor links, enforce focus rings (`:focus-within`), and add animated bottom action links (`.card-action-link`).
  2. **Rich Detail Pages:** Build executive detail pages featuring breadcrumbs, category pills, title & summary, 3-card KPI impact metric rows, semantic `<figure class="detail-figure">` components with `<figcaption>`, two-column structured layouts (Challenge, Architecture, Outcomes, Deliverables), and sticky consultation sidebars.
  3. **7 New Bespoke SVG Architecture Blueprints:** Design and add bespoke light-mode SVG diagrams in `src/public/images/` for zero-trust Kubernetes, adversarial testing, enterprise AI governance, and all 4 industry practice domains.
  4. **Dynamic SEO & Sitemap:** Register all dynamic case studies and industry routes in `/sitemap.xml` and allow in `/robots.txt`.
- **Files Affected:** `src/views/pages.js`, `src/server/routes.js`, `src/public/css/styles.css`, `src/public/images/*.svg`, `src/server/seo.js`, `tests/unit/ui-ux-design-system.test.js`, `CHANGELOG.md`
- **Acceptance Criteria:** All 36 automated tests pass, zero regressions, all public detail routes return HTTP 200 with complete rendered pages.

---

### Task 7: Industry Practice Domain Upgrades & Consultation Form Pre-Fill (Phase 7)
- **Description:**
  1. **Industry Domain Cards:** Add light-mode visual headers, domain compliance pills (`PCI-DSS`, `HIPAA`, `IEC 62443`, `SOC 2`), 2 key metrics per sector, and dual action links (`Explore Domain Solutions →` and `Discuss Industry Requirements`).
  2. **Dedicated Industry Detail Pages:** Implement `/industries/financial-services`, `/industries/healthcare`, `/industries/manufacturing-iot`, and `/industries/retail-commerce` with breadcrumbs, full-width reference architecture figures, 4 structured executive sections, and pre-targeted CTAs.
  3. **Contact Pre-Filling (`GET /contact?industry=...`):** Pre-select industry domain and default service interest, and display a highlighted domain advisory context banner.
- **Files Affected:** `src/views/pages.js`, `src/server/routes.js`, `src/public/css/styles.css`, `tests/unit/ui-ux-design-system.test.js`
- **Acceptance Criteria:** All 37 automated tests pass, all industry routes return HTTP 200, contact page pre-fills dynamically.

---

### Task 8: Hero Blueprint Image, Insights Navigation & About Page Redesign (Phase 8)
- **Description:**
  1. **Homepage Hero Blueprint:** Serve static assets via `/images/` and create crisp light-mode `nexora-enterprise-blueprint.svg` (`1000x460`) illustrating Client Channels -> Edge Security & Gateway -> Data & AI Core -> Sovereign Cloud & Telemetry.
  2. **Whitepapers & Insights Navigation:** Make all cards on `/insights` and homepage link to `/insights/:slug` with `"Read Whitepaper →"` action links. Update the top navigation `Insights` dropdown to link directly to individual whitepapers. Ensure bespoke SVGs for AI-Native Systems, Zero-Trust Kubernetes, and Adversarial CI/CD.
  3. **About Page Executive Redesign:** Upgrade `/about` with a two-column executive hero, right-side `nexora-about-governance.svg` visual, 4-column Executive Impact Strip (`99.99% Uptime SLA`, `50+ Platforms`, `100% Traceability`, `Global Delivery`), 2x2 glassmorphic Engineering Principles grid, and bottom consultation CTA banner.
- **Files Affected:** `src/views/pages.js`, `src/views/layout.js`, `src/server/routes.js`, `src/public/css/styles.css`, `src/public/images/nexora-enterprise-blueprint.svg`, `src/public/images/nexora-about-governance.svg`, `tests/unit/ui-ux-design-system.test.js`
- **Acceptance Criteria:** All 39 automated tests pass with 0 failures, all routes (`/`, `/about`, `/insights`, `/insights/:slug`, `/images/nexora-enterprise-blueprint.svg`) return HTTP 200. Approved by user.

---

### Task 9: Digital Platform Glassmorphic Canvas & Architectural Grid (Phase 9)
- **Description:**
  1. **Global Architectural Grid & Ambient Canvas:** Implement pure CSS radial dot grid (1.25px dots at 32px × 32px intervals with `rgba(0, 82, 204, 0.045)`) and orthogonal hairline grid lines (`rgba(0, 82, 204, 0.025)`) on `body` and `.page-wrapper`. Overlay 4 fixed ambient radial mesh lighting orbs (`#E0F2FE`, `#EEF2FF`, `#F0FDFA`) on `#F8FAFC`. Add diagonal light-beam accent highlight on `.hero-section` and `.detail-hero`.
  2. **Consistent Frosted Glass Cards Across All Pages:** Apply `--color-card-bg: rgba(255, 255, 255, 0.82);`, `backdrop-filter: blur(16px);`, and `--color-card-border: rgba(203, 213, 225, 0.7);` across all cards, containers, sidebars, forms, tables, impact strips, and dropdown menus.
  3. **Contrast & Verification:** Ensure WCAG AAA compliance across all typography. Verify all 39 tests pass with zero regressions.
- **Files Affected:** `src/public/css/styles.css`, `src/views/layout.js`, `tasks/spec-010-011-tasks.md`, `CHANGELOG.md`
- **Acceptance Criteria:** All 39 automated tests pass, zero regressions, verified page-wrapper on all rendered views. Approved by user.

---

### Task 10: Executive Split Hero, Sales Conversion System, SVG Route Resolution & Typography (Phase 10)
- **Description:**
  1. **Permanent Hero SVG & Static Route Resolution:** Resolved static route handling in `src/server/routes.js` with platform-safe path normalization via `path.resolve(publicDir, safeSubPath)` avoiding Windows drive-root drop. Added explicit `xmlns`, `viewBox`, `width`, and `height` across all 26 SVGs in `src/public/images/`.
  2. **High-Converting 2-Column Split Hero:** Redesigned homepage hero in `src/views/pages.js` with left-column sales value proposition, primary cobalt CTA (`Schedule Executive Consultation`), secondary CTA (`Explore Solutions`), and Enterprise Trust Strip (`SOC 2 Type II`, `ISO 27001`, `HIPAA Ready`, `99.99% SLA`). Framed right-column visual showcase card with live telemetry pills (`120K req/s`, `< 12ms`, `4.2x Velocity`).
  3. **Sales Conversion Banner:** Implemented `renderSalesConversionBanner()` across Home, Services, Industries, Case Studies, and Insights pages.
  4. **Executive Typography & Background Spotlights:** Loaded `Plus Jakarta Sans` (700, 800), `Inter` (400, 500, 600), and `JetBrains Mono` (500, 600) with `-0.025em` display letter spacing and layered ambient spotlights (`#DBEAFE` and `#CCFBF1`).
- **Files Affected:** `src/server/routes.js`, `src/views/pages.js`, `src/views/layout.js`, `src/public/css/styles.css`, `src/public/images/*.svg`, `tests/unit/ui-ux-design-system.test.js`, `CHANGELOG.md`
- **Acceptance Criteria:** All 43 automated tests pass with 100% success rate, all routes (`/`, `/services`, `/case-studies`, `/images/*`) verified HTTP 200 with zero broken assets.

---

### Task 11: Inline Responsive Hero Diagram SVG & Server Static Asset Defense (Phase 11)
- **Description:**
  1. **Inline Hero Architecture Diagram:** Embedded responsive inline `<svg viewBox="0 0 680 340" width="100%" height="auto" role="img" aria-label="Nexora Enterprise Architecture Blueprint">` directly into `renderHomePage` inside `src/views/pages.js`, eliminating external network/asset load dependencies.
  2. **Executive Multi-Tier Architecture Layout:** Designed 4 structured vertical layer columns:
     - Layer 1: Enterprise Channels (Web Portal, Mobile Apps, Partner APIs)
     - Layer 2: Edge Security & API Gateway (Zero-Trust Auth, Rate Limiting, Schema Validation)
     - Layer 3: Intelligent Core & Data Fabric (AI Orchestration, Real-Time Streaming, ACID Persistence)
     - Layer 4: Sovereign Cloud & Observability (99.99% Multi-Region HA, Telemetry & Audit Trails)
     with cobalt `#0052CC` and teal `#0284C7` flow connectors and dark navy `#0A192F` labels.
  3. **Direct Static Serving in `src/server/index.js`:** Added defensive `handleStaticAsset` handler in server entrypoint so any `/images/*`, `/public/*`, `/css/*`, and `/js/*` requests resolve cleanly with HTTP 200 and appropriate MIME types.
- **Files Affected:** `src/views/pages.js`, `src/server/index.js`, `tests/unit/ui-ux-design-system.test.js`, `tasks/spec-010-011-tasks.md`, `CHANGELOG.md`
- **Acceptance Criteria:** All 43 tests pass, server restarted and verified at `http://localhost:3000`.

# Changelog: Nexora Digital Engineering
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.6.0] - 2026-11-13
### Added
- **Inline Hero Architecture Diagram SVG:**
  - Replaced the external `<img>` tag in the homepage hero showcase card with a responsive inline `<svg viewBox="0 0 680 340" width="100%" height="auto" role="img" aria-label="Nexora Enterprise Architecture Blueprint">` embedded directly in `src/views/pages.js`.
  - Structured 4 multi-tier platform columns with light-mode executive styling (white/ice-blue glass nodes `#FFFFFF` / `#EFF6FF`, cobalt `#0052CC` and teal `#0284C7` connectors, dark navy `#0A192F` typography):
    * Layer 1: **Enterprise Channels** (Web Portal, Mobile Apps, Partner APIs)
    * Layer 2: **Edge Security & API Gateway** (Zero-Trust Auth, Rate Limiting, Schema Validation)
    * Layer 3: **Intelligent Core & Data Fabric** (AI Orchestration, Real-Time Streaming, ACID Persistence)
    * Layer 4: **Sovereign Cloud & Observability** (99.99% Multi-Region HA, Telemetry & Audit Trails)
  - Completely eliminates network/asset loading latency and broken image icons on the homepage hero.
- **Server Entrypoint Static File Defense:**
  - Added dedicated `handleStaticAsset` handler directly in `src/server/index.js` as an immediate fast-path for `/images/*`, `/public/*`, `/css/*`, and `/js/*` with appropriate MIME types (`image/svg+xml`, `text/css`, `application/javascript`).

## [1.5.0] - 2026-11-13
### Added
- **Permanent Static Asset & Hero SVG Resolution:**
  - Fixed Windows path resolution bug in `src/server/routes.js` by standardizing asset lookups with `path.resolve(publicDir, safeSubPath)` and directory traversal protection, ensuring `/images/*` serves cleanly with `Content-Type: image/svg+xml`.
  - Normalized all 26 architectural SVG files in `src/public/images/` with explicit `xmlns="http://www.w3.org/2000/svg"`, `viewBox`, `width`, and `height` attributes to prevent intrinsic height collapses or broken image icons.
- **High-Converting 2-Column Split Hero Layout:**
  - Redesigned homepage hero into an executive 2-column layout:
    * Left column: High-impact headline (*"Architecting High-Velocity, Resilient Digital Systems"*), value proposition, primary cobalt CTA (`Schedule Executive Consultation`), secondary CTA (`Explore Solutions`), and an **Enterprise Trust Strip** with vector badges (`SOC 2 Type II`, `ISO 27001`, `HIPAA Ready`, `99.99% SLA`).
    * Right column: Multi-layered frosted glass showcase card framing the enterprise architecture blueprint (`/images/nexora-enterprise-blueprint.svg`) with live telemetry indicators (`120K req/s`, `< 12ms`, `4.2x Velocity`).
- **Sales Conversion Banner (`renderSalesConversionBanner`):**
  - Added full-width call-to-action banner before the footer across Home, Services, Industries, Case Studies, and Insights pages with dual action buttons (`Book a 30-Minute Architecture Briefing` and `Download Executive Overview`).
- **Executive Typography System:**
  - Integrated `Plus Jakarta Sans` (700, 800) with `-0.025em` letter-spacing for headlines, `Inter` (400, 500, 600) for body and navigation, and `JetBrains Mono` (500, 600) for metrics and badges.
- **Enhanced Digital Platform Canvas & Spotlights:**
  - Enriched background canvas with a visible architectural dot-and-line grid (`rgba(0, 82, 204, 0.08)`), subtle diagonal mesh, warm-cool gradient transition (`#F8FAFC` -> `#EFF6FF` -> `#F0FDFA`), and soft ambient spotlights (`#DBEAFE` and `#CCFBF1`).

## [1.4.0] - 2026-11-13
### Added
- **Digital Platform Glassmorphic Canvas & Architectural Grid:**
  - Implemented pure CSS `radial-gradient` dot grid (`1.25px` dots at `32px × 32px` intervals with `rgba(0, 82, 204, 0.045)`) paired with orthogonal hairline architectural grid lines (`rgba(0, 82, 204, 0.025)`) on `body` and `.page-wrapper`.
  - Added 4 fixed ambient radial mesh lighting orbs (`#E0F2FE` ice-blue, `#EEF2FF` soft periwinkle, `#F0FDFA` subtle cyan, `#EEF2FF` soft indigo) over `#F8FAFC`.
  - Added diagonal light-beam pseudo-elements across `.hero-section` and `.detail-hero` for platform depth without content interference.
  - Standardized frosted glassmorphism tokens (`--color-card-bg: rgba(255, 255, 255, 0.82)`, `backdrop-filter: blur(16px)`, `--color-card-border: rgba(203, 213, 225, 0.7)`, `--shadow-glass`) across all cards, containers, sidebars, impact strips, tables, forms, and dropdown menus.
  - Verified WCAG AAA compliance (15.8:1 contrast for titles, 9.4:1 contrast for body copy) and maintained 100% pass rate across all 39 tests.

## [1.3.0] - 2026-11-13
### Added
- **Homepage Hero Architecture Blueprint (`nexora-enterprise-blueprint.svg`):**
  - Integrated high-resolution light-mode SVG (`1000x460`) illustrating Client Channels -> Edge Security & Gateway -> Intelligent Data & AI Core -> Sovereign Cloud & Telemetry.
  - Enabled static asset routing for `/images/`, `/css/`, and `/js/` in `src/server/routes.js`.
- **Whitepapers & Insights Navigation:**
  - Upgraded all cards on `/insights` and homepage to feature explicit `"Read Whitepaper →"` action links and clickable image/title anchors.
  - Enhanced top navigation `Insights` dropdown with direct links to individual architecture whitepapers (`AI-Native Systems Architecture`, `Zero-Trust Kubernetes Hardening`, `Adversarial Testing in CI/CD`).
  - Added bottom technical consultation callout banners to all briefing detail pages (`GET /insights/:slug`).
- **Executive Redesign of the About Page (`/about`):**
  - Created two-column executive hero with mission narrative, dual CTAs, and bespoke SVG visual (`nexora-about-governance.svg`) illustrating Global Delivery Hubs (New York, London, Singapore), ISO 27001 / SOC 2 Type II compliance seals, and 3-stage Architecture-First advisory.
  - Added clean 4-column Executive Impact Strip (`99.99% Uptime SLA`, `50+ Platforms`, `100% Traceability`, `Global Delivery`).
  - Implemented 2×2 glassmorphic grid for "Our Engineering Principles" (`Architecture-First Discipline`, `Lean Enterprise Systems`, `Mission-Critical Resiliency`, `Executive Stewardship`) with custom icon badges.
- **Industry Practice Domains & Detail Pages:**
  - Implemented `/industries/:slug` detail routes for Financial Services, Healthcare & Life Sciences, Smart Manufacturing & IoT, and Retail & Digital Commerce with reference architecture figures and deliverables.
  - Added dynamic consultation form pre-filling (`GET /contact?industry=...`) with domain context advisory banner.
- **Automated Test Coverage:**
  - Expanded test suite to 39 automated unit, integration, and security tests with 100% pass rate.

## [1.2.0] - 2026-11-13
### Added
- **Universal Clickable Card Pattern & Navigation:**
  - Upgraded cards across all listing pages and homepage sections (`Services`, `Case Studies`, `Insights / Articles`, `Industries`) to navigate to dedicated detail routes:
    * Case Studies cards -> `/case-studies/:slug`
    * Services cards -> `/services/:slug`
    * Insights / Articles cards -> `/insights/:slug`
    * Industries cards -> `/industries/:slug`
  - Enhanced cards with accessible title/image anchors, focus-within rings (`:focus-within`), smooth elevation hover transitions (`translateY(-4px)`), and explicit bottom action links with directional arrows (`Explore Full Case Study →`, `View Architecture & Deliverables →`, `Read Full Briefing →`, `Explore Industry Architecture →`).
- **Executive-Grade Detail Pages & Routes:**
  - Implemented complete, structured detail pages for `/services/:slug`, `/case-studies/:slug`, `/insights/:slug`, and `/industries/:slug`.
  - Added semantic breadcrumb navigation back to parent listing views (`Home / Section / Title`).
  - Integrated KPI impact metric rows, executive summaries, category badges, and sticky consultation sidebar widgets.
  - Added semantic `<figure class="detail-figure">` components with `<figcaption>` describing system reference topologies.
- **7 New Bespoke Light-Mode SVG Architecture Blueprints:**
  - Added `insight-zero-trust-kubernetes.svg`: eBPF Cilium packet filtering, SPIFFE workload attestation, and mutual TLS mesh.
  - Added `insight-adversarial-testing.svg`: Shift-left property fuzzing, chaos engineering, and CI/CD adversarial test pipelines.
  - Added `insight-ai-governance.svg`: Verifiable source citation anchors, automated hallucination detection, and audit logging.
  - Added `industry-financial-services.svg`: High-frequency clearing pipelines, sub-millisecond risk engines, and ISO 20022 compliance.
  - Added `industry-healthcare-life-sciences.svg`: HIPAA-compliant data fabrics, zero-retention clinical RAG, and FHIR interoperability.
  - Added `industry-smart-manufacturing-iot.svg`: OPC-UA industrial telemetry meshes, edge inferencing, and predictive maintenance.
  - Added `industry-retail-digital-commerce.svg`: Omnichannel real-time inventory synchronization, Anycast edge CDN, and sub-10ms checkout.
- **Dynamic SEO Sitemap Indexing:**
  - Updated `src/server/seo.js` to automatically index dynamic case studies and industry domain routes in `/sitemap.xml`.
- **Automated Test Coverage:**
  - Expanded `tests/unit/ui-ux-design-system.test.js` with comprehensive assertions covering universal card navigation and detail page rendering, scaling test suite to 36 passing tests.

## [1.1.0] - 2026-11-13
### Added
- **Enterprise Light-Mode Executive Design System (SPEC-010):**
  - Authoritative light-mode enterprise color palette with Pure White (`#FFFFFF`) canvas, Soft Ice-Blue secondary surfaces (`#F8FAFC`, `#F0F7FF`), and 1px hairline borders (`#E2E8F0`).
  - High-contrast typography adhering to WCAG AAA/AA: Deep Slate Navy headings (`#0A192F` - 16.2:1 contrast, WCAG AAA), Cool Slate body text (`#334155` - 9.6:1 contrast, WCAG AAA), Muted Slate (`#475569` - 7.0:1 contrast, WCAG AAA), and Caption/dim text (`#64748B` - 4.6:1 contrast, WCAG AA).
  - High-impact Cobalt Blue primary CTA (`#0052CC` - 7.5:1, WCAG AAA) and Teal/Cyan technical accents (`#0284C7`).
  - De-crowded frosted sticky header (`rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(12px)`) with skip-to-content accessible anchor and streamlined IA.
  - Fully accessible responsive mobile drawer with hamburger toggle button (`aria-expanded`, `aria-controls`, and `Escape` key close listener).
  - Standardized 5 constitutional UI states: `.state-idle`, `.state-loading` (shimmer skeleton), `.state-empty`, `.state-error`, and `.state-success`.
  - 10 bespoke light-mode SVG architectural diagrams in `src/public/images/` mapped to Hero, 6 Core Services, 2 Case Studies, and Insights whitepapers.
- **Passwordless Magic Link Authentication (SPEC-011 & ADR-006):**
  - Cryptographic single-use magic link authentication via 32-byte CSPRNG tokens hashed with SHA-256 and a 15-minute TTL.
  - Development preview URL generation for local and staging environments.
  - Timing-neutral response patterns on `POST /api/auth/magic-link` to mitigate account enumeration.
  - Modernized passwordless admin login interface in `src/views/admin.js`.
- **Dual-Horizon Session Lifecycle Management (SPEC-011 & ADR-006):**
  - Enforced 72-hour absolute maximum session lifetime (`max_expires_at`).
  - Enforced 24-hour sliding idle timeout (`expires_at`), with throttled activity timestamp updates.
- **Automated Test Suites:**
  - Added `tests/unit/magic-link-auth.test.js` covering magic link generation, single-use consumption, expiration, and dual-horizon session enforcement.
  - Added `tests/unit/ui-ux-design-system.test.js` asserting design tokens, responsive breakpoints, SVG assets, skip links, and de-crowded nav.

### Changed
- **SQLite Concurrency & Mount Resilience:**
  - Added defensive fallback to `DELETE` journal mode when SQLite WAL shared-memory (`-shm`) file locking is restricted on UNC, network, or WSL virtual mounts.
  - Updated all integration, security, and unit test suites to execute against isolated in-memory databases (`:memory:`), eliminating cross-suite concurrency locks and scaling total tests to 34 passing tests.

## [1.0.0] - 2026-11-11
### Added
- **AI-Native Engineering Foundation:** Established `constitution.md`, `CLAUDE.md`, and multi-agent roles (`AGENTS.md`).
- **Core Platform Architecture:** Implemented self-contained Node.js server with native SQLite database persistence.
- **Frontend Pages:** Implemented responsive Homepage, About, Services Landing, Service Details (6 core capabilities), Industries, Case Studies, Insights/Articles, Contact, Search, and Protected Admin Portal.
- **Lead Generation System:** Contact form submission with server-side validation, rate-limiting protection, database persistence, and admin notification dispatch.
- **Authentication & RBAC:** Session-based authentication with salted PBKDF2 hashing, cookie management, and role-based route guards (`admin`, `editor`, `visitor`).
- **Content Management Workflow:** Content drafting, editorial review, and live publishing lifecycle.
- **Search Capability:** High-performance multi-entity search indexing services, articles, and case studies.
- **SEO / AEO / GEO Engine:** Automated XML sitemap generation (`/sitemap.xml`), robots exclusion standard (`/robots.txt`), and schema.org JSON-LD structured data.
- **Testing Suites:** Complete automated test suite covering unit validation, API integration, RBAC security, and adversarial edge cases with 100% test execution pass rate.


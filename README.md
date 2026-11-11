# Nexora Digital Engineering — AI-Native Enterprise Web Platform

Nexora Digital Engineering is a production-oriented, AI-native B2B technology consulting website engineered to demonstrate the end-to-end AI-native software development lifecycle using Claude Code, GitHub Spec Kit, autonomous subagents, and human-in-the-loop governance.

---

## Key Features
- **Modern Enterprise Architecture:** Zero-daemon, lightweight, self-contained architecture running on Node.js with built-in native SQLite persistence and test harness.
- **Full Showcase of B2B Services:**
  - AI & Data Engineering
  - Software Product Engineering
  - Cloud & Platform Engineering
  - Cybersecurity & Governance
  - Digital Transformation Consulting
  - Quality Engineering & Test Automation
- **Lead Generation & Contact Management:** Validated enquiry workflow with automated SLA categorization and database persistence.
- **Protected Admin & Content Area:** Role-Based Access Control (RBAC), secure sessions, content draft/review/publish workflow, and lead export.
- **Search & Filter Engine:** Instant keyword and topic search across services, case studies, and insights.
- **Advanced SEO / AEO / GEO:** Built-in XML sitemap, robots.txt, canonical metadata, and schema.org JSON-LD structured data (`Organization`, `Service`, `FAQPage`, `TechArticle`).
- **Comprehensive Test Suite:** Unit, integration, security, and adversarial test coverage executed via Node.js native test runner (`node --test`).

---

## Quick Start

### Prerequisites
- Node.js v20+ or v24+ (Recommended)
- Git 2.40+

### Installation & Initialization
```bash
# Clone and enter directory
cd nexora-digital-engineering

# Copy environment template
cp .env.example .env

# Initialize and seed database
node src/db/seed.js

# Run the complete test suite
node --test tests/**/*.test.js

# Launch the server
node src/server/index.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Documentation
- **[constitution.md](constitution.md):** Supreme technical constitution and non-negotiable architectural principles.
- **[CLAUDE.md](CLAUDE.md):** Claude Code operational instructions and command harness.
- **[AGENTS.md](AGENTS.md):** Multi-agent role matrix and tool boundary definitions.
- **[Architecture Overview](docs/architecture/system-architecture.md):** C4 diagrams, container topology, and data flows.
- **[Architecture Decision Records](docs/adr/):** Formal decision records (ADR-001 through ADR-005).
- **[Specifications](specs/):** GitHub Spec Kit executable specifications (Specs 001 - 009).
- **[Tasks & Plans](tasks/):** Traceable task breakdown and implementation plans.

---

## Governance & Human Approval Gates
All AI-driven changes must pass four non-negotiable human approval gates:
1. **Gate 1:** Requirements & Specification Approval.
2. **Gate 2:** Implementation Plan & Impact Analysis Approval.
3. **Gate 3:** Pull Request Diff & Code Review Approval.
4. **Gate 4:** Staging / Production Deployment Authorization.

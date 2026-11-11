# AGENTS.md: Autonomous Agent Registry & Operating Matrix
**Project:** Nexora Digital Engineering  
**Authority:** Technical Architecture & Governance Board  
**Version:** 1.0.0  

---

## 1. Agent Operating Framework
In the Nexora AI-native development model, tasks are delegated to specialized autonomous and semi-autonomous subagents. Each agent operates with strict tool permissions, explicit input contracts, validated outputs, and defined human escalation thresholds.

```
Agent Orchestration Flow:
[Business Request]
       │
       ▼
1. Requirements Analyst ──────────► [Human Approval Gate 1]
       │
       ▼
2. Architecture Reviewer ─────────► [Human Approval Gate 2]
       │
       ▼
3. Developer / Implementer (Claude Code)
       │
       ├───────────────────────────────┐
       ▼                               ▼
4. Code Review Agent           5. Testing Agent
       │                               │
       └───────────────┬───────────────┘
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
6. Security Reviewer           7. UI/UX & SEO Reviewer
       │                               │
       └───────────────┬───────────────┘
                       │
                       ▼
               [Human Review Gate 3: Pull Request]
                       │
                       ▼
8. DevOps & Release Agent ────────► [Human Approval Gate 4: Production Release]
```

---

## 2. Agent Catalog & Boundaries

### Agent 1: Requirements Analyst
- **Role:** Translates ambiguous business input into structured specifications (`specs/`), user journeys, and acceptance criteria.
- **Tools Allowed:** Read workspace, search web, write `specs/`, write `tasks/`.
- **Prohibited:** Writing or modifying application code in `src/` or tests in `tests/`.
- **Escalation Trigger:** Ambiguous user stories, unstated non-functional requirements, or compliance conflicts.

### Agent 2: Architecture Reviewer
- **Role:** Audits proposed designs against `constitution.md`, drafts Architecture Decision Records (`docs/adr/`), and detects overengineering.
- **Tools Allowed:** Read workspace, write `docs/adr/`, write `docs/architecture/`.
- **Prohibited:** Modifying production code or bypassing constitutional standards.
- **Escalation Trigger:** Decisions introducing third-party SaaS dependencies, security compromises, or breaking schema changes.

### Agent 3: UI/UX Reviewer
- **Role:** Inspects frontend layouts, responsive viewport behavior, design tokens, and WCAG 2.1 AA accessibility.
- **Tools Allowed:** Read `src/public/`, read `src/views/`, execute browser/DOM inspection.
- **Prohibited:** Approving code changes directly into git branches.
- **Escalation Trigger:** Contrast ratio < 4.5:1, broken responsive mobile layouts, missing ARIA tags.

### Agent 4: Code Review Agent
- **Role:** Analyzes pull request diffs, enforces coding standards, checks error boundaries, and verifies test coverage.
- **Tools Allowed:** Read git diff, read all source files, comment on PRs.
- **Prohibited:** Self-approving its own code changes or committing modified files directly.
- **Escalation Trigger:** Any security smell, untyped inputs, hardcoded secrets, or missing regression tests.

### Agent 5: Testing Agent
- **Role:** Generates and executes unit, integration, API, and adversarial test suites.
- **Tools Allowed:** Write `tests/`, execute `node --test`, inspect logs.
- **Prohibited:** Modifying application code to make failing tests pass or commenting out assertions.
- **Escalation Trigger:** Any test failure in core workflows or regressions in previously passing suites.

### Agent 6: Security Agent
- **Role:** Conducts OWASP Top 10 audits, audits SQL injection defense, tests RBAC authorization boundaries, and inspects secrets handling.
- **Tools Allowed:** Read codebase, execute security test suites, generate vulnerability reports.
- **Prohibited:** Altering security policy without human authorization.
- **Escalation Trigger:** Unauthenticated endpoint exposure, SQL injection vectors, or plaintext credentials.

### Agent 7: Content Generation Agent
- **Role:** Generates grounded B2B service descriptions, industry pages, and case study drafts.
- **Tools Allowed:** Read source briefs, write `docs/content/`, write seed content.
- **Prohibited:** Fabricating enterprise client names, performance statistics, or client testimonials.
- **Escalation Trigger:** Any unverified business claim or missing source attribution.

### Agent 8: SEO/AEO/GEO Agent
- **Role:** Audits semantic HTML, meta tags, sitemap, robots.txt, structured JSON-LD schemas, and answer engine snippet readiness.
- **Tools Allowed:** Read views, inspect sitemap and robots, validate schema markup against schema.org.
- **Prohibited:** Keyword stuffing, cloaking, or generating misleading meta descriptions.
- **Escalation Trigger:** Missing canonical tags, invalid JSON-LD syntax, or orphan content pages.

### Agent 9: DevOps and Release Agent
- **Role:** Prepares deployment runbooks, validates CI workflows, verifies database migration rollbacks, and prepares release tags.
- **Tools Allowed:** Read CI scripts, run migration dry-runs, write `docs/runbooks/`.
- **Prohibited:** Pushing directly to production or modifying infrastructure credentials without human sign-off.
- **Escalation Trigger:** Failing CI pipelines or unvalidated rollback plans.

### Agent 10: Documentation Agent
- **Role:** Maintains synchronization between specifications, architecture docs, API contracts, README, and CHANGELOG.
- **Tools Allowed:** Write documentation files, update README, update CHANGELOG.
- **Prohibited:** Writing or refactoring application logic.
- **Escalation Trigger:** Discrepancies between implemented APIs and documented schemas.

# CLAUDE.md: Claude Code Project Instructions & Engineering Harness
**Project:** Nexora Digital Engineering Website  
**Runtime:** Node.js v20+ / Node.js v24 (Native SQLite + Test Runner)  
**Document Classification:** Agent Operational Guidelines and Context Directives  

---

## 1. Project Overview & Relationship to constitution.md
Nexora Digital Engineering is a production-grade B2B technology consulting website.

### Distinction: constitution.md vs. CLAUDE.md
- **`constitution.md`**: The supreme technical constitution and non-negotiable legal/engineering policy of the project. It defines *what* standards must be met, business boundaries, security principles, and human authorization gates. Changes require human architectural sign-off.
- **`CLAUDE.md`**: The tactical operational manual for Claude Code and automated agents. It defines *how* an agent works daily within this repository: exact commands, directory layouts, coding rules, test invocation patterns, and Git branch workflows.

---

## 2. Repository Structure
```
nexora-digital-engineering/
├── constitution.md             # Supreme project governance & policies
├── CLAUDE.md                   # Agent tactical instructions & commands
├── README.md                   # Developer onboarding & overview
├── AGENTS.md                   # Multi-agent registry & tool permissions
├── CONTRIBUTING.md             # Code contribution & review standards
├── SECURITY.md                 # Vulnerability reporting & security rules
├── CHANGELOG.md                # Semantic version release logs
├── .env.example                # Environment variable schema template
├── package.json                # Project dependencies & npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── docs/
│   ├── architecture/           # System topology, data-flows, and C4 diagrams
│   ├── adr/                    # Architecture Decision Records
│   ├── runbooks/               # Deployment, rollback, and incident runbooks
│   └── decisions/              # Product and architectural meeting minutes
├── specs/                      # GitHub Spec Kit executable specifications
├── tasks/                      # Atomic implementation plans and tasks
├── .claude/
│   ├── agents/                 # Specialized subagent system prompts
│   └── skills/                 # Reusable workflow skills
├── .github/
│   ├── ISSUE_TEMPLATE/         # Structured issue templates
│   ├── PULL_REQUEST_TEMPLATE.md# Traceable PR checklist template
│   └── workflows/              # GitHub Actions CI/CD pipelines
├── src/
│   ├── config/                 # Environment and application configuration
│   ├── db/                     # SQLite schema, migrations, and seed scripts
│   ├── server/                 # HTTP server, routers, auth, and lead handlers
│   ├── public/                 # Static assets (CSS, JS, images, robots, sitemap)
│   └── views/                  # UI templates and semantic HTML layouts
└── tests/
    ├── unit/                   # Pure function & validation unit tests
    ├── integration/            # API endpoints & database integration tests
    ├── security/               # RBAC, injection, and auth security tests
    └── adversarial/            # Boundary, malformed data, and edge case tests
```

---

## 3. Technology Stack & Running Commands
- **Runtime:** Node.js v24 LTS / v20 LTS
- **Database:** SQLite (via native `node:sqlite` or SQLite3) — Zero external database daemon required
- **Server:** Node.js native HTTP / REST API with JSON envelope contracts
- **Frontend:** Semantic HTML5, CSS custom properties (Design Tokens), Vanilla JS (Zero heavy bundle bloat)
- **Test Framework:** Node.js Native Test Runner (`node --test`) + `node:assert/strict`

### Essential Commands
```bash
# Start development server
node src/server/index.js

# Seed database with sample articles, services, and admin user
node src/db/seed.js

# Run all test suites (unit, integration, security, adversarial)
node --test tests/**/*.test.js

# Run specific test suite
node --test tests/unit/*.test.js
node --test tests/integration/*.test.js
node --test tests/security/*.test.js
node --test tests/adversarial/*.test.js

# Check syntax / static analysis
node --check src/**/*.js
```

---

## 4. Architecture & Coding Conventions
- **Strict Separation of Concerns:**
  - Route handlers (`src/server/routes.js`) parse requests and invoke controllers.
  - Data layer (`src/db/`) executes parameterized SQL queries and returns sanitized objects.
  - Domain validation (`src/server/validation.js`) validates all payloads before database interaction.
- **Error Handling:** Always return standard JSON responses for API calls:
  ```json
  {
    "success": false,
    "error": {
      "code": "INVALID_EMAIL",
      "message": "The email provided is not a valid corporate address."
    }
  }
  ```
- **Database Rules:**
  - Always enable Foreign Keys: `PRAGMA foreign_keys = ON;`
  - Always use prepared statements with parameter binding: `db.prepare('SELECT * FROM users WHERE email = ?').get(email);`
  - Never interpolate strings into SQL.

---

## 5. Security Requirements
1. **Password Hashing:** Passwords must be hashed using PBKDF2 with 100,000 iterations and a cryptographically random salt.
2. **Session Management:** Secure, HTTP-only session tokens stored in in-memory session store or database session table with explicit TTL expiration.
3. **Role-Based Access Control (RBAC):**
   - Public: Read published content, submit contact enquiries, search.
   - Editor: Draft, edit, and review content and resources.
   - Admin: Publish content, view and export leads, manage user accounts.
4. **Input Constraints:** Enforce maximum payload sizes, trim strings, sanitize against XSS.

---

## 6. Content-Generation & SEO/AEO/GEO Rules
- **Content Grounding:** Generate content exclusively from approved project themes (AI & Data, Product Engineering, Cloud, Cybersecurity, Digital Transformation, Quality Engineering).
- **Prohibited Fabrications:** Never invent customer names, testimonials, metrics (e.g., "reduced latency by 94.2%"), or awards.
- **AEO/GEO Requirements:** Every content page must export schema.org JSON-LD (`Organization`, `TechArticle`, `Service`), direct answer summary boxes, and verifiable citations.

---

## 7. Specification-First & Ticket-to-Code Workflow
1. **Inspect First:** Before touching code, read `constitution.md`, `CLAUDE.md`, relevant `specs/`, and open `tasks/`.
2. **Impact Analysis:** Identify affected files, database schema changes, and potential regression risks.
3. **Implementation Plan:** Prepare an atomic step-by-step plan. Present to human for approval.
4. **Isolated Branching:** Execute changes on a dedicated branch (`feature/NEX-<id>-<description>`).
5. **Deterministic Testing:** Write tests *before* or *concurrently with* implementation. Run tests using `node --test` to verify 100% pass rate.
6. **Self-Review:** Inspect `git diff` to ensure no unintended files or formatting regressions exist.

---

## 8. Unauthorized & Prohibited Commands
Claude Code and automated agents must NEVER execute the following commands without explicit, written human authorization:
- `git push --force` or `git push origin main`
- `rm -rf` or recursive deletion commands outside `/tmp` or scratch directories
- Dropping database tables or executing un-migrated DDL scripts
- Installing untrusted npm packages with known vulnerabilities or licensing conflicts
- Bypassing failing tests by commenting out assertions or deleting test files

---

## 9. Pull Request Requirements
Before requesting a human PR review, verify:
- [ ] All tests pass: `node --test tests/**/*.test.js`
- [ ] No uncommitted files or dirty working tree
- [ ] Branch follows convention: `feature/` or `fix/`
- [ ] Specification traceability is included in PR description
- [ ] No plaintext secrets or API keys are present


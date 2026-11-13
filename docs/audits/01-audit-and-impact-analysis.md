# Nexora Digital Engineering: Audit & Impact Analysis Report

**Document Reference:** `docs/prompts/01-audit.md`  
**Governing Authority:** [constitution.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md), [CLAUDE.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/CLAUDE.md), [AGENTS.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/AGENTS.md)  
**Execution Policy:** Read-only audit; zero application code files modified.  
**Date:** 2026-11-13  

---

## 1. Executive Summary & Audit Scope

An architectural and codebase audit was conducted across the Nexora Digital Engineering repository in accordance with [constitution.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md), [CLAUDE.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/CLAUDE.md), [AGENTS.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/AGENTS.md), system architecture documentation ([docs/architecture/system-architecture.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/docs/architecture/system-architecture.md)), architectural decision records ([docs/adr/](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/docs/adr/)), and specifications ([specs/001-website-foundation.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/001-website-foundation.md) through [specs/009-admin-dashboard.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/009-admin-dashboard.md)).

The codebase represents a zero-daemon, single-process Node.js platform utilizing embedded SQLite (`node:sqlite`), server-rendered semantic HTML5, CSS custom properties (design tokens), and PBKDF2 password-based authentication.

---

## 2. Current System Architecture Verification

### 2.1 SQLite Persistence & Data Access Layer ([src/db/](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/db/))
- **Engine & Lifecycle:** Uses Node.js 24 native synchronous SQLite (`DatabaseSync` in [src/db/index.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/db/index.js#L1-L40)). A singleton instance is returned by `getDb(customPath)`.
- **Database Schema ([src/db/schema.sql](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/db/schema.sql#L1-L87)):**
  - `users`: ID, unique email, `password_hash`, `salt`, and role check constraint (`CHECK(role IN ('admin', 'editor'))`).
  - `sessions`: ID, `user_id` (foreign key cascading delete), `token` (32-byte hex unique index), `expires_at`, and `created_at`. Missing sliding activity / idle timestamp columns.
  - `services`, `articles`, `case_studies`, `leads`, and `audit_logs`: Fully indexed on query filter columns (`slug`, `status`).
- **Seeding ([src/db/seed.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/db/seed.js)):** Seeds initial admin and editor users, 6 core service domains, 4 articles, 2 case studies, and 1 initial lead.

### 2.2 Authentication & RBAC Layer ([src/server/auth.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/server/auth.js), [src/server/routes.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/server/routes.js))
- **Credential Storage:** `PBKDF2-SHA256` hashing with 100,000 iterations and 16-byte cryptographically random salt per user ([auth.js#L6-L15](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/server/auth.js#L6-L15)).
- **Session Lifecycle:** Generates a 32-byte random hex token. Expiration is fixed at creation time: `expiresAt = Date.now() + config.sessionTtlHours * 3600 * 1000` (default 24h). No sliding/idle expiration is tracked or updated.
- **Cookie Security:** `session_token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400` ([routes.js#L230](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/server/routes.js#L230)).
- **RBAC Enforcement:** Route-level middleware checks `userSession = validateSession(cookies.session_token)`. `admin` role is required for viewing/modifying leads and publishing articles; `editor` is limited to drafting content.

### 2.3 Frontend Templates & CSS Design Tokens ([src/views/](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/views/), [src/public/css/styles.css](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/public/css/styles.css))
- **Template Architecture:** Modular SSR template functions in [layout.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/views/layout.js), [pages.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/views/pages.js), and [admin.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/views/admin.js). HTML characters are escaped via `escapeHtml()`.
- **CSS Design Tokens:** Defined in `:root` with enterprise palette (`--color-bg: #050B14`, `--color-surface: #0A192F`, `--color-primary: #00E5FF`, `--color-accent: #3B82F6`, `--color-text-main: #F8FAFC`).
- **Navigation:** Sticky top navigation with active navigation pills. Currently lacks an accessible mobile hamburger drawer, skip-to-content anchor, and ARIA state management.

---

## 3. Discrepancy Matrix (Documented Baseline vs. Codebase)

| Feature / Domain | Documented Specification / ADR | Actual Code Implementation | Severity & Risk |
| :--- | :--- | :--- | :--- |
| **Authentication Strategy** | [ADR-003](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/docs/adr/ADR-003-authentication-and-rbac.md) & [SPEC-005](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/005-auth-and-rbac.md): Password-based PBKDF2 authentication | Only password auth implemented; prompt requires passwordless Magic Link authentication | **High:** Requires updating ADR-003 or introducing ADR-006, creating magic link token persistence, dispatch, and verification endpoints. |
| **Session Lifetime & Idle Timeout** | [SPEC-005 Section 3](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/005-auth-and-rbac.md#L16-L20): Fixed 24h lifetime (`Max-Age=86400`) | Session has only `expires_at` (fixed 24h); no idle timeout tracking | **High:** Prompt requires **3-day maximum session** (72h) and **1-day idle timeout** (24h). Requires dual-horizon expiration logic. |
| **Database Concurrency & WAL Mode** | [ADR-001](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/docs/adr/ADR-001-technology-stack.md): Deterministic SQLite execution | `dbInstance.exec('PRAGMA journal_mode = WAL;')` in [src/db/index.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/db/index.js#L14) | **Critical:** Over UNC/WSL virtual 9P paths, WAL shared-memory (`-shm`) causes `ERR_SQLITE_ERROR: database is locked`, failing parallel test runs. |
| **Test DB Isolation** | [constitution.md Section 11](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md#L73-L77): Automated test execution | Tests query and mutate physical `nexora.db` concurrently rather than isolating via in-memory SQLite | **High:** Causes test concurrency collision and file locks across test suites. |
| **Public Articles API** | [SPEC-004 Acceptance Scenario 1](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/004-cms-and-publishing.md#L17-L20): `GET /api/articles` excludes draft articles | Route does not exist in [src/server/routes.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/server/routes.js) | **Medium:** Only HTML route `/insights` exists; public REST endpoint is missing. |
| **Accessibility & Contrast** | [constitution.md Section 7](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md#L51-L57): WCAG 2.1 AA (contrast ≥ 4.5:1) | `--color-text-dim: #64748B` on `#0A192F` has ~3.8:1 contrast | **Medium:** Fails WCAG AA normal text contrast; needs token adjustment to `#94A3B8`. |
| **Audit Log Persistence** | [docs/architecture/system-architecture.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/docs/architecture/system-architecture.md#L71): `audit_logs` table | Table exists in `schema.sql`, but handlers never insert records | **Low:** Operational audit trails for authentication and role changes are inactive. |

---

## 4. Impact Analysis: Magic Link Authentication (3-Day Max / 1-Day Idle Timeout)

### 4.1 Dual-Horizon Session Architecture
The authentication lifecycle must transition from a static 24-hour expiration to a **dual-horizon sliding window**:
1. **Absolute Hard Lifetime:** Max 3 days (72 hours) from initial authentication (`max_expires_at = created_at + 72h`). Once reached, the session expires unconditionally.
2. **Rolling Idle Timeout:** Max 1 day (24 hours) of inactivity (`idle_expires_at = last_active_at + 24h`). Each authenticated request updates `last_active_at`, extending the idle expiration up to `max_expires_at`.

```
Session Lifecycle Flow:
[Magic Link Verified] ──────────────────────────┐
       │                                        │
       ▼                                        ▼
Sets `created_at` = T0                   Sets `max_expires_at` = T0 + 72h (Hard Expiry)
Sets `last_active_at` = T0               Sets `idle_expires_at` = T0 + 24h (Sliding Expiry)
       │
       ▼ (User requests protected route)
Check 1: Is now > max_expires_at?  ───► YES ──► Invalidate & Redirect to Login
Check 2: Is now > idle_expires_at? ───► YES ──► Invalidate & Redirect to Login
       │ NO
       ▼
Update `last_active_at` = now (throttled to once per minute)
Update `idle_expires_at` = min(now + 24h, max_expires_at)
Update Set-Cookie Max-Age header
```

### 4.2 Database Schema Migration
1. **New Table: `magic_link_tokens`**
   ```sql
   CREATE TABLE IF NOT EXISTS magic_link_tokens (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     token_hash TEXT UNIQUE NOT NULL,
     expires_at DATETIME NOT NULL,
     used_at DATETIME,
     ip_address TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );
   CREATE INDEX IF NOT EXISTS idx_magic_link_tokens_hash ON magic_link_tokens(token_hash);
   ```
2. **Schema Update for `sessions` Table:**
   - Add column `last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP`.
   - Add column `max_expires_at DATETIME NOT NULL`.
   - Update `validateSession()` query and update statement to verify both deadlines and advance `last_active_at`.

### 4.3 Endpoint and Cryptographic Specifications
- **Magic Link Dispatch (`POST /api/auth/magic-link`):**
  - Payload: `{ "email": "admin@nexora.example.com" }`.
  - Rate limiting: Max 3 requests per 15 minutes per IP/email.
  - Generates raw 32-byte hex token (`crypto.randomBytes(32).toString('hex')`).
  - Stores SHA-256 hash `crypto.createHash('sha256').update(rawToken).digest('hex')` with 15-minute validity (`expires_at = datetime('now', '+15 minutes')`).
  - Dispatches email containing link: `/api/auth/verify?token=${rawToken}` (in development, logs to secure application console).
- **Magic Link Verification (`GET /api/auth/verify?token=...`):**
  - Computes SHA-256 hash of query token.
  - Queries `magic_link_tokens` where `token_hash = ? AND used_at IS NULL AND expires_at > datetime('now')`.
  - Marks token as consumed: `UPDATE magic_link_tokens SET used_at = datetime('now') WHERE id = ?`.
  - Creates session: `created_at = now`, `last_active_at = now`, `expires_at = now + 24h`, `max_expires_at = now + 72h`.
  - Emits cookie: `session_token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=259200; Secure`.
  - Redirects user to `/admin`.

---

## 5. Impact Analysis: UI/UX Design System Modernization

### 5.1 Design Tokens Calibrations ([src/public/css/styles.css](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/public/css/styles.css))
- **WCAG 2.1 AA Contrast Ratios:**
  - Update `--color-text-dim` from `#64748B` to `#94A3B8` (contrast against `#0A192F` increases from 3.8:1 to 5.4:1, exceeding the 4.5:1 threshold).
  - Define high-visibility focus indicator: `--focus-ring: 0 0 0 3px rgba(0, 229, 255, 0.4)`.
- **Responsive Breakpoint Tokens:**
  - Add CSS media queries for standard breakpoints defined in [constitution.md Section 8](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md#L61) (`640px`, `768px`, `1024px`, `1280px`).

### 5.2 Semantic Layout & Navigation ([src/views/layout.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/views/layout.js))
- **Skip Link:** Insert `<a href="#main-content" class="skip-link">Skip to main content</a>` for keyboard accessibility.
- **Accessible Mobile Navigation:** Add a mobile menu toggle button with `aria-expanded="false"`, `aria-controls="primary-nav"`, and keyboard navigation support.
- **Discrete Component States:** Ensure all forms, interactive components, and tables handle the five mandatory constitutional states: `idle`, `loading`, `empty`, `error`, and `success`.

---

## 6. Test Suite & Reliability Remediation

1. **SQLite UNC Path Concurrency Fix:**
   - In [src/db/index.js](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/src/db/index.js#L14), wrap `PRAGMA journal_mode = WAL;` with a try/catch or fallback to `DELETE` mode if WAL shared memory fails on UNC paths.
2. **Deterministic Test Isolation:**
   - Configure test suites to invoke `resetDbForTesting(':memory:')` during test setup so that tests execute in isolated memory instances without locking `nexora.db`.

---

## 7. Governance Gates & Next Actions

In accordance with [constitution.md Section 16](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md#L97-L103) and [AGENTS.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/AGENTS.md):
1. **Gate 1 (Requirements Sign-off):** Review and sign off on this Audit & Impact Analysis report.
2. **Gate 2 (Implementation Plan & ADR Approval):** Draft `docs/adr/ADR-006-magic-link-authentication.md` and atomic task specifications before modifying application code.


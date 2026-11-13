# ADR-006: Passwordless Magic Link Authentication and Dual-Horizon Session Policy
**Status:** Proposed (Pending Gate 2 Approval)  
**Deciders:** Principal Architect, Security Lead, Full-Stack Lead  
**Date:** 2026-11-13  
**Supersedes/Amends:** ADR-003 (Amends credential method from passwords to passwordless Magic Links; retains session-based RBAC)  

---

## 1. Context and Problem Statement
ADR-003 established stateful server-side sessions with HTTP-only cookies and PBKDF2 password hashing. While cryptographically sound, password management introduces operational friction, credential stuffing risks, and password reset overhead for staff administrators and content editors.

Nexora requires an enterprise-grade, passwordless authentication mechanism based on cryptographic **Magic Links**, accompanied by a robust session lifecycle policy:
- **Maximum session duration:** 3 days (72 hours hard deadline).
- **Idle session timeout:** 1 day (24 hours sliding window of inactivity).
- **Single-use tokens:** 15-minute validity, stored securely as hashes, immediately invalidated upon consumption.

## 2. Decision Drivers
1. **Zero Credential Exposure:** Eliminates password storage, brute-force attempts, and credential leaks.
2. **Defensible Session Lifecycle:** Strict dual-horizon expiration (hard cap + sliding idle) mitigates risks of abandoned browser tabs on shared or corporate workstations.
3. **Zero Third-Party Commercial SaaS Dependencies:** In accordance with `constitution.md` Section 4, the magic link mechanism must be fully implementable via Node.js native crypto and embedded SQLite, without requiring external auth vendors (e.g., Auth0, Firebase, Supabase).
4. **Auditability & Traceability:** Every link generation, consumption, and expiration event must be auditable.

## 3. Considered Options
1. **Option A: Traditional Password + TOTP MFA:** High friction; requires mobile authenticator app setup and backup code management.
2. **Option B: Third-Party OIDC / Social SSO (e.g., Google Workspace, Microsoft Entra):** Strong, but introduces external network and SaaS dependencies violating the constitutional self-contained runtime principle.
3. **Option C: Native Cryptographic Magic Links with Dual-Horizon SQLite Sessions:** Completely self-contained, cryptographically secure via `node:crypto`, deterministic, and integrates seamlessly with our existing HTTP-only cookie and RBAC infrastructure.

## 4. Decision Outcome
Chosen option: **Option C (Native Cryptographic Magic Links with Dual-Horizon SQLite Sessions)**.

### Architecture Specification
1. **Magic Link Token Generation:**
   - Raw token: 32 bytes of cryptographically secure randomness (`crypto.randomBytes(32).toString('hex')`).
   - Storage: SHA-256 hash of the raw token is persisted in `magic_link_tokens` table with `expires_at = datetime('now', '+15 minutes')`.
   - The plaintext token is never stored in the database; it is only transmitted in the verification URL.
2. **Token Verification & Single-Use Enforcement:**
   - The user visits `/api/auth/verify?token=<raw_token>`.
   - The server computes the SHA-256 hash and executes an atomic query:
     `SELECT * FROM magic_link_tokens WHERE token_hash = ? AND used_at IS NULL AND expires_at > datetime('now');`
   - If valid, `used_at` is immediately stamped with `datetime('now')` to prevent replay attacks.
3. **Dual-Horizon Session Policy:**
   - When a session is initialized, two timestamps are recorded in the `sessions` table:
     - `max_expires_at`: `datetime('now', '+72 hours')` (Absolute Hard Cap).
     - `expires_at`: `datetime('now', '+24 hours')` (Rolling Idle Deadline).
     - `last_active_at`: `datetime('now')`.
   - On every authenticated request:
     - If `now > max_expires_at`: Session is invalidated (Hard Cap reached).
     - If `now > expires_at`: Session is invalidated (Idle Timeout reached).
     - Otherwise: If `now - last_active_at > 60 seconds`, update `last_active_at = now` and `expires_at = min(now + 24 hours, max_expires_at)`.
4. **Cookie Security:**
   - `Set-Cookie: session_token=<token>; HttpOnly; Path=/; SameSite=Strict; Max-Age=259200; Secure`.

## 5. Consequences

### Positive Consequences
- Elimination of password databases, salts, and password reset flows.
- Automated protection against dormant sessions via 24-hour idle expiration.
- Absolute enforcement of re-authentication after 72 hours, adhering to enterprise zero-trust principles.
- Zero external daemon or vendor dependency.

### Negative Consequences / Mitigation
- Requires reliable transactional email transport for production environments. In development/test environments, links are output to the secure server console and returned in test helpers.
- Rate limiting must strictly defend against email inbox spamming (enforced at max 3 requests per 15 minutes per IP/email).


# Specification 011: Magic Link Authentication & Dual-Horizon Session Policy
**Document ID:** SPEC-011  
**Status:** Proposed (Pending Gate 2 Approval)  
**Lifecycle Stage:** Ready for Implementation  
**Owner:** Security Lead & Backend Lead  
**References:** [ADR-006](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/docs/adr/ADR-006-magic-link-authentication.md), [SPEC-005](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/specs/005-auth-and-rbac.md), [constitution.md](file://wsl.localhost/Ubuntu-22.04/home/anitha/workspaces/github.com/MeetAnithaVarghese/nexora-digital-engineering/constitution.md)  

---

## 1. Business Context & Problem Statement
To eliminate password-related attack surfaces and enhance security for internal administrators and editors, Nexora is transitioning to passwordless **Magic Link Authentication**. Furthermore, to balance user convenience against the risk of unmonitored sessions on corporate workstations, sessions must adhere strictly to a **dual-horizon policy**:
- **3-Day (72 Hours) Absolute Maximum Lifetime:** The session unconditionally expires 72 hours after initial login.
- **1-Day (24 Hours) Sliding Idle Timeout:** The session expires after 24 hours of user inactivity. Active requests reset the idle counter without exceeding the 72-hour hard limit.

## 2. User Stories
- **US-1 (Passwordless Sign-In):** As an admin or editor, I want to enter my email address and receive a one-click magic link so I can sign in securely without memorizing or rotating passwords.
- **US-2 (Single-Use Token Security):** As an engineering lead, I want magic link tokens to expire in 15 minutes and become invalid immediately after first use so that forwarded or intercepted links cannot be reused.
- **US-3 (Dual-Horizon Session Expiration):** As a security officer, I want dormant sessions to close after 24 hours of inactivity, while ensuring no session remains open longer than 72 hours under any circumstances.

## 3. Cryptographic Implementation Details

### 3.1 Token Generation & Hashing
- **Raw Token:** 32 cryptographically random bytes generated via `crypto.randomBytes(32).toString('hex')` (64-character hex string).
- **Storage Hash:** The raw token is hashed using SHA-256 (`crypto.createHash('sha256').update(rawToken).digest('hex')`) before database insertion. Plaintext tokens are never stored.
- **Validity Window:** Tokens expire 15 minutes after issuance (`datetime('now', '+15 minutes')`).
- **Single-Use Enforcement:** The database record tracks `used_at DATETIME`. An update query atomically sets `used_at = datetime('now')` upon successful verification.

### 3.2 Dual-Horizon Session Lifecycle
- **Session Record Attributes (`sessions` table):**
  - `token`: Unique 32-byte hex session identifier.
  - `user_id`: Reference to authenticated user.
  - `created_at`: Timestamp of login.
  - `last_active_at`: Timestamp of the most recent authenticated request.
  - `expires_at`: Timestamp of idle expiration (`last_active_at + 24 hours`).
  - `max_expires_at`: Timestamp of hard expiration (`created_at + 72 hours`).
- **Validation Rules (`validateSession(token)`):**
  1. Retrieve session record by token.
  2. If `datetime('now') >= max_expires_at`: Invalidate session (Hard cap exceeded), return `null`.
  3. If `datetime('now') >= expires_at`: Invalidate session (Idle timeout exceeded), return `null`.
  4. If valid: If `datetime('now') - last_active_at >= 60 seconds`, execute sliding update:
     - `UPDATE sessions SET last_active_at = datetime('now'), expires_at = min(datetime('now', '+24 hours'), max_expires_at) WHERE token = ?`.
     - Return user object with role and permissions.

## 4. API Endpoints & Contracts

### 4.1 Request Magic Link
- **Endpoint:** `POST /api/auth/magic-link`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "admin@nexora.example.com"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "If an account exists for this address, a login link has been dispatched."
  }
  ```
- **Security Constraints:** Rate-limited to max 3 requests per 15 minutes per IP/email. Constant-time response to prevent email enumeration.

### 4.2 Verify Magic Link
- **Endpoint:** `GET /api/auth/verify?token=<raw_token>`
- **Workflow:**
  1. Hash raw token with SHA-256.
  2. Query `magic_link_tokens` where `token_hash = ? AND used_at IS NULL AND expires_at > datetime('now')`.
  3. If invalid or expired: Return HTTP 401 with descriptive error view or redirect to `/login?error=expired_or_invalid`.
  4. If valid: Mark `used_at = datetime('now')`, create dual-horizon session in `sessions` table.
  5. Issue cookie:
     `Set-Cookie: session_token=<session_token>; HttpOnly; Path=/; SameSite=Strict; Max-Age=259200; Secure`
  6. Redirect with HTTP 302 to `/admin`.

### 4.3 Session Logout
- **Endpoint:** `POST /api/auth/logout`
- **Workflow:** Deletes session from SQLite datastore and sets cookie with `Max-Age=0`.

## 5. Acceptance Criteria

### Scenario 1: Successful Magic Link Issuance & Login
- **Given** an existing staff user with email `admin@nexora.example.com`,
- **When** `POST /api/auth/magic-link` is invoked with their email,
- **Then** a token is generated, stored as SHA-256 with 15-minute validity, and a 200 OK response is returned.
- **When** `GET /api/auth/verify?token=<valid_raw_token>` is requested,
- **Then** the token is marked used, a session with `max_expires_at` (72h) and `expires_at` (24h) is created, and the client receives a 302 redirect to `/admin` with `session_token` cookie.

### Scenario 2: Prevention of Replay Attacks (Single-Use Token)
- **Given** a magic link token that has already been verified and consumed,
- **When** a user attempts to access `GET /api/auth/verify?token=<already_used_token>`,
- **Then** verification fails with HTTP 401 Unauthorized and no session is created.

### Scenario 3: Expiration of Expired Magic Link
- **Given** a magic link token issued more than 15 minutes ago,
- **When** the user clicks the verification link,
- **Then** verification fails with HTTP 401 Unauthorized.

### Scenario 4: Rolling Idle Timeout (24 Hours Inactivity)
- **Given** an active session with no activity for 24 hours and 1 minute,
- **When** the client submits a request with that session token,
- **Then** `validateSession()` evaluates the session as expired, deletes the record, and returns `null` (HTTP 401).

### Scenario 5: Absolute Hard Cap Enforcement (72 Hours)
- **Given** an active session that has been continually used with active requests every 2 hours for 72 hours and 1 minute,
- **When** the client submits a request,
- **Then** `validateSession()` detects `now >= max_expires_at`, invalidates the session, and rejects the request with HTTP 401.

---

## 6. End-User Executive Presentation Standards
While backend APIs and database schemas maintain `magic_link_tokens` and `/api/auth/magic-link`, all user-facing UI copy in `src/views/admin.js` must follow an executive consulting standard without internal engineering jargon:
- **Title / Headline:** "Client & Staff Portal"
- **Subtitle:** "Sign in with a secure one-time email link. A single-use authentication link will be delivered to your authorized corporate address."
- **Primary CTA Button:** "Send Secure Sign-In Link"
- **Security Notice:** "Protected by encrypted single-use tokens and active session timeouts."


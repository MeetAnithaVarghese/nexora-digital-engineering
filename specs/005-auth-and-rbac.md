# Specification 005: Authentication and Role-Based Access Control (RBAC)
**Document ID:** SPEC-005  
**Status:** Approved  
**Owner:** Security Lead & Backend Lead  

---

## 1. Business Context & Problem Statement
Administrative functions (viewing proprietary enterprise leads, managing published content) must be protected by cryptographic authentication and role segregation.

## 2. Roles and Permissions
- `visitor`: Read public pages, submit lead enquiries, search.
- `editor`: Access `/admin/content`, create/edit drafts.
- `admin`: Full access to `/admin`, `/admin/leads`, user administration, and publishing.

## 3. Cryptographic Implementation
- Passwords stored as: `pbkdf2_sha256(password, salt, 100000)`.
- Session tokens: 32 cryptographically random bytes (`crypto.randomBytes(32).toString('hex')`).
- Cookie flags: `HttpOnly; SameSite=Strict; Path=/; Max-Age=86400`.

## 4. Acceptance Scenarios
- **Scenario 1 (Valid Login):** Given valid admin credentials, When `POST /api/auth/login` is called, Then HTTP 200 is returned with a `Set-Cookie` session header.
- **Scenario 2 (Unauthorized Access):** Given an unauthenticated visitor, When `GET /api/admin/leads` is requested, Then HTTP 401 Unauthorized is returned.
- **Scenario 3 (Role Escalation Prevention):** Given a user with role `editor`, When they attempt to delete a user account or access `/api/admin/leads`, Then HTTP 403 Forbidden is returned.

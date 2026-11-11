# ADR-003: Session-Based Authentication and Role-Based Access Control (RBAC)
**Status:** Approved  
**Deciders:** Principal Architect, Security Lead  
**Date:** 2026-11-11  

---

## 1. Context and Problem Statement
The website requires a protected area for content editors and administrators to manage content, review incoming client enquiries, and update service listings. We must determine the authentication architecture: Stateless JWT vs. Stateful Server-Side Sessions with secure cookies.

## 2. Decision Outcome
Chosen option: **Stateful Server-Side Sessions with HTTP-Only Cookies**.

### Rationale
- JWTs cannot be revoked instantly without complex distributed blacklists.
- B2B administrative users require instant revocation capability upon role downgrade or credential compromise.
- Cookies marked `HttpOnly`, `SameSite=Strict`, and `Secure` eliminate XSS token theft vectors.
- Password storage utilizes PBKDF2 with a unique cryptographically random salt per user (100,000 iterations).

### Role Hierarchy
- `visitor`: Read public content, submit lead enquiries, search.
- `editor`: Create and edit draft content; submit for publishing review.
- `admin`: Publish/archive content, view lead submissions, manage administrative users.


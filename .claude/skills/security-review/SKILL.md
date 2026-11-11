---
name: security-review
description: Conducts security audits covering OWASP Top 10, SQL injection, RBAC enforcement, and secrets leakage.
---

# Skill: Security Review
Use this skill to audit security posture before pull request creation.

## Checks
1. Parameterized SQL verification (`prepare(sql).run(params)`).
2. RBAC check on all `/api/admin/*` endpoints.
3. Cookie attributes: `HttpOnly`, `SameSite=Strict`, `Secure`.
4. Scan for committed secrets or credentials.

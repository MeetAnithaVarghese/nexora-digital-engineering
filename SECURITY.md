# Security Policy: Nexora Digital Engineering
**Classification:** Enterprise Security Guidelines and Vulnerability Disclosure  

---

## 1. Supported Versions
Only the latest release version on the `main` branch is actively supported with security patches.

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |
| < 1.0   | No        |

---

## 2. Reporting a Vulnerability
If you discover a security vulnerability in the Nexora platform, please report it via private channel rather than opening a public GitHub issue.

- **Security Team Contact:** `security@nexora.example.com`
- **Response SLA:** Acknowledgement within 24 hours; preliminary assessment within 72 hours.
- **Remediation SLA:** Critical severity issues resolved within 7 calendar days.

---

## 3. Security Requirements for Contributors & AI Agents
1. **Zero SQL Injection:** All database queries must use prepared statements with parameter binding. Dynamic string concatenation inside SQL statements is strictly prohibited.
2. **Strict Input Sanitization:** All incoming user data from forms, queries, and headers must be validated against schema constraints (type, length, regex format).
3. **Password Security:** All passwords must be salted and hashed using PBKDF2 with at least 100,000 iterations. Plaintext passwords must never touch logs or persistent storage.
4. **Session Protection:** Session identifiers must be cryptographically random (at least 32 bytes from `crypto.randomBytes`) and transmitted with `HttpOnly`, `SameSite=Strict`, and `Secure` attributes.
5. **No Hardcoded Secrets:** Any API keys, secrets, or administrative passwords found committed to git will trigger an immediate mandatory credential rotation and git history scrub.

# Specification 006: Contact Form and Lead Management
**Document ID:** SPEC-006  
**Status:** Approved  
**Owner:** Product Manager & Full-Stack Lead  

---

## 1. Business Context
The contact form is Nexora's primary conversion pipeline. Every submission represents prospective consulting revenue. Submissions must be validated, persisted, rate-limited against abuse, and made accessible to authorized sales leads.

## 2. Functional Requirements
- **FR-6.1:** Fields: `fullName` (required, 2-100 chars), `email` (required, RFC 5322 format), `company` (required, 2-100 chars), `serviceInterest` (required, enum matching services), `message` (required, 10-2000 chars).
- **FR-6.2:** Rate Limiting: Max 5 submissions per IP per 15-minute window.
- **FR-6.3:** Persistence: Store in `leads` table with timestamp and status `new`.
- **FR-6.4:** Notification: Dispatch internal notification (mocked or SMTP).

## 3. Acceptance Scenarios
- **Scenario 1 (Valid Submission):** When valid contact data is posted to `POST /api/leads`, Then HTTP 201 Created is returned with `{ success: true, leadId: ... }`.
- **Scenario 2 (Invalid Email):** When an invalid email (e.g., `notanemail`) is posted, Then HTTP 400 Bad Request is returned with code `INVALID_EMAIL`.
- **Scenario 3 (Adversarial Rapid Submission):** When 6 rapid submissions are made from the same IP within 1 minute, Then the 6th returns HTTP 429 Too Many Requests.

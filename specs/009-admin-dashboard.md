# Specification 009: Protected Admin Dashboard & Lead Review
**Document ID:** SPEC-009  
**Status:** Approved  
**Owner:** Product Manager & Security Lead  

---

## 1. Business Context
Provide internal consulting managers and editors with a fast, secure portal to inspect incoming client leads, change lead status (`new`, `contacted`, `qualified`, `archived`), and manage content.

## 2. Functional Requirements
- **FR-9.1 Metrics Bar:** Displays total leads, new leads, published articles, and system status.
- **FR-9.2 Leads Table:** Sortable list of submissions with filter by status.
- **FR-9.3 Content Management Table:** Create/edit draft articles, transition status to published.
- **FR-9.4 Session Logout:** Invalidate session token on server and clear client cookie.


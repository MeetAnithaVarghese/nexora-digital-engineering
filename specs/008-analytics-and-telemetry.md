# Specification 008: Analytics & Telemetry Taxonomy
**Document ID:** SPEC-008  
**Status:** Approved  
**Owner:** Growth Lead & Data Architect  

---

## 1. Business Context
Understand visitor engagement, conversion bottlenecks, and content effectiveness across the consulting lifecycle.

## 2. Event Taxonomy Matrix
- `page_view`: Page path, title, referrer.
- `service_click`: Service slug, origin component.
- `lead_form_start`: First interaction with contact input.
- `lead_form_submit`: Form outcome (`success` / `validation_error`).
- `search_query`: Search term, results count.
- `admin_login`: Timestamp, role, success boolean.

## 3. Privacy & Consent
- Zero PII (Personally Identifiable Information) in telemetry payloads.
- Anonymized IP addresses for compliance with GDPR.

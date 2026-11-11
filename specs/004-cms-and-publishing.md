# Specification 004: Content Management & Publishing Workflow
**Document ID:** SPEC-004  
**Status:** Approved  
**Owner:** Product Manager  

---

## 1. Business Context
Nexora publishes insights, technical articles, and case studies to demonstrate domain authority. The CMS must enforce editorial oversight so that unverified content cannot be published without approval.

## 2. Functional Requirements
- **FR-4.1:** Article states: `draft`, `under_review`, `published`, `archived`.
- **FR-4.2:** Editors can create and update articles in `draft` or submit them to `under_review`.
- **FR-4.3:** Admins can transition articles to `published` or `archived`.
- **FR-4.4:** Public endpoints (`/insights`, `/insights/:slug`) only query and return articles with `status = 'published'`.

## 3. Acceptance Scenarios
- **Scenario 1:** Given an article with status `draft`, When a public visitor requests `/api/articles`, Then the draft article is omitted from results.
- **Scenario 2:** Given an admin logged into `/admin`, When they approve an article to `published`, Then the article immediately appears in `/insights` and `/sitemap.xml`.

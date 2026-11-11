# Specification 007: SEO, AEO, and GEO Optimization Engine
**Document ID:** SPEC-007  
**Status:** Approved  
**Owner:** Technical Marketing & SEO Specialist  

---

## 1. Business Context & Objective
Maximize organic enterprise visibility across traditional search engines (Google, Bing), conversational answer engines (Perplexity, ChatGPT Search, Claude), and generative AI crawlers (GEO).

## 2. Technical Requirements
- **FR-7.1 XML Sitemap:** Dynamic `/sitemap.xml` listing all published pages and articles with `<lastmod>` timestamps.
- **FR-7.2 Robots.txt:** Expose `/robots.txt` allowing indexing on public routes while disallowing `/admin` and `/api`.
- **FR-7.3 Structured Data (JSON-LD):**
  - Homepage: `Organization` schema with name, URL, logo, and services.
  - Service Pages: `Service` schema with provider, description, and audience.
  - Insights / Articles: `TechArticle` schema with author, datePublished, and headline.
  - FAQ Sections: `FAQPage` schema with questions and exact answers.
- **FR-7.4 Canonical URLs:** Explicit `<link rel="canonical" href="...">` on all renderable pages.

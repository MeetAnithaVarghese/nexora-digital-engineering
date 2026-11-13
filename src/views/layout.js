// Base HTML Layout Module for Nexora Digital Engineering
const config = require('../config');
const { getOrganizationJsonLd } = require('../server/seo');

function renderLayout({ title, description, canonicalUrl, activeNav = '', bodyContent, jsonLd = null }) {
  const pageTitle = title ? `${title} | Nexora Digital Engineering` : 'Nexora Digital Engineering | Elite B2B Technology Consulting';
  const metaDesc = description || 'Nexora Digital Engineering architects resilient AI-native systems, cloud platforms, cybersecurity, and modern software products for high-growth enterprises.';
  const canonical = canonicalUrl || config.baseUrl;
  const structuredData = jsonLd || getOrganizationJsonLd();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Meta -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Nexora Digital Engineering">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  
  <!-- Preconnect & Executive Typography System (Plus Jakarta Sans, Inter, JetBrains Mono) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap">

  <!-- Enterprise Design System Stylesheet -->
  <link rel="stylesheet" href="/public/css/styles.css">
  
  <!-- Schema.org JSON-LD (SEO/AEO/GEO) -->
  <script type="application/ld+json">
    ${structuredData}
  </script>
</head>
<body>
  <!-- Accessibility Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Semantic Header & Navigation -->
  <header class="site-header" id="siteHeader">
    <div class="container header-inner">
      <a href="/" class="logo-brand" aria-label="Nexora Digital Engineering Home">
        <span class="logo-icon">
          <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="prism-facet-a" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0052CC"/>
                <stop offset="100%" stop-color="#0747A6"/>
              </linearGradient>
              <linearGradient id="prism-facet-b" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284C7"/>
                <stop offset="100%" stop-color="#0052CC"/>
              </linearGradient>
              <linearGradient id="prism-facet-c" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#0A192F"/>
                <stop offset="100%" stop-color="#1E293B"/>
              </linearGradient>
            </defs>
            <path d="M18 3L4 11V25L18 33V3Z" fill="url(#prism-facet-a)"/>
            <path d="M18 3L32 11L18 19V3Z" fill="url(#prism-facet-b)"/>
            <path d="M18 19L32 11V25L18 33V19Z" fill="url(#prism-facet-c)"/>
            <path d="M18 3V33" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
            <path d="M4 11L18 19L32 11" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
          </svg>
        </span>
        <span class="logo-text">
          <span class="logo-title">NEXORA</span>
          <span class="logo-subtitle">Digital Engineering</span>
        </span>
      </a>
      
      <!-- Accessible Mobile Navigation Toggle -->
      <button class="mobile-nav-toggle" id="mobileNavToggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>

      <nav aria-label="Main Navigation" id="primary-nav" class="nav-container">
        <ul class="nav-links">
          <!-- Services Dropdown -->
          <li class="nav-item has-dropdown">
            <a href="/services" class="nav-link ${activeNav === 'services' ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">
              <span>Services</span>
              <svg class="dropdown-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-lg" role="menu">
              <div class="dropdown-grid">
                <a href="/services/ai-data-engineering" class="dropdown-item" role="menuitem">
                  <span class="dropdown-item-title">AI & Data Engineering</span>
                  <span class="dropdown-item-desc">Enterprise ML, Data Fabrics & LLM Orchestration</span>
                </a>
                <a href="/services/software-product-engineering" class="dropdown-item" role="menuitem">
                  <span class="dropdown-item-title">Software Product Engineering</span>
                  <span class="dropdown-item-desc">Distributed Systems, Microservices & High-Scale APIs</span>
                </a>
                <a href="/services/cloud-platform-engineering" class="dropdown-item" role="menuitem">
                  <span class="dropdown-item-title">Cloud & Platform Engineering</span>
                  <span class="dropdown-item-desc">Kubernetes, Multi-Cloud Foundations & Infrastructure as Code</span>
                </a>
                <a href="/services/cybersecurity-governance" class="dropdown-item" role="menuitem">
                  <span class="dropdown-item-title">Cybersecurity & Governance</span>
                  <span class="dropdown-item-desc">Zero-Trust Architecture, DevSecOps & Regulatory Compliance</span>
                </a>
                <a href="/services/digital-transformation" class="dropdown-item" role="menuitem">
                  <span class="dropdown-item-title">Digital Transformation</span>
                  <span class="dropdown-item-desc">Legacy Core Modernization & Cloud Migration Strategies</span>
                </a>
                <a href="/services/quality-engineering" class="dropdown-item" role="menuitem">
                  <span class="dropdown-item-title">Quality Engineering</span>
                  <span class="dropdown-item-desc">Continuous Testing, Chaos Engineering & Resiliency</span>
                </a>
              </div>
              <div class="dropdown-footer">
                <a href="/services" class="dropdown-footer-link">View All Capabilities & Practice Blueprints &rarr;</a>
              </div>
            </div>
          </li>

          <!-- Industries Dropdown -->
          <li class="nav-item has-dropdown">
            <a href="/industries" class="nav-link ${activeNav === 'industries' ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">
              <span>Industries</span>
              <svg class="dropdown-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-md" role="menu">
              <a href="/industries#fintech" class="dropdown-item" role="menuitem">
                <span class="dropdown-item-title">Financial Services & Banking</span>
                <span class="dropdown-item-desc">High-frequency settlement, regulatory reporting & fraud mitigation</span>
              </a>
              <a href="/industries#healthcare" class="dropdown-item" role="menuitem">
                <span class="dropdown-item-title">Healthcare & Life Sciences</span>
                <span class="dropdown-item-desc">HIPAA-compliant data fabrics & verified clinical workflows</span>
              </a>
              <a href="/industries#retail" class="dropdown-item" role="menuitem">
                <span class="dropdown-item-title">Retail & Supply Chain</span>
                <span class="dropdown-item-desc">High-concurrency digital commerce & real-time inventory</span>
              </a>
              <a href="/industries#saas" class="dropdown-item" role="menuitem">
                <span class="dropdown-item-title">Enterprise SaaS</span>
                <span class="dropdown-item-desc">Multi-tenant architecture & elastic subscription scale</span>
              </a>
            </div>
          </li>

          <!-- Insights Dropdown -->
          <li class="nav-item has-dropdown">
            <a href="/insights" class="nav-link ${activeNav === 'insights' ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">
              <span>Insights</span>
              <svg class="dropdown-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-sm" role="menu">
              <a href="/insights/architecting-ai-native-software-systems" class="dropdown-item" role="menuitem">
                <span class="dropdown-item-title">AI-Native Systems Architecture</span>
                <span class="dropdown-item-desc">Agent orchestration, specification-first discipline &amp; verification</span>
              </a>
              <a href="/insights/zero-trust-kubernetes-platform-hardening" class="dropdown-item" role="menuitem">
                <span class="dropdown-item-title">Zero-Trust Kubernetes Hardening</span>
                <span class="dropdown-item-desc">Cilium eBPF mesh, mutual TLS &amp; regulated cloud platforms</span>
              </a>
              <a href="/insights/adversarial-testing-in-continuous-delivery" class="dropdown-item" role="menuitem">
                <span class="dropdown-item-title">Adversarial Testing in CI/CD</span>
                <span class="dropdown-item-desc">Chaos engineering, automated fuzzing &amp; fault resilience</span>
              </a>
              <div style="border-top: 1px solid var(--color-border); margin-top: 0.35rem; padding-top: 0.35rem;">
                <a href="/insights" class="dropdown-item" role="menuitem" style="font-weight: 700; color: var(--color-primary);">
                  <span>Explore All Insights &amp; Whitepapers &rarr;</span>
                </a>
              </div>
            </div>
          </li>

          <li class="nav-item"><a href="/case-studies" class="nav-link ${activeNav === 'case-studies' ? 'active' : ''}">Case Studies</a></li>
          <li class="nav-item"><a href="/about" class="nav-link ${activeNav === 'about' ? 'active' : ''}">About</a></li>
        </ul>

        <!-- Right Utilities & Primary CTA -->
        <div class="nav-actions">
          <a href="/search" class="nav-action-btn search-btn" aria-label="Search Nexora Knowledge Base" title="Search">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 17L13.25 13.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/admin" class="nav-action-link" title="Client / Staff Portal">Client Portal</a>
          <a href="/contact" class="btn btn-primary btn-sm cta-schedule">Schedule Consultation</a>
        </div>
      </nav>
    </div>
  </header>

  <!-- Main Content Landmark -->
  <main class="site-main page-wrapper" id="main-content">
    ${bodyContent}
  </main>

  <!-- Semantic Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="logo-brand" style="margin-bottom: 1rem;">
            <span class="logo-icon">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 3L4 11V25L18 33V3Z" fill="#0052CC"/>
                <path d="M18 3L32 11L18 19V3Z" fill="#0284C7"/>
                <path d="M18 19L32 11V25L18 33V19Z" fill="#0A192F"/>
                <path d="M18 3V33" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
                <path d="M4 11L18 19L32 11" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
              </svg>
            </span>
            <span class="logo-text">
              <span class="logo-title">NEXORA</span>
              <span class="logo-subtitle">Digital Engineering</span>
            </span>
          </div>
          <p style="max-width: 340px; margin-bottom: 1rem;">
            Pioneering modern enterprise platforms, cloud infrastructure, cybersecurity governance, and digital transformation.
          </p>
          <p style="font-size: 0.85rem; color: var(--color-text-dim);">
            Global Delivery Centers: New York • London • Singapore • Bangalore
          </p>
        </div>
        
        <div>
          <h4 class="footer-heading">Capabilities</h4>
          <ul class="footer-links">
            <li><a href="/services/ai-data-engineering">AI & Data Engineering</a></li>
            <li><a href="/services/software-product-engineering">Software Engineering</a></li>
            <li><a href="/services/cloud-platform-engineering">Cloud & Platforms</a></li>
            <li><a href="/services/cybersecurity-governance">Cybersecurity</a></li>
            <li><a href="/services/digital-transformation">Transformation</a></li>
            <li><a href="/services/quality-engineering">Quality Engineering</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Resources</h4>
          <ul class="footer-links">
            <li><a href="/insights">Technical Insights</a></li>
            <li><a href="/case-studies">Client Case Studies</a></li>
            <li><a href="/industries">Industry Solutions</a></li>            
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Engagement</h4>
          <ul class="footer-links">
            <li><a href="/contact">Schedule Consultation</a></li>
            <li><a href="/about">Leadership & Values</a></li>
            <li><a href="/admin">Internal Portal</a></li>
            <li><a href="mailto:contact@nexoradigital.com">contact@nexoradigital.com</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Nexora Digital Engineering LLC. All rights reserved.</p>
        <p>Global Enterprise Technology Advisory & Engineering.</p>
      </div>
    </div>
  </footer>

  <script src="/public/js/app.js"></script>
</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = {
  renderLayout,
  escapeHtml
};


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
  
  <!-- Enterprise Design System Stylesheet -->
  <link rel="stylesheet" href="/public/css/styles.css">
  
  <!-- Schema.org JSON-LD (SEO/AEO/GEO) -->
  <script type="application/ld+json">
    ${structuredData}
  </script>
</head>
<body>
  <!-- Semantic Header & Navigation -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="logo-brand">
        <span class="logo-badge">NEXORA</span>
        <span>Digital Engineering</span>
      </a>
      
      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="/" class="${activeNav === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="/about" class="${activeNav === 'about' ? 'active' : ''}">About</a></li>
          <li><a href="/services" class="${activeNav === 'services' ? 'active' : ''}">Services</a></li>
          <li><a href="/industries" class="${activeNav === 'industries' ? 'active' : ''}">Industries</a></li>
          <li><a href="/case-studies" class="${activeNav === 'case-studies' ? 'active' : ''}">Case Studies</a></li>
          <li><a href="/insights" class="${activeNav === 'insights' ? 'active' : ''}">Insights</a></li>
          <li><a href="/search" class="${activeNav === 'search' ? 'active' : ''}">Search</a></li>
          <li><a href="/admin" class="${activeNav === 'admin' ? 'active' : ''}">Admin Portal</a></li>
          <li><a href="/contact" class="btn btn-primary btn-sm">Schedule Consultation</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main Content Landmark -->
  <main class="site-main" id="main-content">
    ${bodyContent}
  </main>

  <!-- Semantic Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="logo-brand" style="margin-bottom: 1rem;">
            <span class="logo-badge">NEXORA</span>
            <span>Digital Engineering</span>
          </div>
          <p style="max-width: 340px; margin-bottom: 1rem;">
            Pioneering AI-native systems, cloud infrastructure, cybersecurity governance, and enterprise digital transformation.
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
            <li><a href="/sitemap.xml">XML Sitemap</a></li>
            <li><a href="/robots.txt">Robots.txt</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Engagement</h4>
          <ul class="footer-links">
            <li><a href="/contact">Schedule Consultation</a></li>
            <li><a href="/about">Leadership & Values</a></li>
            <li><a href="/admin">Internal Portal</a></li>
            <li><a href="mailto:contact@nexora.example.com">contact@nexora.example.com</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Nexora Digital Engineering LLC. All rights reserved.</p>
        <p>Built with Specification-Driven AI-Native Engineering.</p>
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

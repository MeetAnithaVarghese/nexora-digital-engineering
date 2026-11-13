const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { renderLayout } = require('../../src/views/layout');
const { renderLoginPage } = require('../../src/views/admin');
const {
  renderHomePage,
  renderAboutPage,
  renderServicesPage,
  renderServiceDetailPage,
  renderIndustriesPage,
  renderIndustryDetailPage,
  renderCaseStudiesPage,
  renderCaseStudyDetailPage,
  renderInsightsPage,
  renderArticleDetailPage,
  renderContactPage,
  renderSalesConversionBanner,
  INDUSTRIES
} = require('../../src/views/pages');
const { handleRequest } = require('../../src/server/routes');

test('UI/UX: renderLayout includes accessible skip link', () => {
  const html = renderLayout({ title: 'Test Page', bodyContent: '<p>Content</p>' });
  assert.ok(html.includes('<a href="#main-content" class="skip-link">Skip to main content</a>'));
  assert.ok(html.includes('id="main-content"'));
});

test('UI/UX: renderLayout includes custom SVG prism logo, accessible navigation and dropdown menus', () => {
  const html = renderLayout({ title: 'Test Page', bodyContent: '<p>Content</p>' });
  assert.ok(html.includes('id="mobileNavToggle"'));
  assert.ok(html.includes('aria-expanded="false"'));
  assert.ok(html.includes('aria-controls="primary-nav"'));
  assert.ok(html.includes('id="primary-nav"'));
  
  // Custom SVG prism monogram logo and two-tone wordmark
  assert.ok(html.includes('<svg width="34" height="34"'));
  assert.ok(html.includes('class="logo-title">NEXORA</span>'));
  assert.ok(html.includes('class="logo-subtitle">Digital Engineering</span>'));

  // Dropdown menus
  assert.ok(html.includes('class="dropdown-menu dropdown-menu-lg"'));
  assert.ok(html.includes('class="dropdown-menu dropdown-menu-md"'));
  assert.ok(html.includes('class="dropdown-menu dropdown-menu-sm"'));
  assert.ok(html.includes('href="/services/ai-data-engineering"'));
  assert.ok(html.includes('href="/services/cybersecurity-governance"'));
  assert.ok(html.includes('href="/industries#fintech"'));
  
  // Core and utility navigation
  assert.ok(html.includes('href="/services"'));
  assert.ok(html.includes('href="/industries"'));
  assert.ok(html.includes('href="/case-studies"'));
  assert.ok(html.includes('href="/insights"'));
  assert.ok(html.includes('href="/about"'));
  assert.ok(html.includes('href="/search"'));
  assert.ok(html.includes('href="/admin"'));
  assert.ok(html.includes('href="/contact"'));
});

test('UI/UX: styles.css defines light-mode executive tokens, glassmorphism, and responsive breakpoints', () => {
  const cssPath = path.join(__dirname, '../../src/public/css/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Verify Light Executive Palette tokens
  assert.ok(css.includes('--color-bg: #FFFFFF;'));
  assert.ok(css.includes('--color-surface: #F8FAFC;'));
  assert.ok(css.includes('--color-surface-subtle: #F0F7FF;'));
  assert.ok(css.includes('--color-border: #E2E8F0;'));
  assert.ok(css.includes('--color-text-main: #0A192F;'));
  assert.ok(css.includes('--color-text-body: #334155;'));
  assert.ok(css.includes('--color-text-muted: #475569;'));
  assert.ok(css.includes('--color-text-dim: #64748B;'));
  assert.ok(css.includes('--color-primary: #0052CC;'));
  assert.ok(css.includes('--color-accent: #0284C7;'));
  assert.ok(css.includes('--focus-ring:'));
  assert.ok(css.includes('.skip-link'));
  assert.ok(css.includes('.mobile-nav-toggle'));

  // Verify ambient mesh canvas & glassmorphic cards
  assert.ok(css.includes('radial-gradient('));
  assert.ok(css.includes('backdrop-filter: blur(16px);'));
  assert.ok(css.includes('.dropdown-menu'));
  assert.ok(css.includes('color: #FFFFFF !important;'));

  // Verify 5 discrete component states
  assert.ok(css.includes('.state-idle'));
  assert.ok(css.includes('.state-loading'));
  assert.ok(css.includes('.state-empty'));
  assert.ok(css.includes('.state-error'));
  assert.ok(css.includes('.state-success'));

  // Verify fluid breakpoints
  assert.ok(css.includes('@media (max-width: 640px)'));
  assert.ok(css.includes('@media (max-width: 768px)'));
  assert.ok(css.includes('@media (max-width: 1024px)'));
  assert.ok(css.includes('@media (min-width: 1280px)'));
});

test('UI/UX: all 12 bespoke light-mode SVG architectural diagrams exist', () => {
  const imagesDir = path.join(__dirname, '../../src/public/images');
  const expectedSvgs = [
    'hero-architecture.svg',
    'nexora-enterprise-blueprint.svg',
    'nexora-about-governance.svg',
    'service-ai-data.svg',
    'service-software-product.svg',
    'service-cloud-platform.svg',
    'service-cybersecurity.svg',
    'service-digital-transformation.svg',
    'service-quality-engineering.svg',
    'case-study-fintech.svg',
    'case-study-healthcare.svg',
    'insight-ai-architecture.svg'
  ];

  for (const svgFile of expectedSvgs) {
    const fullPath = path.join(imagesDir, svgFile);
    assert.ok(fs.existsSync(fullPath), `SVG file missing: ${svgFile}`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.ok(content.includes('<svg'), `Invalid SVG: ${svgFile}`);
    assert.ok(content.includes('#0052CC') || content.includes('#0284C7') || content.includes('#0A192F'), `Light executive palette colors expected in: ${svgFile}`);
  }
});

test('UI/UX: pages render bespoke SVG diagrams', () => {
  const dummyServices = [
    { slug: 'ai-data-engineering', title: 'AI & Data Engineering', tagline: 'Scalable pipelines', summary: 'AI systems', features_json: '["Feature A"]', capabilities_json: '["Cap A"]' }
  ];
  const dummyCaseStudies = [
    { slug: 'fintech-realtime-settlement-engine', title: 'Real-Time Settlement', client_industry: 'Fintech', challenge: 'High latency', solution: 'Distributed ledger', outcome_metrics_json: '[]' }
  ];
  const dummyArticles = [
    { slug: 'ai-architecture', title: 'AI Architecture', category: 'AI Architecture', summary: 'Architecting AI', author: 'Dr. Jane Doe', published_at: '2026-01-01' }
  ];

  const homeHtml = renderHomePage(dummyServices, dummyCaseStudies, dummyArticles);
  assert.ok(homeHtml.includes('nexora-enterprise-blueprint.svg'));
  assert.ok(homeHtml.includes('/public/images/service-ai-data-engineering.svg'));
  assert.ok(homeHtml.includes('/public/images/case-study-fintech.svg'));

  const servicesHtml = renderServicesPage(dummyServices);
  assert.ok(servicesHtml.includes('/public/images/service-ai-data-engineering.svg'));

  const detailHtml = renderServiceDetailPage(dummyServices[0]);
  assert.ok(detailHtml.includes('/public/images/service-ai-data-engineering.svg'));

  const caseStudiesHtml = renderCaseStudiesPage(dummyCaseStudies);
  assert.ok(caseStudiesHtml.includes('/public/images/case-study-fintech.svg'));

  const insightsHtml = renderInsightsPage(dummyArticles);
  assert.ok(insightsHtml.includes('/public/images/insight-ai-architecture.svg'));
});

test('UI/UX: renderLoginPage renders passwordless form with executive copy', () => {
  const loginHtml = renderLoginPage();
  assert.ok(loginHtml.includes('action="/api/auth/magic-link"'));
  assert.ok(loginHtml.includes('Send Secure Sign-In Link'));
  assert.ok(loginHtml.includes('Sign in with a secure one-time email link'));
});

test('UI/UX: universal clickable card pattern across listing and home pages', () => {
  const dummyServices = [
    { slug: 'ai-data-engineering', title: 'AI & Data Engineering', tagline: 'Pipelines', summary: 'AI summary', features_json: '["Feature A"]', capabilities_json: '["Cap A"]' }
  ];
  const dummyCaseStudies = [
    { slug: 'fintech-realtime-settlement-engine', title: 'FinTech Settlement Engine', client_industry: 'Financial Services', challenge: 'High latency', solution: 'Distributed memory core', outcome_metrics_json: '[{"metric":"Latency","value":"< 12ms"}]' }
  ];
  const dummyArticles = [
    { slug: 'zero-trust-kubernetes-platform-hardening', title: 'Zero-Trust Kubernetes', category: 'Cloud & Platform', summary: 'eBPF security', author: 'Elena Rostova', published_at: '2026-01-01' }
  ];

  // Homepage card navigation
  const homeHtml = renderHomePage(dummyServices, dummyCaseStudies, dummyArticles);
  assert.ok(homeHtml.includes('href="/services/ai-data-engineering"'));
  assert.ok(homeHtml.includes('View Architecture &amp; Deliverables'));
  assert.ok(homeHtml.includes('href="/case-studies/fintech-realtime-settlement-engine"'));
  assert.ok(homeHtml.includes('Explore Full Case Study'));
  assert.ok(homeHtml.includes('href="/insights/zero-trust-kubernetes-platform-hardening"'));
  assert.ok(homeHtml.includes('Read Whitepaper'));

  // Services listing card navigation
  const servicesHtml = renderServicesPage(dummyServices);
  assert.ok(servicesHtml.includes('class="card-img-link"'));
  assert.ok(servicesHtml.includes('href="/services/ai-data-engineering"'));
  assert.ok(servicesHtml.includes('View Architecture &amp; Deliverables'));

  // Case Studies listing card navigation
  const caseStudiesHtml = renderCaseStudiesPage(dummyCaseStudies);
  assert.ok(caseStudiesHtml.includes('class="card-img-link"'));
  assert.ok(caseStudiesHtml.includes('href="/case-studies/fintech-realtime-settlement-engine"'));
  assert.ok(caseStudiesHtml.includes('Explore Full Case Study'));

  // Insights listing card navigation
  const insightsHtml = renderInsightsPage(dummyArticles);
  assert.ok(insightsHtml.includes('class="card-img-link"'));
  assert.ok(insightsHtml.includes('href="/insights/zero-trust-kubernetes-platform-hardening"'));
  assert.ok(insightsHtml.includes('Read Whitepaper'));

  // Industries listing card navigation
  const industriesHtml = renderIndustriesPage();
  assert.ok(industriesHtml.includes('class="card-img-link"'));
  assert.ok(industriesHtml.includes('href="/industries/financial-services"'));
  assert.ok(industriesHtml.includes('Explore Domain Solutions'));
  assert.ok(industriesHtml.includes('Discuss Industry Requirements'));
  assert.ok(industriesHtml.includes('/contact?industry=financial-services'));
  assert.ok(industriesHtml.includes('compliance-pill'));
  assert.ok(industriesHtml.includes('PCI-DSS &amp; ISO 20022'));
  assert.ok(industriesHtml.includes('card-metric-pill'));
});

test('UI/UX: rich detail pages render breadcrumbs, figures with figcaption, and structured executive sections', () => {
  const dummyService = {
    slug: 'software-product-engineering',
    title: 'Software Product Engineering',
    tagline: 'High-Concurrency Systems',
    summary: 'Distributed microservices architecture',
    features_json: '["Autonomous Workflows", "Type-Safe Contracts"]',
    capabilities_json: '["Distributed Tracing", "Multi-Region Event Mesh"]'
  };

  const dummyCaseStudy = {
    slug: 'healthcare-hipaa-rag-clinical-platform',
    title: 'HIPAA-Compliant Clinical Decision Support',
    client_industry: 'Healthcare & Life Sciences',
    challenge: 'Physicians spent 3+ hours daily navigating fragmented records.',
    solution: 'Zero-data-retention RAG platform with cryptographically attested vector indices.',
    outcome_metrics_json: JSON.stringify([
      { metric: 'Chart Synthesis Time', value: '-68%', description: 'Saved 2 hours per shift' },
      { metric: 'Accuracy', value: '99.4%', description: 'Peer-reviewed match' }
    ])
  };

  const dummyArticle = {
    slug: 'architecting-ai-native-software-systems',
    title: 'Architecting AI-Native Software Systems',
    category: 'AI & Data Engineering',
    summary: 'Moving from developer autocomplete to deterministic agentic workflows.',
    body_markdown: 'Detailed analysis of dual-layer verification and task boundaries.',
    author: 'Dr. Marcus Vance, Chief Architect',
    published_at: '2026-11-01'
  };

  const dummyIndustry = INDUSTRIES[0]; // Financial Services

  // 1. Service Detail
  const serviceDetail = renderServiceDetailPage(dummyService, [dummyCaseStudy]);
  assert.ok(serviceDetail.includes('class="breadcrumbs"'));
  assert.ok(serviceDetail.includes('Home'));
  assert.ok(serviceDetail.includes('Services'));
  assert.ok(serviceDetail.includes('<figure class="detail-figure">'));
  assert.ok(serviceDetail.includes('<figcaption class="detail-figcaption">'));
  assert.ok(serviceDetail.includes('Strategic Practice Overview'));
  assert.ok(serviceDetail.includes('Enterprise Architecture Deliverables'));
  assert.ok(serviceDetail.includes('Core Capabilities &amp; Production Toolchains'));
  assert.ok(serviceDetail.includes('Representative Case Studies'));
  assert.ok(serviceDetail.includes('Request Architecture Brief'));

  // 2. Case Study Detail
  const caseStudyDetail = renderCaseStudyDetailPage(dummyCaseStudy, [dummyService]);
  assert.ok(caseStudyDetail.includes('class="breadcrumbs"'));
  assert.ok(caseStudyDetail.includes('Case Studies'));
  assert.ok(caseStudyDetail.includes('<figure class="detail-figure">'));
  assert.ok(caseStudyDetail.includes('<figcaption class="detail-figcaption">'));
  assert.ok(caseStudyDetail.includes('-68%'));
  assert.ok(caseStudyDetail.includes('Enterprise Business Challenge'));
  assert.ok(caseStudyDetail.includes('Engineered Solution Architecture'));
  assert.ok(caseStudyDetail.includes('Measured Outcomes &amp; Impact Timeline'));
  assert.ok(caseStudyDetail.includes('Initiate Similar Transformation'));

  // 3. Article Detail
  const articleDetail = renderArticleDetailPage(dummyArticle, [], [dummyService]);
  assert.ok(articleDetail.includes('class="breadcrumbs"'));
  assert.ok(articleDetail.includes('Insights'));
  assert.ok(articleDetail.includes('<figure class="detail-figure">'));
  assert.ok(articleDetail.includes('<figcaption class="detail-figcaption">'));
  assert.ok(articleDetail.includes('Executive Summary'));
  assert.ok(articleDetail.includes('In-Depth Architectural Analysis'));
  assert.ok(articleDetail.includes('Strategic Implementation Recommendations'));
  assert.ok(articleDetail.includes('Schedule Executive Briefing'));

  // 4. Industry Detail
  const industryDetail = renderIndustryDetailPage(dummyIndustry, [dummyCaseStudy], [dummyService]);
  assert.ok(industryDetail.includes('class="breadcrumbs"'));
  assert.ok(industryDetail.includes('Industries'));
  assert.ok(industryDetail.includes('<figure class="detail-figure">'));
  assert.ok(industryDetail.includes('<figcaption class="detail-figcaption">'));
  assert.ok(industryDetail.includes('Industry Regulatory &amp; Operational Challenges'));
  assert.ok(industryDetail.includes('Nexora Reference Architecture'));
  assert.ok(industryDetail.includes('Key Capabilities &amp; Deliverables'));
  assert.ok(industryDetail.includes('Related Case Studies'));
  assert.ok(industryDetail.includes('Discuss Financial Services &amp; Banking Requirements'));
  assert.ok(industryDetail.includes('href="/contact?industry=financial-services"'));
});

test('UI/UX: contact page pre-selects industry domain and displays advisory context banner', () => {
  // Test with industry query parameter (e.g. ?industry=healthcare)
  const contactHealthcare = renderContactPage('', 'healthcare');
  assert.ok(contactHealthcare.includes('Dedicated Domain Advisory'));
  assert.ok(contactHealthcare.includes('Healthcare &amp; Life Sciences Practice Consultation'));
  assert.ok(contactHealthcare.includes('HIPAA &amp; HL7 FHIR'));
  assert.ok(contactHealthcare.includes('<option value="healthcare" selected>'));
  // Default service for healthcare is ai-data-engineering (clinical RAG & data fabrics)
  assert.ok(contactHealthcare.includes('<option value="ai-data-engineering" selected>'));

  // Test with financial services
  const contactFintech = renderContactPage('', 'financial-services');
  assert.ok(contactFintech.includes('Financial Services &amp; Banking Practice Consultation'));
  assert.ok(contactFintech.includes('<option value="financial-services" selected>'));
  assert.ok(contactFintech.includes('<option value="software-product-engineering" selected>'));

  // Test general contact page (no query params)
  const contactGeneral = renderContactPage();
  assert.ok(!contactGeneral.includes('Dedicated Domain Advisory'));
  assert.ok(contactGeneral.includes('-- General Technology Architecture --'));
});

test('UI/UX: renderAboutPage renders executive two-column layout, governance visual, impact strip, and 2x2 principles grid', () => {
  const aboutHtml = renderAboutPage();
  
  // Two-column executive hero
  assert.ok(aboutHtml.includes('about-hero-grid'));
  assert.ok(aboutHtml.includes('about-hero-text'));
  assert.ok(aboutHtml.includes('about-hero-visual'));
  assert.ok(aboutHtml.includes('/images/nexora-about-governance.svg'));
  assert.ok(aboutHtml.includes('Schedule Executive Consultation'));
  assert.ok(aboutHtml.includes('Explore Practice Areas'));

  // Executive Impact Strip (4-column)
  assert.ok(aboutHtml.includes('impact-strip'));
  assert.ok(aboutHtml.includes('99.99%'));
  assert.ok(aboutHtml.includes('Uptime SLA Target'));
  assert.ok(aboutHtml.includes('50+'));
  assert.ok(aboutHtml.includes('Enterprise Platforms'));
  assert.ok(aboutHtml.includes('100%'));
  assert.ok(aboutHtml.includes('Audit Traceability'));
  assert.ok(aboutHtml.includes('Global'));
  assert.ok(aboutHtml.includes('Delivery Hubs'));

  // 2x2 Glassmorphic Principles Grid
  assert.ok(aboutHtml.includes('principles-grid'));
  assert.ok(aboutHtml.includes('Architecture-First Discipline'));
  assert.ok(aboutHtml.includes('Lean Enterprise Systems'));
  assert.ok(aboutHtml.includes('Mission-Critical Resiliency'));
  assert.ok(aboutHtml.includes('Executive Stewardship'));

  // Bottom Consultation CTA
  assert.ok(aboutHtml.includes('Ready to Transform Your Core Technology Platforms?'));
  assert.ok(aboutHtml.includes('href="/contact"'));
});

test('UI/UX: layout navigation Insights dropdown links directly to whitepaper slugs', () => {
  const layoutHtml = renderLayout({ title: 'Test Navigation', bodyContent: '<p>Content</p>' });
  assert.ok(layoutHtml.includes('href="/insights/architecting-ai-native-software-systems"'));
  assert.ok(layoutHtml.includes('AI-Native Systems Architecture'));
  assert.ok(layoutHtml.includes('href="/insights/zero-trust-kubernetes-platform-hardening"'));
  assert.ok(layoutHtml.includes('Zero-Trust Kubernetes Hardening'));
  assert.ok(layoutHtml.includes('href="/insights/adversarial-testing-in-continuous-delivery"'));
  assert.ok(layoutHtml.includes('Adversarial Testing in CI/CD'));
  assert.ok(layoutHtml.includes('href="/insights"'));
});

test('UI/UX: Homepage renders 2-column split hero, enterprise trust strip, and right-column visual showcase', () => {
  const homeHtml = renderHomePage([], [], []);
  
  // Left Column Sales & Value Proposition
  assert.ok(homeHtml.includes('hero-split-grid'));
  assert.ok(homeHtml.includes('hero-content'));
  assert.ok(homeHtml.includes('GLOBAL TECHNOLOGY ARCHITECTURE &amp; ADVISORY'));
  assert.ok(homeHtml.includes('Architecting <span class="gradient-text">High-Velocity, Resilient</span> Digital Systems'));
  assert.ok(homeHtml.includes('Schedule Executive Consultation'));
  assert.ok(homeHtml.includes('Explore Solutions'));

  // Enterprise Trust Strip
  assert.ok(homeHtml.includes('hero-trust-strip'));
  assert.ok(homeHtml.includes('Trusted by Fortune 500 Technology, Financial &amp; Healthcare Leaders'));
  assert.ok(homeHtml.includes('SOC 2 Type II'));
  assert.ok(homeHtml.includes('ISO 27001'));
  assert.ok(homeHtml.includes('HIPAA Ready'));
  assert.ok(homeHtml.includes('99.99% SLA'));

  // Right Column Visual Showcase
  assert.ok(homeHtml.includes('hero-visual-showcase'));
  assert.ok(homeHtml.includes('hero-showcase-card'));
  assert.ok(homeHtml.includes('Enterprise Platform &amp; ROI Architecture'));
  assert.ok(homeHtml.includes('LIVE ARCHITECTURE'));
  assert.ok(homeHtml.includes('nexora-enterprise-blueprint.svg'));
  assert.ok(homeHtml.includes('showcase-telemetry-row'));
  assert.ok(homeHtml.includes('120K req/s'));
  assert.ok(homeHtml.includes('&lt; 12ms'));
  assert.ok(homeHtml.includes('4.2x Velocity'));

  // Inline Responsive Architecture Diagram (viewBox="0 0 680 340")
  assert.ok(homeHtml.includes('viewBox="0 0 680 340"'));
  assert.ok(homeHtml.includes('ENTERPRISE CHANNELS'));
  assert.ok(homeHtml.includes('EDGE &amp; API GATEWAY') || homeHtml.includes('EDGE & API GATEWAY'));
  assert.ok(homeHtml.includes('INTELLIGENT CORE') || homeHtml.includes('CORE DATA FABRIC'));
  assert.ok(homeHtml.includes('SOVEREIGN CLOUD'));
  assert.ok(homeHtml.includes('Web Portal'));
  assert.ok(homeHtml.includes('Zero-Trust Auth'));
  assert.ok(homeHtml.includes('AI Orchestration'));
  assert.ok(homeHtml.includes('Multi-Region HA'));
});

test('UI/UX: Key pages include Sales Conversion Banner before footer', () => {
  const banner = renderSalesConversionBanner();
  assert.ok(banner.includes('sales-conversion-section'));
  assert.ok(banner.includes('Ready to Accelerate Your Enterprise Architecture?'));
  assert.ok(banner.includes('Book a 30-Minute Architecture Briefing'));
  assert.ok(banner.includes('Download Executive Overview'));

  const home = renderHomePage([], [], []);
  assert.ok(home.includes('Ready to Accelerate Your Enterprise Architecture?'));

  const services = renderServicesPage([]);
  assert.ok(services.includes('Ready to Accelerate Your Enterprise Architecture?'));

  const industries = renderIndustriesPage();
  assert.ok(industries.includes('Ready to Accelerate Your Enterprise Architecture?'));

  const caseStudies = renderCaseStudiesPage([]);
  assert.ok(caseStudies.includes('Ready to Accelerate Your Enterprise Architecture?'));

  const insights = renderInsightsPage([]);
  assert.ok(insights.includes('Ready to Accelerate Your Enterprise Architecture?'));
});

test('UI/UX: Static asset handler serves /images/* with Content-Type image/svg+xml and zero broken assets', async () => {
  const images = [
    '/images/nexora-enterprise-blueprint.svg',
    '/images/service-ai-data.svg',
    '/images/case-study-fintech.svg',
    '/images/insight-ai-architecture.svg',
    '/images/industry-financial-services.svg',
    '/images/nexora-about-governance.svg'
  ];

  for (const imgUrl of images) {
    let statusCode = 0;
    let headers = {};
    const mockReq = { url: imgUrl, method: 'GET', headers: {} };
    const mockRes = {
      writeHead: (s, h) => { statusCode = s; headers = h; },
      end: () => {},
      write: () => {},
      on: () => {},
      once: () => {},
      emit: () => {}
    };

    await handleRequest(mockReq, mockRes);
    assert.equal(statusCode, 200, `Expected 200 for ${imgUrl}`);
    assert.equal(headers['Content-Type'], 'image/svg+xml', `Expected image/svg+xml for ${imgUrl}`);
  }
});

test('UI/UX: Executive typography system and visible platform background pattern defined in layout and styles', () => {
  const layout = renderLayout({ title: 'Test Page', bodyContent: '<p>Content</p>' });
  assert.ok(layout.includes('Plus+Jakarta+Sans:wght@700;800'));
  assert.ok(layout.includes('Inter:wght@400;500;600'));
  assert.ok(layout.includes('JetBrains+Mono:wght@500;600'));

  const cssPath = path.join(__dirname, '../../src/public/css/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Typography tokens and bindings
  assert.ok(css.includes('--font-display: \'Plus Jakarta Sans\''));
  assert.ok(css.includes('letter-spacing: -0.025em;'));

  // Background pattern with visible dot-grid, spotlights, and warm-cool canvas
  assert.ok(css.includes('rgba(0, 82, 204, 0.08)'));
  assert.ok(css.includes('rgba(219, 234, 254'));
  assert.ok(css.includes('rgba(204, 251, 241'));
  assert.ok(css.includes('#EFF6FF'));
  assert.ok(css.includes('#F0FDFA'));

  // Frosted cards with 18px blur
  assert.ok(css.includes('backdrop-filter: blur(18px);'));
  assert.ok(css.includes('backdrop-filter: blur(16px);'));
});


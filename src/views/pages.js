// Page Templates Module for Nexora Digital Engineering
const { renderLayout, escapeHtml } = require('./layout');
const { getServiceJsonLd } = require('../server/seo');

function renderHomePage(services = [], caseStudies = [], articles = []) {
  const bodyContent = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <span class="hero-tag">AI-NATIVE ENTERPRISE ENGINEERING</span>
        <h1 class="hero-title">
          Architecting <span class="gradient-text">High-Velocity, Resilient</span> Digital Systems
        </h1>
        <p class="hero-subtitle">
          Nexora partners with global technology leaders to engineer autonomous AI systems, cloud-native platforms, and bulletproof software products anchored in mathematical rigor and deterministic quality.
        </p>
        <div class="hero-actions">
          <a href="/contact" class="btn btn-primary">Schedule Engineering Consultation</a>
          <a href="/services" class="btn btn-outline">Explore Capabilities</a>
        </div>
      </div>
    </section>

    <!-- Metrics Showcase -->
    <div class="container">
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-val">99.999%</div>
          <div class="metric-desc">Architectural Availability Delivered</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">&lt; 15ms</div>
          <div class="metric-desc">Real-Time Core P99 Latency</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">100%</div>
          <div class="metric-desc">Deterministic & Adversarial Test Coverage</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">50+</div>
          <div class="metric-desc">Enterprise Modernization Deployments</div>
        </div>
      </div>
    </div>

    <!-- Core Capabilities Grid -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">OUR CORE CAPABILITIES</div>
          <h2 class="section-title">End-to-End Technology Consulting</h2>
          <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
            From autonomous agent engineering to zero-trust cloud infrastructure, we deliver production-grade systems without compromise.
          </p>
        </div>

        <div class="cards-grid">
          ${services.map(s => `
            <div class="card">
              <h3 class="card-title">${escapeHtml(s.title)}</h3>
              <p class="card-summary">${escapeHtml(s.summary)}</p>
              <div style="margin-bottom: 1.5rem;">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">${escapeHtml(s.tagline)}</span>
              </div>
              <a href="/services/${s.slug}" class="btn btn-outline btn-sm">Deep-Dive Architecture &rarr;</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Case Studies -->
    <section class="section" style="background-color: #03070E;">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">VERIFIED IMPACT</div>
          <h2 class="section-title">Mission-Critical Case Studies</h2>
        </div>

        <div class="cards-grid">
          ${caseStudies.map(cs => {
            const metrics = JSON.parse(cs.outcome_metrics_json || '[]');
            return `
              <div class="card">
                <span class="badge badge-published" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(cs.client_industry)}</span>
                <h3 class="card-title">${escapeHtml(cs.title)}</h3>
                <p class="card-summary"><strong>Challenge:</strong> ${escapeHtml(cs.challenge)}</p>
                <p class="card-summary"><strong>Solution:</strong> ${escapeHtml(cs.solution)}</p>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                  ${metrics.map(m => `
                    <div style="background: rgba(0, 229, 255, 0.08); padding: 0.5rem 0.75rem; border-radius: 4px;">
                      <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-primary);">${escapeHtml(m.value)}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-dim);">${escapeHtml(m.metric)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Enterprise AI & Software Engineering Consulting',
    description: 'Nexora Digital Engineering architects high-velocity, resilient AI platforms, cloud platforms, and modern software systems.',
    activeNav: 'home',
    bodyContent
  });
}

function renderAboutPage() {
  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">ABOUT NEXORA</div>
          <h1 class="section-title">Engineering Excellence in the AI-Native Era</h1>
        </div>
        <div style="max-width: 800px; margin: 0 auto; color: var(--color-text-muted); line-height: 1.8;">
          <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">
            Founded by veteran software architects and engineering leaders, Nexora Digital Engineering exists to solve the hardest technical challenges confronting global enterprises: managing complexity, eliminating architectural decay, and safely integrating AI as an autonomous engineering partner.
          </p>
          <h3 style="color: var(--color-text-main); margin: 2rem 0 1rem;">Our Operating Philosophy</h3>
          <ul class="feature-list" style="margin-bottom: 2rem;">
            <li><strong>Specification-First Rigor:</strong> No code is generated without an approved, unambiguous technical specification.</li>
            <li><strong>Zero-Overengineering:</strong> We build lean, self-contained systems that avoid unnecessary SaaS subscriptions and infrastructure sprawl.</li>
            <li><strong>Adversarial Quality:</strong> We test against malicious boundary attacks and chaos failure modes, not just happy paths.</li>
            <li><strong>Human Governance:</strong> AI acts as our high-velocity execution engine, while senior human architects retain sovereign control over release gates.</li>
          </ul>
          <div style="text-align: center; margin-top: 3rem;">
            <a href="/contact" class="btn btn-primary">Connect with an Architectural Director</a>
          </div>
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'About Our Firm', activeNav: 'about', bodyContent });
}

function renderServicesPage(services = []) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">PRACTICE AREAS</div>
          <h1 class="section-title">Comprehensive Engineering Capabilities</h1>
          <p style="color: var(--color-text-muted); max-width: 700px; margin: 0 auto;">
            Explore our specialized practice areas designed to accelerate digital maturity, modernize legacy cores, and implement production-ready AI.
          </p>
        </div>

        <div class="cards-grid">
          ${services.map(s => {
            const features = JSON.parse(s.features_json || '[]');
            return `
              <div class="card">
                <h2 class="card-title">${escapeHtml(s.title)}</h2>
                <div style="color: var(--color-primary); font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">
                  ${escapeHtml(s.tagline)}
                </div>
                <p class="card-summary">${escapeHtml(s.summary)}</p>
                <ul class="feature-list" style="margin-bottom: 1.5rem;">
                  ${features.slice(0, 3).map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                </ul>
                <a href="/services/${s.slug}" class="btn btn-outline btn-sm">Explore Service Architecture &rarr;</a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'Services Portfolio', activeNav: 'services', bodyContent });
}

function renderServiceDetailPage(service) {
  const features = JSON.parse(service.features_json || '[]');
  const capabilities = JSON.parse(service.capabilities_json || '[]');

  const bodyContent = `
    <section class="detail-hero">
      <div class="container">
        <a href="/services" style="display: inline-block; margin-bottom: 1rem;">&larr; Back to Services</a>
        <div class="section-tag">ENGINEERING PRACTICE</div>
        <h1 class="hero-title" style="text-align: left; margin-bottom: 1rem;">${escapeHtml(service.title)}</h1>
        <p style="color: var(--color-primary); font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">
          ${escapeHtml(service.tagline)}
        </p>
        <p style="color: var(--color-text-muted); max-width: 800px; font-size: 1.1rem; line-height: 1.7;">
          ${escapeHtml(service.summary)}
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
          <div>
            <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem;">Architectural Deliverables</h2>
            <ul class="feature-list">
              ${features.map(f => `<li style="padding: 0.75rem 0;">${escapeHtml(f)}</li>`).join('')}
            </ul>

            <h2 style="font-size: 1.75rem; margin: 2.5rem 0 1.5rem;">Advanced Toolchains & Capabilities</h2>
            <ul class="feature-list">
              ${capabilities.map(c => `<li style="padding: 0.75rem 0;">${escapeHtml(c)}</li>`).join('')}
            </ul>
          </div>

          <div>
            <div class="card" style="position: sticky; top: 100px;">
              <h3 class="card-title">Initiate Practice Engagement</h3>
              <p style="color: var(--color-text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">
                Engage our specialized ${escapeHtml(service.title)} practice lead for an architectural feasibility review.
              </p>
              <a href="/contact?service=${service.slug}" class="btn btn-primary" style="width: 100%;">
                Request Architecture Brief
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: service.title,
    description: service.summary,
    activeNav: 'services',
    bodyContent,
    jsonLd: getServiceJsonLd(service)
  });
}

function renderIndustriesPage() {
  const industries = [
    { name: 'Financial Services & Banking', desc: 'High-frequency transaction processing, automated regulatory compliance, and sub-millisecond fraud mitigation.' },
    { name: 'Healthcare & Life Sciences', desc: 'HIPAA-compliant data fabrics, clinical diagnostic RAG models, and cryptographically verified patient record workflows.' },
    { name: 'Smart Manufacturing & IoT', desc: 'Edge AI processing, predictive machine maintenance, and industrial telemetry streaming pipelines.' },
    { name: 'Retail & Digital Commerce', desc: 'Real-time inventory synchronization, omni-channel recommendation engines, and high-concurrency peak event architectures.' }
  ];

  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">INDUSTRY DOMAINS</div>
          <h1 class="section-title">Engineered for Complex Enterprise Environments</h1>
        </div>
        <div class="cards-grid">
          ${industries.map(ind => `
            <div class="card">
              <h3 class="card-title">${escapeHtml(ind.name)}</h3>
              <p class="card-summary">${escapeHtml(ind.desc)}</p>
              <a href="/contact" class="btn btn-outline btn-sm">Discuss Industry Requirements &rarr;</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'Industries We Serve', activeNav: 'industries', bodyContent });
}

function renderCaseStudiesPage(caseStudies = []) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">PROVEN DELIVERY</div>
          <h1 class="section-title">Case Studies & Architecture Impact</h1>
        </div>
        <div class="cards-grid">
          ${caseStudies.map(cs => {
            const metrics = JSON.parse(cs.outcome_metrics_json || '[]');
            return `
              <div class="card">
                <span class="badge badge-published" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(cs.client_industry)}</span>
                <h2 class="card-title">${escapeHtml(cs.title)}</h2>
                <p style="margin-bottom: 1rem; color: var(--color-text-muted);"><strong>Challenge:</strong> ${escapeHtml(cs.challenge)}</p>
                <p style="margin-bottom: 1.5rem; color: var(--color-text-muted);"><strong>Engineered Solution:</strong> ${escapeHtml(cs.solution)}</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                  ${metrics.map(m => `
                    <div style="background: rgba(0, 229, 255, 0.08); padding: 0.5rem 0.75rem; border-radius: 4px;">
                      <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-primary);">${escapeHtml(m.value)}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-dim);">${escapeHtml(m.metric)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'Case Studies', activeNav: 'case-studies', bodyContent });
}

function renderInsightsPage(articles = []) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">TECHNICAL INSIGHTS</div>
          <h1 class="section-title">Architecture Whitepapers & Articles</h1>
        </div>
        <div class="cards-grid">
          ${articles.map(a => `
            <div class="card">
              <span class="badge badge-new" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(a.category)}</span>
              <h2 class="card-title">${escapeHtml(a.title)}</h2>
              <p class="card-summary">${escapeHtml(a.summary)}</p>
              <div class="card-meta">
                By ${escapeHtml(a.author)} • ${a.published_at ? a.published_at.split('T')[0] : 'Draft'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'Insights & Technical Articles', activeNav: 'insights', bodyContent });
}

function renderContactPage(selectedService = '') {
  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">CONSULTATION ENQUIRY</div>
          <h1 class="section-title">Schedule an Engineering Architecture Review</h1>
          <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
            Speak directly with our senior architects to analyze your technology roadmap, evaluate cloud migration, or architect AI systems.
          </p>
        </div>

        <div class="form-container">
          <div id="formStatus" class="form-status"></div>

          <form id="contactForm" novalidate>
            <div class="form-group">
              <label class="form-label" for="fullName">Full Name *</label>
              <input type="text" id="fullName" name="fullName" class="form-input" required placeholder="e.g. Dr. Jordan Bell">
            </div>

            <div class="form-group">
              <label class="form-label" for="email">Corporate Email Address *</label>
              <input type="email" id="email" name="email" class="form-input" required placeholder="jordan.bell@enterprise.example">
            </div>

            <div class="form-group">
              <label class="form-label" for="company">Company / Organization *</label>
              <input type="text" id="company" name="company" class="form-input" required placeholder="Acme Global Corporation">
            </div>

            <div class="form-group">
              <label class="form-label" for="serviceInterest">Primary Service Interest *</label>
              <select id="serviceInterest" name="serviceInterest" class="form-select" required>
                <option value="">-- Select Practice Domain --</option>
                <option value="ai-data-engineering" ${selectedService === 'ai-data-engineering' ? 'selected' : ''}>AI & Data Engineering</option>
                <option value="software-product-engineering" ${selectedService === 'software-product-engineering' ? 'selected' : ''}>Software Product Engineering</option>
                <option value="cloud-platform-engineering" ${selectedService === 'cloud-platform-engineering' ? 'selected' : ''}>Cloud & Platform Engineering</option>
                <option value="cybersecurity-governance" ${selectedService === 'cybersecurity-governance' ? 'selected' : ''}>Cybersecurity & Governance</option>
                <option value="digital-transformation" ${selectedService === 'digital-transformation' ? 'selected' : ''}>Digital Transformation Consulting</option>
                <option value="quality-engineering" ${selectedService === 'quality-engineering' ? 'selected' : ''}>Quality Engineering & Test Automation</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="message">Project Overview & Architecture Challenge *</label>
              <textarea id="message" name="message" class="form-textarea" required placeholder="Outline your technical requirements, expected timelines, and architectural constraints..."></textarea>
            </div>

            <button type="submit" id="submitBtn" class="btn btn-primary" style="width: 100%;">
              Submit Consultation Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'Schedule Consultation', activeNav: 'contact', bodyContent });
}

function renderSearchPage(query = '', searchResults = { results: [] }) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">INDEXED SEARCH</div>
          <h1 class="section-title">Search Capabilities, Articles & Case Studies</h1>
        </div>

        <div style="max-width: 650px; margin: 0 auto 3rem;">
          <form method="GET" action="/search" style="display: flex; gap: 0.5rem;">
            <input type="text" name="q" class="form-input" value="${escapeHtml(query)}" placeholder="Search e.g. RAG, Kubernetes, Zero-Trust, Microservices...">
            <button type="submit" class="btn btn-primary">Search</button>
          </form>
        </div>

        ${query ? `
          <div style="max-width: 800px; margin: 0 auto;">
            <p style="color: var(--color-text-muted); margin-bottom: 2rem;">
              Found ${searchResults.results.length} result(s) for "${escapeHtml(query)}"
            </p>
            ${searchResults.results.map(r => `
              <div class="card" style="margin-bottom: 1.5rem;">
                <span class="badge badge-new" style="width: fit-content; margin-bottom: 0.5rem;">${escapeHtml(r.entity_type)}</span>
                <h3 class="card-title">
                  <a href="${r.entity_type === 'service' ? `/services/${r.slug}` : `/insights`}">
                    ${escapeHtml(r.title)}
                  </a>
                </h3>
                <p class="card-summary">${escapeHtml(r.snippet)}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </section>
  `;
  return renderLayout({ title: 'Search Engine', activeNav: 'search', bodyContent });
}

module.exports = {
  renderHomePage,
  renderAboutPage,
  renderServicesPage,
  renderServiceDetailPage,
  renderIndustriesPage,
  renderCaseStudiesPage,
  renderInsightsPage,
  renderContactPage,
  renderSearchPage
};

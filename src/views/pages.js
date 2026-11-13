// Page Templates Module for Nexora Digital Engineering
const { renderLayout, escapeHtml } = require('./layout');
const { getServiceJsonLd } = require('../server/seo');

// Comprehensive Industry Domain Metadata & Practice Specifications
const INDUSTRIES = [
  {
    slug: 'financial-services',
    aliases: ['fintech'],
    id: 'fintech',
    name: 'Financial Services & Banking',
    tagline: 'Sub-Millisecond Settlement & Algorithmic Risk Architecture',
    compliancePill: 'PCI-DSS & ISO 20022',
    desc: 'High-frequency transaction processing, automated regulatory compliance, and sub-millisecond fraud mitigation engineered for global clearing houses and Tier-1 banking institutions.',
    svg: '/public/images/industry-financial-services.svg',
    keyMetrics: [
      { val: '< 2ms', label: 'Sub-millisecond settlement' },
      { val: '99.999%', label: 'Platform availability SLA' }
    ],
    kpis: [
      { metric: '< 2ms', label: 'Execution Latency', sub: 'P99 clearing speed' },
      { metric: '99.999%', label: 'Platform Availability', sub: 'Active-active multi-region' },
      { metric: '100%', label: 'ISO 20022 Compliance', sub: 'Cryptographically audited' }
    ],
    challengesText: 'Global banking networks and market makers require continuous sub-millisecond transactional clearing while conforming to strict, evolving regulatory mandates. Legacy monolithic cores struggle with concurrency bottlenecks during market volatility, increasing settlement risk, latency spikes, and regulatory reporting delays.',
    challengesList: [
      'Eliminating batch settlement delays without introducing data inconsistency or double-spend risks.',
      'Executing AI-driven fraud detection in under 5 milliseconds across massive streaming transaction volumes.',
      'Maintaining cross-border compliance across disparate regulatory jurisdictions with zero downtime.'
    ],
    referenceArchitectureText: 'Nexora deploys an event-driven distributed streaming fabric built on Apache Kafka, distributed in-memory consensus ledgers, and hardware security module (HSM) attestation. The architecture isolates market ingestion from clearing loops, ensuring deterministic sub-2ms settlement and active-active quad-region disaster recovery.',
    deliverables: [
      'Sub-Millisecond Transaction Clearing Core on Distributed In-Memory Consensus',
      'Streaming Graph ML Fraud Detection Engine Operating at < 5ms P99 Latency',
      'Hardware Security Module (HSM) Tokenized Payment Vault & Key Management',
      'Automated ISO 20022 & Regulatory Compliance Attestation Pipeline',
      'Active-Active Quad-Region Disaster Recovery Topology with Zero Data Loss'
    ],
    compliance: ['ISO 20022 Financial Standard', 'PCI-DSS Level 1 Vault', 'SOC 2 Type II Certified', 'FINRA / SEC Reg SCI Audit'],
    defaultService: 'software-product-engineering',
    relatedCaseStudySlug: 'fintech-realtime-settlement-engine'
  },
  {
    slug: 'healthcare',
    aliases: ['healthcare-life-sciences'],
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    tagline: 'HIPAA-Compliant Clinical Intelligence & Sovereign Data Fabrics',
    compliancePill: 'HIPAA & HL7 FHIR',
    desc: 'HIPAA-compliant data fabrics, clinical diagnostic RAG models, and cryptographically verified patient record workflows designed for hospital networks and biopharma enterprises.',
    svg: '/public/images/industry-healthcare.svg',
    keyMetrics: [
      { val: '-68%', label: 'Chart review synthesis time' },
      { val: '99.4%', label: 'Diagnostic literature accuracy' }
    ],
    kpis: [
      { metric: '-68%', label: 'Synthesis Time', sub: 'Saved per clinical review' },
      { metric: '99.4%', label: 'Diagnostic Accuracy', sub: 'Peer-reviewed citation match' },
      { metric: 'Zero', label: 'PII Leakage', sub: 'Cryptographic safe harbor' }
    ],
    challengesText: 'Healthcare systems navigate massive, fragmented datasets trapped across legacy Electronic Health Record (EHR) databases, laboratory feeds, and DICOM imaging repositories. Clinicians spend substantial hours manually synthesizing charts, while medical compliance mandates absolute zero-retention security and strict patient privacy.',
    challengesList: [
      'Synthesizing multi-modal patient records across incompatible legacy EHR systems and DICOM repositories.',
      'Preventing model hallucination in life-critical diagnostic and pharmaceutical research workflows.',
      'Enforcing strict HIPAA, HITECH, and GDPR data residency boundaries without compromising model performance.'
    ],
    referenceArchitectureText: 'Nexora architects a sovereign, confidential computing enclave that executes retrieval-augmented generation (RAG) strictly in encrypted volatile memory. Clinical vectors are cryptographically attested and automatically verified against peer-reviewed biomedical literature, providing physician-in-the-loop sign-off without transmitting Protected Health Information (PHI) to external networks.',
    deliverables: [
      'Zero-Data-Retention Clinical RAG Enclave with Confidential Compute Attestation',
      'FHIR Release 4 & HL7 Interoperability Adapters for Real-Time EHR Synchronization',
      'Automated Biomedical Citation Grounding & Hallucination Elimination Engine',
      'Cryptographic Safe-Harbor PII De-Identification & Anonymization Pipeline',
      'FDA 21 CFR Part 11 & HIPAA Audit Trail Logging on Immutable Storage'
    ],
    compliance: ['HIPAA / HITECH Certified', 'FDA 21 CFR Part 11', 'HL7 FHIR Release 4', 'SOC 2 Type II Healthcare'],
    defaultService: 'ai-data-engineering',
    relatedCaseStudySlug: 'healthcare-hipaa-rag-clinical-platform'
  },
  {
    slug: 'manufacturing-iot',
    aliases: ['smart-manufacturing-iot'],
    id: 'manufacturing',
    name: 'Smart Manufacturing & Industrial IoT',
    tagline: 'Edge AI Inferencing & Real-Time Operational Telemetry',
    compliancePill: 'IEC 62443 & Edge Telemetry',
    desc: 'Edge AI processing, predictive machine maintenance, and industrial telemetry streaming pipelines engineered for high-throughput automated manufacturing facilities.',
    svg: '/public/images/industry-manufacturing-iot.svg',
    keyMetrics: [
      { val: '-42%', label: 'Unplanned machine downtime' },
      { val: '+18%', label: 'Overall OEE equipment lift' }
    ],
    kpis: [
      { metric: '-42%', label: 'Unplanned Downtime', sub: 'Predictive bearing alerts' },
      { metric: '+18%', label: 'Overall OEE', sub: 'Equipment utilization lift' },
      { metric: '< 5ms', label: 'Edge Inferencing', sub: 'Vision quality inspection' }
    ],
    challengesText: 'Modern automated factories generate hundreds of thousands of high-frequency sensor readings per second. Unplanned machine downtime results in substantial operational losses, while reliance on public cloud connections introduces unacceptable latency and exposes critical Operational Technology (OT) networks to cyber threats.',
    challengesList: [
      'Processing hundreds of thousands of high-frequency sensor readings per second with sub-millisecond jitter.',
      'Executing computer vision defect detection on physical assembly lines without relying on cloud internet connectivity.',
      'Hardening legacy SCADA and PLC control networks against advanced persistent threats and ransomware.'
    ],
    referenceArchitectureText: 'Nexora deploys an air-gapped on-premises edge inferencing fabric running micro-containerized machine learning models directly alongside industrial machinery. High-throughput OPC-UA and MQTT telemetry meshes stream sensor telemetry into real-time digital twins, identifying equipment degradation weeks before component failure while maintaining strict SCADA air-gap isolation.',
    deliverables: [
      'On-Premises Air-Gapped Edge Inferencing Nodes for < 5ms Vision Defect Detection',
      'High-Throughput OPC-UA & MQTT Industrial Telemetry Streaming Mesh',
      'Vibration Spectral FFT Analytics for Predictive Bearing Degradation Detection',
      'Real-Time Digital Twin Synchronizer for Factory Line Asset Replication',
      'IEC 62443 Defense-in-Depth SCADA Gateway with Unidirectional Data Diodes'
    ],
    compliance: ['IEC 62443 Industrial Cybersecurity', 'ISO 50001 Energy Management', 'OPC Foundation Certified', 'ISO 9001 Quality Standard'],
    defaultService: 'cloud-platform-engineering',
    relatedCaseStudySlug: 'fintech-realtime-settlement-engine'
  },
  {
    slug: 'retail-commerce',
    aliases: ['retail-digital-commerce', 'retail'],
    id: 'retail',
    name: 'Retail & Digital Commerce',
    tagline: 'High-Concurrency Omni-Channel Fabrics & Sub-10ms Checkout',
    compliancePill: 'SOC2 & High-Concurrency',
    desc: 'Real-time inventory synchronization, omni-channel recommendation engines, and high-concurrency peak event architectures built for enterprise retail ecosystems.',
    svg: '/public/images/industry-retail-commerce.svg',
    keyMetrics: [
      { val: '< 10ms', label: 'Global checkout latency' },
      { val: '99.999%', label: 'Peak Cyber Week SLA' }
    ],
    kpis: [
      { metric: '< 10ms', label: 'Checkout Latency', sub: 'P99 global transaction time' },
      { metric: '99.999%', label: 'Peak SLA', sub: 'Cyber Week zero-outage record' },
      { metric: '+32%', label: 'Conversion Lift', sub: 'Real-time vector recommendations' }
    ],
    challengesText: 'Global omnichannel brands face extreme traffic spikes during seasonal peak events, where checkout latency directly harms revenue. Retailers struggle to reconcile unified inventory across retail stores and digital distribution centers in real time, leading to cart abandonment, overselling, and vulnerability to scalper bots.',
    challengesList: [
      'Maintaining unified inventory consistency across physical stores, distribution centers, and digital channels during flash sales.',
      'Defending against aggressive scraping bots, scalpers, and credential stuffing without adding friction for legitimate buyers.',
      'Scaling checkout compute from baseline to 250,000+ requests per second in seconds with zero database lock contention.'
    ],
    referenceArchitectureText: 'Nexora implements an omni-channel distributed ledger inventory mesh with atomic stock reservations that prevent overselling across all physical and digital channels. Powered by a global Anycast edge CDN, localized sub-20ms vector search recommendations, and tokenized payment vaults, the platform delivers sub-10ms checkout speeds under peak cyber week traffic.',
    deliverables: [
      'Atomic Distributed Inventory Mesh Eliminating Double-Selling Across 2,000+ Stores',
      'Sub-10ms Global Edge Checkout Engine with Elastic Auto-Scaling to 250k req/sec',
      'Real-Time Personalized Vector Search & Dynamic Product Recommendation Fabric',
      'Behavioral Bot Defense & Scalper Mitigation Layer with Zero Friction for Buyers',
      'PCI-DSS Level 1 Tokenized Payment Vault with Multi-PSP Automated Failover'
    ],
    compliance: ['PCI-DSS Level 1 Vault', 'GDPR / CCPA Compliant', 'ISO 27001 Certified', 'SOC 2 Type II'],
    defaultService: 'software-product-engineering',
    relatedCaseStudySlug: 'fintech-realtime-settlement-engine'
  }
];

// Helper: Determine article SVG illustration
function getArticleSvg(slug = '') {
  if (slug.includes('zero-trust') || slug.includes('kubernetes')) {
    return '/public/images/insight-zero-trust-kubernetes.svg';
  }
  if (slug.includes('adversarial') || slug.includes('testing')) {
    return '/public/images/insight-adversarial-testing.svg';
  }
  if (slug.includes('governance')) {
    return '/public/images/insight-ai-governance.svg';
  }
  return '/public/images/insight-ai-architecture.svg';
}

// Helper: Determine case study SVG illustration
function getCaseStudySvg(slug = '') {
  if (slug.includes('healthcare')) {
    return '/public/images/case-study-healthcare.svg';
  }
  return '/public/images/case-study-fintech.svg';
}

// Helper: Breadcrumbs HTML generator
function renderBreadcrumbs(items = []) {
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      ${items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        if (isLast) {
          return `
            <span class="breadcrumb-sep" aria-hidden="true">/</span>
            <span class="breadcrumb-active" aria-current="page">${escapeHtml(item.label)}</span>
          `;
        }
        return `
          <span class="breadcrumb-sep" aria-hidden="true">/</span>
          <a href="${item.url}">${escapeHtml(item.label)}</a>
        `;
      }).join('')}
    </nav>
  `;
}

// Helper: Upgraded Industry Card Component
function renderIndustryCard(ind) {
  return `
    <div class="card" id="${escapeHtml(ind.id)}">
      <a href="/industries/${ind.slug}" class="card-img-link" aria-label="Explore industry architecture: ${escapeHtml(ind.name)}">
        <img src="${ind.svg}" alt="${escapeHtml(ind.name)} Architecture Diagram" style="width: 100%; height: 150px; object-fit: contain;" />
      </a>
      <div class="compliance-pill">
        <span class="pill-dot"></span>
        ${escapeHtml(ind.compliancePill)}
      </div>
      <h3 class="card-title">
        <a href="/industries/${ind.slug}">${escapeHtml(ind.name)}</a>
      </h3>
      <div style="color: var(--color-primary); font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">
        ${escapeHtml(ind.tagline)}
      </div>
      <p class="card-summary">${escapeHtml(ind.desc)}</p>
      
      <!-- Key Industry Metrics / Outcomes -->
      <div class="card-metrics-row">
        <div class="card-metric-pill">
          <div class="card-metric-val">${escapeHtml(ind.keyMetrics[0].val)}</div>
          <div class="card-metric-label">${escapeHtml(ind.keyMetrics[0].label)}</div>
        </div>
        <div class="card-metric-pill">
          <div class="card-metric-val">${escapeHtml(ind.keyMetrics[1].val)}</div>
          <div class="card-metric-label">${escapeHtml(ind.keyMetrics[1].label)}</div>
        </div>
      </div>

      <!-- Dual Actions -->
      <div class="card-actions-group">
        <a href="/industries/${ind.slug}" class="card-action-link">
          Explore Domain Solutions <span class="card-action-arrow">&rarr;</span>
        </a>
        <a href="/contact?industry=${ind.slug}" class="btn btn-outline btn-sm" style="width: 100%; text-align: center; margin-top: 0.5rem;">
          Discuss Industry Requirements
        </a>
      </div>
    </div>
  `;
}

// Inline Responsive Hero Architecture Diagram (viewBox="0 0 680 340")
function renderHeroArchitectureDiagram() {
  return `
    <svg viewBox="0 0 680 340" width="100%" height="auto" role="img" aria-label="Nexora Enterprise Architecture Blueprint" data-src="/images/nexora-enterprise-blueprint.svg" class="hero-inline-diagram" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heroCanvasBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="60%" stop-color="#F8FAFC"/>
          <stop offset="100%" stop-color="#F0F7FF"/>
        </linearGradient>
        <linearGradient id="layerGradChannels" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#EFF6FF"/>
        </linearGradient>
        <linearGradient id="layerGradEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#F0F9FF"/>
        </linearGradient>
        <linearGradient id="layerGradCore" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#EFF6FF"/>
        </linearGradient>
        <linearGradient id="layerGradCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#F0FDF4"/>
        </linearGradient>
        <filter id="heroNodeShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0A192F" flood-opacity="0.06"/>
        </filter>
        <filter id="heroLayerGlow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0052CC" flood-opacity="0.04"/>
        </filter>
      </defs>

      <!-- Background Card Canvas -->
      <rect width="680" height="340" rx="10" fill="url(#heroCanvasBg)" stroke="#E2E8F0" stroke-width="1"/>

      <!-- Header Status Bar -->
      <rect x="14" y="10" width="652" height="24" rx="5" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="26" cy="22" r="3.5" fill="#10B981"/>
      <text x="36" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#0A192F" letter-spacing="0.04em">
        NEXORA DIGITAL PLATFORM TOPOLOGY &bull; PRODUCTION REFERENCE
      </text>
      <rect x="526" y="13" width="134" height="18" rx="4" fill="#EBF3FF" stroke="#BAE6FD" stroke-width="1"/>
      <text x="593" y="25" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="#0052CC" text-anchor="middle">
        99.99% MULTI-REGION HA
      </text>

      <!-- Flow Connectors Between Columns -->
      <!-- Connectors: Channels -> Edge -->
      <path d="M 159 116 L 183 116" stroke="#0052CC" stroke-width="2" stroke-linecap="round"/>
      <circle cx="171" cy="116" r="3" fill="#0052CC"/>
      <path d="M 159 188 L 183 188" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/>
      <circle cx="171" cy="188" r="3" fill="#0284C7"/>
      <path d="M 159 260 L 183 260" stroke="#0A192F" stroke-width="2" stroke-linecap="round"/>
      <circle cx="171" cy="260" r="3" fill="#0A192F"/>

      <!-- Connectors: Edge -> Core -->
      <path d="M 328 116 L 352 116" stroke="#0052CC" stroke-width="2" stroke-linecap="round"/>
      <circle cx="340" cy="116" r="3" fill="#0052CC"/>
      <path d="M 328 188 L 352 188" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/>
      <circle cx="340" cy="188" r="3" fill="#0284C7"/>
      <path d="M 328 260 L 352 260" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      <circle cx="340" cy="260" r="3" fill="#059669"/>

      <!-- Connectors: Core -> Cloud -->
      <path d="M 497 116 L 521 116" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      <circle cx="509" cy="116" r="3" fill="#059669"/>
      <path d="M 497 188 L 521 188" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/>
      <circle cx="509" cy="188" r="3" fill="#0284C7"/>
      <path d="M 497 260 L 521 260" stroke="#0052CC" stroke-width="2" stroke-linecap="round"/>
      <circle cx="509" cy="260" r="3" fill="#0052CC"/>

      <!-- ================= LAYER 1: ENTERPRISE CHANNELS ================= -->
      <g filter="url(#heroLayerGlow)">
        <rect x="14" y="42" width="145" height="286" rx="8" fill="url(#layerGradChannels)" stroke="#CBD5E1" stroke-width="1.2"/>
        <rect x="14" y="42" width="145" height="30" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="26" cy="57" r="3" fill="#0052CC"/>
        <text x="34" y="61" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A192F" letter-spacing="0.04em">
          ENTERPRISE CHANNELS
        </text>

        <!-- Node 1.1: Web Portal -->
        <g filter="url(#heroNodeShadow)">
          <rect x="22" y="80" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="26" y="88" width="4" height="50" rx="2" fill="#0052CC"/>
          <text x="36" y="103" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Web Portal</text>
          <text x="36" y="119" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">React &amp; SSR Micro-UI</text>
          <text x="36" y="134" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0052CC">Sub-80ms First Paint</text>
        </g>

        <!-- Node 1.2: Mobile Apps -->
        <g filter="url(#heroNodeShadow)">
          <rect x="22" y="154" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="26" y="162" width="4" height="50" rx="2" fill="#0284C7"/>
          <text x="36" y="177" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Mobile Apps</text>
          <text x="36" y="193" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">iOS &amp; Android Native</text>
          <text x="36" y="208" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0284C7">Offline Sync Engine</text>
        </g>

        <!-- Node 1.3: Partner APIs -->
        <g filter="url(#heroNodeShadow)">
          <rect x="22" y="228" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="26" y="236" width="4" height="50" rx="2" fill="#0A192F"/>
          <text x="36" y="251" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Partner APIs</text>
          <text x="36" y="267" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">GraphQL &amp; REST mTLS</text>
          <text x="36" y="282" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#475569">ISO 20022 Schema</text>
        </g>

        <rect x="22" y="302" width="129" height="18" rx="4" fill="#F1F5F9" stroke="#E2E8F0"/>
        <text x="86" y="314" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="#475569" text-anchor="middle">TLS 1.3 Anycast Ingress</text>
      </g>

      <!-- ================= LAYER 2: EDGE SECURITY & API GATEWAY ================= -->
      <g filter="url(#heroLayerGlow)">
        <rect x="183" y="42" width="145" height="286" rx="8" fill="url(#layerGradEdge)" stroke="#CBD5E1" stroke-width="1.2"/>
        <rect x="183" y="42" width="145" height="30" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="195" cy="57" r="3" fill="#0052CC"/>
        <text x="203" y="61" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A192F" letter-spacing="0.04em">
          EDGE &amp; API GATEWAY
        </text>

        <!-- Node 2.1: Zero-Trust Auth -->
        <g filter="url(#heroNodeShadow)">
          <rect x="191" y="80" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="195" y="88" width="4" height="50" rx="2" fill="#0052CC"/>
          <text x="205" y="103" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Zero-Trust Auth</text>
          <text x="205" y="119" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">OAuth 2.1 &amp; SPIFFE</text>
          <text x="205" y="134" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0052CC">&lt; 1.5ms Cryptographic</text>
        </g>

        <!-- Node 2.2: Rate Limiting -->
        <g filter="url(#heroNodeShadow)">
          <rect x="191" y="154" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="195" y="162" width="4" height="50" rx="2" fill="#0284C7"/>
          <text x="205" y="177" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Rate Limiting</text>
          <text x="205" y="193" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">Distributed Token Bucket</text>
          <text x="205" y="208" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0284C7">DDoS Shield Enforced</text>
        </g>

        <!-- Node 2.3: Schema Validation -->
        <g filter="url(#heroNodeShadow)">
          <rect x="191" y="228" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="195" y="236" width="4" height="50" rx="2" fill="#059669"/>
          <text x="205" y="251" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Schema Validation</text>
          <text x="205" y="267" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">Strict JSON &amp; Protobuf</text>
          <text x="205" y="282" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#059669">0% Malformed Payloads</text>
        </g>

        <rect x="191" y="302" width="129" height="18" rx="4" fill="#F0F9FF" stroke="#BAE6FD"/>
        <text x="255" y="314" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="#0284C7" text-anchor="middle">eBPF Kernel Perimeter</text>
      </g>

      <!-- ================= LAYER 3: INTELLIGENT CORE & DATA FABRIC ================= -->
      <g filter="url(#heroLayerGlow)">
        <rect x="352" y="42" width="145" height="286" rx="8" fill="url(#layerGradCore)" stroke="#CBD5E1" stroke-width="1.2"/>
        <rect x="352" y="42" width="145" height="30" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="364" cy="57" r="3" fill="#0052CC"/>
        <text x="372" y="61" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A192F" letter-spacing="0.04em">
          INTELLIGENT CORE &amp; DATA
        </text>

        <!-- Node 3.1: AI Orchestration -->
        <g filter="url(#heroNodeShadow)">
          <rect x="360" y="80" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="364" y="88" width="4" height="50" rx="2" fill="#0052CC"/>
          <text x="374" y="103" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">AI Orchestration</text>
          <text x="374" y="119" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">Agentic RAG &amp; Guardrails</text>
          <text x="374" y="134" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0052CC">Deterministic Output</text>
        </g>

        <!-- Node 3.2: Real-Time Stream -->
        <g filter="url(#heroNodeShadow)">
          <rect x="360" y="154" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="364" y="162" width="4" height="50" rx="2" fill="#0284C7"/>
          <text x="374" y="177" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Real-Time Stream</text>
          <text x="374" y="193" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">Kafka &amp; Flink Mesh</text>
          <text x="374" y="208" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0284C7">120K events/sec</text>
        </g>

        <!-- Node 3.3: ACID Persistence -->
        <g filter="url(#heroNodeShadow)">
          <rect x="360" y="228" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="364" y="236" width="4" height="50" rx="2" fill="#0A192F"/>
          <text x="374" y="251" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">ACID Persistence</text>
          <text x="374" y="267" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">Encrypted Distributed DB</text>
          <text x="374" y="282" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#475569">Strict Isolation Level</text>
        </g>

        <rect x="360" y="302" width="129" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE"/>
        <text x="424" y="314" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="#0052CC" text-anchor="middle">&lt; 12ms Core Latency</text>
      </g>

      <!-- ================= LAYER 4: SOVEREIGN CLOUD & OBSERVABILITY ================= -->
      <g filter="url(#heroLayerGlow)">
        <rect x="521" y="42" width="145" height="286" rx="8" fill="url(#layerGradCloud)" stroke="#CBD5E1" stroke-width="1.2"/>
        <rect x="521" y="42" width="145" height="30" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="533" cy="57" r="3" fill="#059669"/>
        <text x="541" y="61" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A192F" letter-spacing="0.04em">
          SOVEREIGN CLOUD &amp; OBS
        </text>

        <!-- Node 4.1: Multi-Region HA -->
        <g filter="url(#heroNodeShadow)">
          <rect x="529" y="80" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="533" y="88" width="4" height="50" rx="2" fill="#059669"/>
          <text x="543" y="103" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Multi-Region HA</text>
          <text x="543" y="119" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">Active-Active Cluster</text>
          <text x="543" y="134" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#059669">99.99% Uptime SLA</text>
        </g>

        <!-- Node 4.2: Telemetry Mesh -->
        <g filter="url(#heroNodeShadow)">
          <rect x="529" y="154" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="533" y="162" width="4" height="50" rx="2" fill="#0284C7"/>
          <text x="543" y="177" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Telemetry Mesh</text>
          <text x="543" y="193" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">OpenTelemetry &amp; eBPF</text>
          <text x="543" y="208" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0284C7">Full Trace Context</text>
        </g>

        <!-- Node 4.3: Audit Trails -->
        <g filter="url(#heroNodeShadow)">
          <rect x="529" y="228" width="129" height="66" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="533" y="236" width="4" height="50" rx="2" fill="#0052CC"/>
          <text x="543" y="251" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="700" fill="#0A192F">Audit Trails</text>
          <text x="543" y="267" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" fill="#475569">Immutable WORM Log</text>
          <text x="543" y="282" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="#0052CC">SOC 2 / ISO Certified</text>
        </g>

        <rect x="529" y="302" width="129" height="18" rx="4" fill="#ECFDF5" stroke="#A7F3D0"/>
        <text x="593" y="314" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="#059669" text-anchor="middle">&#10003; Zero Data Loss</text>
      </g>
    </svg>
  `;
}

// Sales Conversion Banner Component
function renderSalesConversionBanner() {
  return `
    <!-- Sales Conversion Banner -->
    <section class="sales-conversion-section">
      <div class="container">
        <div class="sales-conversion-card">
          <div class="conversion-content">
            <span class="conversion-tag">READY TO SCALE?</span>
            <h2 class="conversion-title">Ready to Accelerate Your Enterprise Architecture?</h2>
            <p class="conversion-subtitle">
              Engage directly with our principal architects to evaluate your technical debt, eliminate single points of failure, and build resilient, sovereign digital systems.
            </p>
          </div>
          <div class="conversion-actions">
            <a href="/contact" class="btn btn-primary btn-lg">Book a 30-Minute Architecture Briefing</a>
            <a href="/insights" class="btn btn-outline btn-lg">Download Executive Overview</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// 1. Home Page View (High-Converting Executive 2-Column Split Hero)
function renderHomePage(services = [], caseStudies = [], articles = []) {
  const bodyContent = `
    <!-- Hero Section: High-Converting 2-Column Split Layout -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-split-grid">
          <!-- Left Column: Sales & Value Proposition -->
          <div class="hero-content">
            <div class="hero-pill-badge">
              <span class="badge-dot"></span>
              <span class="badge-text">GLOBAL TECHNOLOGY ARCHITECTURE &amp; ADVISORY</span>
            </div>
            <h1 class="hero-title">
              Architecting <span class="gradient-text">High-Velocity, Resilient</span> Digital Systems
            </h1>
            <p class="hero-subtitle">
              Nexora partners with Fortune 500 enterprises and forward-thinking technology leaders to architect high-performance cloud platforms, intelligent data fabrics, and mission-critical software systems designed for sovereign scale.
            </p>
            <div class="hero-actions">
              <a href="/contact" class="btn btn-primary btn-lg">Schedule Executive Consultation</a>
              <a href="/services" class="btn btn-outline btn-lg">Explore Solutions</a>
            </div>

            <!-- Enterprise Trust Strip -->
            <div class="hero-trust-strip">
              <span class="trust-strip-title">Trusted by Fortune 500 Technology, Financial &amp; Healthcare Leaders</span>
              <div class="trust-emblems-grid">
                <div class="trust-emblem">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L3 7V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V7L12 2Z" fill="#EFF6FF" stroke="#0052CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 12L11 14L15 10" stroke="#0052CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>SOC 2 Type II</span>
                </div>
                <div class="trust-emblem">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="#F0FDFA" stroke="#0284C7" stroke-width="2"/>
                    <path d="M12 6V12L16 14" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>ISO 27001</span>
                </div>
                <div class="trust-emblem">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="#ECFDF5" stroke="#059669" stroke-width="1.5"/>
                    <path d="M12 7V17M7 12H17" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                  <span>HIPAA Ready</span>
                </div>
                <div class="trust-emblem">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#FFFBEB" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>99.99% SLA</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Rich Visual Showcase -->
          <div class="hero-visual-showcase">
            <div class="hero-showcase-card">
              <div class="showcase-card-header">
                <div class="showcase-header-left">
                  <span class="showcase-status-indicator"></span>
                  <span class="showcase-title">Enterprise Platform &amp; ROI Architecture</span>
                </div>
                <div class="showcase-header-right">
                  <span class="showcase-badge">LIVE ARCHITECTURE</span>
                </div>
              </div>

              <div class="hero-diagram-container">
                ${renderHeroArchitectureDiagram()}
              </div>

              <div class="showcase-telemetry-row">
                <div class="telemetry-pill">
                  <span class="telemetry-dot dot-live"></span>
                  <span class="telemetry-label">Throughput:</span>
                  <span class="telemetry-val">120K req/s</span>
                </div>
                <div class="telemetry-pill">
                  <span class="telemetry-dot dot-cyan"></span>
                  <span class="telemetry-label">Core P99:</span>
                  <span class="telemetry-val">&lt; 12ms</span>
                </div>
                <div class="telemetry-pill">
                  <span class="telemetry-dot dot-emerald"></span>
                  <span class="telemetry-label">ROI Impact:</span>
                  <span class="telemetry-val">4.2x Velocity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics Showcase -->
    <div class="container">
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-val">99.99%</div>
          <div class="metric-desc">Enterprise Availability Delivered</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">&lt; 15ms</div>
          <div class="metric-desc">Global Core P99 Latency</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">50+</div>
          <div class="metric-desc">Enterprise Modernizations</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">ISO &amp; SOC 2</div>
          <div class="metric-desc">Governed Production Security</div>
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
            From scalable data platforms to zero-trust cloud infrastructure, we deliver production-grade systems engineered for sustained enterprise performance.
          </p>
        </div>

        <div class="cards-grid">
          ${services.map(s => `
            <div class="card">
              <a href="/services/${s.slug}" class="card-img-link" aria-label="View architecture for ${escapeHtml(s.title)}">
                <img src="/public/images/service-${escapeHtml(s.slug)}.svg" alt="${escapeHtml(s.title)} Architecture" style="width: 100%; height: 140px; object-fit: contain;" />
              </a>
              <h3 class="card-title">
                <a href="/services/${s.slug}">${escapeHtml(s.title)}</a>
              </h3>
              <p class="card-summary">${escapeHtml(s.summary)}</p>
              <div style="margin-bottom: 1.25rem;">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">${escapeHtml(s.tagline)}</span>
              </div>
              <a href="/services/${s.slug}" class="card-action-link">
                View Architecture &amp; Deliverables <span class="card-action-arrow">&rarr;</span>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Industry Practice Domains Section -->
    <section class="section" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">INDUSTRY DOMAIN EXPERTISE</div>
          <h2 class="section-title">Engineered for Sovereign Industry Scale</h2>
          <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
            Our sector-specific practices solve domain compliance, extreme transactional throughput, and mission-critical reliability challenges.
          </p>
        </div>

        <div class="cards-grid">
          ${INDUSTRIES.map(ind => renderIndustryCard(ind)).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Case Studies -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">VERIFIED IMPACT</div>
          <h2 class="section-title">Enterprise Modernization Case Studies</h2>
          <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
            Review verified outcomes and technical architectures delivered for market-leading enterprise institutions.
          </p>
        </div>

        <div class="cards-grid">
          ${caseStudies.map(cs => {
            const metrics = JSON.parse(cs.outcome_metrics_json || '[]');
            const csSvg = getCaseStudySvg(cs.slug);
            return `
              <div class="card">
                <a href="/case-studies/${cs.slug}" class="card-img-link" aria-label="Explore case study: ${escapeHtml(cs.title)}">
                  <img src="${csSvg}" alt="${escapeHtml(cs.title)} Architecture" style="width: 100%; height: 150px; object-fit: contain;" />
                </a>
                <span class="badge badge-published" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(cs.client_industry)}</span>
                <h3 class="card-title">
                  <a href="/case-studies/${cs.slug}">${escapeHtml(cs.title)}</a>
                </h3>
                <p class="card-summary"><strong>Challenge:</strong> ${escapeHtml(cs.challenge)}</p>
                <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
                  ${metrics.map(m => `
                    <div style="background: #F0F7FF; border: 1px solid #BAE6FD; padding: 0.4rem 0.65rem; border-radius: 4px;">
                      <div style="font-size: 1.05rem; font-weight: 800; color: var(--color-primary);">${escapeHtml(m.value)}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-dim);">${escapeHtml(m.metric)}</div>
                    </div>
                  `).join('')}
                </div>
                <a href="/case-studies/${cs.slug}" class="card-action-link">
                  Explore Full Case Study <span class="card-action-arrow">&rarr;</span>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- Latest Insights Section -->
    ${articles.length > 0 ? `
      <section class="section" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-header">
            <div class="section-tag">EXECUTIVE PERSPECTIVES</div>
            <h2 class="section-title">Strategic Insights &amp; Briefings</h2>
            <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
              Architectural analyses and technology leadership perspectives on modern enterprise engineering.
            </p>
          </div>

          <div class="cards-grid">
            ${articles.map(a => {
              const artSvg = getArticleSvg(a.slug);
              return `
                <div class="card">
                  <a href="/insights/${a.slug}" class="card-img-link" aria-label="Read briefing: ${escapeHtml(a.title)}">
                    <img src="${artSvg}" alt="${escapeHtml(a.title)} Illustration" style="width: 100%; height: 140px; object-fit: contain;" />
                  </a>
                  <span class="badge badge-new" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(a.category)}</span>
                  <h3 class="card-title">
                    <a href="/insights/${a.slug}">${escapeHtml(a.title)}</a>
                  </h3>
                  <p class="card-summary">${escapeHtml(a.summary)}</p>
                  <div class="card-meta">
                    By ${escapeHtml(a.author)}
                  </div>
                  <a href="/insights/${a.slug}" class="card-action-link">
                    Read Whitepaper <span class="card-action-arrow">&rarr;</span>
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    ` : ''}

    ${renderSalesConversionBanner()}
  `;

  return renderLayout({
    title: 'Enterprise AI & Software Engineering Consulting',
    description: 'Nexora Digital Engineering architects high-velocity, resilient AI platforms, cloud platforms, and modern software systems.',
    activeNav: 'home',
    bodyContent
  });
}

// 2. About Page View (Executive Two-Column Hero, Principles Grid & Impact Strip)
function renderAboutPage() {
  const bodyContent = `
    <!-- Executive Two-Column Hero -->
    <section class="section" style="padding-top: 2rem;">
      <div class="container">
        ${renderBreadcrumbs([{ label: 'About Us', url: '/about' }])}
        <div class="about-hero-grid">
          <div class="about-hero-text">
            <div class="section-tag">ABOUT NEXORA DIGITAL ENGINEERING</div>
            <h1 class="section-title" style="text-align: left; margin-bottom: 1.25rem;">
              Enterprise Engineering Excellence &amp; Strategic Advisory
            </h1>
            <p style="font-size: 1.15rem; color: var(--color-text-body); line-height: 1.7; margin-bottom: 1.25rem; font-weight: 500;">
              Founded by veteran technology executives and enterprise architects, Nexora Digital Engineering partners with Global 2000 organizations to solve mission-critical technology challenges: modernizing legacy foundations, managing high-throughput scale, and safely deploying production intelligence.
            </p>
            <p style="font-size: 1.05rem; color: var(--color-text-muted); line-height: 1.7; margin-bottom: 2rem;">
              Our practice couples senior principal architects with hands-on systems engineering squads. We eliminate architectural ambiguities through formal boundary specifications, deterministic prototypes, and continuous automated verification.
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="/contact" class="btn btn-primary">Schedule Executive Consultation</a>
              <a href="/services" class="btn btn-outline">Explore Practice Areas &rarr;</a>
            </div>
          </div>
          <div class="about-hero-visual">
            <figure class="about-figure">
              <div class="about-figure-header">
                <span class="detail-figure-tag">GLOBAL DELIVERY &amp; GOVERNANCE</span>
                <span class="badge badge-published">ISO &amp; SOC 2 Governed</span>
              </div>
              <div class="about-figure-img-wrap">
                <img src="/images/nexora-about-governance.svg" alt="Nexora Global Delivery Hubs and ISO/SOC2 Compliance Framework" />
              </div>
              <figcaption class="detail-figcaption">
                Figure 1.0: Nexora follow-the-sun global delivery mesh, ISO/SOC 2 audited compliance posture, and three-stage architecture-first advisory discipline.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- Executive Impact Strip -->
    <section class="section-sm" style="background: #F8FAFC; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="impact-strip">
          <div class="impact-strip-item">
            <div class="impact-strip-val">99.99%</div>
            <div class="impact-strip-label">Uptime SLA Target</div>
            <div class="impact-strip-sub">Production system resilience</div>
          </div>
          <div class="impact-strip-item">
            <div class="impact-strip-val">50+</div>
            <div class="impact-strip-label">Enterprise Platforms</div>
            <div class="impact-strip-sub">Modernized core architectures</div>
          </div>
          <div class="impact-strip-item">
            <div class="impact-strip-val">100%</div>
            <div class="impact-strip-label">Audit Traceability</div>
            <div class="impact-strip-sub">Cryptographic compliance</div>
          </div>
          <div class="impact-strip-item">
            <div class="impact-strip-val">Global</div>
            <div class="impact-strip-label">Delivery Hubs</div>
            <div class="impact-strip-sub">Follow-the-sun advisory</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2x2 Glassmorphic Grid for Our Engineering Principles -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">CORE METHODOLOGY</div>
          <h2 class="section-title">Our Engineering Principles</h2>
          <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
            The constitutional tenets governing every architecture decision, client engagement, and production workload delivered by Nexora.
          </p>
        </div>

        <div class="principles-grid">
          <div class="principle-card">
            <div class="principle-card-header">
              <div class="principle-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <span class="compliance-pill" style="margin-bottom: 0;">Principle 01</span>
            </div>
            <h3 class="principle-title">Architecture-First Discipline</h3>
            <p class="principle-desc">
              Every engagement begins with proven blueprints, rigorous feasibility analysis, and clear business outcomes before construction. We eliminate ambiguities and specify boundary invariants prior to writing production code.
            </p>
          </div>

          <div class="principle-card">
            <div class="principle-card-header">
              <div class="principle-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span class="compliance-pill" style="margin-bottom: 0;">Principle 02</span>
            </div>
            <h3 class="principle-title">Lean Enterprise Systems</h3>
            <p class="principle-desc">
              We deliver high-efficiency, sovereign platforms that eliminate technical debt and avoid unnecessary vendor lock-in. Our architectures prioritize clean modularity, standard type-safe contracts, and low-latency execution paths.
            </p>
          </div>

          <div class="principle-card">
            <div class="principle-card-header">
              <div class="principle-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span class="compliance-pill" style="margin-bottom: 0;">Principle 03</span>
            </div>
            <h3 class="principle-title">Mission-Critical Resiliency</h3>
            <p class="principle-desc">
              Continuous automated verification, security audits, and fault-tolerant architectures guarantee high availability and regulatory compliance. We implement chaos engineering and adversarial test suites as first-class citizens.
            </p>
          </div>

          <div class="principle-card">
            <div class="principle-card-header">
              <div class="principle-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <span class="compliance-pill" style="margin-bottom: 0;">Principle 04</span>
            </div>
            <h3 class="principle-title">Executive Stewardship</h3>
            <p class="principle-desc">
              Senior technology partners lead every practice area, ensuring technical decisions remain directly aligned with board-level enterprise objectives, compliance audits, and sovereign stakeholder requirements.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Consultation CTA -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="callout-box" style="text-align: center; padding: 3rem 2rem; background: linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 100%); border: 1px solid #BAE6FD;">
          <span class="detail-tag" style="margin-bottom: 0.5rem;">ENGAGE OUR ARCHITECTURE PRACTICE</span>
          <h2 style="font-size: 1.75rem; color: var(--color-text-main); margin-bottom: 1rem; font-weight: 800;">
            Ready to Transform Your Core Technology Platforms?
          </h2>
          <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto 2rem; font-size: 1.05rem; line-height: 1.6;">
            Connect directly with our practice directors to analyze your system constraints, review reference blueprints, and accelerate your engineering roadmap.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="/contact" class="btn btn-primary">Schedule Executive Consultation</a>
            <a href="/case-studies" class="btn btn-outline">Review Client Case Studies</a>
          </div>
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'About Our Firm', activeNav: 'about', bodyContent });
}

// 3. Services Listing View
function renderServicesPage(services = []) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        ${renderBreadcrumbs([{ label: 'Services', url: '/services' }])}
        <div class="section-header">
          <div class="section-tag">PRACTICE AREAS</div>
          <h1 class="section-title">Comprehensive Engineering Capabilities</h1>
          <p style="color: var(--color-text-muted); max-width: 700px; margin: 0 auto;">
            Explore our specialized practice areas designed to accelerate digital maturity, modernize core enterprise platforms, and deploy production-ready cloud systems.
          </p>
        </div>

        <div class="cards-grid">
          ${services.map(s => {
            const features = JSON.parse(s.features_json || '[]');
            return `
              <div class="card">
                <a href="/services/${s.slug}" class="card-img-link" aria-label="Explore practice architecture: ${escapeHtml(s.title)}">
                  <img src="/public/images/service-${escapeHtml(s.slug)}.svg" alt="${escapeHtml(s.title)} Architecture" style="width: 100%; height: 140px; object-fit: contain;" />
                </a>
                <h2 class="card-title">
                  <a href="/services/${s.slug}">${escapeHtml(s.title)}</a>
                </h2>
                <div style="color: var(--color-primary); font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">
                  ${escapeHtml(s.tagline)}
                </div>
                <p class="card-summary">${escapeHtml(s.summary)}</p>
                <ul class="feature-list" style="margin-bottom: 1.5rem;">
                  ${features.slice(0, 3).map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                </ul>
                <a href="/services/${s.slug}" class="card-action-link">
                  View Architecture &amp; Deliverables <span class="card-action-arrow">&rarr;</span>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    ${renderSalesConversionBanner()}
  `;
  return renderLayout({ title: 'Services Portfolio', activeNav: 'services', bodyContent });
}

// 4. Service Detail View
function renderServiceDetailPage(service, relatedCaseStudies = []) {
  const features = JSON.parse(service.features_json || '[]');
  const capabilities = JSON.parse(service.capabilities_json || '[]');

  const bodyContent = `
    <section class="detail-hero">
      <div class="container">
        ${renderBreadcrumbs([
          { label: 'Services', url: '/services' },
          { label: service.title, url: `/services/${service.slug}` }
        ])}
        <span class="detail-tag">ENGINEERING PRACTICE AREA</span>
        <h1 class="detail-title">${escapeHtml(service.title)}</h1>
        <p style="color: var(--color-primary); font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
          ${escapeHtml(service.tagline)}
        </p>
        <p class="detail-subtitle">
          ${escapeHtml(service.summary)}
        </p>

        <!-- KPI Impact Row -->
        <div class="detail-metrics-row">
          <div class="detail-metric-box">
            <div class="detail-metric-val">99.99%</div>
            <div class="detail-metric-label">Target Availability</div>
            <div class="detail-metric-sub">Sovereign SLA commitment</div>
          </div>
          <div class="detail-metric-box">
            <div class="detail-metric-val">&lt; 30 Days</div>
            <div class="detail-metric-label">Blueprint Delivery</div>
            <div class="detail-metric-sub">Architecture roadmap</div>
          </div>
          <div class="detail-metric-box">
            <div class="detail-metric-val">100%</div>
            <div class="detail-metric-label">Test Automation</div>
            <div class="detail-metric-sub">Dual-layer verification</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Bespoke Architecture Blueprint Figure -->
        <figure class="detail-figure">
          <div class="detail-figure-header">
            <div>
              <span class="detail-figure-tag">SYSTEM REFERENCE BLUEPRINT</span>
              <div class="detail-figure-title">${escapeHtml(service.title)} Reference Topology</div>
            </div>
            <span class="badge badge-published">Production Verified</span>
          </div>
          <div class="detail-figure-img-wrap">
            <img src="/public/images/service-${escapeHtml(service.slug)}.svg" alt="${escapeHtml(service.title)} Architecture Topology Diagram" />
          </div>
          <figcaption class="detail-figcaption">
            Figure 1.0: End-to-end reference architecture illustrating component data flows, zero-trust security perimeter, and high-concurrency execution nodes for ${escapeHtml(service.title)}.
          </figcaption>
        </figure>

        <!-- Two-Column Structured Content -->
        <div class="detail-layout">
          <div class="detail-main">
            <h2 class="detail-section-title">Strategic Practice Overview</h2>
            <p class="detail-prose">
              Our ${escapeHtml(service.title)} engagement model couples senior principal architects with hands-on systems engineers. We eliminate architectural ambiguities through deterministic prototypes, automated regression safety nets, and production-ready implementation blueprints tailored to your technology ecosystem.
            </p>

            <div class="callout-box">
              <h4>Architecture Guarantees</h4>
              <p>Every deployment satisfies strict constitutional invariants: zero undocumented external dependencies, verified cryptographic boundary policies, and deterministic rollback mechanisms.</p>
            </div>

            <h2 class="detail-section-title">Enterprise Architecture Deliverables</h2>
            <ul class="feature-list" style="margin-bottom: 2.5rem;">
              ${features.map(f => `<li style="padding: 0.85rem 0;">${escapeHtml(f)}</li>`).join('')}
            </ul>

            <h2 class="detail-section-title">Core Capabilities &amp; Production Toolchains</h2>
            <ul class="feature-list" style="margin-bottom: 2.5rem;">
              ${capabilities.map(c => `<li style="padding: 0.85rem 0;">${escapeHtml(c)}</li>`).join('')}
            </ul>

            ${relatedCaseStudies.length > 0 ? `
              <h2 class="detail-section-title">Representative Case Studies</h2>
              <div class="cards-grid" style="margin-top: 1.5rem;">
                ${relatedCaseStudies.map(cs => `
                  <div class="card">
                    <span class="badge badge-published" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(cs.client_industry)}</span>
                    <h3 class="card-title">
                      <a href="/case-studies/${cs.slug}">${escapeHtml(cs.title)}</a>
                    </h3>
                    <p class="card-summary">${escapeHtml(cs.challenge)}</p>
                    <a href="/case-studies/${cs.slug}" class="card-action-link">
                      Explore Full Case Study <span class="card-action-arrow">&rarr;</span>
                    </a>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Sticky Sidebar -->
          <div class="detail-sidebar">
            <div class="sidebar-card">
              <h3 class="card-title" style="margin-bottom: 1rem;">Practice Consultation</h3>
              <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
                Engage our ${escapeHtml(service.title)} practice director for an initial architectural review and roadmap feasibility evaluation.
              </p>

              <ul class="sidebar-meta-list">
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Practice Focus</span>
                  <span class="sidebar-meta-val">${escapeHtml(service.title)}</span>
                </li>
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Engagement Model</span>
                  <span class="sidebar-meta-val">Advisory &amp; Build</span>
                </li>
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Deliverable SLA</span>
                  <span class="sidebar-meta-val">2 - 6 Weeks</span>
                </li>
              </ul>

              <a href="/contact?service=${service.slug}" class="btn btn-primary" style="width: 100%; text-align: center;">
                Request Architecture Brief
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: `${service.title} - Enterprise Engineering Practice`,
    description: service.summary,
    activeNav: 'services',
    bodyContent,
    jsonLd: getServiceJsonLd(service)
  });
}

// 5. Industries Listing View
function renderIndustriesPage() {
  const bodyContent = `
    <section class="section">
      <div class="container">
        ${renderBreadcrumbs([{ label: 'Industries', url: '/industries' }])}
        <div class="section-header">
          <div class="section-tag">INDUSTRY DOMAINS</div>
          <h1 class="section-title">Engineered for Complex Enterprise Environments</h1>
          <p style="color: var(--color-text-muted); max-width: 700px; margin: 0 auto;">
            Our sector-specific engineering architectures address strict regulatory requirements, extreme throughput conditions, and sovereign operational security.
          </p>
        </div>
        <div class="cards-grid">
          ${INDUSTRIES.map(ind => renderIndustryCard(ind)).join('')}
        </div>
      </div>
    </section>

    ${renderSalesConversionBanner()}
  `;
  return renderLayout({ title: 'Industries We Serve', activeNav: 'industries', bodyContent });
}

// 6. Industry Detail View
function renderIndustryDetailPage(industry, relatedCaseStudies = [], relatedServices = []) {
  // Filter relevant case study if specific match exists
  const matchedCaseStudies = relatedCaseStudies.filter(cs => {
    if (industry.relatedCaseStudySlug && cs.slug === industry.relatedCaseStudySlug) return true;
    return cs.client_industry && cs.client_industry.toLowerCase().includes(industry.name.split(' ')[0].toLowerCase());
  });
  const displayCaseStudies = matchedCaseStudies.length > 0 ? matchedCaseStudies : relatedCaseStudies.slice(0, 2);

  const bodyContent = `
    <section class="detail-hero">
      <div class="container">
        ${renderBreadcrumbs([
          { label: 'Industries', url: '/industries' },
          { label: industry.name, url: `/industries/${industry.slug}` }
        ])}
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
          <span class="detail-tag" style="margin-bottom: 0;">INDUSTRY PRACTICE DOMAIN</span>
          <div class="compliance-pill" style="margin-bottom: 0;">
            <span class="pill-dot"></span>
            ${escapeHtml(industry.compliancePill)}
          </div>
        </div>
        <h1 class="detail-title">${escapeHtml(industry.name)}</h1>
        <p style="color: var(--color-primary); font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
          ${escapeHtml(industry.tagline)}
        </p>
        <p class="detail-subtitle">
          ${escapeHtml(industry.desc)}
        </p>

        <!-- KPI Impact Row -->
        <div class="detail-metrics-row">
          ${industry.kpis.map(k => `
            <div class="detail-metric-box">
              <div class="detail-metric-val">${escapeHtml(k.metric)}</div>
              <div class="detail-metric-label">${escapeHtml(k.label)}</div>
              <div class="detail-metric-sub">${escapeHtml(k.sub)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Full-Width Custom SVG Reference Architecture Blueprint Figure -->
        <figure class="detail-figure">
          <div class="detail-figure-header">
            <div>
              <span class="detail-figure-tag">ENTERPRISE REFERENCE TOPOLOGY</span>
              <div class="detail-figure-title">${escapeHtml(industry.name)} System Reference Blueprint</div>
            </div>
            <span class="badge badge-published">Regulated Production Standard</span>
          </div>
          <div class="detail-figure-img-wrap">
            <img src="${industry.svg}" alt="${escapeHtml(industry.name)} Reference Architecture Blueprint" />
          </div>
          <figcaption class="detail-figcaption">
            Figure 1.0: End-to-end reference topology illustrating Component Ingestion, Core Settlement/Analytics Engine, Sovereign Security Enclaves, and Audited Compliance Outputs for ${escapeHtml(industry.name)}.
          </figcaption>
        </figure>

        <!-- Two-Column Structured Content -->
        <div class="detail-layout">
          <div class="detail-main">
            <!-- Section 1: Industry Regulatory & Operational Challenges -->
            <h2 class="detail-section-title">Industry Regulatory &amp; Operational Challenges</h2>
            <p class="detail-prose">${escapeHtml(industry.challengesText)}</p>
            <ul class="feature-list" style="margin-bottom: 2.5rem;">
              ${industry.challengesList.map(c => `<li style="padding: 0.85rem 0;">${escapeHtml(c)}</li>`).join('')}
            </ul>

            <!-- Section 2: Nexora Reference Architecture -->
            <h2 class="detail-section-title">Nexora Reference Architecture</h2>
            <p class="detail-prose">${escapeHtml(industry.referenceArchitectureText)}</p>

            <div class="callout-box">
              <h4>Architectural Compliance Guarantee</h4>
              <p>Every deployment adheres to strict constitutional invariants: audited encryption in transit and at rest, zero unauthorized third-party telemetry, and automated compliance attestation against ${escapeHtml(industry.compliancePill)} standards.</p>
            </div>

            <!-- Section 3: Key Capabilities & Deliverables -->
            <h2 class="detail-section-title">Key Capabilities &amp; Deliverables</h2>
            <ul class="feature-list" style="margin-bottom: 2.5rem;">
              ${industry.deliverables.map(d => `<li style="padding: 0.85rem 0;">${escapeHtml(d)}</li>`).join('')}
            </ul>

            <!-- Section 4: Related Case Studies -->
            <h2 class="detail-section-title">Related Case Studies</h2>
            ${displayCaseStudies.length > 0 ? `
              <div class="cards-grid" style="margin-top: 1.5rem;">
                ${displayCaseStudies.map(cs => `
                  <div class="card">
                    <span class="badge badge-published" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(cs.client_industry)}</span>
                    <h3 class="card-title">
                      <a href="/case-studies/${cs.slug}">${escapeHtml(cs.title)}</a>
                    </h3>
                    <p class="card-summary">${escapeHtml(cs.challenge)}</p>
                    <a href="/case-studies/${cs.slug}" class="card-action-link">
                      Explore Full Case Study <span class="card-action-arrow">&rarr;</span>
                    </a>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="color: var(--color-text-muted);">Additional case study disclosures are available under NDA during executive briefing sessions.</p>
            `}
          </div>

          <!-- Sticky Sidebar -->
          <div class="detail-sidebar">
            <div class="sidebar-card">
              <h3 class="card-title" style="margin-bottom: 1rem;">Industry Practice Advisory</h3>
              <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
                Engage our ${escapeHtml(industry.name)} practice directors to audit your existing architectural posture, benchmark performance against sector leaders, and evaluate implementation feasibility.
              </p>

              <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 0.5rem;">
                Governed Standards:
              </div>
              <ul class="sidebar-meta-list">
                ${industry.compliance.map(cp => `
                  <li class="sidebar-meta-item">
                    <span class="sidebar-meta-label">${escapeHtml(cp)}</span>
                    <span class="sidebar-meta-val" style="color: var(--color-success);">&#10003; Audited</span>
                  </li>
                `).join('')}
              </ul>

              <!-- Pre-Targeted Industry Consultation CTA Button -->
              <a href="/contact?industry=${industry.slug}" class="btn btn-primary" style="width: 100%; text-align: center;">
                Discuss ${escapeHtml(industry.name)} Requirements
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: `${industry.name} - Technology Solutions & Reference Architecture`,
    description: industry.desc,
    activeNav: 'industries',
    bodyContent
  });
}

// 7. Case Studies Listing View
function renderCaseStudiesPage(caseStudies = []) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        ${renderBreadcrumbs([{ label: 'Case Studies', url: '/case-studies' }])}
        <div class="section-header">
          <div class="section-tag">PROVEN CLIENT OUTCOMES</div>
          <h1 class="section-title">Enterprise Case Studies &amp; Outcomes</h1>
          <p style="color: var(--color-text-muted); max-width: 700px; margin: 0 auto;">
            In-depth architectural post-mortems and verified performance benchmarks from enterprise production deployments.
          </p>
        </div>
        <div class="cards-grid">
          ${caseStudies.map(cs => {
            const metrics = JSON.parse(cs.outcome_metrics_json || '[]');
            const csSvg = getCaseStudySvg(cs.slug);
            return `
              <div class="card">
                <a href="/case-studies/${cs.slug}" class="card-img-link" aria-label="Explore case study: ${escapeHtml(cs.title)}">
                  <img src="${csSvg}" alt="${escapeHtml(cs.title)} Architecture" style="width: 100%; height: 160px; object-fit: contain;" />
                </a>
                <span class="badge badge-published" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(cs.client_industry)}</span>
                <h2 class="card-title">
                  <a href="/case-studies/${cs.slug}">${escapeHtml(cs.title)}</a>
                </h2>
                <p style="margin-bottom: 0.75rem; color: var(--color-text-muted);"><strong>Challenge:</strong> ${escapeHtml(cs.challenge)}</p>
                <p style="margin-bottom: 1.25rem; color: var(--color-text-muted);"><strong>Engineered Solution:</strong> ${escapeHtml(cs.solution)}</p>
                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
                  ${metrics.map(m => `
                    <div style="background: #F0F7FF; border: 1px solid #BAE6FD; padding: 0.45rem 0.75rem; border-radius: 4px;">
                      <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-primary);">${escapeHtml(m.value)}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-dim);">${escapeHtml(m.metric)}</div>
                    </div>
                  `).join('')}
                </div>
                <a href="/case-studies/${cs.slug}" class="card-action-link">
                  Explore Full Case Study <span class="card-action-arrow">&rarr;</span>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    ${renderSalesConversionBanner()}
  `;
  return renderLayout({ title: 'Case Studies', activeNav: 'case-studies', bodyContent });
}

// 8. Case Study Detail View
function renderCaseStudyDetailPage(caseStudy, relatedServices = []) {
  const metrics = JSON.parse(caseStudy.outcome_metrics_json || '[]');
  const csSvg = getCaseStudySvg(caseStudy.slug);

  const bodyContent = `
    <section class="detail-hero">
      <div class="container">
        ${renderBreadcrumbs([
          { label: 'Case Studies', url: '/case-studies' },
          { label: caseStudy.title, url: `/case-studies/${caseStudy.slug}` }
        ])}
        <span class="detail-tag">${escapeHtml(caseStudy.client_industry)} CASE STUDY</span>
        <h1 class="detail-title">${escapeHtml(caseStudy.title)}</h1>
        <p class="detail-subtitle">
          ${escapeHtml(caseStudy.solution)}
        </p>

        <!-- KPI Impact Row -->
        <div class="detail-metrics-row">
          ${metrics.map(m => `
            <div class="detail-metric-box">
              <div class="detail-metric-val">${escapeHtml(m.value)}</div>
              <div class="detail-metric-label">${escapeHtml(m.metric)}</div>
              <div class="detail-metric-sub">${escapeHtml(m.description || 'Measured enterprise gain')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Bespoke Architecture Blueprint Figure -->
        <figure class="detail-figure">
          <div class="detail-figure-header">
            <div>
              <span class="detail-figure-tag">PRODUCTION DEPLOYMENT ARCHITECTURE</span>
              <div class="detail-figure-title">${escapeHtml(caseStudy.title)}</div>
            </div>
            <span class="badge badge-published">Production Verified</span>
          </div>
          <div class="detail-figure-img-wrap">
            <img src="${csSvg}" alt="${escapeHtml(caseStudy.title)} Architecture Diagram" />
          </div>
          <figcaption class="detail-figcaption">
            Figure 1.0: End-to-end architecture topology showing data ingestion, event processing pipelines, zero-downtime consensus core, and global multi-region failover.
          </figcaption>
        </figure>

        <!-- Two-Column Structured Content -->
        <div class="detail-layout">
          <div class="detail-main">
            <h2 class="detail-section-title">Enterprise Business Challenge</h2>
            <p class="detail-prose">${escapeHtml(caseStudy.challenge)}</p>

            <h2 class="detail-section-title">Engineered Solution Architecture</h2>
            <p class="detail-prose">${escapeHtml(caseStudy.solution)}</p>

            <div class="callout-box">
              <h4>Architectural Milestone</h4>
              <p>Achieved seamless zero-downtime cutover with automated data migration verification and continuous shadow traffic testing prior to production release.</p>
            </div>

            <h2 class="detail-section-title">Measured Outcomes &amp; Impact Timeline</h2>
            <ul class="feature-list" style="margin-bottom: 2.5rem;">
              ${metrics.map(m => `
                <li style="padding: 0.85rem 0;">
                  <strong>${escapeHtml(m.metric)}:</strong> ${escapeHtml(m.value)} &mdash; ${escapeHtml(m.description || 'Verified production benchmark')}
                </li>
              `).join('')}
            </ul>

            ${relatedServices.length > 0 ? `
              <h2 class="detail-section-title">Related Engineering Capabilities</h2>
              <div class="cards-grid" style="margin-top: 1.5rem;">
                ${relatedServices.map(s => `
                  <div class="card">
                    <h3 class="card-title">
                      <a href="/services/${s.slug}">${escapeHtml(s.title)}</a>
                    </h3>
                    <p class="card-summary">${escapeHtml(s.summary)}</p>
                    <a href="/services/${s.slug}" class="card-action-link">
                      View Architecture <span class="card-action-arrow">&rarr;</span>
                    </a>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Sticky Sidebar -->
          <div class="detail-sidebar">
            <div class="sidebar-card">
              <h3 class="card-title" style="margin-bottom: 1rem;">Engagement Overview</h3>
              <ul class="sidebar-meta-list">
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Industry</span>
                  <span class="sidebar-meta-val">${escapeHtml(caseStudy.client_industry)}</span>
                </li>
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Architecture</span>
                  <span class="sidebar-meta-val">Distributed Event Mesh</span>
                </li>
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Availability SLA</span>
                  <span class="sidebar-meta-val">99.999%</span>
                </li>
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Deployment</span>
                  <span class="sidebar-meta-val">Quad-Region Active-Active</span>
                </li>
              </ul>

              <a href="/contact" class="btn btn-primary" style="width: 100%; text-align: center;">
                Initiate Similar Transformation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: `${caseStudy.title} - Enterprise Case Study`,
    description: caseStudy.challenge,
    activeNav: 'case-studies',
    bodyContent
  });
}

// 9. Insights Listing View
function renderInsightsPage(articles = []) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        ${renderBreadcrumbs([{ label: 'Insights', url: '/insights' }])}
        <div class="section-header">
          <div class="section-tag">EXECUTIVE PERSPECTIVES</div>
          <h1 class="section-title">Architecture Whitepapers &amp; Strategic Briefings</h1>
          <p style="color: var(--color-text-muted); max-width: 700px; margin: 0 auto;">
            Rigorous technical analyses, peer-reviewed engineering papers, and strategic guides written by our principal architects.
          </p>
        </div>
        <div class="cards-grid">
          ${articles.map(a => {
            const artSvg = getArticleSvg(a.slug);
            return `
              <div class="card">
                <a href="/insights/${a.slug}" class="card-img-link" aria-label="Read briefing: ${escapeHtml(a.title)}">
                  <img src="${artSvg}" alt="${escapeHtml(a.title)} Architecture" style="width: 100%; height: 160px; object-fit: contain;" />
                </a>
                <span class="badge badge-new" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(a.category)}</span>
                <h2 class="card-title">
                  <a href="/insights/${a.slug}">${escapeHtml(a.title)}</a>
                </h2>
                <p class="card-summary">${escapeHtml(a.summary)}</p>
                <div class="card-meta">
                  By ${escapeHtml(a.author)} &bull; ${a.published_at ? a.published_at.split('T')[0] : 'Draft'}
                </div>
                <a href="/insights/${a.slug}" class="card-action-link">
                  Read Whitepaper <span class="card-action-arrow">&rarr;</span>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    ${renderSalesConversionBanner()}
  `;
  return renderLayout({ title: 'Insights & Technical Articles', activeNav: 'insights', bodyContent });
}

// 10. Article / Insight Detail View
function renderArticleDetailPage(article, relatedArticles = [], relatedServices = []) {
  const artSvg = getArticleSvg(article.slug);

  const bodyContent = `
    <section class="detail-hero">
      <div class="container">
        ${renderBreadcrumbs([
          { label: 'Insights', url: '/insights' },
          { label: article.title, url: `/insights/${article.slug}` }
        ])}
        <span class="detail-tag">${escapeHtml(article.category)} BRIEFING</span>
        <h1 class="detail-title">${escapeHtml(article.title)}</h1>
        <p class="detail-subtitle">
          ${escapeHtml(article.summary)}
        </p>
        <div style="font-size: 0.95rem; color: var(--color-text-muted); display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <span><strong>Author:</strong> ${escapeHtml(article.author)}</span>
          <span><strong>Published:</strong> ${article.published_at ? article.published_at.split('T')[0] : 'In Review'}</span>
          <span><strong>Reading Time:</strong> 8 min read</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Bespoke Architecture Blueprint Figure -->
        <figure class="detail-figure">
          <div class="detail-figure-header">
            <div>
              <span class="detail-figure-tag">ARCHITECTURAL BLUEPRINT</span>
              <div class="detail-figure-title">${escapeHtml(article.title)}</div>
            </div>
            <span class="badge badge-published">Technical Review</span>
          </div>
          <div class="detail-figure-img-wrap">
            <img src="${artSvg}" alt="${escapeHtml(article.title)} Architectural Blueprint" />
          </div>
          <figcaption class="detail-figcaption">
            Figure 1.0: Architectural topology and component interaction flow illustrating core design patterns, verification gates, and release safety mechanisms.
          </figcaption>
        </figure>

        <!-- Two-Column Structured Content -->
        <div class="detail-layout">
          <div class="detail-main">
            <h2 class="detail-section-title">Executive Summary</h2>
            <p class="detail-prose">${escapeHtml(article.summary)}</p>

            <h2 class="detail-section-title">In-Depth Architectural Analysis</h2>
            <p class="detail-prose">${escapeHtml(article.body_markdown)}</p>

            <div class="callout-box">
              <h4>Key Architectural Principle</h4>
              <p>Move from reactive heuristic tuning to formal architectural constraints. Strict boundary specifications and automated regression verification prevent cascading systemic failures.</p>
            </div>

            <h2 class="detail-section-title">Strategic Implementation Recommendations</h2>
            <ul class="feature-list" style="margin-bottom: 2.5rem;">
              <li style="padding: 0.85rem 0;">Establish explicit boundary contracts for all incoming and inter-service payloads.</li>
              <li style="padding: 0.85rem 0;">Embed automated security and adversarial checks directly into pull-request validation pipelines.</li>
              <li style="padding: 0.85rem 0;">Preserve human authorization gates at high-risk schema mutations and release thresholds.</li>
              <li style="padding: 0.85rem 0;">Enforce immutable telemetry and cryptographic attestation for all production workloads.</li>
            </ul>

            ${relatedArticles.length > 0 ? `
              <h2 class="detail-section-title">Related Briefings</h2>
              <div class="cards-grid" style="margin-top: 1.5rem;">
                ${relatedArticles.map(ra => `
                  <div class="card">
                    <span class="badge badge-new" style="width: fit-content; margin-bottom: 0.75rem;">${escapeHtml(ra.category)}</span>
                    <h3 class="card-title">
                      <a href="/insights/${ra.slug}">${escapeHtml(ra.title)}</a>
                    </h3>
                    <p class="card-summary">${escapeHtml(ra.summary)}</p>
                    <a href="/insights/${ra.slug}" class="card-action-link">
                      Read Whitepaper <span class="card-action-arrow">&rarr;</span>
                    </a>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Bottom Consultation CTA -->
            <div class="callout-box" style="margin-top: 2.5rem; background: linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 100%); border: 1px solid #BAE6FD;">
              <h4 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 0.5rem;">Engage Our Architecture Practice</h4>
              <p style="margin-bottom: 1.25rem;">Looking to apply this architecture framework or evaluate your organization's modernization roadmap? Schedule a technical advisory session with our principal engineers.</p>
              <a href="/contact" class="btn btn-primary">Schedule Technical Consultation &rarr;</a>
            </div>
          </div>

          <!-- Sticky Sidebar -->
          <div class="detail-sidebar">
            <div class="sidebar-card">
              <h3 class="card-title" style="margin-bottom: 1rem;">About the Author</h3>
              <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
                ${escapeHtml(article.author)} leads technology architecture research and advisory at Nexora Digital Engineering.
              </p>

              <ul class="sidebar-meta-list">
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Domain</span>
                  <span class="sidebar-meta-val">${escapeHtml(article.category)}</span>
                </li>
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Format</span>
                  <span class="sidebar-meta-val">Whitepaper</span>
                </li>
                <li class="sidebar-meta-item">
                  <span class="sidebar-meta-label">Peer Review</span>
                  <span class="sidebar-meta-val">&#10003; Approved</span>
                </li>
              </ul>

              <a href="/contact" class="btn btn-primary" style="width: 100%; text-align: center;">
                Schedule Executive Briefing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: `${article.title} - Strategic Insight`,
    description: article.summary,
    activeNav: 'insights',
    bodyContent
  });
}

// 11. Contact Page View (Supports Pre-Selected Service & Industry Domain)
function renderContactPage(selectedService = '', selectedIndustry = '') {
  const matchedIndustry = selectedIndustry
    ? INDUSTRIES.find(i => i.slug === selectedIndustry || (i.aliases && i.aliases.includes(selectedIndustry)))
    : null;
  const effectiveService = selectedService || (matchedIndustry ? matchedIndustry.defaultService : '');
  const activeIndustrySlug = matchedIndustry ? matchedIndustry.slug : selectedIndustry;

  const bodyContent = `
    <section class="section">
      <div class="container">
        ${renderBreadcrumbs([{ label: 'Contact', url: '/contact' }])}
        <div class="section-header">
          <div class="section-tag">CONSULTATION ENQUIRY</div>
          <h1 class="section-title">Schedule an Executive Architecture Review</h1>
          <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
            Connect directly with our senior practice directors to analyze your technology roadmap, evaluate cloud modernization, or architect scalable platforms.
          </p>
        </div>

        <div class="form-container">
          <!-- Pre-Selected Industry Domain Advisory Context Banner -->
          ${matchedIndustry ? `
            <div class="callout-box" style="margin-bottom: 2rem; border-left: 4px solid var(--color-primary); background: #F0F7FF;">
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Dedicated Domain Advisory</div>
              <h3 style="font-size: 1.15rem; color: var(--color-text-main); margin-bottom: 0.5rem;">${escapeHtml(matchedIndustry.name)} Practice Consultation</h3>
              <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-body); line-height: 1.6;">
                Your consultation request will be directly assigned to our senior <strong>${escapeHtml(matchedIndustry.name)}</strong> practice directors with specialized expertise in <strong>${escapeHtml(matchedIndustry.compliancePill)}</strong>.
              </p>
            </div>
          ` : ''}

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
              <label class="form-label" for="industryDomain">Target Industry Domain</label>
              <select id="industryDomain" name="industryDomain" class="form-select">
                <option value="">-- General Technology Architecture --</option>
                <option value="financial-services" ${activeIndustrySlug === 'financial-services' ? 'selected' : ''}>Financial Services &amp; Banking</option>
                <option value="healthcare" ${activeIndustrySlug === 'healthcare' || activeIndustrySlug === 'healthcare-life-sciences' ? 'selected' : ''}>Healthcare &amp; Life Sciences</option>
                <option value="manufacturing-iot" ${activeIndustrySlug === 'manufacturing-iot' || activeIndustrySlug === 'smart-manufacturing-iot' ? 'selected' : ''}>Smart Manufacturing &amp; Industrial IoT</option>
                <option value="retail-commerce" ${activeIndustrySlug === 'retail-commerce' || activeIndustrySlug === 'retail-digital-commerce' ? 'selected' : ''}>Retail &amp; Digital Commerce</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="serviceInterest">Primary Service Interest *</label>
              <select id="serviceInterest" name="serviceInterest" class="form-select" required>
                <option value="">-- Select Practice Domain --</option>
                <option value="ai-data-engineering" ${effectiveService === 'ai-data-engineering' ? 'selected' : ''}>AI &amp; Data Engineering</option>
                <option value="software-product-engineering" ${effectiveService === 'software-product-engineering' ? 'selected' : ''}>Software Product Engineering</option>
                <option value="cloud-platform-engineering" ${effectiveService === 'cloud-platform-engineering' ? 'selected' : ''}>Cloud &amp; Platform Engineering</option>
                <option value="cybersecurity-governance" ${effectiveService === 'cybersecurity-governance' ? 'selected' : ''}>Cybersecurity &amp; Governance</option>
                <option value="digital-transformation" ${effectiveService === 'digital-transformation' ? 'selected' : ''}>Digital Transformation Consulting</option>
                <option value="quality-engineering" ${effectiveService === 'quality-engineering' ? 'selected' : ''}>Quality Engineering &amp; Resiliency</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="message">Project Overview &amp; Architecture Challenge *</label>
              <textarea id="message" name="message" class="form-textarea" required placeholder="Outline your technical requirements, expected timelines, and architectural constraints..."></textarea>
            </div>

            <button type="submit" id="submitBtn" class="btn btn-primary" style="width: 100%;">
              Submit Consultation Request
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'Schedule Consultation', activeNav: 'contact', bodyContent });
}

// 12. Search Page View
function renderSearchPage(query = '', searchResults = { results: [] }) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        ${renderBreadcrumbs([{ label: 'Search', url: '/search' }])}
        <div class="section-header">
          <div class="section-tag">INDEXED SEARCH</div>
          <h1 class="section-title">Search Capabilities, Articles &amp; Case Studies</h1>
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
            ${searchResults.results.map(r => {
              let targetUrl = '/insights';
              if (r.entity_type === 'service') {
                targetUrl = `/services/${r.slug}`;
              } else if (r.entity_type === 'case_study') {
                targetUrl = `/case-studies/${r.slug}`;
              } else if (r.entity_type === 'article') {
                targetUrl = `/insights/${r.slug}`;
              }
              return `
                <div class="card" style="margin-bottom: 1.5rem;">
                  <span class="badge badge-new" style="width: fit-content; margin-bottom: 0.5rem;">${escapeHtml(r.entity_type)}</span>
                  <h3 class="card-title">
                    <a href="${targetUrl}">
                      ${escapeHtml(r.title)}
                    </a>
                  </h3>
                  <p class="card-summary">${escapeHtml(r.snippet)}</p>
                  <a href="${targetUrl}" class="card-action-link">
                    Explore Details <span class="card-action-arrow">&rarr;</span>
                  </a>
                </div>
              `;
            }).join('')}
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
  renderIndustryDetailPage,
  renderCaseStudiesPage,
  renderCaseStudyDetailPage,
  renderInsightsPage,
  renderArticleDetailPage,
  renderContactPage,
  renderSearchPage,
  renderSalesConversionBanner,
  renderHeroArchitectureDiagram,
  INDUSTRIES
};

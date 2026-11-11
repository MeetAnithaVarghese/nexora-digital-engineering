// Database Seeding Script for Nexora Digital Engineering
const { getDb } = require('./index');
const { hashPassword } = require('../server/auth');
const config = require('../config');

function seedDatabase() {
  const db = getDb();
  console.log('[Seed] Initializing database seeding...');

  // 1. Seed Users (Admin and Editor)
  const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(config.adminEmail);
  if (!existingAdmin) {
    const adminAuth = hashPassword(config.adminPassword);
    db.prepare('INSERT INTO users (email, password_hash, salt, role) VALUES (?, ?, ?, ?)').run(
      config.adminEmail,
      adminAuth.hash,
      adminAuth.salt,
      'admin'
    );
    console.log(`[Seed] Created initial Admin: ${config.adminEmail}`);

    const editorAuth = hashPassword('NexoraEditor2026!');
    db.prepare('INSERT INTO users (email, password_hash, salt, role) VALUES (?, ?, ?, ?)').run(
      'editor@nexora.example.com',
      editorAuth.hash,
      editorAuth.salt,
      'editor'
    );
    console.log('[Seed] Created initial Editor: editor@nexora.example.com');
  }

  // 2. Seed 6 Core Services
  const services = [
    {
      slug: 'ai-data-engineering',
      title: 'AI & Data Engineering',
      tagline: 'Production-Grade Machine Learning, Data Fabrics & LLM Orchestration',
      summary: 'Architecting robust enterprise data platforms, real-time streaming pipelines, and production-ready Generative AI systems anchored in rigorous governance.',
      features_json: JSON.stringify([
        'Enterprise RAG & Domain-Specific LLM Fine-Tuning',
        'Streaming Data Mesh & Real-time Kafka Pipelines',
        'Feature Stores & Automated MLOps Workflows',
        'Data Governance, Lineage & Compliance Automation'
      ]),
      capabilities_json: JSON.stringify([
        'Vector Database Architecture (pgvector, Milvus, Qdrant)',
        'Distributed Computing with Apache Spark and Ray',
        'Automated Model Drift Detection and Evaluation Loops',
        'Model Safety, Alignment & Adversarial Robustness'
      ]),
      icon: 'brain-circuit'
    },
    {
      slug: 'software-product-engineering',
      title: 'Software Product Engineering',
      tagline: 'Modern Distributed Architectures, Resilient Microservices & Reactive Frontends',
      summary: 'Designing mission-critical software products with domain-driven design, high concurrency backends, and modular micro-frontends.',
      features_json: JSON.stringify([
        'Domain-Driven Microservices & Event-Driven Systems',
        'High-Throughput Distributed API Platforms',
        'Type-Safe Frontend Architecture (TypeScript, Next.js)',
        'Zero-Trust Internal Network Topologies'
      ]),
      capabilities_json: JSON.stringify([
        'Event Sourcing and CQRS Architectures',
        'gRPC, GraphQL and OpenAPI REST Contracts',
        'WebSockets and Real-time Synchronization',
        'Modern State Machines & Resilient Offline Caching'
      ]),
      icon: 'code'
    },
    {
      slug: 'cloud-platform-engineering',
      title: 'Cloud & Platform Engineering',
      tagline: 'Multi-Cloud Infrastructure, Kubernetes Platforms & Internal Developer Portals',
      summary: 'Empowering engineering organizations with self-healing cloud platforms, GitOps infrastructure-as-code, and developer velocity accelerators.',
      features_json: JSON.stringify([
        'Production Kubernetes (EKS, GKE, AKS) Architecture',
        'Terraform & OpenTofu Declarative Infrastructure',
        'GitOps Continuous Delivery (ArgoCD & Flux)',
        'Observability Meshes (OpenTelemetry, Prometheus, Grafana)'
      ]),
      capabilities_json: JSON.stringify([
        'Multi-Region Disaster Recovery & Automated Failover',
        'Service Mesh Engineering with Istio and Linkerd',
        'FinOps Cloud Cost Governance & Optimization',
        'Zero-Downtime Blue/Green & Canary Deployments'
      ]),
      icon: 'cloud'
    },
    {
      slug: 'cybersecurity-governance',
      title: 'Cybersecurity & Governance',
      tagline: 'Zero-Trust Architecture, DevSecOps Automation & Regulatory Assurance',
      summary: 'Hardening enterprise systems against sophisticated threats with proactive vulnerability discovery, cryptographic guarantees, and automated compliance.',
      features_json: JSON.stringify([
        'Zero-Trust Network Access (ZTNA) Architecture',
        'Automated DevSecOps Pipeline Scanners (SAST, DAST, SBOM)',
        'SOC 2 Type II, ISO 27001 & HIPAA Readiness',
        'Cryptographic Key Management & Mutual TLS (mTLS)'
      ]),
      capabilities_json: JSON.stringify([
        'Automated Secrets Rotation and Vault Integration',
        'Threat Modeling and Adversarial Penetration Testing',
        'Role-Based and Attribute-Based Access Control (RBAC/ABAC)',
        'Real-time Incident Response & Forensic Audit Logging'
      ]),
      icon: 'shield-check'
    },
    {
      slug: 'digital-transformation',
      title: 'Digital Transformation Consulting',
      tagline: 'Strategic Technology Modernization, Legacy Decoupling & Enterprise Agility',
      summary: 'Guiding enterprise leaders through complex legacy modernization, cloud migration roadmaps, and AI-native organizational transformation.',
      features_json: JSON.stringify([
        'Legacy Monolith Strangler Fig Modernization',
        'Enterprise Architecture Roadmapping & Technology Due Diligence',
        'AI-Native Engineering Operating Model Adoption',
        'Cloud Value Realization & TCO Rationalization'
      ]),
      capabilities_json: JSON.stringify([
        'System Decomposition and Domain Mapping',
        'Continuous Modernization Without Service Disruption',
        'Engineering Metrics Modernization (DORA, SPACE)',
        'Change Management and Technical Leadership Coaching'
      ]),
      icon: 'trending-up'
    },
    {
      slug: 'quality-engineering',
      title: 'Quality Engineering & Test Automation',
      tagline: 'Adversarial Testing, Continuous Verification & Chaos Engineering',
      summary: 'Elevating software quality from manual checklists to automated, multi-layered deterministic and adversarial verification pipelines.',
      features_json: JSON.stringify([
        'Automated End-to-End & Contract Testing Suites',
        'Adversarial Security & Fuzz Testing Harnesses',
        'Performance, Load & Chaos Engineering Experiments',
        'Automated Visual Regression & WCAG 2.1 AA Audits'
      ]),
      capabilities_json: JSON.stringify([
        'Deterministic Test Harness Design (Node:test, Playwright)',
        'API Mutation Testing and Schema Validation',
        'Distributed Load Simulation with k6',
        'Shift-Left Continuous Quality Gates in CI/CD'
      ]),
      icon: 'check-circle'
    }
  ];

  for (const s of services) {
    const existing = db.prepare('SELECT id FROM services WHERE slug = ?').get(s.slug);
    if (!existing) {
      db.prepare(`
        INSERT INTO services (slug, title, tagline, summary, features_json, capabilities_json, icon)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(s.slug, s.title, s.tagline, s.summary, s.features_json, s.capabilities_json, s.icon);
    }
  }
  console.log(`[Seed] Seeded ${services.length} core services.`);

  // 3. Seed Insights & Articles
  const articles = [
    {
      slug: 'architecting-ai-native-software-systems',
      title: 'Architecting AI-Native Software Systems: From Ad-Hoc Autocomplete to Deterministic Agentic Workflows',
      category: 'AI & Data Engineering',
      summary: 'Why moving from developer autocomplete to specification-driven agent orchestration requires strict architectural constitutions and dual-layer verification.',
      body_markdown: 'AI-native software development is fundamentally distinct from inline code autocomplete. This technical blueprint breaks down specification-first architecture, task isolation, and how to preserve human authorization at critical release gates.',
      author: 'Dr. Marcus Vance, Chief Architect',
      status: 'published',
      published_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      slug: 'zero-trust-kubernetes-platform-hardening',
      title: 'Zero-Trust Platform Engineering: Hardening Kubernetes Clusters for Regulated Financial Workloads',
      category: 'Cloud & Platform',
      summary: 'A step-by-step implementation guide to mutual TLS, Cilium eBPF network policies, and automated admission control in mission-critical environments.',
      body_markdown: 'Securing multi-tenant Kubernetes platforms requires defense-in-depth: from immutable kernel-level eBPF packet filtering to automated cryptographic workload attestation.',
      author: 'Elena Rostova, Platform Lead',
      status: 'published',
      published_at: new Date(Date.now() - 12 * 86400000).toISOString()
    },
    {
      slug: 'adversarial-testing-in-continuous-delivery',
      title: 'Adversarial Testing in CI/CD: How Chaos Engineering and Fuzzing Prevent Production Outages',
      category: 'Quality Engineering',
      summary: 'Traditional unit tests verify happy paths; adversarial test suites actively probe boundary faults, race conditions, and role escalation flaws.',
      body_markdown: 'Quality engineering must shift left and shift adversarial. We demonstrate automated fuzzing, schema boundary checking, and role escalation tests within standard CI runs.',
      author: 'Rajiv Patel, VP of Quality Engineering',
      status: 'published',
      published_at: new Date(Date.now() - 20 * 86400000).toISOString()
    },
    {
      slug: 'draft-ai-governance-framework-2027',
      title: 'Enterprise AI Governance: Mitigating Hallucination and Ensuring Model Accountability',
      category: 'Cybersecurity & Governance',
      summary: 'Operationalizing regulatory frameworks for enterprise LLMs with verifiable citation anchors and human-in-the-loop audit gates.',
      body_markdown: 'Work-in-progress draft detailing automated hallucination detection and audit logging.',
      author: 'Sarah Chen, Head of Governance',
      status: 'draft',
      published_at: null
    }
  ];

  for (const a of articles) {
    const existing = db.prepare('SELECT id FROM articles WHERE slug = ?').get(a.slug);
    if (!existing) {
      db.prepare(`
        INSERT INTO articles (slug, title, category, summary, body_markdown, author, status, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(a.slug, a.title, a.category, a.summary, a.body_markdown, a.author, a.status, a.published_at);
    }
  }
  console.log(`[Seed] Seeded ${articles.length} insights/articles.`);

  // 4. Seed Case Studies
  const caseStudies = [
    {
      slug: 'fintech-realtime-settlement-engine',
      title: 'Sub-Millisecond Payment Settlement Engine for Global FinTech Tier-1 Institution',
      client_industry: 'Financial Services',
      challenge: 'Legacy batch settlement processing suffered 4-hour latencies, limiting international real-time clearing.',
      solution: 'Architected event-driven microservices on Kafka and Go with distributed transactional memory and zero-downtime failover.',
      outcome_metrics_json: JSON.stringify([
        { metric: 'Settlement Latency', value: '< 12ms', description: 'Reduced from 4 hours' },
        { metric: 'Daily Volume', value: '$4.2B', description: 'Processed with zero data loss' },
        { metric: 'Availability', value: '99.999%', description: 'Achieved across 4 geographic regions' }
      ]),
      published_at: new Date(Date.now() - 30 * 86400000).toISOString()
    },
    {
      slug: 'healthcare-hipaa-rag-clinical-platform',
      title: 'HIPAA-Compliant Generative AI Clinical Decision Support Platform',
      client_industry: 'Healthcare & Life Sciences',
      challenge: 'Physicians spent 3+ hours daily navigating fragmented electronic health records to synthesize diagnostic histories.',
      solution: 'Engineered an on-premise, zero-data-retention RAG platform with cryptographically attested vector indices and automated hallucination filtering.',
      outcome_metrics_json: JSON.stringify([
        { metric: 'Chart Synthesis Time', value: '-68%', description: 'Saved 2 hours per clinical shift' },
        { metric: 'Diagnostic Citation Accuracy', value: '99.4%', description: 'Validated against peer-reviewed journals' },
        { metric: 'Security Compliance', value: '100%', description: 'Zero PII transmission to external networks' }
      ]),
      published_at: new Date(Date.now() - 45 * 86400000).toISOString()
    }
  ];

  for (const cs of caseStudies) {
    const existing = db.prepare('SELECT id FROM case_studies WHERE slug = ?').get(cs.slug);
    if (!existing) {
      db.prepare(`
        INSERT INTO case_studies (slug, title, client_industry, challenge, solution, outcome_metrics_json, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(cs.slug, cs.title, cs.client_industry, cs.challenge, cs.solution, cs.outcome_metrics_json, cs.published_at);
    }
  }
  console.log(`[Seed] Seeded ${caseStudies.length} case studies.`);

  // 5. Seed Sample Lead
  const existingLead = db.prepare('SELECT id FROM leads WHERE email = ?').get('prospective.client@acme-corp.example');
  if (!existingLead) {
    db.prepare(`
      INSERT INTO leads (full_name, email, company, service_interest, message, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      'Jonathan Reynolds',
      'prospective.client@acme-corp.example',
      'Acme Global Enterprises',
      'ai-data-engineering',
      'We are evaluating enterprise partners to modernize our real-time streaming analytics and implement production RAG systems.',
      'new'
    );
    console.log('[Seed] Seeded initial sample lead.');
  }

  console.log('[Seed] Database seeding completed successfully.');
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };

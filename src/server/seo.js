// SEO, AEO and GEO Engine for Nexora Digital Engineering
const { getDb } = require('../db');
const config = require('../config');

function generateSitemapXml() {
  const db = getDb();
  const baseUrl = config.baseUrl;
  const now = new Date().toISOString().split('T')[0];

  // Static public routes
  const staticRoutes = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/services`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/industries`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/case-studies`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/insights`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/search`, priority: '0.5', changefreq: 'monthly' }
  ];

  // Dynamic Service routes
  const services = db.prepare('SELECT slug FROM services').all();
  const serviceRoutes = services.map(s => ({
    loc: `${baseUrl}/services/${s.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  // Dynamic Published Article routes
  const articles = db.prepare("SELECT slug, published_at FROM articles WHERE status = 'published'").all();
  const articleRoutes = articles.map(a => ({
    loc: `${baseUrl}/insights/${a.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: a.published_at ? a.published_at.split('T')[0] : now
  }));

  const allUrls = [...staticRoutes, ...serviceRoutes, ...articleRoutes];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of allUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += `    <lastmod>${u.lastmod || now}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>';

  return xml;
}

function generateRobotsTxt() {
  const baseUrl = config.baseUrl;
  return `# Robots.txt for Nexora Digital Engineering
User-agent: *
Allow: /
Allow: /services/
Allow: /insights/
Allow: /case-studies/
Allow: /industries/
Allow: /about
Allow: /contact
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
}

function getOrganizationJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Nexora Digital Engineering',
    'url': config.baseUrl,
    'logo': `${config.baseUrl}/public/img/logo.svg`,
    'description': 'Elite B2B technology consulting firm specializing in AI engineering, cloud platforms, cybersecurity, and software modernization.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Enterprise Consultation',
      'email': 'contact@nexora.example.com'
    },
    'knowsAbout': [
      'AI & Data Engineering',
      'Software Product Engineering',
      'Cloud & Platform Engineering',
      'Cybersecurity & Governance',
      'Digital Transformation Consulting',
      'Quality Engineering & Test Automation'
    ]
  });
}

function getServiceJsonLd(service) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': service.title,
    'provider': {
      '@type': 'Organization',
      'name': 'Nexora Digital Engineering'
    },
    'description': service.summary,
    'areaServed': 'Global',
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Enterprise Technology Leadership'
    }
  });
}

module.exports = {
  generateSitemapXml,
  generateRobotsTxt,
  getOrganizationJsonLd,
  getServiceJsonLd
};


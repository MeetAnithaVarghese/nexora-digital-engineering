// Core Request Router for Nexora Digital Engineering
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');
const { getDb } = require('../db');
const { createLead, getLeads, updateLeadStatus } = require('./lead');
const { searchEntities } = require('./search');
const {
  verifyPassword,
  createSession,
  validateSession,
  destroySession,
  parseCookies,
  createMagicLink,
  verifyMagicLink
} = require('./auth');
const { generateSitemapXml, generateRobotsTxt } = require('./seo');
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
  renderSearchPage,
  INDUSTRIES
} = require('../views/pages');
const { renderLoginPage, renderAdminDashboard } = require('../views/admin');

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) { // 1MB payload limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

function parseFormBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const data = {};
      for (const [key, val] of params.entries()) {
        data[key] = val;
      }
      resolve(data);
    });
  });
}

async function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const db = getDb();
  const cookies = parseCookies(req);
  const userSession = validateSession(cookies.session_token);

  // 1. Static Asset Serving
  if (pathname.startsWith('/public/') || pathname.startsWith('/images/') || pathname.startsWith('/css/') || pathname.startsWith('/js/')) {
    const publicDir = path.resolve(__dirname, '..', 'public');
    let subPath = '';
    if (pathname.startsWith('/images/')) {
      subPath = path.join('images', pathname.slice('/images/'.length));
    } else if (pathname.startsWith('/css/')) {
      subPath = path.join('css', pathname.slice('/css/'.length));
    } else if (pathname.startsWith('/js/')) {
      subPath = path.join('js', pathname.slice('/js/'.length));
    } else if (pathname.startsWith('/public/')) {
      subPath = pathname.slice('/public/'.length);
    }
    // Prevent directory traversal attacks
    const safeSubPath = path.normalize(subPath).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.resolve(publicDir, safeSubPath);

    if (filePath.startsWith(publicDir) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.ico': 'image/x-icon',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
        '.json': 'application/json'
      };
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600'
      });
      return fs.createReadStream(filePath).pipe(res);
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Asset Not Found');
  }

  // 2. SEO Endpoints
  if (pathname === '/sitemap.xml' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    return res.end(generateSitemapXml());
  }

  if (pathname === '/robots.txt' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(generateRobotsTxt());
  }

  // 3. System Health API
  if (pathname === '/api/health' && method === 'GET') {
    return sendJson(res, 200, {
      status: 'healthy',
      system: 'Nexora Digital Web Platform',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  }

  // 4. Public Web Views
  if (pathname === '/' && method === 'GET') {
    const services = db.prepare('SELECT * FROM services').all();
    const caseStudies = db.prepare('SELECT * FROM case_studies').all();
    const articles = db.prepare("SELECT * FROM articles WHERE status = 'published' LIMIT 3").all();
    return sendHtml(res, 200, renderHomePage(services, caseStudies, articles));
  }

  if (pathname === '/about' && method === 'GET') {
    return sendHtml(res, 200, renderAboutPage());
  }

  if (pathname === '/services' && method === 'GET') {
    const services = db.prepare('SELECT * FROM services').all();
    return sendHtml(res, 200, renderServicesPage(services));
  }

  if (pathname.startsWith('/services/') && method === 'GET') {
    const slug = pathname.replace('/services/', '').replace(/\/$/, '');
    const service = db.prepare('SELECT * FROM services WHERE slug = ?').get(slug);
    if (!service) {
      return sendHtml(res, 404, '<h1>404 Service Practice Not Found</h1><p><a href="/services">Return to Services</a></p>');
    }
    const relatedCaseStudies = db.prepare('SELECT * FROM case_studies LIMIT 2').all();
    return sendHtml(res, 200, renderServiceDetailPage(service, relatedCaseStudies));
  }

  if (pathname === '/industries' && method === 'GET') {
    return sendHtml(res, 200, renderIndustriesPage());
  }

  if (pathname.startsWith('/industries/') && method === 'GET') {
    const slug = pathname.replace('/industries/', '').replace(/\/$/, '');
    const industry = INDUSTRIES.find(i => i.slug === slug || (i.aliases && i.aliases.includes(slug)));
    if (!industry) {
      return sendHtml(res, 404, '<h1>404 Industry Domain Not Found</h1><p><a href="/industries">Return to Industries</a></p>');
    }
    const relatedCaseStudies = db.prepare('SELECT * FROM case_studies').all();
    const relatedServices = db.prepare('SELECT * FROM services LIMIT 3').all();
    return sendHtml(res, 200, renderIndustryDetailPage(industry, relatedCaseStudies, relatedServices));
  }

  if (pathname === '/case-studies' && method === 'GET') {
    const caseStudies = db.prepare('SELECT * FROM case_studies').all();
    return sendHtml(res, 200, renderCaseStudiesPage(caseStudies));
  }

  if (pathname.startsWith('/case-studies/') && method === 'GET') {
    const slug = pathname.replace('/case-studies/', '').replace(/\/$/, '');
    const caseStudy = db.prepare('SELECT * FROM case_studies WHERE slug = ?').get(slug);
    if (!caseStudy) {
      return sendHtml(res, 404, '<h1>404 Case Study Not Found</h1><p><a href="/case-studies">Return to Case Studies</a></p>');
    }
    const relatedServices = db.prepare('SELECT * FROM services LIMIT 3').all();
    return sendHtml(res, 200, renderCaseStudyDetailPage(caseStudy, relatedServices));
  }

  if (pathname === '/insights' && method === 'GET') {
    const articles = db.prepare("SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC").all();
    return sendHtml(res, 200, renderInsightsPage(articles));
  }

  if (pathname.startsWith('/insights/') && method === 'GET') {
    const slug = pathname.replace('/insights/', '').replace(/\/$/, '');
    const article = db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug);
    if (!article) {
      return sendHtml(res, 404, '<h1>404 Strategic Briefing Not Found</h1><p><a href="/insights">Return to Insights</a></p>');
    }
    const relatedArticles = db.prepare("SELECT * FROM articles WHERE status = 'published' AND slug != ? LIMIT 2").all(slug);
    const relatedServices = db.prepare('SELECT * FROM services LIMIT 3').all();
    return sendHtml(res, 200, renderArticleDetailPage(article, relatedArticles, relatedServices));
  }

  if (pathname === '/contact' && method === 'GET') {
    const selectedService = parsedUrl.query.service || '';
    const selectedIndustry = parsedUrl.query.industry || '';
    return sendHtml(res, 200, renderContactPage(selectedService, selectedIndustry));
  }

  if (pathname === '/search' && method === 'GET') {
    const query = parsedUrl.query.q || '';
    const results = searchEntities(query);
    return sendHtml(res, 200, renderSearchPage(query, results));
  }

  // 5. Admin & Authentication Web Views
  if (pathname === '/admin' && method === 'GET') {
    if (!userSession) {
      return sendHtml(res, 200, renderLoginPage());
    }
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    const articles = db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all();
    return sendHtml(res, 200, renderAdminDashboard(userSession, leads, articles));
  }

  if (pathname === '/login' && method === 'GET') {
    if (userSession) {
      res.writeHead(302, { Location: '/admin' });
      return res.end();
    }
    return sendHtml(res, 200, renderLoginPage());
  }

  // 6. REST API: Lead Generation
  if (pathname === '/api/leads' && method === 'POST') {
    try {
      const payload = await parseJsonBody(req);
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const result = createLead(payload, clientIp);
      return sendJson(res, result.status, result);
    } catch (err) {
      return sendJson(res, 400, {
        success: false,
        error: { code: 'INVALID_REQUEST', message: err.message }
      });
    }
  }

  // 7. REST API: Search
  if (pathname === '/api/search' && method === 'GET') {
    const query = parsedUrl.query.q || '';
    const results = searchEntities(query);
    return sendJson(res, 200, { success: true, data: results });
  }

  // 8. REST API: Authentication (Magic Link & Session)
  if (pathname === '/api/auth/magic-link' && method === 'POST') {
    try {
      const contentType = req.headers['content-type'] || '';
      let body = {};
      if (contentType.includes('application/json')) {
        body = await parseJsonBody(req);
      } else {
        body = await parseFormBody(req);
      }

      const email = body.email;
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return sendJson(res, 400, {
          success: false,
          error: { code: 'INVALID_EMAIL', message: 'A valid staff email address is required.' }
        });
      }

      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const result = createMagicLink(email, clientIp);
      if (result) {
        console.log(`[Auth] Magic link for ${email}: /api/auth/verify?token=${result.rawToken}`);
      }

      if (contentType.includes('application/json')) {
        return sendJson(res, 200, {
          success: true,
          data: {
            message: 'If an authorized account matches this email, a login link has been dispatched.',
            ...(process.env.NODE_ENV !== 'production' && result ? { devToken: result.rawToken, verifyUrl: `/api/auth/verify?token=${result.rawToken}` } : {})
          }
        });
      }

      return sendHtml(res, 200, renderLoginPage(null, 'A sign-in link has been dispatched to your email address.'));
    } catch (err) {
      return sendJson(res, 400, {
        success: false,
        error: { code: 'REQUEST_ERROR', message: err.message }
      });
    }
  }

  if (pathname === '/api/auth/verify' && method === 'GET') {
    const rawToken = parsedUrl.query.token;
    if (!rawToken) {
      return sendHtml(res, 400, renderLoginPage('Missing or invalid authentication token.'));
    }

    const verifiedUser = verifyMagicLink(rawToken);
    if (!verifiedUser) {
      return sendHtml(res, 401, renderLoginPage('This login link is invalid, expired, or has already been used.'));
    }

    const session = createSession(verifiedUser.userId);
    const cookieHeader = `session_token=${session.token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=259200`;

    res.writeHead(302, {
      Location: '/admin',
      'Set-Cookie': cookieHeader
    });
    return res.end();
  }

  if (pathname === '/api/auth/login' && method === 'POST') {
    const contentType = req.headers['content-type'] || '';
    let credentials = {};
    if (contentType.includes('application/json')) {
      credentials = await parseJsonBody(req);
    } else {
      credentials = await parseFormBody(req);
    }

    const { email, password } = credentials;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user || !verifyPassword(password, user.password_hash, user.salt)) {
      if (contentType.includes('application/json')) {
        return sendJson(res, 401, {
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' }
        });
      }
      return sendHtml(res, 401, renderLoginPage('Invalid email or password credentials provided.'));
    }

    const session = createSession(user.id);
    const cookieHeader = `session_token=${session.token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400`;

    if (contentType.includes('application/json')) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      });
      return res.end(JSON.stringify({ success: true, user: { email: user.email, role: user.role } }));
    }

    res.writeHead(302, {
      Location: '/admin',
      'Set-Cookie': cookieHeader
    });
    return res.end();
  }

  if (pathname === '/api/auth/logout' && method === 'POST') {
    if (cookies.session_token) {
      destroySession(cookies.session_token);
    }
    res.writeHead(302, {
      Location: '/admin',
      'Set-Cookie': 'session_token=; HttpOnly; Path=/; Max-Age=0'
    });
    return res.end();
  }

  // 9. REST API: Protected Admin Endpoints (RBAC Enforced)
  if (pathname === '/api/admin/leads' && method === 'GET') {
    if (!userSession || userSession.role !== 'admin') {
      return sendJson(res, 403, {
        success: false,
        error: { code: 'FORBIDDEN', message: 'Admin role clearance required to access leads.' }
      });
    }
    const status = parsedUrl.query.status || null;
    const leads = getLeads(status);
    return sendJson(res, 200, { success: true, data: leads });
  }

  if (pathname.startsWith('/api/admin/leads/') && pathname.endsWith('/status') && method === 'POST') {
    if (!userSession || userSession.role !== 'admin') {
      return sendJson(res, 403, {
        success: false,
        error: { code: 'FORBIDDEN', message: 'Admin role required.' }
      });
    }
    const leadId = parseInt(pathname.split('/')[4], 10);
    const body = await parseJsonBody(req);
    const updateResult = updateLeadStatus(leadId, body.status);
    return sendJson(res, updateResult.success ? 200 : 400, updateResult);
  }

  if (pathname.startsWith('/api/admin/articles/') && pathname.endsWith('/publish') && method === 'POST') {
    if (!userSession || userSession.role !== 'admin') {
      return sendJson(res, 403, {
        success: false,
        error: { code: 'FORBIDDEN', message: 'Admin role required to publish articles.' }
      });
    }
    const articleId = parseInt(pathname.split('/')[4], 10);
    const stmt = db.prepare("UPDATE articles SET status = 'published', published_at = datetime('now') WHERE id = ?");
    stmt.run(articleId);

    res.writeHead(302, { Location: '/admin' });
    return res.end();
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 Page Not Found</h1><p>The requested route does not exist. <a href="/">Return to Home</a></p>');
}

module.exports = {
  handleRequest
};


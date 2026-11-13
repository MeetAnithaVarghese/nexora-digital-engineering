// Server Entrypoint for Nexora Digital Engineering
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');
const config = require('../config');
const { getDb } = require('../db');
const { handleRequest } = require('./routes');

// Robust Static Asset Handler for /images/, /css/, /js/, and /public/
function handleStaticAsset(req, res) {
  const parsed = url.parse(req.url, true);
  let pathname = parsed.pathname || '';
  try {
    pathname = decodeURIComponent(pathname);
  } catch {}

  if (pathname.startsWith('/images/') || pathname.startsWith('/public/') || pathname.startsWith('/css/') || pathname.startsWith('/js/')) {
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
      fs.createReadStream(filePath).pipe(res);
      return true;
    }
  }
  return false;
}

function startServer(port = config.port) {
  // Ensure database is initialized
  getDb();

  const server = http.createServer(async (req, res) => {
    try {
      if (handleStaticAsset(req, res)) {
        return;
      }
      await handleRequest(req, res);
    } catch (err) {
      console.error('[Server Error]', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'An internal server error occurred.' }
      }));
    }
  });

  server.listen(port, () => {
    console.log(`[Nexora Server] Running at http://localhost:${port}`);
    console.log(`[Environment] Mode: ${config.env}`);
    console.log(`[Persistence] SQLite: ${config.dbFile}`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };


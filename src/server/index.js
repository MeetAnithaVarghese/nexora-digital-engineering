// Server Entrypoint for Nexora Digital Engineering
const http = require('node:http');
const config = require('../config');
const { getDb } = require('../db');
const { handleRequest } = require('./routes');

function startServer(port = config.port) {
  // Ensure database is initialized
  getDb();

  const server = http.createServer(async (req, res) => {
    try {
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


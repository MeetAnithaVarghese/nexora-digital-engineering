// Database Access Layer for Nexora Digital Engineering
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const config = require('../config');

let dbInstance = null;
let sourceUncPath = null;
let localBridgePath = null;

function resolveDbPath(requestedPath) {
  if (!requestedPath || requestedPath === ':memory:') {
    return requestedPath || ':memory:';
  }
  const isUnc = typeof requestedPath === 'string' && (
    requestedPath.startsWith('\\\\') ||
    requestedPath.startsWith('//') ||
    requestedPath.includes('\\wsl') ||
    requestedPath.includes('/wsl')
  );
  if (isUnc) {
    sourceUncPath = path.resolve(requestedPath);
    const hash = crypto.createHash('md5').update(sourceUncPath).digest('hex').slice(0, 8);
    const baseName = path.basename(sourceUncPath, '.db');
    localBridgePath = path.join(os.tmpdir(), `${baseName}_${hash}.db`);

    // If source exists and has content, copy to local cache
    if (fs.existsSync(sourceUncPath) && fs.statSync(sourceUncPath).size > 0) {
      try {
        fs.copyFileSync(sourceUncPath, localBridgePath);
      } catch (_) {}
    }
    return localBridgePath;
  }
  return requestedPath;
}

function syncDbToSource() {
  if (sourceUncPath && localBridgePath && fs.existsSync(localBridgePath)) {
    try {
      if (dbInstance) {
        try { dbInstance.exec('PRAGMA wal_checkpoint(TRUNCATE);'); } catch (_) {}
      }
      fs.copyFileSync(localBridgePath, sourceUncPath);
    } catch (_) {}
  }
}

// Automatically sync back to network/UNC storage on process exit
let exitRegistered = false;
function registerExitSync() {
  if (!exitRegistered) {
    exitRegistered = true;
    process.on('exit', () => syncDbToSource());
    process.on('SIGINT', () => {
      syncDbToSource();
      process.exit(0);
    });
  }
}

function getDb(customPath = null) {
  if (!dbInstance) {
    const rawPath = customPath || config.dbFile;
    const effectivePath = resolveDbPath(rawPath);

    dbInstance = new DatabaseSync(effectivePath);
    dbInstance.exec('PRAGMA foreign_keys = ON;');
    dbInstance.exec('PRAGMA busy_timeout = 5000;');

    try {
      dbInstance.exec('PRAGMA journal_mode = WAL;');
    } catch (_) {
      try {
        dbInstance.exec('PRAGMA journal_mode = DELETE;');
      } catch (__) {}
    }

    initSchema(dbInstance);
    registerExitSync();
    syncDbToSource();
  }
  return dbInstance;
}

function initSchema(db) {
  try {
    const tableCheck = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'").get();
    if (tableCheck && tableCheck.count > 0) {
      return; // Schema is already initialized, avoid unnecessary DDL locks
    }
  } catch (_) {}

  const schemaPath = path.join(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
  }
}

function resetDbForTesting(customPath = ':memory:') {
  dbInstance = new DatabaseSync(customPath);
  dbInstance.exec('PRAGMA foreign_keys = ON;');
  dbInstance.exec('PRAGMA busy_timeout = 5000;');
  initSchema(dbInstance);
  return dbInstance;
}

module.exports = {
  getDb,
  initSchema,
  resetDbForTesting,
  syncDbToSource
};

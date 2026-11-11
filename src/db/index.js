// Database Access Layer for Nexora Digital Engineering
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const config = require('../config');

let dbInstance = null;

function getDb(customPath = null) {
  if (!dbInstance) {
    const dbFilePath = customPath || config.dbFile;
    dbInstance = new DatabaseSync(dbFilePath);
    dbInstance.exec('PRAGMA foreign_keys = ON;');
    dbInstance.exec('PRAGMA journal_mode = WAL;');
    initSchema(dbInstance);
  }
  return dbInstance;
}

function initSchema(db) {
  const schemaPath = path.join(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
  }
}

function resetDbForTesting(customPath = ':memory:') {
  dbInstance = new DatabaseSync(customPath);
  dbInstance.exec('PRAGMA foreign_keys = ON;');
  initSchema(dbInstance);
  return dbInstance;
}

module.exports = {
  getDb,
  initSchema,
  resetDbForTesting
};


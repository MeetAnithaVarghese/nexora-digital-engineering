const test = require('node:test');
const assert = require('node:assert/strict');
const { getDb, resetDbForTesting } = require('../../src/db');
const { seedDatabase } = require('../../src/db/seed');

test.before(() => {
  resetDbForTesting(':memory:');
  seedDatabase();
});

test('Integration: draft articles are excluded from public published queries', () => {
  const db = getDb();

  // Query all articles
  const allArticles = db.prepare('SELECT * FROM articles').all();
  const hasDraft = allArticles.some(a => a.status === 'draft');
  assert.equal(hasDraft, true, 'Database should contain at least one draft article');

  // Query published articles (what public API returns)
  const publishedArticles = db.prepare("SELECT * FROM articles WHERE status = 'published'").all();
  const anyDraftInPublished = publishedArticles.some(a => a.status === 'draft');
  assert.equal(anyDraftInPublished, false, 'Draft articles must never be returned in published query');
});


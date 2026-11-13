const test = require('node:test');
const assert = require('node:assert/strict');
const { searchEntities } = require('../../src/server/search');
const { getDb, resetDbForTesting } = require('../../src/db');
const { seedDatabase } = require('../../src/db/seed');

test.before(() => {
  resetDbForTesting(':memory:');
  seedDatabase();
});

test('Integration: searchEntities finds services, case studies, and articles', () => {
  getDb();
  
  // Search for AI
  const aiSearch = searchEntities('AI');
  assert.ok(aiSearch.total > 0);
  assert.ok(aiSearch.results.some(r => r.entity_type === 'service'));

  // Search for Kubernetes
  const k8sSearch = searchEntities('Kubernetes');
  assert.ok(k8sSearch.total > 0);
  assert.ok(k8sSearch.results.some(r => r.entity_type === 'service' || r.entity_type === 'article'));

  // Very short query returns 0 results
  const shortSearch = searchEntities('a');
  assert.equal(shortSearch.total, 0);
});


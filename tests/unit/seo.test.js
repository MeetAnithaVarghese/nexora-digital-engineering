const test = require('node:test');
const assert = require('node:assert/strict');
const { generateSitemapXml, generateRobotsTxt, getOrganizationJsonLd } = require('../../src/server/seo');
const { getDb, resetDbForTesting } = require('../../src/db');
const { seedDatabase } = require('../../src/db/seed');

test.before(() => {
  resetDbForTesting(':memory:');
  seedDatabase();
});

test('SEO: sitemap generates valid XML structure with public routes', () => {
  getDb();
  const sitemap = generateSitemapXml();
  assert.ok(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(sitemap.includes('<urlset'));
  assert.ok(sitemap.includes('/services/ai-data-engineering</loc>'));
  assert.ok(sitemap.includes('</urlset>'));
});

test('SEO: robots.txt disallows admin and api routes while allowing public routes', () => {
  const robots = generateRobotsTxt();
  assert.ok(robots.includes('Disallow: /admin/'));
  assert.ok(robots.includes('Disallow: /api/'));
  assert.ok(robots.includes('Allow: /services/'));
  assert.ok(robots.includes('Sitemap:'));
});

test('SEO: Organization JSON-LD is valid and contains expected entity attributes', () => {
  const jsonLdStr = getOrganizationJsonLd();
  const parsed = JSON.parse(jsonLdStr);
  assert.equal(parsed['@type'], 'Organization');
  assert.equal(parsed.name, 'Nexora Digital Engineering');
  assert.ok(Array.isArray(parsed.knowsAbout));
});


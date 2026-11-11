// Multi-Entity Search Engine Module
const { getDb } = require('../db');
const { sanitizeSearchQuery } = require('./validation');

function searchEntities(rawQuery) {
  const query = sanitizeSearchQuery(rawQuery);
  if (!query || query.length < 2) {
    return {
      query,
      total: 0,
      results: []
    };
  }

  const db = getDb();
  const searchPattern = `%${query}%`;

  // 1. Search Services
  const serviceStmt = db.prepare(`
    SELECT 'service' AS entity_type, slug, title, summary AS snippet, icon
    FROM services
    WHERE title LIKE ? OR summary LIKE ? OR tagline LIKE ?
  `);
  const services = serviceStmt.all(searchPattern, searchPattern, searchPattern);

  // 2. Search Articles (Published only)
  const articleStmt = db.prepare(`
    SELECT 'article' AS entity_type, slug, title, summary AS snippet, category
    FROM articles
    WHERE status = 'published' AND (title LIKE ? OR summary LIKE ? OR category LIKE ?)
  `);
  const articles = articleStmt.all(searchPattern, searchPattern, searchPattern);

  // 3. Search Case Studies
  const caseStmt = db.prepare(`
    SELECT 'case_study' AS entity_type, slug, title, challenge AS snippet, client_industry
    FROM case_studies
    WHERE title LIKE ? OR challenge LIKE ? OR solution LIKE ? OR client_industry LIKE ?
  `);
  const caseStudies = caseStmt.all(searchPattern, searchPattern, searchPattern, searchPattern);

  const combined = [...services, ...articles, ...caseStudies];

  return {
    query,
    total: combined.length,
    results: combined
  };
}

module.exports = {
  searchEntities
};


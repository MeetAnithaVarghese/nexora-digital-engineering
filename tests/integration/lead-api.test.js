const test = require('node:test');
const assert = require('node:assert/strict');
const { createLead, getLeads, updateLeadStatus, resetRateLimiterForTesting } = require('../../src/server/lead');
const { getDb, resetDbForTesting } = require('../../src/db');
const { seedDatabase } = require('../../src/db/seed');

test.before(() => {
  resetDbForTesting(':memory:');
  seedDatabase();
});

test('Integration: createLead persists valid enquiry and assigns status new', () => {
  resetRateLimiterForTesting();
  getDb();

  const payload = {
    fullName: 'Marcus Vance',
    email: 'marcus.vance@techcorp.example',
    company: 'TechCorp International',
    serviceInterest: 'software-product-engineering',
    message: 'Looking to evaluate a microservices architecture migration.'
  };

  const result = createLead(payload, '10.0.0.1');
  assert.equal(result.success, true);
  assert.equal(result.status, 201);
  assert.ok(result.data.leadId > 0);

  const leads = getLeads();
  const created = leads.find(l => l.id === result.data.leadId);
  assert.ok(created);
  assert.equal(created.full_name, 'Marcus Vance');
  assert.equal(created.status, 'new');
});

test('Integration: updateLeadStatus transitions lead to qualified', () => {
  const leads = getLeads();
  assert.ok(leads.length > 0);
  const targetLead = leads[0];

  const updateResult = updateLeadStatus(targetLead.id, 'qualified');
  assert.equal(updateResult.success, true);

  const updatedLeads = getLeads();
  const found = updatedLeads.find(l => l.id === targetLead.id);
  assert.equal(found.status, 'qualified');
});


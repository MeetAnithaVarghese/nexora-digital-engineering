const test = require('node:test');
const assert = require('node:assert/strict');
const { getDb } = require('../../src/db');
const { createLead } = require('../../src/server/lead');
const { searchEntities } = require('../../src/server/search');
const { validateSession, createSession } = require('../../src/server/auth');

test('Security: SQL injection payload in lead submission is safely parameterized', () => {
  const db = getDb();
  
  // Malicious SQL injection payload intended to drop or alter database
  const injectionPayload = {
    fullName: "Robert'; DROP TABLE leads; --",
    email: 'hacker@malicious.example',
    company: "Acme'; UPDATE users SET role = 'admin'; --",
    serviceInterest: 'cybersecurity-governance',
    message: "1' OR '1'='1"
  };

  const result = createLead(injectionPayload, '192.168.1.50');
  assert.equal(result.success, true);

  // Verify that leads table still exists and was NOT dropped
  const count = db.prepare('SELECT count(*) AS count FROM leads').get();
  assert.ok(count.count > 0, 'Table must still exist');

  // Verify the literal malicious string was stored as raw data, not executed
  const stored = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.data.leadId);
  assert.equal(stored.full_name, "Robert'; DROP TABLE leads; --");
});

test('Security: SQL injection in search returns safe filtered result without error', () => {
  const injectionSearch = "'' OR 1=1; --";
  const results = searchEntities(injectionSearch);
  assert.equal(typeof results.total, 'number');
});

test('Security: invalid or expired session tokens return null', () => {
  const fakeToken = 'definitely_not_a_valid_session_token_12345';
  const session = validateSession(fakeToken);
  assert.equal(session, null);
});

test('Security: editor role session cannot claim admin privileges', () => {
  const db = getDb();
  const editorUser = db.prepare("SELECT * FROM users WHERE role = 'editor'").get();
  assert.ok(editorUser, 'Editor user should exist in database');

  const session = createSession(editorUser.id);
  const validated = validateSession(session.token);

  assert.equal(validated.role, 'editor');
  assert.notEqual(validated.role, 'admin');
});


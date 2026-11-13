const test = require('node:test');
const assert = require('node:assert/strict');
const { getDb, resetDbForTesting } = require('../../src/db');
const { seedDatabase } = require('../../src/db/seed');
const {
  createMagicLink,
  verifyMagicLink,
  createSession,
  validateSession,
  destroySession
} = require('../../src/server/auth');

test.before(() => {
  resetDbForTesting(':memory:');
  seedDatabase();
});

test('MagicLink: creates single-use token with SHA-256 hash', () => {
  const result = createMagicLink('admin@nexora.example.com', '127.0.0.1');
  assert.ok(result);
  assert.ok(result.rawToken);
  assert.equal(result.rawToken.length, 64);
  assert.ok(result.tokenHash);
  assert.notEqual(result.rawToken, result.tokenHash);
  assert.equal(result.user.email, 'admin@nexora.example.com');
  assert.equal(result.user.role, 'admin');
});

test('MagicLink: verifyMagicLink verifies valid token and marks it consumed', () => {
  const link = createMagicLink('admin@nexora.example.com', '127.0.0.1');
  const verified = verifyMagicLink(link.rawToken);

  assert.ok(verified);
  assert.equal(verified.email, 'admin@nexora.example.com');
  assert.equal(verified.role, 'admin');

  // Second verification must fail (single-use replay defense)
  const replay = verifyMagicLink(link.rawToken);
  assert.equal(replay, null, 'Replay of consumed magic link must be rejected');
});

test('MagicLink: verifyMagicLink rejects expired token', () => {
  const db = getDb();
  const link = createMagicLink('editor@nexora.example.com', '127.0.0.1');

  // Manually backdate expiration to the past
  db.prepare("UPDATE magic_link_tokens SET expires_at = datetime('now', '-5 minutes') WHERE token_hash = ?")
    .run(link.tokenHash);

  const verified = verifyMagicLink(link.rawToken);
  assert.equal(verified, null, 'Expired magic link token must be rejected');
});

test('Session: creates session with 72h max lifetime and 24h idle deadline', () => {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@nexora.example.com');
  const session = createSession(user.id);

  assert.ok(session.token);
  assert.ok(session.expiresAt);
  assert.ok(session.maxExpiresAt);

  const expiresTime = new Date(session.expiresAt).getTime();
  const maxExpiresTime = new Date(session.maxExpiresAt).getTime();
  const now = Date.now();

  // expiresAt ~ 24h in future (86400s)
  const diffIdleHours = (expiresTime - now) / (3600 * 1000);
  assert.ok(diffIdleHours >= 23.9 && diffIdleHours <= 24.1, 'Idle expires in ~24 hours');

  // maxExpiresAt ~ 72h in future (259200s)
  const diffMaxHours = (maxExpiresTime - now) / (3600 * 1000);
  assert.ok(diffMaxHours >= 71.9 && diffMaxHours <= 72.1, 'Max expires in ~72 hours');
});

test('Session: validateSession returns active session', () => {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get('editor@nexora.example.com');
  const session = createSession(user.id);

  const validated = validateSession(session.token);
  assert.ok(validated);
  assert.equal(validated.email, 'editor@nexora.example.com');
  assert.equal(validated.role, 'editor');
});

test('Session: validateSession rejects session exceeding 24h idle timeout', () => {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@nexora.example.com');
  const session = createSession(user.id);

  // Backdate idle expiration
  db.prepare("UPDATE sessions SET expires_at = datetime('now', '-1 minute') WHERE token = ?")
    .run(session.token);

  const validated = validateSession(session.token);
  assert.equal(validated, null, 'Session past idle timeout must be rejected');
});

test('Session: validateSession rejects session exceeding 72h hard cap even if idle is fresh', () => {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@nexora.example.com');
  const session = createSession(user.id);

  // Set max_expires_at in the past, but keep expires_at fresh
  db.prepare("UPDATE sessions SET max_expires_at = datetime('now', '-1 minute'), expires_at = datetime('now', '+20 hours') WHERE token = ?")
    .run(session.token);

  const validated = validateSession(session.token);
  assert.equal(validated, null, 'Session past 72h max lifetime must be rejected even if idle is fresh');
});


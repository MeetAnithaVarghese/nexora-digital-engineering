// Authentication and RBAC Module for Nexora Digital Engineering
const crypto = require('node:crypto');
const { getDb } = require('../db');
const config = require('../config');

function hashPassword(password, salt = null) {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, actualSalt, 100000, 64, 'sha256').toString('hex');
  return { hash, salt: actualSalt };
}

function verifyPassword(password, storedHash, salt) {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
}

function createSession(userId) {
  const db = getDb();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const idleHours = config.sessionIdleTtlHours || 24;
  const maxHours = config.sessionMaxTtlHours || 72;
  const expiresAt = new Date(now + idleHours * 3600 * 1000).toISOString();
  const maxExpiresAt = new Date(now + maxHours * 3600 * 1000).toISOString();
  const lastActiveAt = new Date(now).toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO sessions (user_id, token, last_active_at, expires_at, max_expires_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(userId, token, lastActiveAt, expiresAt, maxExpiresAt);
  
  return { token, expiresAt, maxExpiresAt };
}

function validateSession(token) {
  if (!token) return null;
  const db = getDb();
  
  const stmt = db.prepare(`
    SELECT s.id, s.token, s.last_active_at, s.expires_at, s.max_expires_at,
           u.id AS user_id, u.email, u.role
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ?
  `);
  
  const session = stmt.get(token);
  if (!session) return null;

  const now = Date.now();
  const expiresAtTime = new Date(session.expires_at).getTime();
  const maxExpiresAtTime = session.max_expires_at ? new Date(session.max_expires_at).getTime() : expiresAtTime;

  // Check 1: Exceeded maximum allowed lifetime (72h hard cap)
  if (now >= maxExpiresAtTime) {
    destroySession(token);
    return null;
  }

  // Check 2: Exceeded idle timeout (24h idle sliding window)
  if (now >= expiresAtTime) {
    destroySession(token);
    return null;
  }

  // Sliding idle update: throttle to update once per minute
  const lastActiveTime = session.last_active_at ? new Date(session.last_active_at).getTime() : now;
  if (now - lastActiveTime >= 60 * 1000) {
    const idleHours = config.sessionIdleTtlHours || 24;
    const prospectiveIdle = now + idleHours * 3600 * 1000;
    const newExpiresTime = Math.min(prospectiveIdle, maxExpiresAtTime);
    const newExpiresAt = new Date(newExpiresTime).toISOString();
    const newLastActiveAt = new Date(now).toISOString();

    try {
      db.prepare(`
        UPDATE sessions
        SET last_active_at = ?, expires_at = ?
        WHERE id = ?
      `).run(newLastActiveAt, newExpiresAt, session.id);
      session.last_active_at = newLastActiveAt;
      session.expires_at = newExpiresAt;
    } catch (_) {}
  }

  return session;
}

function createMagicLink(email, ipAddress = null) {
  if (!email || typeof email !== 'string') return null;
  const db = getDb();
  const normalizedEmail = email.trim().toLowerCase();
  const user = db.prepare('SELECT id, email, role FROM users WHERE email = ?').get(normalizedEmail);
  if (!user) return null;

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const ttlMinutes = config.magicLinkTtlMinutes || 15;
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString();

  const stmt = db.prepare(`
    INSERT INTO magic_link_tokens (user_id, token_hash, expires_at, ip_address)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(user.id, tokenHash, expiresAt, ipAddress || '127.0.0.1');

  return {
    rawToken,
    tokenHash,
    expiresAt,
    user
  };
}

function verifyMagicLink(rawToken) {
  if (!rawToken || typeof rawToken !== 'string') return null;
  const db = getDb();
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  const stmt = db.prepare(`
    SELECT m.id, m.user_id, m.expires_at, m.used_at, u.email, u.role
    FROM magic_link_tokens m
    JOIN users u ON m.user_id = u.id
    WHERE m.token_hash = ? AND m.used_at IS NULL AND m.expires_at > datetime('now')
  `);

  const record = stmt.get(tokenHash);
  if (!record) return null;

  // Mark token used immediately to prevent replay
  db.prepare("UPDATE magic_link_tokens SET used_at = datetime('now') WHERE id = ?").run(record.id);

  return {
    userId: record.user_id,
    email: record.email,
    role: record.role
  };
}

function destroySession(token) {
  if (!token) return;
  const db = getDb();
  const stmt = db.prepare('DELETE FROM sessions WHERE token = ?');
  stmt.run(token);
}

function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    list[name] = decodeURIComponent(value);
  });

  return list;
}

module.exports = {
  hashPassword,
  verifyPassword,
  createSession,
  validateSession,
  destroySession,
  parseCookies,
  createMagicLink,
  verifyMagicLink
};


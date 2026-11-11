const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../../src/server/auth');

test('Auth: PBKDF2 hashing generates unique salt and verifies correctly', () => {
  const password = 'SuperSecurePassword2026!';
  const auth1 = hashPassword(password);
  const auth2 = hashPassword(password);

  // Different salts mean different hashes for the same password
  assert.notEqual(auth1.salt, auth2.salt);
  assert.notEqual(auth1.hash, auth2.hash);

  // Verifies correctly with proper salt
  assert.equal(verifyPassword(password, auth1.hash, auth1.salt), true);
  assert.equal(verifyPassword(password, auth2.hash, auth2.salt), true);

  // Rejects wrong password
  assert.equal(verifyPassword('WrongPassword', auth1.hash, auth1.salt), false);
});

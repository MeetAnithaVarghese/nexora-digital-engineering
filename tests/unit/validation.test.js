const test = require('node:test');
const assert = require('node:assert/strict');
const { validateLeadSubmission, validateLoginInput, sanitizeSearchQuery } = require('../../src/server/validation');

test('Validation: valid lead submission succeeds', () => {
  const payload = {
    fullName: 'Jane Doe',
    email: 'jane.doe@enterprise.example',
    company: 'Enterprise AI Corp',
    serviceInterest: 'ai-data-engineering',
    message: 'We want to modernize our real-time streaming data platform and RAG pipelines.'
  };

  const result = validateLeadSubmission(payload);
  assert.equal(result.valid, true);
  assert.equal(result.sanitized.fullName, 'Jane Doe');
  assert.equal(result.sanitized.email, 'jane.doe@enterprise.example');
});

test('Validation: rejects missing or short full name', () => {
  const result = validateLeadSubmission({
    fullName: 'J',
    email: 'valid@example.com',
    company: 'Acme',
    serviceInterest: 'cloud-platform-engineering',
    message: 'This is a valid length message.'
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some(e => e.field === 'fullName'));
});

test('Validation: rejects invalid email formats', () => {
  const invalidEmails = ['plainaddress', 'missing@domain', '@missinguser.com', 'user@.com'];
  for (const email of invalidEmails) {
    const result = validateLeadSubmission({
      fullName: 'Valid Name',
      email,
      company: 'Acme',
      serviceInterest: 'cloud-platform-engineering',
      message: 'This is a valid length message.'
    });
    assert.equal(result.valid, false, `Expected ${email} to be invalid`);
    assert.ok(result.errors.some(e => e.field === 'email'));
  }
});

test('Validation: rejects unauthorized service slug', () => {
  const result = validateLeadSubmission({
    fullName: 'Valid Name',
    email: 'user@example.com',
    company: 'Acme',
    serviceInterest: 'unsupported-service-category',
    message: 'This is a valid length message.'
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some(e => e.field === 'serviceInterest'));
});

test('Validation: sanitize search query strips illegal characters', () => {
  const dirty = 'SELECT * FROM users; -- <script>';
  const clean = sanitizeSearchQuery(dirty);
  assert.equal(clean, 'SELECT  FROM users -- script');
});

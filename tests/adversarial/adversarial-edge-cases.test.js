const test = require('node:test');
const assert = require('node:assert/strict');
const { resetDbForTesting } = require('../../src/db');
const { createLead, resetRateLimiterForTesting } = require('../../src/server/lead');
const { validateLeadSubmission } = require('../../src/server/validation');

test.before(() => {
  resetDbForTesting(':memory:');
});

test('Adversarial: completely empty or null payload is rejected cleanly', () => {
  const resultNull = validateLeadSubmission(null);
  assert.equal(resultNull.valid, false);

  const resultEmpty = validateLeadSubmission({});
  assert.equal(resultEmpty.valid, false);
  assert.ok(resultEmpty.errors.length >= 4);
});

test('Adversarial: extremely long input (10,000+ chars) is rejected by length constraints', () => {
  const massiveString = 'A'.repeat(15000);
  const result = validateLeadSubmission({
    fullName: 'Normal Name',
    email: 'valid@example.com',
    company: 'Normal Company',
    serviceInterest: 'ai-data-engineering',
    message: massiveString
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some(e => e.field === 'message'));
});

test('Adversarial: special Unicode, emojis, and non-ASCII characters handled without crash', () => {
  const unicodePayload = {
    fullName: '山田 太郎 🚀',
    email: 'yamada.tarou@tokyo.example',
    company: 'グローバル・テック株式会社',
    serviceInterest: 'digital-transformation',
    message: 'こんにちは。私たちのレガシーシステムの近代化について相談したいです。'
  };

  const result = validateLeadSubmission(unicodePayload);
  assert.equal(result.valid, true);
  assert.equal(result.sanitized.fullName, '山田 太郎 🚀');
});

test('Adversarial: rapid submission rate limiter blocks 6th request within window', () => {
  resetRateLimiterForTesting();
  const testIp = '198.51.100.99';

  const validPayload = {
    fullName: 'Rapid Tester',
    email: 'rapid.tester@stress.example',
    company: 'LoadTest Corp',
    serviceInterest: 'quality-engineering',
    message: 'Simulating automated rapid form spam attack.'
  };

  // Submit 5 valid requests (allowed)
  for (let i = 0; i < 5; i++) {
    const res = createLead(validPayload, testIp);
    assert.equal(res.success, true, `Request ${i + 1} should succeed`);
  }

  // 6th request from the same IP must be rejected with 429 Too Many Requests
  const blockedRes = createLead(validPayload, testIp);
  assert.equal(blockedRes.success, false);
  assert.equal(blockedRes.status, 429);
  assert.equal(blockedRes.error.code, 'RATE_LIMIT_EXCEEDED');
});


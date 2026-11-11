// Lead Management & Rate Limiting Module
const { getDb } = require('../db');
const { validateLeadSubmission } = require('./validation');

// In-memory sliding window rate limiter: IP -> array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const clientIp = ip || '127.0.0.1';
  
  if (!rateLimitMap.has(clientIp)) {
    rateLimitMap.set(clientIp, [now]);
    return false;
  }
  
  const timestamps = rateLimitMap.get(clientIp).filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    rateLimitMap.set(clientIp, timestamps);
    return true;
  }
  
  timestamps.push(now);
  rateLimitMap.set(clientIp, timestamps);
  return false;
}

function resetRateLimiterForTesting() {
  rateLimitMap.clear();
}

function createLead(payload, ipAddress = '127.0.0.1') {
  if (isRateLimited(ipAddress)) {
    return {
      success: false,
      status: 429,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many enquiry submissions from this IP. Please wait before attempting again.'
      }
    };
  }

  const validation = validateLeadSubmission(payload);
  if (!validation.valid) {
    return {
      success: false,
      status: 400,
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Enquiry payload failed validation constraints.',
        details: validation.errors
      }
    };
  }

  const db = getDb();
  const { fullName, email, company, serviceInterest, message } = validation.sanitized;

  const stmt = db.prepare(`
    INSERT INTO leads (full_name, email, company, service_interest, message, status, ip_address)
    VALUES (?, ?, ?, ?, ?, 'new', ?)
  `);
  
  stmt.run(fullName, email, company, serviceInterest, message, ipAddress);
  const lastId = db.prepare('SELECT last_insert_rowid() AS id').get().id;

  return {
    success: true,
    status: 201,
    data: {
      leadId: lastId,
      message: 'Thank you. Your engineering consultation enquiry has been recorded.'
    }
  };
}

function getLeads(statusFilter = null) {
  const db = getDb();
  if (statusFilter && ['new', 'contacted', 'qualified', 'archived'].includes(statusFilter)) {
    const stmt = db.prepare('SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC');
    return stmt.all(statusFilter);
  }
  const stmt = db.prepare('SELECT * FROM leads ORDER BY created_at DESC');
  return stmt.all();
}

function updateLeadStatus(id, newStatus) {
  if (!['new', 'contacted', 'qualified', 'archived'].includes(newStatus)) {
    return { success: false, error: 'Invalid status value.' };
  }
  const db = getDb();
  const stmt = db.prepare('UPDATE leads SET status = ? WHERE id = ?');
  stmt.run(newStatus, id);
  return { success: true };
}

module.exports = {
  createLead,
  getLeads,
  updateLeadStatus,
  isRateLimited,
  resetRateLimiterForTesting
};

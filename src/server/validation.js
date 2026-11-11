// Input Validation Module for Nexora Digital Engineering
const VALID_SERVICE_SLUGS = [
  'ai-data-engineering',
  'software-product-engineering',
  'cloud-platform-engineering',
  'cybersecurity-governance',
  'digital-transformation',
  'quality-engineering'
];

const VALID_ARTICLE_STATUSES = ['draft', 'under_review', 'published', 'archived'];

function validateLeadSubmission(payload) {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Request body must be a valid JSON object.'] };
  }

  const { fullName, email, company, serviceInterest, message } = payload;

  // 1. Full Name
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
    errors.push({ field: 'fullName', message: 'Full name is required and must be between 2 and 100 characters.' });
  }

  // 2. Email (RFC 5322 compliant regex)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.trim().length > 254) {
    errors.push({ field: 'email', message: 'A valid business email address is required.' });
  }

  // 3. Company
  if (!company || typeof company !== 'string' || company.trim().length < 2 || company.trim().length > 100) {
    errors.push({ field: 'company', message: 'Company name is required and must be between 2 and 100 characters.' });
  }

  // 4. Service Interest
  if (!serviceInterest || typeof serviceInterest !== 'string' || !VALID_SERVICE_SLUGS.includes(serviceInterest)) {
    errors.push({ field: 'serviceInterest', message: `Service interest must be one of: ${VALID_SERVICE_SLUGS.join(', ')}.` });
  }

  // 5. Message
  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Message is required and must be between 10 and 2000 characters.' });
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      serviceInterest: serviceInterest.trim(),
      message: message.trim()
    } : null
  };
}

function validateLoginInput(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Request body must be a valid JSON object.'] };
  }

  const { email, password } = payload;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push({ field: 'email', message: 'Valid email is required.' });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push({ field: 'password', message: 'Password is required and must be at least 8 characters.' });
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? { email: email.trim().toLowerCase(), password } : null
  };
}

function sanitizeSearchQuery(query) {
  if (!query || typeof query !== 'string') return '';
  return query.trim().replace(/[^\w\s-]/gi, '').slice(0, 100);
}

module.exports = {
  validateLeadSubmission,
  validateLoginInput,
  sanitizeSearchQuery,
  VALID_SERVICE_SLUGS,
  VALID_ARTICLE_STATUSES
};


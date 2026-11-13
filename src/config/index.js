// Configuration Module for Nexora Digital Engineering
const path = require('node:path');

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  dbFile: process.env.DATABASE_FILE || path.join(__dirname, '..', '..', 'nexora.db'),
  sessionSecret: process.env.SESSION_SECRET || 'nexora_dev_secret_key_minimum_32_chars_long',
  sessionTtlHours: parseInt(process.env.SESSION_TTL_HOURS || '24', 10),
  sessionMaxTtlHours: parseInt(process.env.SESSION_MAX_TTL_HOURS || '72', 10),
  sessionIdleTtlHours: parseInt(process.env.SESSION_IDLE_TTL_HOURS || '24', 10),
  magicLinkTtlMinutes: parseInt(process.env.MAGIC_LINK_TTL_MINUTES || '15', 10),
  adminEmail: process.env.INITIAL_ADMIN_EMAIL || 'admin@nexora.example.com',
  adminPassword: process.env.INITIAL_ADMIN_PASSWORD || 'NexoraAdminSecure2026!'
};

module.exports = config;


# Runbook: Deployment & Release Operations
**Classification:** Standard Operating Procedure (SOP)  
**Target Environment:** Staging & Production  

---

## 1. Pre-Deployment Verification Checklist
- [ ] PR merged to `main` with passing CI checks.
- [ ] Human Release Approval (Gate 4) signed by Engineering Lead.
- [ ] Backup of current SQLite database snapshot completed:
  ```bash
  cp nexora.db nexora.db.backup.$(date +%Y%m%d_%H%M%S)
  ```
- [ ] Environment variables verified against `.env.example`.

---

## 2. Standard Deployment Steps
1. **Pull Latest Code:**
   ```bash
   git fetch origin
   git checkout tags/v1.0.0
   ```
2. **Execute Database Migrations:**
   ```bash
   node src/db/migrations.js
   ```
3. **Run Pre-Flight Smoke Test:**
   ```bash
   node --test tests/integration/*.test.js
   ```
4. **Restart Application Service (Systemd / PM2 / Docker):**
   ```bash
   pm2 reload nexora-web || node src/server/index.js
   ```
5. **Verify Live Health Endpoint:**
   ```bash
   curl -I http://localhost:3000/api/health
   # Expected: HTTP/1.1 200 OK
   ```


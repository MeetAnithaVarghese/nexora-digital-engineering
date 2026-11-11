# Runbook: Emergency Rollback Procedure
**Classification:** Incident Response SOP  
**Trigger:** Critical defect, database corruption, or outage following release  

---

## 1. Rollback Authority
An emergency rollback can be initiated by the Engineering Lead or On-Call Incident Commander without formal PR review, followed by post-incident postmortem within 24 hours.

---

## 2. Immediate Rollback Sequence
1. **Stop Application Process:**
   ```bash
   pm2 stop nexora-web
   ```
2. **Restore Database Snapshot:**
   ```bash
   cp nexora.db.backup.<TIMESTAMP> nexora.db
   ```
3. **Revert Git Deployment to Previous Stable Tag:**
   ```bash
   git checkout <PREVIOUS_STABLE_TAG>
   ```
4. **Restart Process:**
   ```bash
   pm2 start nexora-web
   ```
5. **Verify Smoke Test & Health Check:**
   ```bash
   curl -I http://localhost:3000/api/health
   ```
6. **Notify Stakeholders:** Broadcast status update to `#incident-room`.


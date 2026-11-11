---
name: release-readiness
description: Validates build health, test execution status, database rollback runbooks, and deployment checklists before release.
---

# Skill: Release Readiness
Use this skill prior to requesting Gate 4 production release authorization.

## Verification
1. Confirm all CI checks pass on `main`.
2. Ensure database snapshot backup procedure is documented.
3. Validate rollback runbook (`docs/runbooks/rollback.md`).
4. Generate release notes from `CHANGELOG.md`.


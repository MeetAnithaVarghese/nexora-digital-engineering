---
name: test-validation
description: Executes test suites using Node.js native test runner and evaluates test execution evidence.
---

# Skill: Test Validation
Use this skill to execute and verify test suites.

## Command Execution
```bash
# Execute entire test matrix
node --test tests/**/*.test.js
```

## Validation Mandate
- Never declare tests passed without terminal execution evidence.
- If a test fails, capture error stack trace and formulate remediation plan.

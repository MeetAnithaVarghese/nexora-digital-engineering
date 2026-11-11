---
name: code-review
description: Performs automated code review on pull request diffs, enforcing coding standards, injection prevention, and error handling.
---

# Skill: Code Review
Use this skill to evaluate modified code prior to human PR review.

## Review Protocol
1. Run `git diff` against `main`.
2. Verify all database interactions use parameter binding (Zero string concatenation).
3. Verify that new routes include input validation schemas.
4. Verify that new features include corresponding automated tests.
5. Generate findings by severity: `CRITICAL`, `MAJOR`, `MINOR`, `INFO`.


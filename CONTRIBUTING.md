# Contributing to Nexora Digital Engineering
**Classification:** Contributor Standards and Code Governance  

---

## 1. Specification-First Contribution Workflow
Every contribution to this codebase must adhere to the specification-driven development model:

1. **Issue or Ticket Creation:** Check or create an issue in GitHub Issues using the provided issue templates.
2. **Specification Reference:** Ensure the work references an approved specification in `specs/`. If the feature is new, create a specification first.
3. **Task Definition:** Define tasks in `tasks/` with explicit acceptance criteria.
4. **Branch Isolation:** Create an isolated feature branch from `main`:
   ```bash
   git checkout -b feature/NEX-<ticket-id>-<short-description>
   ```
5. **Deterministic Verification:** Ensure all test suites pass locally prior to submitting a Pull Request:
   ```bash
   node --test tests/**/*.test.js
   ```
6. **Pull Request Submission:** Use `.github/PULL_REQUEST_TEMPLATE.md` to link requirements, tasks, test execution evidence, and human sign-off.

---

## 2. Commit Message Conventions
We adhere to Conventional Commits:
- `feat(scope): add lead capture rate limiter`
- `fix(scope): prevent null pointer on empty search query`
- `docs(scope): update ADR-003 with session expiration details`
- `test(scope): add adversarial test for long form inputs`
- `refactor(scope): streamline DB query parameter mapping`

---

## 3. Human Approval Gates
No pull request will be merged into `main` without:
- Passing automated CI checks (syntax, unit tests, integration tests, security tests).
- Review and sign-off by at least one Human Engineering Lead.
- Zero unresolved review findings from the Code Review Agent.


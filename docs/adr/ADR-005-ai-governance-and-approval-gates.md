# ADR-005: AI Governance, Approval Gates, and Subagent Boundaries
**Status:** Approved  
**Deciders:** Principal Architect, Engineering Lead  
**Date:** 2026-11-11  

---

## 1. Context and Problem Statement
Autonomous AI agents are capable of high-velocity code generation, but unchecked agent execution introduces risks of architectural drift, silent regressions, unauthorized infrastructure modifications, and hallucinated factual claims.

## 2. Decision Outcome
Chosen option: **Four Mandatory Human Approval Gates with Isolated Agent Roles**.

### The Four Gates
1. **Gate 1: Specification Approval:** Human confirms business requirements and acceptance criteria before task breakdown.
2. **Gate 2: Plan & Architecture Approval:** Human confirms implementation plan, affected files, and ADRs before code generation.
3. **Gate 3: Code Diff & Review Approval:** Human reviews pull request diff, test execution evidence, and automated security reports.
4. **Gate 4: Release Authorization:** Human triggers production deployment.

Agents operate under immutable constitutional constraints defined in `constitution.md`.


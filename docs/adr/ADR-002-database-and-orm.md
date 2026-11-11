# ADR-002: Relational Database & Direct Parameterized SQL
**Status:** Approved  
**Deciders:** Principal Architect, Lead Engineer  
**Date:** 2026-11-11  

---

## 1. Context and Problem Statement
We need an efficient, auditable persistence strategy for lead submissions, CMS articles, services, and administrative users. We must choose between heavyweight ORMs (e.g., Prisma, TypeORM) versus a clean data-access layer using native SQLite with parameterized prepared statements.

## 2. Decision Outcome
Chosen option: **Direct Parameterized SQL via Data Access Repository Pattern**.

### Rationale
- Heavyweight ORMs introduce runtime overhead, query generation opacity, and large dependency vulnerability trees.
- Parameterized SQL is universally readable by human engineers and AI code review agents without hidden ORM abstraction leaks.
- Full compliance with `constitution.md` Section 6 (100% prepared statements, zero string interpolation).


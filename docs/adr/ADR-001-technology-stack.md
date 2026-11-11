# ADR-001: Technology Stack Selection for Nexora Digital Engineering
**Status:** Approved  
**Deciders:** Principal Architect, Lead Engineer, DevOps Lead  
**Date:** 2026-11-11  

---

## 1. Context and Problem Statement
Nexora Digital Engineering requires a robust, high-performance, maintainable web architecture. The system must support B2B consulting services, rich case studies, an administrative CMS, lead generation, search, and strict SEO/AEO/GEO requirements. The team is intentionally compact (3-5 engineers), requiring minimal operational complexity, zero unnecessary third-party SaaS dependencies, and high execution speed in an AI-native engineering harness.

## 2. Decision Drivers
- High SEO/AEO/GEO indexability with fast server-side rendering and static asset delivery.
- Self-contained, lightweight runtime with minimal maintenance burden.
- High testability with zero-friction deterministic test runners.
- Compatibility with AI-native execution tools (Claude Code, GitHub Spec Kit).

## 3. Considered Options
1. **Option A: Next.js (React) + PostgreSQL + Prisma + Vercel:** Full-featured, but adds ORM build complexity, migration lock-in, and database hosting overhead.
2. **Option B: Modern Node.js + Native SQLite (`node:sqlite`) + Semantic HTML5/CSS/Vanilla JS:** Completely self-contained, lightning fast (zero cold start), zero external database daemon to manage, zero bundle build step failures, built-in native test runner (`node --test`).
3. **Option C: Python / Django / HTMX:** Strong ORM, but diverges from modern JavaScript/TypeScript ecosystem preferred for modern client-side interactivity.

## 4. Decision Outcome
Chosen option: **Option B (Modern Node.js + Native SQLite + Semantic Design Tokens)** for core reference implementation, structured so it can scale to PostgreSQL when enterprise concurrency warrants.

### Positive Consequences
- Zero daemon maintenance: Single process execution.
- 100% deterministic local testing without Docker or mock databases.
- Sub-millisecond local query latencies.
- Zero npm dependency vulnerabilities for database drivers.

### Negative Consequences
- Write concurrency is limited by SQLite file lock (sufficient for B2B consulting web traffic of < 10,000 writes/minute).

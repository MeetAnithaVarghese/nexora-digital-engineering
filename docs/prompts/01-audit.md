Audit the entire repository before proposing changes. Read constitution.md, CLAUDE.md, AGENTS.md, docs/architecture/system-architecture.md, docs/adr/, and existing files in specs/ (001 through 009). 

Inspect src/db/ and src/server/ to verify:
1. How SQLite tables, sessions, and RBAC are currently implemented.
2. How frontend templates, CSS design tokens, and navigation components are structured.
3. Any discrepancies between documented ADRs/specs and actual code.

Provide a concise Audit & Impact Analysis report covering UI/UX design system updates and Magic Link authentication (3-day max session, 1-day idle timeout). Do not modify any files yet.
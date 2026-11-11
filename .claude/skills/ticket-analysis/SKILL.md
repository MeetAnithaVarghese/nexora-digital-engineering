---
name: ticket-analysis
description: Analyzes incoming tickets or GitHub Issues to extract requirements, evaluate blast radius, and detect ambiguities before coding.
---

# Skill: Ticket Analysis
Use this skill when processing a new GitHub Issue or Jira ticket.

## Workflow
1. Read ticket title, description, and acceptance criteria.
2. Cross-reference with `constitution.md` to detect constitutional policy violations.
3. Query `specs/` to identify existing related specifications.
4. Generate a 6-dimensional blast radius analysis:
   - Affected routes
   - Affected database tables
   - Affected UI templates
   - Affected tests
   - Security / Authorization implications
   - Performance / Scalability implications
5. Formulate clarification questions for any ambiguous requirement.

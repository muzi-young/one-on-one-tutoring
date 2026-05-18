---
name: planning-with-files
description: Create implementation plans grounded in actual repository files, symbols, and constraints before coding. Use when users ask for a plan, architecture approach, refactor strategy, or mention "Planning-with-files", "plan with files", "先看文件再规划", or "按文件给方案".
---

# Planning With Files

## Goal

Produce actionable plans based on real code context, not assumptions. Plans should cite likely files, expected edits, risks, and validation steps.

## Workflow

1. Clarify objective, constraints, and definition of done.
2. Discover candidate files and modules related to the request.
3. Read only the minimum necessary files to understand current behavior.
4. Build a step-by-step implementation plan with file-level mapping.
5. Highlight risks, unknowns, and quick checks before execution.

## Planning Rules

- Ground every major step in concrete file paths or symbols.
- Separate confirmed facts from assumptions.
- Keep scope explicit: in-scope, out-of-scope, and follow-up work.
- Prefer incremental milestones that can be validated independently.
- Include rollback or mitigation notes for risky changes.

## Output Structure

Use this structure when presenting a plan:

```markdown
## Objective
- Problem:
- Desired outcome:
- Constraints:

## Current State (from files)
- `path/to/fileA`: relevant behavior
- `path/to/fileB`: relevant behavior

## Proposed Plan
1. Step one (files: `...`)
2. Step two (files: `...`)
3. Step three (files: `...`)

## Risks and Unknowns
- Risk:
- Open question:

## Validation
- Command/test:
- Manual check:
```

## Done Criteria

- Plan references real files or symbols for each major step.
- Dependencies and ordering are clear.
- Testing and verification are included.
- Blockers are called out with next-best actions.

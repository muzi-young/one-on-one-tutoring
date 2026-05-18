---
name: find-skills
description: Discover and recommend the most relevant Cursor skills based on user intent, trigger phrases, and workspace context. Use when users ask to find/search/list skills, choose a suitable skill, or mention "find-skills".
---

# Find Skills

## Purpose

Locate and rank the best matching skills quickly, then provide clear recommendation and next action.

## When to Use

- User asks which skill should be used for a task.
- User asks to list available skills in project or personal scope.
- User wants similar skills for a topic (UI, planning, review, docs, etc.).
- User mentions "find-skills" or "帮我找合适的 skill".

## Search Workflow

1. Identify task intent and required outcome.
2. Scan skill directories for candidates:
   - Project scope: `.cursor/skills/*/SKILL.md`
   - Personal scope: `~/.cursor/skills/*/SKILL.md` (if accessible in context)
3. Read candidate `name` and `description` first, then inspect body if needed.
4. Rank candidates by:
   - intent match
   - trigger phrase overlap
   - output format fit
   - workflow completeness
5. Return top recommendation plus alternatives.

## Matching Rules

- Prefer exact intent matches over broad generic skills.
- If two skills are similar, choose the one with clearer workflow.
- Do not recommend skills with vague descriptions or missing triggers.
- If no good match exists, recommend creating a new skill with a specific name.

## Output Template

```markdown
## Best Match
- Skill: `skill-name`
- Why it matches:
- Typical use prompt:

## Alternatives
- `skill-a`: when to use
- `skill-b`: when to use

## Decision
- Recommended action now:
```

## Quality Checklist

- [ ] Recommendation is tied to user intent, not guesswork.
- [ ] At least one concrete usage prompt is provided.
- [ ] Alternatives are meaningfully different.
- [ ] If no match, a new skill proposal is included.

---
name: skill-creator
description: Create and scaffold high-quality Cursor skills with valid metadata, concise instructions, and clear trigger terms. Use when users ask to create/install/write a skill, mention "Skill-creator", "create skill", "安装 skill", or request SKILL.md templates.
---

# Skill Creator

## Purpose

Design and install reusable Cursor skills with correct structure, discoverable descriptions, and practical instructions.

## Standard Workflow

1. Confirm the skill objective and scope.
2. Decide location:
   - Project skill: `.cursor/skills/<skill-name>/`
   - Personal skill: `~/.cursor/skills/<skill-name>/`
3. Normalize skill name: lowercase letters, numbers, hyphens only.
4. Create `SKILL.md` with valid frontmatter and concise body.
5. Validate metadata, trigger terms, and usage clarity.

## Required Frontmatter

```yaml
---
name: your-skill-name
description: What this skill does and when to use it, with trigger phrases.
---
```

Rules:
- `name`: max 64 chars, lowercase letters/numbers/hyphens only.
- `description`: non-empty, specific, includes both WHAT and WHEN.

## SKILL.md Template

```markdown
# Skill Name

## Purpose
[One clear paragraph on intended outcome]

## When to Use
- Trigger scenario 1
- Trigger scenario 2

## Workflow
1. Step one
2. Step two
3. Step three

## Output Format
- Required structure
- Naming and style rules

## Quality Checklist
- [ ] Metadata valid
- [ ] Terminology consistent
- [ ] Instructions actionable
```

## Authoring Rules

- Keep instructions concise and execution-oriented.
- Prefer one default path over many optional alternatives.
- Separate facts from assumptions when giving guidance.
- Use consistent terminology across sections.
- Keep file references one level deep.

## Final Verification

- [ ] Folder exists and includes `SKILL.md`.
- [ ] Frontmatter fields are valid and complete.
- [ ] Description contains trigger keywords users actually say.
- [ ] Body is short, clear, and under 500 lines.
- [ ] Skill is easy to invoke with natural language.

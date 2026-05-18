---
name: notebooklm
description: Build structured NotebookLM workflows for source curation, note synthesis, study guides, and Q&A packs. Use when users mention NotebookLM, source-based research, lecture notes, interview prep, or request summaries grounded in provided files.
---

# NotebookLM

## Purpose

Turn source files into reliable, citation-aware notes, summaries, and learning materials that can be imported or mirrored in NotebookLM workflows.

## When to Use

- User asks for NotebookLM-ready notes.
- User wants source-grounded summaries, FAQs, or study guides.
- User needs learning packs from PDFs, docs, transcripts, or links.
- User asks to organize multi-file research into one notebook structure.

## Workflow

1. Define outcome and audience (exam prep, team onboarding, executive brief, etc.).
2. Collect and group sources by topic, timeline, or reliability.
3. Extract key claims, definitions, metrics, and decision points.
4. Synthesize into sections with explicit source references.
5. Produce output artifacts: summary, FAQ, quiz, glossary, action list.

## Source Handling Rules

- Prefer primary sources over secondary commentary.
- Flag uncertainty instead of guessing when evidence is missing.
- Separate confirmed facts, interpretations, and open questions.
- Preserve terminology from the source when domain terms are critical.
- Keep each output section traceable to at least one source.

## Output Template

Use this structure by default:

```markdown
## Notebook Objective
- Audience:
- Final use case:
- Scope:

## Source Map
- Source A: topic and trust level
- Source B: topic and trust level

## Synthesized Notes
### Key Points
- ...

### Definitions and Concepts
- ...

### Evidence and Metrics
- ...

## Q&A Pack
- Q1:
  - Answer:
  - Evidence source:

## Open Questions
- ...

## Next Actions
- ...
```

## Delivery Checklist

- [ ] Output is grounded in provided sources.
- [ ] Each major point has source traceability.
- [ ] Ambiguities and missing evidence are explicit.
- [ ] Structure matches user goal and audience.
- [ ] No unsupported claims are introduced.

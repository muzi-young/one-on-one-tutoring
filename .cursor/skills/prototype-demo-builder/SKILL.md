---
name: prototype-demo-builder
description: Builds editable, client-ready code prototypes and runnable demos with minimal setup. Use when the user asks for prototype design, interactive demo pages, PoC UI, or customer-facing demos that must be editable in code rather than static images.
---

# Prototype Demo Builder

## Quick start

When the user asks for a prototype or demo:

1. Confirm the demo goal, audience, and must-show interactions.
2. Prefer the existing project stack; otherwise default to React + Vite + TypeScript.
3. Keep the solution frontend-first with mock data unless backend is required.
4. Make all demo content editable in code (copy, data, colors, layout).
5. Deliver runnable commands and a short presenter script.

## Use this skill when

- The user asks for "可编辑原型", "演示 demo", "交互稿", "PoC", "MVP 页面", "客户演示"
- The output must be a runnable web demo
- The user needs fast iteration during stakeholder feedback

## Do not use this skill when

- The user wants static bitmap mockups only
- The task is to extend an existing design system with strict production rules
- The user explicitly asks for backend architecture instead of prototype validation

## Defaults and assumptions

If details are missing, assume:

- A 2-5 minute customer walkthrough is the target format
- Responsive support is needed (desktop and mobile)
- Mock data is acceptable
- Chinese UI copy is acceptable unless the user specifies otherwise

## Workflow

### 1) Define prototype fidelity

Pick the smallest level that can validate the idea:

- `single-page-static`: visual concept only
- `single-page-interactive`: key interactions with local state
- `multi-page-interactive`: route-based story with several flows

### 2) Create demo structure

- Reuse current repository if possible
- Keep dependencies minimal
- Separate editable areas clearly:
  - `src/mock/` for data
  - `src/components/` for reusable UI
  - `src/styles/` or `src/theme.ts` for style tokens
  - `src/demo-config.ts` for scenario toggles

### 3) Build customer-ready interactions

Minimum requirements:

- One clear happy path
- One edge path (empty/error/loading)
- Visual feedback on all clickable controls
- Deterministic demo data for repeatable walkthroughs

### 4) Validate before handoff

- Run install/start commands and confirm app boots
- Verify every planned click path manually
- Remove visible placeholder text
- Ensure copy, numbers, and statuses stay consistent

### 5) Deliver handoff output

Always include:

1. Demo goal and selected fidelity
2. Run commands
3. Page/flow map
4. File map for fast edits (copy/theme/data)
5. 2-5 minute presenter script
6. Risks and next-iteration suggestions

## Presenter script template

Use this sequence:

1. Context and persona (20-30s)
2. Pain point and objective (20-30s)
3. Walkthrough of key flow(s) (90-180s)
4. Value summary and requested feedback (20-30s)

## Quality bar

- Starts from clean install with documented commands
- Supports realistic click-through instead of static screenshots
- Editable points are centralized and easy to locate
- UX states (loading/empty/error/success) are represented
- Can absorb copy/style feedback quickly during live demo

## Additional resource

- Use [references/client-demo-checklist.md](references/client-demo-checklist.md) before final delivery.

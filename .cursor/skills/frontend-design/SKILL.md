---
name: frontend-design
description: Design and implement production-grade frontend interfaces with strong visual hierarchy, responsive layout, and accessible interactions. Use when users ask for frontend design, UI redesign, page optimization, dashboards, forms, navigation, or mention frontEnd-desgin/frontend design.
---

# Frontend Design

## Quick Start

1. Clarify page goal, user intent, and target device priority.
2. Define page structure first: navigation, content regions, actions, and feedback blocks.
3. Choose a clear visual direction (minimal SaaS, enterprise compact, or marketing expressive).
4. Implement with reusable components and consistent design tokens.

## Core Rules

- Use an 8px spacing system and consistent typography scale.
- Keep one primary action per section; secondary actions must be visually subordinate.
- Ensure WCAG AA color contrast and clear keyboard focus states.
- Always include hover, focus, disabled, loading, empty, and error states.
- Use semantic HTML and keyboard-navigable interactions by default.
- Build mobile-first and verify at 375px, 768px, and 1440px widths.

## Component Guidance

- Forms: visible labels, helpful hints, inline validation on blur.
- Tables and lists: consistent alignment, sortable headers when useful, empty states.
- Navigation: clear active state, predictable grouping, avoid crowded top-level menus.
- Modal and drawer: trap focus, close with Escape, restore focus on close.
- Buttons: verb-first labels, avoid multiple competing primary buttons.

## Delivery Checklist

- [ ] Layout is responsive and visually stable across breakpoints.
- [ ] Spacing, color, and typography are consistent.
- [ ] Interactive states are complete and accessible.
- [ ] Copy is concise, specific, and action-oriented.
- [ ] No placeholder content remains in final output.

## Output Template

When presenting UI work, use this structure:

```markdown
## Design Direction
- Visual style:
- Primary user task:
- Tradeoffs:

## Component Plan
- Section 1:
- Section 2:
- Section 3:

## Implementation Notes
- Accessibility:
- Responsive behavior:
- Interaction states:
```

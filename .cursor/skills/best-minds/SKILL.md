---
name: best-minds
description: Use a multi-expert reasoning workflow to evaluate options, stress-test assumptions, and produce clear decisions. Apply when users mention Best Minds, ask for multi-angle analysis, option comparison, tradeoff discussion, or final recommendations.
---

# Best Minds

## Purpose

Generate stronger decisions by combining multiple expert viewpoints, not single-path reasoning.

## When to Use

- Strategic choices with unclear tradeoffs.
- Architecture or product direction decisions.
- Requests that ask for "best option" with rationale.
- Cases where assumptions need challenge before execution.

## Expert Roles

Use these roles during analysis:

1. Strategist: defines goal fit, long-term impact, and sequencing.
2. Domain Expert: validates technical or business feasibility.
3. Skeptic: challenges assumptions, hidden risks, and edge cases.
4. Operator: focuses on implementation complexity and execution speed.

## Workflow

1. Frame the decision question, constraints, and success criteria.
2. Produce 2-4 viable options (including a conservative baseline).
3. Evaluate options with consistent criteria:
   - impact
   - effort
   - risk
   - reversibility
4. Run a skeptic pass to identify failure modes and blind spots.
5. Recommend one option with:
   - why it wins
   - known tradeoffs
   - first concrete execution steps

## Output Template

```markdown
## Decision Context
- Goal:
- Constraints:
- Success criteria:

## Options
1. Option A
2. Option B
3. Option C

## Comparison
- Impact:
- Effort:
- Risk:
- Reversibility:

## Recommendation
- Chosen option:
- Why:
- Tradeoffs:

## Execution Start
1. First step:
2. Second step:
3. Validation checkpoint:

## Risk Mitigation
- Top risk:
- Mitigation:
```

## Quality Checklist

- [ ] At least 2 realistic options are compared.
- [ ] Evaluation criteria are consistent across options.
- [ ] Main assumptions are explicit and challenged.
- [ ] Recommendation includes tradeoffs and next steps.
- [ ] Risks include practical mitigation, not only warnings.

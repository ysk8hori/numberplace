---
name: twada-tdd-implementation
description: 'Implement features with t-wada style TDD. Use when coding or modifying behavior. Always write specification-first tests, run List and Red-Green-Refactor cycles, and perform mandatory subagent review with validation and fixes.'
argument-hint: 'Feature or bug scope, expected behavior, and acceptance criteria'
---

# t-wada TDD Implementation Skill

Copilot implements code changes by strictly following t-wada style TDD and a mandatory subagent review gate.

## When to Use

- Add a new feature.
- Fix a bug that changes observable behavior.
- Refactor while preserving behavior.
- Update tests that should represent requirements.

## Non-Negotiable Principles

1. Follow List and Red-Green-Refactor in small cycles.
2. Start from behavior and specification, not internal structure.
3. Tests must not depend on implementation details such as private methods, internal state shape, specific call counts, or fragile mocks.
4. After implementation, always run a subagent review.
5. If the review has findings, validate each finding's correctness. If action is needed, fix it and re-run relevant tests.

## Required Workflow

1. Define behavior first:
   - Summarize requirement, input/output, and acceptance criteria.
   - Clarify what users can observe.
2. List:
   - In a test file, enumerate planned behaviors first using `test.todo` (or equivalent TODO test markers).
   - Include only specification-level behaviors users can observe.
   - If editing an existing test file, always start with a List check: review current TODO list, add missing behaviors, and remove obsolete TODOs before writing or changing implementation tests.
3. Red:
   - Add one failing test for one behavior.
   - Keep the failure message readable and specific.
4. Green:
   - Implement the minimum code to pass the new test.
   - Avoid speculative generalization.
5. Refactor:
   - Improve design while all tests stay green.
   - Remove duplication and improve naming.
6. Verify:
   - Run focused tests first, then broader relevant suites.
7. Mandatory subagent review:
   - Invoke a review subagent and request bug/risk/regression/test-gap findings.
   - Validate each finding against code and requirements.
   - Apply fixes for valid findings.
   - Re-run tests after fixes.

## Subagent Review Prompt Template

Use a subagent with a prompt equivalent to:

"Review this change set with a code-review mindset. Focus on behavioral bugs, regressions, edge cases, and missing tests. For each finding, provide severity, file reference, rationale, and a concrete fix suggestion."

## Test Writing Rules (Specification-First)

- Prefer black-box tests through public APIs, UI behavior, or externally observable outputs.
- Test requirements and examples from specifications.
- Avoid assertions on incidental implementation details.
- Use stable setup and deterministic data.
- Ensure test names describe behavior in business or user terms.

## Done Criteria

- List completed in test files with `test.todo` (or equivalent), including List check when touching existing test files.
- At least one List and Red-Green-Refactor cycle completed per changed behavior.
- All added/updated tests describe specifications, not implementation internals.
- Subagent review executed.
- Findings triaged and addressed when valid.
- Relevant tests pass after final fixes.

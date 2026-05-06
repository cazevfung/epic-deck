# Deck System Overview

## Why This Exists

The current deck already has a visual direction, but the decisions are embedded inside a single deliverable rather than expressed as reusable rules.

That approach works for one handcrafted deck. It does not scale well when:

- multiple departments are contributing pages,
- content arrives in different formats and quality levels,
- the final deliverable grows to 50+ pages,
- the same production process needs to be repeated later.

The purpose of this system is to move the team from `one-off page design` to `repeatable deck production`.

## What This System Covers

This folder should eventually become the home for:

- narrative and structural rules,
- page template definitions,
- intake and contribution rules,
- shared CSS tokens and components,
- TypeScript schemas for content structure and validation.

## Recommended Production Model

The team should separate responsibilities clearly:

- `Content owner`: provides message, data, assets, and required facts.
- `Deck editor`: maps content into a standard page type.
- `System owner`: maintains shared rules, templates, CSS, and exceptions.

Departments should contribute `structured content`, not final designed pages.

## Should We Use Multiple Documents

Yes.

Do not put every rule into one giant document. A single monolithic spec becomes hard to read, hard to update, and easy to ignore.

Instead, use a small set of focused documents:

- `README.md` for orientation
- `00-overview.md` for system purpose
- `01-core-workflow.md` for step-by-step execution
- `02-contribution-and-intake.md` for contributor and intake rules
- `03-page-templates.md` for page type definitions
- `04-page-recipes.md` for repeated composition patterns
- `13-change-log.md` for rule history

More documents can be added later if the system grows.

## Core Operating Set

The first five docs should be enough to understand how the system works:

- `00-overview.md`
- `01-core-workflow.md`
- `02-contribution-and-intake.md`
- `03-page-templates.md`
- `04-page-recipes.md`

The remaining docs are supporting systems, QA references, and implementation specs.

## Should We Create A Dedicated Directory

Yes.

Create and maintain a dedicated `deck-system/` directory instead of scattering production rules across `doc/`, ad hoc notes, and single deck files.

Reasons:

- contributors can find the right document quickly,
- rules and code evolve in one place,
- future decks can reuse the same system,
- it separates `the standard` from `a specific project file`.

## Do We Need CSS

Yes.

CSS is not just implementation detail here. It is the executable form of the visual standard.

The shared CSS layer should define:

- color tokens,
- typography scale,
- spacing and safe area,
- reusable components,
- template-level layout behavior.

Without shared CSS, visual consistency depends on manual discipline alone, which does not scale.

## Do We Need TypeScript

Yes, but in a lightweight way first.

The first job of TypeScript is not to create a complicated app. Its first job is to make the content structure explicit and checkable.

TypeScript should help with:

- defining page data shape,
- identifying required inputs by page type,
- validating that submissions match the chosen template,
- creating a path to future automation.

## Phase Recommendation

### Phase 1: System Skeleton

Create the directory, write the first rules, and define the first page types.

### Phase 2: Shared Production Layer

Extract common visual decisions into CSS tokens, base styles, components, and template rules.

### Phase 3: Structured Intake

Require departments to submit page briefs rather than designed slides.

### Phase 4: Validation And Automation

Use TypeScript schemas and validation helpers to catch bad inputs early.

## Success Criteria

This system is working if:

- contributors know where to submit content,
- editors can map most requests to a fixed page type,
- fewer pages require bespoke redesign,
- future decks reuse the same rules instead of starting from zero.

# Deck System

## What This Is

`deck-system/` is the source of truth for scalable deck production in this repository.

It exists to help multiple teams contribute content into a single high-quality deck without redesigning each page by hand during consolidation.

If you want the shortest entry point, start with [`START-HERE.md`](START-HERE.md).

## Goals

- Keep multi-team deck production visually and structurally consistent.
- Reduce page-by-page cleanup during consolidation.
- Turn deck making into a reusable system instead of a one-off craft project.
- Support 30-60 page executive decks that can be iterated quickly.

## Who Should Read What

### If you are contributing content

Start with:

- [`docs/02-contribution-and-intake.md`](docs/02-contribution-and-intake.md)
- [`intake/page-brief-template.md`](intake/page-brief-template.md)
- [`intake/asset-naming.md`](intake/asset-naming.md)

### If you are assembling or designing pages

Start with:

- [`docs/00-overview.md`](docs/00-overview.md)
- [`docs/01-core-workflow.md`](docs/01-core-workflow.md)
- [`docs/02-contribution-and-intake.md`](docs/02-contribution-and-intake.md)
- [`docs/03-page-templates.md`](docs/03-page-templates.md)
- [`docs/04-page-recipes.md`](docs/04-page-recipes.md)
- [`styles/README.md`](styles/README.md)

### If you are reviewing deck quality

Start with:

- [`docs/01-core-workflow.md`](docs/01-core-workflow.md)
- [`docs/11-quality-checklist.md`](docs/11-quality-checklist.md)
- [`docs/12-reference-library.md`](docs/12-reference-library.md)
- [`docs/13-change-log.md`](docs/13-change-log.md)

## Folder Structure

- `docs/`: standards, page rules, collaboration rules
- `intake/`: templates for department submissions
- `styles/`: shared CSS system and visual tokens
- `scripts/`: TypeScript schemas and future validation helpers
- `decks/`: project-specific migration notes and implementation plans

## Working Principles

- One page, one message.
- Structure before styling.
- Content is submitted separately from design.
- Reuse a standard page type before inventing a new layout.
- If a new pattern will repeat, update the system before duplicating custom work.

## Core Docs

The core operating set is:

- [`docs/00-overview.md`](docs/00-overview.md)
- [`docs/01-core-workflow.md`](docs/01-core-workflow.md)
- [`docs/02-contribution-and-intake.md`](docs/02-contribution-and-intake.md)
- [`docs/03-page-templates.md`](docs/03-page-templates.md)
- [`docs/04-page-recipes.md`](docs/04-page-recipes.md)

Read these five first.

Everything else is supporting detail.

## Standard Workflow

1. A content owner fills out a page brief.
2. The editor maps the brief to a standard page type and recipe if needed.
3. The page is assembled using the core workflow, shared templates, CSS tokens, and components.
4. Review checks focus on message clarity, fit, and consistency, not subjective redesign.
5. If a new repeatable pattern is needed, update `deck-system/` first.

## Source Of Truth

- System overview: [`docs/00-overview.md`](docs/00-overview.md)
- Core workflow: [`docs/01-core-workflow.md`](docs/01-core-workflow.md)
- Contribution and intake: [`docs/02-contribution-and-intake.md`](docs/02-contribution-and-intake.md)
- Page templates: [`docs/03-page-templates.md`](docs/03-page-templates.md)
- Page recipes: [`docs/04-page-recipes.md`](docs/04-page-recipes.md)
- Layout and grid: [`docs/05-layout-system.md`](docs/05-layout-system.md), [`docs/06-grid-system.md`](docs/06-grid-system.md)
- Visual and component systems: [`docs/07-component-spec.md`](docs/07-component-spec.md), [`docs/08-visual-system.md`](docs/08-visual-system.md), [`docs/09-typography-system.md`](docs/09-typography-system.md), [`docs/10-image-guidelines.md`](docs/10-image-guidelines.md)
- QA and reference set: [`docs/11-quality-checklist.md`](docs/11-quality-checklist.md), [`docs/12-reference-library.md`](docs/12-reference-library.md)
- Change record: [`docs/13-change-log.md`](docs/13-change-log.md)
- CSS structure: [`styles/README.md`](styles/README.md)
- TypeScript structure: [`scripts/README.md`](scripts/README.md)
- Current Fortnite deck migration: [`decks/fortnite-china/migration-map.md`](decks/fortnite-china/migration-map.md)
- Example normalized briefs: [`decks/fortnite-china/normalized-briefs/README.md`](decks/fortnite-china/normalized-briefs/README.md)

## Versioning

The current documentation layer is `v0.3`.

The goal of `v0.3` is to make the system easier to navigate by separating:

- core operating docs,
- supporting implementation specs,
- review and reference docs.

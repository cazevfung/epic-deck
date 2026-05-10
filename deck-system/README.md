# Deck System

## What This Is

`deck-system/` is the source of truth for slide rebuilding in this repository.

Its main job is to keep rebuild work close to the visual canon in [`docs/style-bible.html`](docs/style-bible.html).

If you want the shortest entry point, start with [`START-HERE.md`](START-HERE.md).

## Active Doc Set

The active working set is:

- [`docs/style-bible.html`](docs/style-bible.html)
- [`docs/production-method.md`](docs/production-method.md)
- [`docs/workbench-workflow.md`](docs/workbench-workflow.md)
- [`docs/canon-first.md`](docs/canon-first.md)
- [`docs/core-workflow.md`](docs/core-workflow.md)
- [`docs/rebuild-guideline.md`](docs/rebuild-guideline.md)
- [`docs/visual-system.md`](docs/visual-system.md)
- [`docs/quality-checklist.md`](docs/quality-checklist.md)
- [`docs/review-gates.md`](docs/review-gates.md)
- [`docs/pattern-extraction-policy.md`](docs/pattern-extraction-policy.md)
- [`docs/html-merge-and-pdf-export.md`](docs/html-merge-and-pdf-export.md)

Everything else that used to sit between the bible and execution has been removed.

## Goals

- Preserve the visual DNA of the bible.
- Make rebuild decisions faster.
- Keep fit, proof, and hierarchy discipline.
- Extract reusable patterns only after strong pages exist.

## Folder Structure

- `docs/`: the active canon and rebuild rules
- `intake/`: input templates
- `scripts/`: helper scripts
- `templates/`: generated production shell files
- `qa-screenshots/`: visual QA outputs when needed

## Assembly Tools

Finished workbench HTML files can be merged and exported through the standard assembly pipeline:

```powershell
node deck-system/scripts/merge-deck-html.js --config epic_deck/deck-build.json
node deck-system/scripts/export-deck-pdf.js --config epic_deck/deck-build.json
node deck-system/scripts/audit-deck-output.js --config epic_deck/deck-build.json
```

See [`docs/html-merge-and-pdf-export.md`](docs/html-merge-and-pdf-export.md).

## Working Principles

- Style bible first.
- Always produce new work from `templates/deck-shell.html`.
- One page, one message.
- Structure before styling.
- Reuse slide families, not generic shells.
- Extract patterns after success, not before.
- Never solve fit with clipping or blanket shrinkage.

## Standard Workflow

1. Normalize source material into a clear page brief.
2. Find the closest family in [`docs/style-bible.html`](docs/style-bible.html).
3. Rebuild toward that family, not toward a generic template.
4. Review against fit, proof retention, and bible similarity.
5. Extract a pattern only if it truly repeats.

## Source Of Truth

- Visual canon: [`docs/style-bible.html`](docs/style-bible.html)
- Production method: [`docs/production-method.md`](docs/production-method.md)
- Workbench workflow: [`docs/workbench-workflow.md`](docs/workbench-workflow.md)
- Simplification rationale: [`docs/canon-first.md`](docs/canon-first.md)
- Core workflow: [`docs/core-workflow.md`](docs/core-workflow.md)
- Rebuild guide: [`docs/rebuild-guideline.md`](docs/rebuild-guideline.md)
- Visual guardrails: [`docs/visual-system.md`](docs/visual-system.md)
- QA guardrails: [`docs/quality-checklist.md`](docs/quality-checklist.md)
- Review gates: [`docs/review-gates.md`](docs/review-gates.md)
- Pattern rule: [`docs/pattern-extraction-policy.md`](docs/pattern-extraction-policy.md)
- HTML/PDF assembly: [`docs/html-merge-and-pdf-export.md`](docs/html-merge-and-pdf-export.md)
- Intake template: [`intake/page-brief-template.md`](intake/page-brief-template.md)

# Production Method

## The One Method

Use the same file flow for every slide task:

1. `style-bible.html` is the visual canon.
2. `templates/deck-shell.html` is the working mother file.
3. `05_exports/workbench/workbench-*.html` is the task file.
4. reviewed output is merged into the final export only after the page is stable.

Do not start from a blank HTML file.

Do not start by editing the full bible.

## File Roles

### `docs/style-bible.html`

This is the highest source of truth for:

- atmosphere,
- hierarchy,
- layout behavior,
- shared CSS,
- interaction shell,
- print rules.

It is canon, not a day-to-day editing file.

### `templates/deck-shell.html`

This is the official base file for production.

It is generated from `style-bible.html` and keeps only:

- the global shell,
- the cover slide,
- navigation,
- print behavior,
- shared JS,
- a placeholder marker where new slides should be inserted.

### `workbench-*.html`

This is the only place where active slide rebuilding should happen.

Each workbench file is scoped to:

- one page, or
- one small wave of tightly related pages.

## Standard Commands

Refresh the shell after meaningful bible changes:

```powershell
.\deck-system\scripts\build-deck-shell.ps1
```

Create a workbench for one page:

```powershell
.\deck-system\scripts\new-slide-workbench.ps1 -Pages 9
```

Create a workbench for a small wave:

```powershell
.\deck-system\scripts\new-slide-workbench.ps1 -Pages 11,12,13
```

## Naming Rule

Use these filenames:

- `workbench-page-09.html`
- `workbench-pages-11-13.html`
- `workbench-pages-09_12_14.html`

Keep names page-driven, not person-driven.

Do not use names like:

- `new-slide-final-v2.html`
- `alice-work.html`
- `temp-layout-test.html`

## Team Rule

The team should never share one giant active production HTML file.

Parallel work should happen through separate workbench files with clear ownership.

## Merge Rule

Only merge a slide into the final export when:

- content is stable,
- fit is checked,
- the page clearly matches a bible family,
- no placeholder blocks remain.

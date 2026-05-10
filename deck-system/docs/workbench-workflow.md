# Workbench Workflow

## Why This Exists

Single-slide HTML files keep drifting because `style-bible.html` is not only a visual reference.

It is also the working shell:

- shared variables,
- shared typography,
- slide viewport rules,
- backdrop layers,
- navigation,
- print behavior,
- page-family CSS.

When a new slide starts from a blank HTML file, it usually loses part of that shell before any real design work begins.

## New Rule

Do not hand-author a new slide HTML file from scratch.

Create a `workbench` file from `templates/deck-shell.html`, then rebuild the target page inside that scaffold.

## Work Unit

The safest work unit is still:

- one page, or
- one small contiguous wave.

Do not move all active pages into one giant shared HTML file. That would fix style drift but create merge conflicts and review noise.

## What A Workbench File Contains

Each generated workbench file inherits from `templates/deck-shell.html` and keeps:

- the full global shell from `style-bible.html`,
- the original cover slide,
- one or more placeholder slides for the pages you are rebuilding,
- the existing nav and print behavior.

This gives every new page the correct environment without forcing the whole team into one file.

## How To Create One

First refresh the shell when the bible changed:

```powershell
.\deck-system\scripts\build-deck-shell.ps1
```

Then create a workbench from the repo root:

```powershell
.\deck-system\scripts\new-slide-workbench.ps1 -Pages 9
```

For a small wave:

```powershell
.\deck-system\scripts\new-slide-workbench.ps1 -Pages 11,12,13
```

The script writes files to:

`epic_deck/02_sections/05_exports/workbench/`

Examples:

- `workbench-page-09.html`
- `workbench-pages-11-13.html`
- `workbench-pages-09_12_14.html`

## Parallel Working Pattern

Use separate workbench files when different pages are being rebuilt at the same time.

Good examples:

- one file per complex page,
- one file per tightly related 2-3 page wave,
- one owner per workbench file.

Avoid two people editing the same workbench file unless they are intentionally pairing on the same wave.

## Editing Rule

Inside a generated workbench:

1. keep the cover and global shell,
2. replace the placeholder section for the target page,
3. preserve the original PPT page number in the page label,
4. only merge the finished slide into the final export after review.

## Why This Is Better Than A Manual Base File

A manually maintained `base.html` will drift from `style-bible.html` over time.

The shell method avoids that by rebuilding `templates/deck-shell.html` from the canon, then generating workbench files from that shell.

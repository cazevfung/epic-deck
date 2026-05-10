# HTML Merge and PDF Export

This workflow turns several finished workbench HTML files into one merged HTML deck and one text-preserving PDF.

It is intended for frequent assembly work after pages are already visually approved.

## Why This Exists

Manual PDF export from Chrome print preview is fragile for our decks:

- print media can change layout;
- background graphics can disappear;
- charts may initialize at the wrong size;
- multi-source HTML merges can change CSS cascade order or specificity.

The standard workflow is therefore:

1. Merge source workbench HTML files into one interactive HTML.
2. Activate each slide in screen mode.
3. Export one PDF page per active slide.
4. Merge those PDF pages.
5. Run an audit and review only sampled screenshots plus flagged pages.

## Commands

Install tool dependencies once:

```powershell
cd deck-system
npm install
```

Run the full v1 flow for a configured deck:

```powershell
cd ..
node deck-system/scripts/merge-deck-html.js --config epic_deck/deck-build.json
node deck-system/scripts/export-deck-pdf.js --config epic_deck/deck-build.json
node deck-system/scripts/audit-deck-output.js --config epic_deck/deck-build.json
```

## Config

Each deck should own a config file, for example:

```text
epic_deck/deck-build.json
```

The config controls:

- source HTML files and source IDs;
- output merged HTML path;
- interactive preheat radius for the merged HTML deck;
- output PDF path;
- temporary per-page PDF directory;
- Chrome executable path;
- sample pages for audit screenshots.

Paths are resolved relative to the config file.

## Merge Rules

The merge step must preserve the original page behavior.

Rules:

- Keep slide order by `data-slide`.
- Add a source class such as `src-21-32` to each slide root.
- Scope CSS to the source slide with low specificity using `:where(...)`.
- Prewarm only a small local window around the active slide, defaulting to previous 2 and next 2 slides.
- Do not add page-specific visual fixes during assembly.
- Treat `[data-slide="N"] ...` as a root-slide selector, not as a descendant selector.
- Keep deck chrome and navigation from the first source only.
- Deduplicate external and inline scripts, but keep chart/image initialization code.
- Do not discard a later source script block only because it also contains the shared deck shell (`const slides = document.querySelectorAll('.slide')`, `show(...)`, `initWorkbenchStart`, etc.).
- Preserve or re-home source-specific runtime logic from later files, especially code that starts, pauses, or resets videos, canvas, charts, timers, and hover labels.
- If a source file mixes shared deck runtime and page-specific logic in one inline script, the merge step must split or retain the page-specific portion before deduplication.

The key principle is: merging should isolate sources without changing the original cascade semantics.

Use `merge.preloadWindowRadius` to tune or disable the interactive warm window:

- `2` keeps the active slide plus 2 slides before and after in the render tree.
- `0` disables this behavior if a deck has heavy animations that should only initialize on the active slide.

## PDF Rules

The PDF step exports from screen mode, not print-preview layout.

Rules:

- Load the merged interactive HTML.
- Hide navigation, hint text, and page-list chrome.
- Activate each slide with `location.hash`.
- Wait for fonts, images, and two animation frames.
- Export the active slide as a single 16:9 PDF page.
- Merge the single-page PDFs.

This preserves selectable text while keeping images and charts rendered by the browser.

## Audit Rules

The audit step is designed to avoid full manual review every time.

It checks:

- console errors;
- broken images;
- playable media behavior on active slides;
- slide dimensions;
- overflow flags;
- canvas count per slide;
- text length per slide;
- PDF page count matching HTML slide count.

It also writes sample screenshots to:

```text
<deck>/04_assembly/audit/samples/
```

Review sampled screenshots plus any pages flagged in `audit-report.json`.

For decks with video or scripted motion, also verify:

- the active slide starts its intended video or animation;
- hidden slides pause media instead of continuing in the background;
- repeated media assets are intentional source reuse, not merge-time duplication;
- any source-specific runtime still executes after merge.

## When To Manually Inspect More

Do deeper review when:

- source HTML changed its shared CSS;
- many pages were added from a new source file;
- audit reports console errors or broken images;
- chart-heavy pages changed;
- the first or last page of a source batch changed.

For routine copy or asset updates, the audit sample set is usually enough.

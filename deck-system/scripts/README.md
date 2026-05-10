# Scripts Structure

## Why TypeScript Exists

The TypeScript layer exists to make content structure explicit and eventually validate inputs before pages are assembled.

It should stay lightweight and practical.

## Initial Responsibilities

- define page template IDs,
- define page brief structure,
- define required fields by page type,
- create a path for validation tooling later,
- generate the shared deck shell from the bible,
- generate page-scoped workbench files from that shell.
- merge finished workbench HTML files into one deck HTML,
- export merged decks to text-preserving PDFs,
- audit merged HTML/PDF outputs and generate sample screenshots.

## Assembly Scripts

```powershell
node deck-system/scripts/merge-deck-html.js --config epic_deck/deck-build.json
node deck-system/scripts/export-deck-pdf.js --config epic_deck/deck-build.json
node deck-system/scripts/audit-deck-output.js --config epic_deck/deck-build.json
.\deck-system\scripts\rename-workbench-pages.ps1
.\deck-system\scripts\rename-workbench-pages.ps1 -Apply
```

See [`../docs/html-merge-and-pdf-export.md`](../docs/html-merge-and-pdf-export.md).

## Suggested Growth Path

### Step 1

Keep shared types and schemas in this folder.

### Step 2

Add validation scripts that flag:

- missing takeaway,
- too many bullets,
- missing sources,
- unsupported template IDs.

### Step 3

If needed, use the validated structure to support templated page generation.

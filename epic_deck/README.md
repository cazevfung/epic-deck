# Epic Deck Workspace

This folder is organized to support a multi-owner deck workflow:

1. each section owner drops source material into a dedicated section folder,
2. the deck editor runs normalization and audit section by section,
3. rebuilt section outputs are merged into one master deck.

Use [`../deck-system/START-HERE.md`](../deck-system/START-HERE.md) and the core docs `00-04` before redesign work.

## Top-Level Structure

- `00_inbox/`
  - default landing zone for unsorted owner submissions
- `01_story/`
  - master narrative files such as keynote structure, chapter logic, talk track, and meeting notes
- `02_sections/`
  - the main working area, organized by deck chapter
- `03_shared-assets/`
  - reusable brand assets, approved visuals, market references, shared data
- `04_assembly/`
  - cross-section merge work, combined briefs, merged outputs, review notes
- `99_archive/`
  - old drops, deprecated versions, and anything no longer in active use

## Section Folder Pattern

Each section under `02_sections/` follows the same structure:

- `00_inbox/`
  - raw content received from the section owner
- `01_source-slides/`
  - source deck exports, screenshots, HTML pages, or original files to analyze
- `02_normalized-briefs/`
  - one normalized brief per page using the intake template
- `03_audit/`
  - slide-by-slide audit notes, status maps, and fit-risk notes
- `04_template-mapping/`
  - template and recipe assignments for each page
- `05_rebuild/`
  - active rebuilt pages or section working files
- `06_assets/`
  - section-specific charts, screenshots, logos, and references
- `07_exports/`
  - section-level outputs ready for review or merge

## Section Map

- `01_xd-epic-synergy/`
- `02_reimagining-fortnite-for-china/`
- `03_creator-engine/`
- `04_solving-the-blocks/`
- `05_the-offer/`
- `06_appendix/`

## Current File Placement

Current project files are now organized here:

- `01_story/meeting_notes.md`
- `01_story/keynote_structure.md`
- `02_sections/02_reimagining-fortnite-for-china/01_source-slides/epic_deck_运营部分.html`

## Intake Entry Point

Use `00_inbox/` when:

- a teammate sends material before the correct section is confirmed,
- one package contains multiple sections,
- the submission mixes deck pages, screenshots, spreadsheets, and notes,
- you want to preserve the original drop before sorting.

Once reviewed, move files from root `00_inbox/` into the correct section-level `00_inbox/`.

## Naming Guidance

- folder names: numeric prefix plus short English slug
- briefs: `p01_<topic>_brief.md`
- audits: `section_audit_v01.md`
- template maps: `section_template_map_v01.md`
- exports: `epic_<section>_<artifact>_v01`
- assets: follow [`../deck-system/intake/asset-naming.md`](../deck-system/intake/asset-naming.md)

## Recommended Working Flow

For each section:

1. drop owner materials into `00_inbox/`,
2. place the chosen source files in `01_source-slides/`,
3. create one file per page in `02_normalized-briefs/`,
4. write section audit notes in `03_audit/`,
5. assign templates in `04_template-mapping/`,
6. rebuild in `05_rebuild/`,
7. export reviewable outputs to `07_exports/`,
8. merge approved pieces inside `04_assembly/`.

This keeps owner input, editorial analysis, design production, and final assembly clearly separated.

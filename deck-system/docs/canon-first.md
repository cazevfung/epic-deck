# Canon-First Deck System

## Why This Exists

The current `docs/` set is too abstract for actual slide rebuilding.

It asks the designer to translate content through too many layers:

- overview,
- workflow,
- templates,
- recipes,
- layout rules,
- grid rules,
- component rules,
- visual rules,
- typography rules,
- style wiring.

That structure is logically tidy, but it weakens execution.

The result is what we are seeing now:

- `style-bible.html` is the real visual canon,
- but rebuilt pages in `epic_deck/02_sections/05_exports/` look like a separate system,
- because the docs encourage abstraction before visual matching.

This file defines a simpler operating model.

## The Main Diagnosis

The gap is not just "bad taste."

The gap comes from four system mistakes:

### 1. The Bible Was Treated As Reference, Not Canon

`style-bible.html` contains page-specific hierarchy, atmosphere, proportion, and composition behavior.

But the current docs often paraphrase it into general rules like:

- choose a visual mode,
- choose a template,
- choose a recipe,
- use shared components.

That is too lossy.

The bible should be the first thing we copy from, not the last thing we summarize.

### 2. The System Standardized Too Early

The current system tries to define reusable templates before enough canonical slide families were extracted.

That pushes work toward:

- generic shells,
- generic cards,
- generic split layouts,
- generic "clean" composition.

This makes exports easier to organize, but visually weaker.

### 3. The Docs Optimized For Completeness, Not Obedience

There are too many documents that sound equally important.

When everything is important, the builder stops following the visual source and starts following whichever abstraction feels easiest.

### 4. The System Rewards Safety Over Similarity

The current workflow makes it easy to produce pages that are:

- aligned,
- neat,
- technically safe,

but still wrong in spirit.

That is exactly the failure mode we need to avoid.

## New Rule: Canon First

For this repository, the priority order is:

1. `deck-system/docs/style-bible.html`
2. source slide intent and source proof
3. page-family notes and reusable patterns
4. implementation convenience

If a written doc conflicts with the bible, the doc is wrong.

If a reusable template conflicts with the bible, the template is wrong.

If a CSS layer makes the page flatter than the bible, that CSS layer is wrong.

## New Goal For The System

The system is no longer trying to be a full design theory library.

Its job is narrower:

- preserve the visual DNA of `style-bible.html`,
- help rebuild slides faster,
- keep fit and content discipline,
- extract only the patterns that repeat clearly.

## The Simpler Doc Set

Use this smaller operating set:

1. `style-bible.html`
2. `core-workflow.md`
3. `rebuild-guideline.md`
4. `visual-system.md`
5. `quality-checklist.md`
6. `review-gates.md`
7. `pattern-extraction-policy.md`

Everything else becomes background reference, not the main path.

## What Changes In Practice

### Before

The builder thinks:

1. which template is this,
2. which recipe is this,
3. which mode is this,
4. how do I fit the content into the shared system.

### After

The builder should think:

1. which bible slide family is closest,
2. what makes that family visually persuasive,
3. what must be preserved,
4. what content can be adapted,
5. only then, what can be reused.

## What We Keep From The Old System

We should keep:

- phase-based workflow,
- normalization before redesign,
- one page one message,
- fit and overflow discipline,
- explicit proof preservation,
- reusable patterns when they are real.

## What We Remove From The Critical Path

We should remove these from the first-pass workflow:

- over-detailed template taxonomies,
- over-detailed recipe naming,
- component-first thinking,
- grid-first thinking,
- CSS-layer doctrine,
- summary-heavy visual paraphrasing of the bible.

## Success Standard

The simplified system is working if:

- a designer can rebuild a page after reading 2 to 4 files, not 10+,
- exports look materially closer to `style-bible.html`,
- pages preserve asymmetry and authored hierarchy,
- reusable patterns are extracted from good pages after the fact,
- the system helps execution instead of replacing taste with abstraction.

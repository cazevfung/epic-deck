# 01 Core Workflow

## Purpose

This is the main operating document for deck execution.

Use it whenever a new deck, slide batch, or multi-party source package needs to be converted into the shared system.

If you only read one process document before starting work, read this one.

## How This Fits In The System

The core operating set is:

- [`00-overview.md`](00-overview.md)
- [`01-core-workflow.md`](01-core-workflow.md)
- [`02-contribution-and-intake.md`](02-contribution-and-intake.md)
- [`03-page-templates.md`](03-page-templates.md)
- [`04-page-recipes.md`](04-page-recipes.md)

Everything else supports these five.

## Core Rule

Do not redesign a whole deck in one pass.

Run the work in phases.

Each phase should produce an explicit output before moving to the next one.

## Supporting Reference Docs

Use these as needed while executing the workflow:

- [`05-layout-system.md`](05-layout-system.md)
- [`06-grid-system.md`](06-grid-system.md)
- [`08-visual-system.md`](08-visual-system.md)
- [`09-typography-system.md`](09-typography-system.md)
- [`10-image-guidelines.md`](10-image-guidelines.md)
- [`11-quality-checklist.md`](11-quality-checklist.md)
- [`12-reference-library.md`](12-reference-library.md)
- [`../intake/page-brief-template.md`](../intake/page-brief-template.md)

## Phase Order

1. Normalize the input.
2. Audit the slide set.
3. Assign template and recipe.
4. Plan rebuild waves.
5. Rebuild slides.
6. Review quality.
7. Capture system lessons.

---

## Phase 1: Normalize The Input

### Goal

Turn messy source material into normalized page briefs.

### Required Docs

- [`02-contribution-and-intake.md`](02-contribution-and-intake.md)
- [`../intake/page-brief-template.md`](../intake/page-brief-template.md)

### Expected Output

- one normalized brief per requested page or sampled page set,
- page job,
- one-sentence takeaway,
- primary claim,
- must-keep proof,
- fit risks,
- provisional template guess if visible.

### Stop Or Escalate If

- one source slide contains multiple independent arguments,
- the content owner cannot define the page takeaway,
- critical proof is missing,
- the page likely needs to split before any visual work starts.

---

## Phase 2: Audit The Slide Set

### Goal

Understand what the current deck is doing before redesign.

### Required Docs

- [`11-quality-checklist.md`](11-quality-checklist.md)
- [`12-reference-library.md`](12-reference-library.md)

### Expected Output

- slide-by-slide status map,
- page-family and visual-mode notes,
- pages already close to canonical,
- recipe candidates,
- overloaded or anti-pattern pages,
- rough redesign priority.

### Stop Or Escalate If

- multiple slides still have unclear page jobs,
- the deck is too inconsistent to map directly,
- a recurring layout pattern appears but has not been formalized as a recipe.

---

## Phase 3: Assign Template And Recipe

### Goal

Choose the correct argument family and composition pattern for each page.

### Required Docs

- [`03-page-templates.md`](03-page-templates.md)
- [`04-page-recipes.md`](04-page-recipes.md)

### Expected Output

- one template ID per page,
- one visual mode per page,
- one recipe assignment where needed,
- density expectation,
- main fit risks,
- explicit split candidates.

### Assignment Rules

Choose the template by the logic of the argument, not by counting visual objects.

Choose a recipe only when:

- the page belongs to an existing family,
- the internal composition pattern clearly recurs,
- naming the pattern reduces future one-off work.

### Stop Or Escalate If

- the page does not fit any existing family cleanly,
- the page only works through heavy compression,
- the same exception pattern repeats and needs formalization.

---

## Phase 4: Plan Rebuild Waves

### Goal

Sequence the work so the cleanest and most reusable wins come first.

### Required Docs

- [`12-reference-library.md`](12-reference-library.md)

### Expected Output

- `Wave 1`: canonical or low-risk pages,
- `Wave 2`: recipe-driven pages,
- `Wave 3`: overloaded, split, or exception-heavy pages.

### Stop Or Escalate If

- stakeholders want every page redesigned at once,
- wave order is driven by taste rather than structural fit,
- unresolved anti-pattern pages are blocking otherwise clean pages.

---

## Phase 5: Rebuild Slides

### Goal

Rebuild slides using the assigned brief, template, recipe, and content budget.

### Required Docs

- [`08-visual-system.md`](08-visual-system.md)
- [`03-page-templates.md`](03-page-templates.md)
- [`04-page-recipes.md`](04-page-recipes.md)
- [`05-layout-system.md`](05-layout-system.md)
- [`06-grid-system.md`](06-grid-system.md)
- [`09-typography-system.md`](09-typography-system.md)
- [`10-image-guidelines.md`](10-image-guidelines.md)

### Structural Pass Rules

Build the page in rough hierarchy first.

The structural pass should answer:

- where does the eye go first,
- what is the dominant claim,
- what is the dominant proof,
- do the major blocks align cleanly,
- does the layout express the argument clearly,
- does the visual mode match the page job,
- is the page preserving the source page's visual family where that family matters to persuasion.

Do not spend the first pass polishing decorative details.

### Content Budget Rules

Before detailed styling, define the page budget:

- headline length,
- takeaway length,
- bullet count,
- proof module count,
- image count,
- logo count,
- caption count,
- allowed density mode.

If the content does not fit the budget, do not keep shrinking everything.

Use this response order:

1. clarify the message,
2. re-rank the proof,
3. tighten within approved density and fit rules,
4. change to a better-fit template, recipe, or visual mode,
5. split the page.

### Mandatory Fit Pass

Every rebuilt page must go through a dedicated fit pass before it is considered done.

The fit pass must confirm:

- all meaningful content stays inside the safe box,
- title and takeaway line counts stay within budget,
- proof images remain readable at actual presentation size,
- no `overflow: hidden` is masking unresolved content,
- screenshot review confirms the page fits visually, not only in DOM structure.

### Expected Output

- rebuilt slides,
- one dominant page message per slide,
- proof hierarchy preserved,
- fit at actual 16:9 presentation scale.

### Stop Or Escalate If

- the page only fits because text or proof shrank too far,
- the recipe is being patched repeatedly,
- the page lost the source deck's intended design character,
- source evidence would need to disappear to make the page work.

---

## Phase 6: Review Quality

### Goal

Check message fit, system fit, and evidence fit before calling the page complete.

### Required Docs

- [`11-quality-checklist.md`](11-quality-checklist.md)
- [`12-reference-library.md`](12-reference-library.md)

### Expected Output

- QA pass notes,
- remaining risks,
- pages needing another structural pass,
- pages ready for promotion as examples.

### Stop Or Escalate If

- a page passes technically but not rhetorically,
- proof is present but unreadable,
- the page feels system-compliant but visually generic,
- the page feels like a one-off patch rather than a reusable system page.

---

## Phase 7: Capture System Lessons

### Goal

Feed what we learned back into the system.

### Required Docs

- [`04-page-recipes.md`](04-page-recipes.md)
- [`12-reference-library.md`](12-reference-library.md)
- [`13-change-log.md`](13-change-log.md)

### Expected Output

- new canonical examples,
- new recipe candidates,
- anti-pattern notes,
- change-log updates if the system evolved.

### Stop Or Escalate If

- a new pattern was used repeatedly but not documented,
- a better example now exists but the reference library was not updated,
- the deck added exceptions that future teams would not understand.

## Default Execution Mode

Unless instructed otherwise, use this order:

1. normalize briefs,
2. audit slides,
3. assign template and recipe,
4. propose rebuild waves,
5. implement the requested wave,
6. review against QA,
7. capture reusable lessons.

## Recommended User Commands

### Full Deck Workflow

```text
Use `deck-system/docs/01-core-workflow.md` for this deck.
Run the work in phases.
Start with normalization and slide audit.
Do not redesign the whole deck in one pass.
Show me the slide-by-slide mapping, template assignment, recipe assignment, fit risks, and rebuild waves before or alongside implementation.
```

### Partial Deck Workflow

```text
Use `deck-system/docs/01-core-workflow.md` for slides 8-15 only.
Start from phase 1 for those slides.
Rebuild Wave 1 first, then stop for review.
```

### Intake And Audit Only

```text
Use `deck-system/docs/01-core-workflow.md`.
Only do phases 1-3 for this deck.
Create normalized briefs, audit the slides, and assign templates and recipes.
Do not rebuild slides yet.
```

## Success Standard

This workflow is working if:

- new decks no longer start from ad hoc redesign,
- contributors can submit clearer inputs,
- editors can map most slides to a template and recipe quickly,
- visual modes stay intentional instead of accidental,
- overloaded pages are identified before styling,
- overflow is caught before polish,
- the system improves through reusable examples instead of repeated custom fixes.

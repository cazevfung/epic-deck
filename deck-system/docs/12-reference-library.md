# 12 Reference Library

## Purpose

This document turns the current Fortnite China deck into a practical reference set for future deck production.

The goal is not to freeze one deck as the only visual answer.

The goal is to extract:

- canonical examples,
- recipe examples,
- anti-patterns,
- promotion candidates.

This helps future contributors work from concrete references rather than abstract rules alone.

## How To Use This Library

Use this document after:

- intake has clarified the page job,
- the template family has been chosen,
- the page is being mapped to a known structure.

The reference library answers:

- what a strong example of this pattern looks like,
- what kind of evidence hierarchy should be preserved,
- what common failure mode to avoid.

## Reference Types

### Visual Canon

A source page that defines the deck family's design identity and should influence the system even when the exact content is different.

### Canonical Example

A page that already fits the system well enough to teach future contributors how the template should behave.

### Recipe Example

A page that demonstrates a recurring composition pattern that should be documented as a named recipe.

### Anti-Pattern

A page that reveals a repeatable failure mode such as overload, mixed page jobs, or template mismatch.

## Visual Canon

The original HTML deck is the primary visual canon:

- [`../../outdated/XD_Epic_Fortnite-China-Plan.html`](../../outdated/XD_Epic_Fortnite-China-Plan.html)

Use it to study:

- dramatic dark-stage palette,
- oversized bilingual type,
- image-led proof,
- asymmetry,
- chapter-specific atmosphere,
- grouped channel and ecosystem proof behavior.

### Canonical Visual Families

- `market-shift-board`
  - original slide 2
  - why it matters:
    - comparison becomes a turning-point page, not a generic split
    - center transition and two proof worlds both matter

- `validation-triptych`
  - original slide 3
  - why it matters:
    - three proof cards carry equal weight
    - each card mixes metrics, image, and conclusion without losing rhythm

- `launch-spectacle-proof`
  - launch and announcement pages in the source family
  - why it matters:
    - spectacle itself is part of the proof
    - hero media is not filler

- `channel-wall`
  - original slide 16
  - why it matters:
    - the proof is organized breadth, not isolated logos
    - grouped categories are required for legibility

## Canonical Examples

### `T05 Three-Pillar / Three-Card`

- Slide 3 in the Fortnite China deck.
- Why it works:
  - one clear page job,
  - three parallel cards,
  - each card has a consistent internal structure,
  - the page reads as one framework instead of three unrelated mini slides.

### `T04 Two-Column Proof`

- Slide 6 in the Fortnite China deck.
- Why it works:
  - the page makes one clear claim,
  - the proof is distributed as two balanced operating examples,
  - visuals and copy support the same conclusion.

### `T09 Budget / Resource Allocation`

- Slide 10 in the Fortnite China deck.
- Why it works:
  - the total, chart, and legend act as one system,
  - the spend logic is visible quickly,
  - the page stays decision-oriented rather than decorative.

### `T04 Two-Column Proof`

- Slide 11 in the Fortnite China deck.
- Why it works:
  - one dominant strategy call,
  - one text column and one structured proof column,
  - the page remains legible without overloading secondary evidence.

### `T05 Three-Pillar / Three-Card`

- Slide 15 in the Fortnite China deck.
- Why it works:
  - strong top takeaway,
  - three parallel tournament pillars,
  - consistent card rhythm with one visual per card.

### `T08 Timeline / Roadmap`

- Slide 17 in the Fortnite China deck.
- Why it works:
  - the page reads as a sequence,
  - the track carries the planning rhythm,
  - top and bottom modules feel intentional rather than improvised.

### `T04 Two-Column Proof`

- Slide 19 in the Fortnite China deck.
- Why it works:
  - one stable claim,
  - one main proof visual,
  - support copy explains the implication without stealing focus.

## Recipe Examples

### `comparison-split`

- Slide 2 in the Fortnite China deck.
- Why it matters:
  - the page is not just a generic two-column split,
  - the center transition logic is part of the argument,
  - each side has a different but related proof treatment.

### `visual-stack`

- Slides 13 and 14 in the Fortnite China deck.
- Why it matters:
  - the right column repeats the same hero-plus-support structure,
  - the pattern is strong enough to standardize,
  - documenting it will reduce future one-off proof layouts.

### `logo-wall`

- Slide 16 in the Fortnite China deck.
- Why it matters:
  - grouped channel breadth is the proof,
  - logo variability requires a controlled recipe,
  - the page succeeds only if ordering and legibility remain stable.

### `timeline-track`

- Slide 17 in the Fortnite China deck.
- Why it matters:
  - the layout depends on controlled sequence rhythm,
  - empty cells and track logic are structural, not accidental.

### `operations-grid`

- Slide 18 in the Fortnite China deck.
- Why it matters:
  - the page communicates parallel readiness modules,
  - the pattern should be judged as a grid recipe, not as a stretched proof page.

### `case-study-gallery`

- Slides 5 and 7 in the Fortnite China deck.
- Why it matters:
  - one dominant case must remain clear while a gallery of secondary evidence stays visible,
  - this pattern will likely recur in partnership, ecosystem, and capability decks.

## Anti-Patterns

### Overloaded `T04`

- Slide 12 in the Fortnite China deck.
- Failure mode:
  - one proof page is carrying market size, hero proof, and three case columns at once.
- Lesson:
  - if the page needs multiple proof layers with equal weight, change the structure or split the page before styling.

### System Flattening

- Failure mode:
  - the page technically fits but no longer carries the original deck's visual identity.
- Lesson:
  - consistency is not success if the page has been stripped of its intended art direction, hero hierarchy, or image energy.

### Mixed Page Jobs

- Slide 4 in the Fortnite China deck.
- Failure mode:
  - values alignment, company KPI proof, and exclusives gallery all compete on one page.
- Lesson:
  - choose the page job first, then rank the proof. Do not let one page prove everything.

### Case Template Drift

- Slide 7 in the Fortnite China deck.
- Failure mode:
  - the page is labeled as one case study but behaves like a showcase row plus dense gallery.
- Lesson:
  - when the supporting gallery becomes large enough to change the reading pattern, formalize the recipe or narrow the case.

### Thesis Vs. Framework Ambiguity

- Slide 9 in the Fortnite China deck.
- Failure mode:
  - the page sits between a single strategic thesis and a four-part framework page.
- Lesson:
  - decide whether the page should land one judgment or present a structured model. Avoid half-thesis, half-taxonomy pages.

## Promotion Candidates

The current strongest candidates for promotion into stable reusable references are:

- slide 3 for `T05`,
- slide 6 for `T04`,
- slide 10 for `T09`,
- slide 15 for `T05`,
- slide 17 for `T08`,
- slide 19 for `T04`,
- slides 13 and 14 for `visual-stack`,
- slide 16 for `logo-wall`,
- slide 18 for `operations-grid`.

## Maintenance Rule

Do not treat this library as permanent truth.

When a future deck produces a better example:

- replace the older example,
- document why it is better,
- keep the system improving through real pages rather than abstract preference,
- preserve the visual canon unless a stronger, equally authored family replaces it.

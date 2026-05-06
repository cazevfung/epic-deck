# 05 Layout System

## Purpose

This document defines the page skeleton used by the deck system.

Layout rules exist to make different contributors produce pages that still align when viewed together.

This document should be read as a `page geometry spec`, not just a set of visual suggestions.

## Base Canvas

The deck system uses a fixed 16:9 presentation canvas.

V1 baseline:

- stage size -> `1920 x 1080`
- safe-box inset -> `96px` left/right, `72px` top/bottom

These values should be controlled by shared tokens, not by page-level overrides.

Slides should be designed against this fixed stage first, then checked in fullscreen and export modes as scaled views of the same canvas.

The browser viewport is not the layout contract.

## Safe Area

Every slide should contain a protected safe box inside the fixed stage.

Meaningful content must stay inside this safe box:

- titles,
- page numbers,
- charts,
- tables,
- logos,
- screenshots,
- captions,
- bullets,
- source notes,
- footnotes.

Only decorative layers may extend beyond the safe box:

- background gradients,
- atmosphere shapes,
- non-essential hero crops,
- texture or light effects.

The safe padding around the box is a no-intrusion zone for meaningful content.

Implementation baseline:

- page block padding -> `--page-pad-block`
- page inline padding -> `--page-pad-inline`

These values should be changed centrally, not page by page.

## Structural Zones

Each standard slide should be thought of as three zones:

- `Header zone`: eyebrow, title, page number
- `Content zone`: primary argument, proof, visuals, cards
- `Footer zone`: optional source, summary, or low-emphasis note

These zones live inside the safe box, not directly against the slide edge.

In code, a standard page should converge toward:

- `.page-header`
- `.page-content`
- `.page-footer`

Hero pages may deviate, but only intentionally.

## Geometry Anchors

### Header Anchor

For standard pages:

- the left edge of eyebrow, title, and main copy should align to the same start line,
- the page number should align to a stable right-side anchor,
- the header should begin from one consistent top zone,
- header drift should be treated as a bug, not a style choice.

### Content Start Line

For standard pages:

- content should begin from a predictable line below the header,
- use `--header-to-content-standard` as the default spacing,
- dense pages may use `--header-to-content-dense`,
- pages should not invent custom title-to-content distances without justification.

### Footer Behavior

- footers should stay secondary,
- source notes and low-emphasis summaries should not compete with the main body,
- footer spacing should use shared section-gap tokens.

## Header Rules

The header should be predictable across most non-hero pages.

### Standard Header

- eyebrow or chapter cue,
- page title,
- page number aligned consistently.

### Header Rules

- keep the title block aligned to a consistent start edge,
- use one title only,
- do not crowd the header with extra tags unless they materially help orientation.

### Standard Header Blueprint

The standard content-page header should usually follow this order:

1. eyebrow
2. page title
3. optional short subhead
4. page number

### Header Constraints

- eyebrow should never become the visual focus,
- page title should occupy the primary visual slot,
- page number should stay in a dedicated metadata position,
- subheads should be rare and short.

### Header Exceptions

Only these page families may break the standard header:

- cover
- section divider
- closing page

Even then, they must still follow a defined hero anchor system.

## Text Content Rules

### One Reading Column Logic

Most text-heavy areas should feel like one readable column, even inside a wider layout.

Use shared text measures:

- `--text-measure-tight`
- `--text-measure-standard`
- `--text-measure-wide`
- `--text-measure-copy`

### Text Width Rules

- page titles should usually stay within `wide`,
- normal copy should usually stay within `copy`,
- dense or high-importance copy may tighten to `standard`,
- hero headlines may break these measures intentionally.

### Text Density Rules

- do not let long copy span too wide simply because there is space,
- reduce width before reducing legibility,
- dense pages should compress measure and spacing before inventing new structures.

### Text Stack Order

For most standard pages, the text stack should read in this order:

1. title
2. takeaway or lead line
3. support copy or bullets
4. caption or source

Do not reorder this without a clear storytelling reason.

## Core Grid Types

The system currently supports these standard page grids:

- `Single column`
- `Two column`
- `Three column`
- `Four-column utility grid`
- `Named dense recipes`
- `Full-bleed hero`
- `Timeline / track layout`

## Single Column

Use when the message is strong and the page is text-led or hero-led.

Best for:

- core insight,
- cover,
- closing,
- chapter divider.

## Two Column

Use when the page needs a clean relationship between claim and proof.

Best for:

- text + image,
- argument + chart,
- case + implication,
- process + visual.

## Three Column

Use for parallel logic.

Best for:

- three pillars,
- three validation points,
- tournament or channel categories,
- structured case comparisons.

## Dense Utility Grids

Use four-column utility grids sparingly.

They are appropriate for:

- logo walls,
- asset matrices,
- small comparison tiles,
- supporting references.

Five-plus-column dense structures may be valid, but they should be implemented as named recipes inside the same fixed stage and safe-box contract.

Do not let dense utility grids become the main storytelling structure unless the page goal truly requires it.

## Alignment Rules

- major blocks should align to the same vertical rhythm,
- card tops should align when presented as peers,
- image captions should follow one positioning logic per page,
- avoid arbitrary nudging unless solving a real optical issue.

## Vertical Rhythm

Spacing should communicate hierarchy.

Use shared spacing buckets instead of per-page improvisation:

- `--section-gap-lg`
- `--section-gap-md`
- `--section-gap-sm`
- `--takeaway-to-body-gap`

Recommended pattern:

- more space between major sections,
- medium space between cards or modules,
- tight space inside related label/value blocks.

Avoid pages where every gap is visually identical.

### Spacing Rules

- title to takeaway should use one shared relationship,
- takeaway to support copy should use one shared relationship,
- cards in the same row should use one gap value,
- stacked text modules should use one of the shared section gaps.

## Content Density Rules

- a page should have one dominant focal area,
- if the page needs many modules, at least one must still read as primary,
- if the viewer does not know where to look first, the page is too flat.

### Preservation-First Layout Rule

Changing layout is allowed. Silently dropping source content is not.

For migrations, layout work must start from an inventory of what the source page contains:

- required claim,
- required metrics,
- required proof assets,
- required named examples,
- required captions or caveats.

The layout may change the order, grouping, scale, or visual treatment of these items, but it must preserve their role in the argument.

If everything cannot fit, the correct layout response is to choose a different template, create a compact evidence treatment, or split the page. Do not make the page fit by hiding, cropping away, or deleting important content.

### Dense Page Rules

Dense pages are not free-form pages.

They still need:

- a stable header anchor,
- a stable content start line,
- tightened but consistent text measures,
- no more than one dominant visual explanation pattern,
- meaningful content that still remains inside the safe box.

## Hero Layouts

The following pages may deviate more strongly from the standard header/content rhythm:

- cover,
- section divider,
- closing page.

These pages should still respect the overall system colors, type hierarchy, and spacing discipline.

### Hero Anchor Rules

Hero pages may depart from the standard header, but should still obey:

- one dominant headline anchor,
- stable side padding,
- restrained supporting metadata,
- controlled vertical centering or section alignment.

Hero pages may use full-stage decorative bleed, but meaningful content should still anchor to the safe box unless an explicit exception is documented.

Do not treat hero pages as unconstrained posters.

## Template Geometry Guidance

### `T03 Core Insight`

- standard header
- content starts immediately below header rhythm
- text stack should stay left-aligned and compact

### `T04 Two-Column Proof`

- standard header
- two-column content starts from a shared top line
- left and right columns should align at the top

### `T05 Three-Pillar / Three-Card`

- standard header
- card row should align to one top line
- card titles and support copy should share consistent internal spacing

### `T08 Timeline / Roadmap`

- dense header
- timeline should start from one controlled horizontal band
- top and bottom track content should feel rhythmically balanced

### `T09 Budget / Resource Allocation`

- dense header
- total, chart, and legend should align to one content frame
- chart and legend should feel like one system, not two separate pages

## Layout Escalation Rule

Introduce a new layout only if:

- the message cannot fit a current grid,
- the page type will likely recur,
- the new layout is documented and named.

## Fit Integrity Rule

A page does not pass layout QA simply because nothing extends beyond the browser viewport.

The correct fit test is:

- does the page fit the fixed 16:9 stage,
- does meaningful content remain inside the safe box,
- does the page still work when the stage is uniformly scaled.

The following are layout failures:

- meaningful content crosses into the safe padding zone,
- important content is hidden by `overflow: hidden`,
- a proof image is cropped so heavily that its evidence is no longer readable,
- logos are technically visible but too small to identify,
- content fits only because body copy, captions, or tiles were compressed below their template role.
- the page fits only because source evidence, examples, or captions were removed without replacement.
- the page only works because the browser viewport is unusually large or forgiving.

When this happens, reduce the message, change the template, or split the page. Do not solve it with more compression.

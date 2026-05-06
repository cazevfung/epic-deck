# 06 Grid System

## Purpose

This document defines the V0.1 grid layer for the deck system.

It should be read as a content-zone composition guide, not as a rule that every slide must become a rigid grid.

The goal is to reduce repeated one-off layout decisions while preserving the editorial flexibility needed by a proposal deck with mixed content types.

V0.1 is intentionally small. It standardizes the layout patterns that already repeat in the Fortnite China deck and leaves complex page families to named recipes.

## Relationship To The Layout System

This grid system sits below `05-layout-system.md`.

The existing layout system defines:

- page canvas,
- safe area,
- header zone,
- content zone,
- optional footer zone,
- density modes.

This document only defines how the content zone may be divided after the header has established the page rhythm.

All grid behavior must remain inside the fixed stage and safe-box contract defined in `05-layout-system.md`.

## Core Principle

Use a grid when the content has peer relationships.

Do not use a grid just because a page has multiple things on it.

Good grid candidates:

- peer cards,
- evidence tiles,
- KPI bands,
- comparison panels,
- visual matrices,
- repeated proof modules.

Weak grid candidates:

- long narrative text,
- image sequences with different aspect ratios,
- logo walls with unpredictable widths,
- hero pages,
- dense pages that only fit through scrolling or hidden overflow,
- pages where one module must dominate the others.

## Scope

The default grid scope is the content zone.

Recommended wrapper:

```html
<div class="page-content grid-content cols-3">
  ...
</div>
```

Avoid applying row grids to the full slide. Header height varies too much across page types, and a full-slide row grid can easily make the body area unstable.

Grids distribute space inside the safe box. They do not grant permission to push content into slide padding or outside the fixed canvas.

## V0.1 Default API

The default system includes only:

- `grid-content`
- `cols-2`
- `cols-3`
- `cols-4`
- `rows-auto-fill`
- `rows-fill-auto`
- `rows-peer-2`
- `matrix-2x2`
- `gap-sm`
- `gap-md`
- `gap-lg`
- `col-span-2`
- `col-span-3`
- `row-span-2`

The default system excludes:

- `rows-3`
- `rows-4`
- `cols-5`
- broad arbitrary ratio utilities
- broad arbitrary span utilities

These exclusions are intentional. The current deck has too many page-specific image, timeline, logo-wall, and dense-content behaviors for a large generic grid API to stay clean.

## Grid Tokens

Grid values should be tokenized, but the implementation should stay small.

Recommended tokens:

```css
--grid-gap-sm: var(--section-gap-sm);
--grid-gap-md: var(--section-gap-md);
--grid-gap-lg: var(--section-gap-lg);

--grid-col-min: 0;
--grid-row-min: 0;
```

Grid gaps should follow section rhythm by default. Use image-gap tokens only inside image clusters and asset galleries.

Do not introduce a separate spacing scale unless the current spacing tokens prove insufficient.

## Column Presets

### `cols-2`

Use for claim-plus-proof layouts.

Best for:

- text plus image,
- thesis plus evidence,
- chart plus explanation,
- two-sided comparison,
- case setup plus implications.

Recipe-level ratios:

- `1fr 1fr`
- `9fr 11fr`
- `11fr 9fr`
- `2fr 3fr`
- `3fr 2fr`

The equal split should be the default. Ratio variants should be added only through named recipes or clearly named modifiers, not through broad arbitrary ratio utilities.

### `cols-3`

Use for parallel logic.

Best for:

- three pillars,
- three proof cards,
- three case examples,
- three image cards with similar evidence weight.

Keep body copy short. A three-column grid should not carry long explanatory paragraphs.

### `cols-4`

Use as a utility grid.

Best for:

- KPI tiles,
- compact evidence cards,
- icon or logo groups,
- short category modules.

Avoid using four equal columns for long text.

### Five Or More Columns

Do not include `cols-5` or broader column utilities in the default API.

Five-plus-column layouts may be valid for timelines, logo walls, and dense operations grids, but they should be implemented as named recipes because their behavior depends on content type.

## Row Presets

Rows should be used carefully because slide height is the scarce resource.

### Two-Row Presets

Use for strong vertical hierarchy.

Best for:

- main argument above supporting visuals,
- hero evidence above secondary proof,
- chart above notes,
- full-width lede above a card row.

Recommended pattern:

```css
.rows-auto-fill {
  grid-template-rows: auto minmax(0, 1fr);
}
```

or:

```css
.rows-fill-auto {
  grid-template-rows: minmax(0, 1fr) auto;
}
```

Use equal rows only for true peer modules:

```css
.rows-peer-2 {
  grid-template-rows: repeat(2, minmax(0, 1fr));
}
```

### Three Or More Rows

Do not include `rows-3` or `rows-4` in the default API.

Three-row structures should be named recipes when they are truly repeated, such as a KPI band plus visual stack. Four-row structures usually create too little vertical room per module once the header is present. Use a custom dense layout, a timeline layout, or split the slide.

## Span Rules

Allow a minimal set of spans:

- `col-span-2`
- `col-span-3`
- `row-span-2`

Do not add every possible span class at first.

Spans should express hierarchy, not patch a page after the grid choice was wrong.

## Composition Recipes

### Two Column Proof

Recommended structure:

```html
<div class="grid-content cols-2">
  <section>Claim</section>
  <figure>Proof</figure>
</div>
```

Use this for `T04` when the page has one main proof object.

### Three Card Page

Recommended structure:

```html
<div class="grid-content cols-3 stretch">
  <article>Card 1</article>
  <article>Card 2</article>
  <article>Card 3</article>
</div>
```

Use this for `T05` when all three cards have similar importance.

### Lede Plus Card Row

Recommended structure:

```html
<div class="grid-content rows-auto-fill lede-plus-row">
  <p>Lede</p>
  <div class="grid-content cols-3">Cards</div>
</div>
```

Use this when the page needs one interpretive sentence before modules.

### Matrix Proof

Recommended structure:

```html
<div class="grid-content matrix-2x2">
  ...
</div>
```

A matrix should be an explicit recipe, not a generic two-column/two-row combination, because image aspect ratios and captions usually need special handling.

## Named Recipes

Named recipes are allowed when repeated content behavior is more important than generic grid reuse.

### `comparison-split`

Use for before/after or old/new pages where a center arrow, divider, or transition element is part of the argument.

This should not be expressed as plain `cols-2`, because the middle connector is semantically important.

### `visual-stack`

Use for text plus stacked media slots, especially when the media column mixes one full-width hero slot with two smaller slots.

This recipe should control media aspect ratios and vertical fit.

### `case-study-gallery`

Use when a case-study page combines narrative proof with a repeated image or collaboration gallery.

The outer page may still use `cols-2`, but the gallery itself should be a recipe.

### `logo-wall`

Use for channel or partner pages with unpredictable logo widths.

Logo walls may need flex wrapping instead of fixed columns.

### `timeline-track`

Use for roadmap or user-acquisition phase layouts.

The recipe may contain empty cells, alternating rows, or track markers that should not be treated as generic grid gaps.

### `operations-grid`

Use for dense operational readiness cards.

This may use five visual columns internally, but it should stay a named dense recipe rather than becoming `cols-5`.

## Density Rules

`density-standard` may use:

- `cols-2`,
- `cols-3`,
- two-row presets,
- explicit matrices.

`density-dense` may use:

- compact `cols-3`,
- compact `cols-4`,
- specialized five-plus-column layouts.

`density-hero` should usually avoid the grid API except for internal supporting details.

If dense content cannot fit inside the safe box without scrolling, the correct response is to change the recipe, compress within approved limits, or split the slide.

## Fit Audit Against Current Fortnite China Deck

The current deck shows that a rigid grid system would create several layout risks.

### Existing Patterns That Fit The V0.1 Grid

- Slide 3 uses a three-card structure and maps cleanly to `cols-3`.
- Slide 6 uses a two-column proof structure and maps cleanly to `cols-2`.
- Slide 10 uses a budget chart plus legend and maps to `cols-2` with a slight ratio.
- Slide 11 uses text plus visual proof and maps to `cols-2`.
- Slide 15 uses a lede plus three-column card row and maps to `rows-auto-fill` plus `cols-3`.
- Slide 19 uses a two-column proof layout and maps to `cols-2`.

### Existing Patterns That Need Specialized Recipes

- Slide 2 is a comparison page with an arrow column and mixed image grids. It needs a comparison recipe, not plain `cols-2`.
- Slide 4 mixes logo, values, KPIs, and a second evidence band. It needs named rows and ratios, not a generic column-plus-row utility combination.
- Slide 5 combines a text proof column with a six-item collaboration gallery. It can use `cols-2`, but the gallery needs its own matrix recipe.
- Slide 7 combines three showcase cards and a dense collaboration matrix. It needs a case-study recipe with a top card row and bottom matrix.
- Slide 9 changed from a split layout to a top/bottom narrative and image row. This is a good example of why row grids should be content-zone only and should support `auto` rows.
- Slide 12 has KPI proof, hero cards, and case columns in one dense vertical sequence. A generic row system would either compress the cards too much or force overflow.
- Slides 13 and 14 use text plus stacked 16:9 asset slots. They need a visual-stack recipe.
- Slide 16 is a channel wall with flex-wrapped logos. It should not be forced into fixed columns because logo widths vary.
- Slide 17 is a timeline with empty cells and phase alignment. It should remain a timeline recipe.
- Slide 18 uses five operations cards in a dense grid. It is a specialized dense operations layout, not a default `cols-5`.

## Reduction Rationale

### Equal Rows Are Too Rigid

Average row systems sound clean, but the deck has many pages where top content is `auto` and bottom content must absorb remaining space.

- prefer `auto + minmax(0, 1fr)` row recipes,
- avoid default equal `rows-3`,
- remove default `rows-4`.

### Too Many Column Counts Create False Choices

The existing page set needs two and three columns often. Four columns are useful, but mostly for small modules. Five-plus columns are specialized.

- default API should stop at `cols-4`,
- five-plus should live in named recipes such as timeline, logo wall, or operations grid.

### Fixed Gutters Cannot Serve Every Page Density

Some current slides use very tight gaps to preserve 16:9 fit, especially image-heavy and dense pages.

- use gap presets instead of one fixed gutter,
- default to `gap-md`,
- allow `gap-sm` for dense pages and `gap-lg` for spacious proof pages.

### Generic Spans Can Become Layout Patches

If many span classes exist, contributors may keep a wrong grid and patch around it.

- start with only `col-span-2`, `col-span-3`, and `row-span-2`,
- require specialized recipes for more complex placement.

### Text-Heavy Pages Need Measure More Than Grid

Several pages need text measure control more than grid control.

- keep text measure rules in `05-layout-system.md` as the primary control,
- grid classes should not override readable text width.

## Implementation Direction

The first implementation should be additive and non-invasive.

Recommended steps:

1. Add grid tokens to `tokens.css`.
2. Add generic grid utilities to `base.css` or a new `grid.css`.
3. Convert only the pages that already match the system cleanly.
4. Leave specialized pages on named recipes.
5. Revisit the API only after two or three page conversions expose real repetition.

The grid system should reduce custom layout code where the deck already repeats itself. It should not flatten the distinct page types that make the proposal readable.

## Pre-Implementation Guardrails

### Legacy Grid Aliases

The current Fortnite China deck already uses legacy utilities:

- `.grid-2`
- `.grid-3`
- `.grid-4`
- `.grid-5`

During migration, treat `.grid-2`, `.grid-3`, and `.grid-4` as legacy aliases for the new column presets only when their behavior matches the V0.1 rules.

Do not add new `.grid-5` usage. Existing five-column layouts should migrate to named recipes such as `timeline-track`, `logo-wall`, or `operations-grid`.

### Row Direction

Do not implement a single ambiguous `.rows-2` class.

Use explicit row-direction modifiers or recipe-level definitions:

- `rows-auto-fill` -> `auto minmax(0, 1fr)`
- `rows-fill-auto` -> `minmax(0, 1fr) auto`
- `rows-peer-2` -> equal rows, only for true peer modules

If a page needs different row behavior in print, fullscreen, or mobile states, define that behavior inside the recipe.

### Template Mapping

Named recipes should map to existing template classes where possible.

Examples:

- `comparison-split` may live under `.template-page--comparison`
- `logo-wall` may live under `.template-page--channel-wall`
- `timeline-track` may live under `.template-page--roadmap`
- `operations-grid` may live under `.template-page--operations`

Avoid creating a parallel class system if a page template already expresses the same layout family.

### Matrix Fit Contract

`matrix-2x2` is not just `repeat(2, 1fr)`.

Any matrix recipe must define:

- min-size behavior,
- gap token,
- image aspect-ratio rules,
- caption or overlay behavior,
- overflow behavior.

If those rules differ by page, keep the matrix page-scoped instead of promoting it to a utility.

### Render Modes

Grid utilities and recipes must be checked in all active render modes:

- normal screen navigation,
- fullscreen,
- print/PDF export,
- narrow viewport fallback.

The current deck contains fullscreen-specific and print-specific layout rules. A new grid rule should not assume that screen layout automatically exports correctly.

For narrow viewports, the stage should scale as one unit. Grid rules should not rely on the slide reflowing into a different aspect ratio.

# 07 Component Spec

## Purpose

This document defines the reusable building blocks that appear across page templates.

Components exist so that repeated deck elements stay visually and structurally consistent across different pages and authors.

## Component Principles

- a component should solve one repeated communication problem,
- a component should be reusable across multiple page types,
- page-specific styling should not replace a reusable component unless necessary,
- components should preserve visual family identity instead of forcing every page into the same neutral card rhythm.

## C01 Title Block

### Purpose

Provides the standard page header structure.

### Includes

- eyebrow or chapter label,
- page title,
- optional short subhead,
- page number.

### Rules

- title is the main header focus,
- eyebrow should orient, not compete,
- subhead should be used only when it adds value.
- title block should start from the standard header anchor on non-hero pages,
- title block spacing should use shared header and section-gap rules,
- page number should sit in a separate metadata slot rather than floating inside the copy block.

### Geometry Expectations

- eyebrow, title, and subhead align to one start edge,
- page title width should respect shared text measures,
- title-to-subhead distance should be stable across templates.

## C02 Takeaway Highlight

### Purpose

Surfaces the one sentence the reader should remember.

### Best Use

- core insight pages,
- proof pages,
- strategy pages,
- implication panels.

### Rules

- one page should not have multiple takeaway highlights,
- keep the sentence concise,
- use stronger emphasis than body copy but less than the main title.
- takeaway should appear in a predictable place below the title or inside a defined implication block,
- takeaway width should stay readable rather than stretching across the whole page.

## C03 Stat Block

### Purpose

Expresses a metric with a clear label.

### Structure

- value,
- label,
- optional qualifier or note.

### Rules

- metrics should be comparable in scale and emphasis when shown as a group,
- avoid mixing a hero stat with several low-confidence numbers unless clearly differentiated,
- source should be available somewhere on the page or in production notes.

## C04 Card

### Purpose

Provides a bounded container for grouped information.

### Use Cases

- pillars,
- proof blocks,
- KPI modules,
- category tiles,
- supporting references.

### Rules

- cards grouped together should have consistent padding and hierarchy,
- use accent borders sparingly,
- do not nest cards heavily unless needed.

## C05 Tag

### Purpose

Labels category, status, brand, or short metadata.

### Rules

- tags should stay short,
- tags should clarify grouping, not become mini headlines,
- too many tags on a page add noise quickly.

## C06 Figure With Caption

### Purpose

Pairs an image with a short statement explaining why it matters.

### Structure

- image,
- caption title or statement,
- optional hint or supporting line.

### Rules

- captions should interpret the image, not merely describe it,
- caption style should remain secondary to main page content,
- multiple figures on one page should use consistent caption logic.
- default to below-caption mode,
- use overlay-caption mode only when it improves density or tile clarity,
- keep caption spacing consistent through shared image-gap tokens.

## C06a Image Cluster

### Purpose

Groups multiple related visuals into one coherent image set.

### Typical Use

- collab matrix,
- supporting gallery,
- before/after image pair,
- multi-screenshot proof row.

### Rules

- keep cluster spacing consistent,
- avoid mixing too many aspect-ratio families,
- grouped images should feel like one visual argument rather than unrelated assets.

## C06b Logo / Brand Tile

### Purpose

Provides a low-drama, repeatable frame for logos and brand marks.

### Rules

- use a stable tile shape within one page,
- logos should not overpower the main page headline,
- keep treatment restrained and utilitarian.

## C06c Hero Media Board

### Purpose

Provides the controlled hero-image treatment used by launch, campaign, and high-importance proof pages.

### Structure

- one dominant media frame,
- optional overlay caption,
- optional support note or implication line outside the frame.

### Rules

- hero media should clearly dominate nearby support assets,
- overlay copy must stay short,
- the frame should feel atmospheric without hiding the proof target,
- this component may use stronger edge glow, overlay, and gradient treatment than standard figures.

## C07 Evidence List

### Purpose

Presents short supporting bullets tied to a conclusion.

### Rules

- bullets should be short and non-overlapping,
- keep the list to a manageable length,
- list items should read as evidence, not raw meeting notes.
- evidence lists should align to one text column logic,
- list width should respect shared copy measure and not sprawl across the full canvas.

## C11 Text Block

### Purpose

Provides a reusable rule set for structured explanatory copy on a page.

### Structure

- optional kicker or label,
- one lead sentence or takeaway,
- short support paragraph or bullets.

### Rules

- text blocks should respect shared text measures,
- avoid long full-width paragraphs,
- dense pages should use tighter measure and spacing, not random font-size changes.

## C08 Comparison Pair

### Purpose

Shows contrast between two states, periods, or approaches.

### Best Use

- then vs. now,
- old model vs. new model,
- global vs. China,
- problem vs. solution.

### Rules

- both sides should be structurally comparable,
- visual asymmetry is acceptable if it helps emphasis,
- one side should not become a content dump.

## C08a Validation Card

### Purpose

Provides the repeatable card used by validation triptych pages.

### Structure

- card title,
- compact stats,
- one proof image,
- one concluding line.

### Rules

- all cards in the same triptych should use the same internal order,
- stat groups should be comparable in visual weight,
- the concluding line should stay short enough to preserve parallel rhythm.

## C08b Channel Wall Module

### Purpose

Provides the grouped structure used by channel and partner coverage pages.

### Structure

- category label,
- flexible tile row or tile grid,
- optional supporting KPI or note.

### Rules

- categories must do the main organizational work,
- text fallback is required for unstable or weak logo assets,
- tile density should not erase the page thesis.

## C08c Launch Proof Frame

### Purpose

Provides a high-energy proof frame for announcement, event, or launch hero images.

### Structure

- dominant hero image,
- integrated proof caption,
- optional secondary proof strip or note.

### Rules

- keep copy concise,
- preserve event scale and atmosphere,
- do not reduce the frame to a plain neutral screenshot card if the page depends on spectacle.

## C09 Timeline Step

### Purpose

Represents a phase, milestone, or lifecycle node.

### Structure

- phase name,
- short objective,
- optional date or trigger,
- optional budget or KPI.

### Rules

- sequence should be unambiguous,
- each step should have a distinct job,
- avoid mixing lifecycle stages with unrelated categories.

## C10 Source Note

### Purpose

Records evidence provenance without dominating the slide.

### Rules

- source notes should be low emphasis but present,
- if a number may be challenged, include the source,
- if a source is pending, mark it in production notes at minimum.

## Component Ownership Rule

If a repeated UI pattern appears on three or more pages, it should be elevated into an official component and aligned with shared CSS.

# 08 Visual System

## Purpose

This document defines the design identity of the deck system.

It is not only a cleanliness guide. It is the rule set that keeps the system aligned with the original Fortnite China deck's pitch character instead of drifting into a generic proposal template.

## Canonical Reference

The primary visual canon for this repository is the original Fortnite China HTML deck:

- [`../../outdated/XD_Epic_Fortnite-China-Plan.html`](../../outdated/XD_Epic_Fortnite-China-Plan.html)

That file is not just a source of content. It is the main source of design behavior:

- dramatic dark-stage presentation,
- page-specific art direction,
- oversized bilingual display type,
- image-led proof,
- asymmetric composition,
- strong chapter atmosphere,
- controlled spectacle rather than neutral corporate restraint.

If the system conflicts with those qualities, the system should be corrected.

## Design Intent

The target feeling is:

- cinematic,
- strategic,
- game-native,
- premium,
- decisive,
- presentation-first,
- visually authored rather than template-flat.

The deck should feel closer to a bespoke publishing pitch than to a generic consulting deck.

## Visual DNA

Every strong page in this system should preserve most of the following traits.

### 1. Stage Presence

The page should feel designed for a 16:9 presentation stage, not for a scrolling browser.

- strong focal entry,
- deliberate negative space,
- clear safe-box discipline,
- meaningful bleed only when decorative.

### 2. Dramatic Hierarchy

The original deck often wins through scale more than ornament.

- hero headlines can be very large,
- one visual can dominate a page,
- support content should clearly recede,
- contrast should carry the first read.

### 3. Page-Specific Art Direction

The system must allow slide families to look related without forcing them into one uniform card recipe.

- market pages may be analytical and chart-driven,
- launch pages may be campaign-like and image-led,
- channel pages may behave like structured walls,
- anchor pages may be typography-first.

### 4. Controlled Energy

The right goal is not "quiet at all times." The right goal is "energy with a job."

- covers, dividers, anchor pages, and launch proof pages may push spectacle,
- analysis and dense proof pages should stay more disciplined,
- operational pages should feel deliberate, not stripped.

### 5. Visual Proof, Not Decoration

Images, logos, charts, and screenshots must support a claim. They are not filler.

At the same time, proof pages should not be flattened so hard that the deck loses atmosphere or confidence.

## Core Principles

### Contrast Before Ornament

Build hierarchy with:

- scale,
- value contrast,
- placement,
- density contrast,
- one dominant visual field.

Do not rely on extra lines, chrome, or small decorative gadgets to simulate hierarchy.

### Preserve Hero Moments

Do not mistake strong type, asymmetry, dark atmosphere, or image pressure for noise.

If a page needs a hero move to land its message, preserve it and formalize it.

### Systemize Families, Not Sameness

The goal is reusable page families, not identical pages.

The system should standardize:

- spacing logic,
- typography roles,
- safe-box behavior,
- component grammar,
- recipe families,
- overflow rules.

The system should not erase:

- chapter mood,
- page-specific center of gravity,
- strong image-led storytelling,
- dramatic section anchors.

### Fit Is A Design Rule

A page that clips, hides overflow, invades the safe padding, or only works because everything was shrunk is not production-ready.

Fit must be solved through:

1. better hierarchy,
2. clearer content budget,
3. stronger recipe selection,
4. approved density changes,
5. page splitting when needed.

## Art-Direction Modes

Every page should choose a `visual mode` in addition to a `template` and optional `recipe`.

### `mode-cinematic-dark`

Use for:

- cover pages,
- section dividers,
- anchor statements,
- launch and campaign pages,
- emotionally charged proof pages.

Characteristics:

- dark stage,
- strong orange-led emphasis,
- large display moments,
- richer bleed or atmosphere fields,
- higher tolerance for asymmetry.

### `mode-analytical-dark`

Use for:

- market analysis,
- comparisons,
- strategy proof,
- case-study explanation,
- data-supported narrative pages.

Characteristics:

- dark stage,
- lower spectacle than cinematic mode,
- disciplined surfaces,
- clearer panel rhythm,
- analysis-first contrast.

### `mode-brand-orange`

Use for:

- strategy anchors,
- key message pages,
- momentary chapter lifts,
- pages where the Epic / Fortnite proposition should feel forceful and branded.

Characteristics:

- orange-led headline or field emphasis,
- warmer surface treatment,
- high headline contrast,
- reserved use so it still feels special.

### `mode-platform-teal`

Use for:

- creator ecosystem pages,
- platform cooperation,
- UGC / community systems,
- interoperability or creator tooling content.

Characteristics:

- teal as the main support accent,
- cooler proof treatment,
- ecosystem framing rather than campaign intensity.

## Color System

The active tokens live in [`../styles/tokens.css`](../styles/tokens.css).

### Color Roles

- `stage background`: main slide field
- `surface`: panel or card field
- `border`: low-drama structure
- `headline accent`: main emphasis
- `chapter accent`: mode-specific emphasis
- `success / warning / proof accents`: categorical meaning only

### Rules

- one page should usually have one primary accent,
- a second accent is allowed only when it maps to a meaningful sub-system,
- do not build rainbow pages,
- do not default every page to the same neutral card stack,
- mode changes should be deliberate and reusable.

## Typography Direction

Typography production rules live in [`09-typography-system.md`](09-typography-system.md).

High-level direction:

- the system must support very large bilingual display type,
- anchor pages may exceed the old eight-step scale,
- Chinese body copy should stay compact and controlled,
- English display words may act as visual anchors,
- dense pages should compress through approved fit modes, not ad hoc shrinkage.

## Image Direction

Image production rules live in [`10-image-guidelines.md`](10-image-guidelines.md).

High-level direction:

- image roles should be explicit,
- image-led pages are allowed and encouraged where appropriate,
- proof readability is mandatory,
- the atmosphere carried by original hero art should be preserved when it is part of the page job.

## Density And Overflow Policy

The system does not allow silent overflow fixes.

### Required Response Order

When a page does not fit:

1. shorten or rank the message,
2. remove duplicate phrasing,
3. switch to the correct recipe,
4. compress with approved density and fit rules,
5. split the page.

### Prohibited Responses

- hiding overflow,
- pushing meaningful content into safe padding,
- shrinking hero copy until it loses hierarchy,
- converting proof images into decorative thumbnails,
- dropping evidence because the page is crowded.

## Visual Exceptions

A page may use a custom treatment only when all of the following are true:

- the treatment clearly supports the page job,
- it still honors the fixed 16:9 safe-box contract,
- it can be described as a reusable family if repeated,
- it does not exist only to mask unresolved fit problems.

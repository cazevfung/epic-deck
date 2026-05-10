# Rebuild Guideline

## Purpose

This is the main execution guide for rebuilding slides around `style-bible.html`.

Use this before the older template and recipe docs.

## Non-Negotiable Inputs

Every rebuild should look at these three things first:

1. `deck-system/docs/style-bible.html`
2. the source slide or normalized brief
3. the current output batch in `epic_deck/02_sections/05_exports/`

The goal is not only to make the new page "good."

The goal is to make it feel like it belongs to the same authored deck family as the bible.

## The Operating Sequence

### Step 1: Find The Closest Bible Family

Before writing any layout, identify the closest page family in `style-bible.html`.

Examples:

- dark divider,
- light divider,
- hero statement,
- image-led proof,
- comparison proof,
- multi-card proof wall,
- brand or platform intro,
- data card field,
- campaign or launch showcase.

Do not start from a generic shell if a closer bible family already exists.

### Step 2: Write A Preservation List

For the target page, write down what must survive from the bible family.

Usually this is a short list:

- headline scale,
- darkness or lightness of stage,
- asymmetry,
- dominant visual block,
- card density,
- proof treatment,
- rhythm of empty space,
- accent behavior.

This list matters more than template naming.

### Step 3: Fit The Content To The Family

Do not distort the family just to keep every source sentence in the same visual weight.

Adapt in this order:

1. simplify wording,
2. rank proof,
3. remove duplicate support,
4. split into modules,
5. split the page if needed.

Do not flatten a strong family into a generic two-column card page just because it is safer.

### Step 4: Build The Page

Build in this order:

1. stage and background
2. headline block
3. dominant proof area
4. supporting proof
5. micro labels and page number

If the page already feels wrong after step 2 or 3, stop and correct the family choice.

### Step 5: Compare Side By Side

The page is not done when it is merely tidy.

Check it against:

- the nearest bible family,
- the source slide's persuasive job,
- nearby pages in the output batch.

Ask:

- is the proportion close enough,
- is the hierarchy forceful enough,
- is the page too cardy,
- is it too symmetrical,
- is it too safe,
- did the atmosphere collapse.

## Hard Rules

### Rule 1: Style Bible Wins

Do not over-summarize the bible into generic rules.

Borrow concrete behavior from actual bible slides.

### Rule 2: Reuse Families, Not Generic Shells

Reusable means:

- a divider family,
- a hero family,
- a comparison family,
- a proof-wall family.

Reusable does not mean every page gets the same `page-shell + header + card grid`.

### Rule 3: One Page, One Dominant Move

Each page needs one main move:

- giant type,
- giant image,
- giant contrast field,
- giant comparison,
- giant proof cluster.

If everything is medium-sized, the page will look generic.

### Rule 4: Components Are Secondary

Cards, chips, labels, and panels are supporting tools.

They should not become the visual identity of the whole deck.

### Rule 5: Extraction Happens After A Good Page Exists

Do not invent a shared pattern before you have at least one strong page proving it.

First make the page right.

Then extract what repeated.

## Allowed System Layers

The simplified system only needs four layers:

### 1. Canon Layer

`style-bible.html`

This defines visual truth.

### 2. Build Layer

This file.

This defines how to translate canon into rebuild work.

### 3. Review Layer

[`review-gates.md`](review-gates.md)

This catches drift and fit problems.

### 4. Pattern Layer

[`pattern-extraction-policy.md`](pattern-extraction-policy.md)

This controls what becomes reusable later.

## What To Ignore On First Pass

Ignore these unless they are genuinely helping:

- fine-grained template IDs,
- recipe IDs for one-off pages,
- component naming completeness,
- universal CSS purity,
- doc-to-doc taxonomy consistency.

## Quick Litmus Test

If a rebuilt page looks:

- cleaner but weaker,
- more organized but less memorable,
- more systemized but less authored,

then it is not aligned.

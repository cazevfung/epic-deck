# 03 Page Templates

## Overview

This document defines the standard page types used in scalable deck production.

All new pages should map to an existing page type whenever possible. Only create a new page type when the content goal cannot be served by the existing system and the pattern is likely to repeat.

For repeated composition patterns that sit below the template families, use [`04-page-recipes.md`](04-page-recipes.md).

## Core Principles

- One page should carry one primary message.
- Layout choice should serve the message, not decoration.
- The source page is a visual contract as well as a content contract.
- Reuse should come before novelty.
- Every template should have clear input requirements.
- Existing evidence, numbers, images, logos, and named examples must not be silently removed during migration.
- Every template must fit inside the fixed 16:9 stage and protected safe box defined by the layout system.

## Migration Strategy

When converting an existing deck page into the system, treat the source page as a content contract.

The goal is to preserve the argument while improving hierarchy, spacing, and template consistency.

### Preservation Contract

Before changing layout, identify the page's required inputs:

- headline or primary claim,
- all metrics and source-sensitive numbers,
- named companies, products, channels, people, or cases,
- proof images, screenshots, logos, charts, and thumbnails,
- captions, source notes, caveats, and footnotes,
- page navigation meaning such as chapter, sequence, or section divider role.

These inputs may be rearranged, grouped, compressed, or visually rebalanced, but they should not disappear without an explicit replacement or a documented reason.

### Allowed Transformations

- combine repeated copy into a shorter sentence when the meaning is preserved,
- move secondary proof into cards, captions, or appendix-style treatment,
- crop images only when the proof target remains visible,
- replace fragile external logo assets with logo tile plus text fallback,
- split overloaded content across pages when a single template cannot carry it cleanly.

### Not Allowed

- do not delete evidence assets just because the new layout is crowded,
- do not convert image evidence into pure text unless the page purpose has changed,
- do not remove named examples while keeping only generic summaries,
- do not hide overflow to make a page appear solved,
- do not simplify a page so far that its original proof standard is weakened,
- do not push meaningful content into the safe padding zone to force fit.

### Decision Order For Dense Pages

When content does not fit, resolve it in this order:

1. tighten spacing within approved density rules,
2. reduce duplicate wording while preserving meaning,
3. change to a better-fit template,
4. move secondary details into captions or compact cards,
5. split the page,
6. only remove content if it is truly redundant and the removal is recorded.

## Current Template Set

- `T01 Cover Page`
- `T02 Section Divider`
- `T03 Core Insight`
- `T04 Two-Column Proof`
- `T05 Three-Pillar / Three-Card`
- `T06 Case Study`
- `T07 Comparison`
- `T08 Timeline / Roadmap`
- `T09 Budget / Resource Allocation`
- `T10 Closing Page`

This `v0.3` document defines the full baseline template set used by the current Fortnite China deck migration and the broader reusable deck system.

## Visual Mode Mapping

Every page must choose a visual mode in addition to its template.

Standard modes:

- `mode-cinematic-dark`
- `mode-analytical-dark`
- `mode-brand-orange`
- `mode-platform-teal`

Template and mode are separate decisions:

- template answers `what argument is this page making`,
- mode answers `what visual family should this page belong to`.

### Recommended Defaults

| Template | Most Common Modes | Notes |
| --- | --- | --- |
| `T01 Cover Page` | `mode-cinematic-dark`, `mode-brand-orange` | cover and final pitch framing |
| `T02 Section Divider` | `mode-cinematic-dark`, `mode-brand-orange` | chapter atmosphere and reset |
| `T03 Core Insight` | `mode-brand-orange`, `mode-analytical-dark` | anchor or strategy message |
| `T04 Two-Column Proof` | `mode-analytical-dark`, `mode-platform-teal` | evidence-led argument page |
| `T05 Three-Pillar / Three-Card` | `mode-analytical-dark`, `mode-brand-orange` | parallel framework or validation |
| `T06 Case Study` | `mode-analytical-dark`, `mode-platform-teal` | one named example with implication |
| `T07 Comparison` | `mode-analytical-dark`, `mode-brand-orange` | contrast and strategic change |
| `T08 Timeline / Roadmap` | `mode-analytical-dark`, `mode-platform-teal` | sequence and planning |
| `T09 Budget / Resource Allocation` | `mode-analytical-dark` | clarity-first dense page |
| `T10 Closing Page` | `mode-cinematic-dark`, `mode-brand-orange` | memorable final line |

## Shared Type Mapping

All templates should map content into the semantic type system defined in [`09-typography-system.md`](09-typography-system.md).

For the quick-reference size table and template combination matrix, see [`09-typography-system.md`](09-typography-system.md).

### Standard Roles

- page title -> `title-page`
- module title -> `title-block`
- main memory line -> `takeaway`
- lead explanation -> `body-lg`
- standard support copy -> `body`
- dense support copy -> `body-sm`
- image caption -> `caption`
- eyebrow / compact label -> `label`
- page number / source note -> `meta`
- key metric -> `stat-value`
- metric label -> `stat-label`

### Density Modes

- `T01`, `T02`, `T10` default to `density-hero`
- `T03`, `T04`, `T05`, `T06`, `T07` default to `density-standard`
- `T08`, `T09` usually use `density-dense`

Templates should use their density mode before introducing any typography exceptions.

All density modes still obey the same fixed-canvas contract.

- `density-hero` may use decorative full-stage bleed,
- `density-standard` and `density-dense` should keep meaningful content inside the safe box,
- no density mode should depend on scrolling or viewport-shaped reflow to solve fit.

### Size Variation Limits

- hero templates should use no more than `4` distinct physical font sizes
- standard templates should use no more than `5` distinct physical font sizes
- dense templates should use no more than `4` distinct physical font sizes

Use weight, spacing, and color before introducing extra size variation.

---

## T03 Core Insight

### Purpose

Used to deliver a high-importance strategic judgment, market conclusion, or core claim.

### When To Use

- strategic positioning,
- market timing conclusion,
- chapter-level argument,
- top-line proposal message.

### Page Goal

A reader should understand and remember the core judgment within five seconds.

### Standard Structure

- page title,
- one-sentence takeaway,
- two to three supporting points,
- optional emphasis number or hero phrase.

### Content Limits

- title: one to two lines,
- takeaway: one sentence,
- supporting points: maximum three,
- each supporting point: maximum two short lines.

### Required Inputs

- page title,
- one-sentence takeaway,
- two to three supporting points,
- optional proof number or keyword.

### Recommended Components

- title block,
- takeaway highlight,
- short bullet group,
- hero stat.

### Do Not

- do not turn this page into a long analytical essay,
- do not place multiple unrelated conclusions on the same page,
- do not add tables or dense chart clusters,
- do not add decorative visuals that do not strengthen the main claim.

### Related Templates

- use `T04 Two-Column Proof` if the page needs more explicit evidence,
- use `T05 Three-Pillar / Three-Card` if the message depends on three parallel sub-points.

---

## T04 Two-Column Proof

### Purpose

Used to place a conclusion alongside the strongest proof that supports it.

### When To Use

- left argument, right evidence,
- left text, right visual,
- left issue, right solution path,
- left takeaway, right case or data proof.

### Page Goal

The reader should not only accept the page conclusion, but also understand why it is credible.

### Standard Structure

Pattern A:

- left column: title, takeaway, short explanation,
- right column: chart, case image, proof block, or data card.

Pattern B:

- left column: key image or asset,
- right column: takeaway and supporting evidence.

### Content Limits

- left column body: about 80 to 100 Chinese characters maximum,
- right column: one main evidence area plus up to two supporting proof points,
- the whole page must maintain one narrative direction.

### Required Inputs

- page title,
- one-sentence takeaway,
- evidence summary,
- key numbers or image,
- source for data or asset.

### Recommended Components

- split layout,
- figure with caption,
- evidence card,
- stat block,
- source note.

### Do Not

- do not let each column tell a different story,
- do not place multiple unrelated charts on the same page,
- do not use a strong image without a clear conclusion,
- do not stack bullets, tables, charts, and screenshots all together.

### Related Templates

- use `T06 Case Study` if the proof centers on one named example,
- use `T07 Comparison` if the main logic depends on contrast.

---

## T05 Three-Pillar / Three-Card

### Purpose

Used to present three parallel capabilities, drivers, pillars, or opportunity areas.

### When To Use

- three advantages,
- three strategic pillars,
- three validation points,
- three growth engines.

### Page Goal

The reader should understand the structure at a glance and see that the three parts belong to one coherent framework.

### Standard Structure

- page title,
- one summary sentence,
- three side-by-side cards,
- each card contains a name, short explanation, and one supporting fact.

### Content Limits

- fixed to three cards,
- each card body: about 40 to 60 Chinese characters maximum,
- each card: one supporting fact or example,
- avoid additional long-form explanation under the cards.

### Required Inputs

- page title,
- one summary sentence,
- three pillar names,
- one short explanation for each pillar,
- one supporting fact or example for each pillar.

### Recommended Components

- three-card grid,
- number marker or icon,
- short stat,
- color tag.

### Do Not

- do not stretch this template into four or five cards,
- do not write mini essays inside each card,
- do not make one card visually dominant without a deliberate reason,
- do not mix parallel structure with a hidden hierarchy.

### Related Templates

- use `T03 Core Insight` if the page really has one dominant conclusion,
- use `T08 Timeline / Roadmap` if the three parts are sequential rather than parallel.

---

## T06 Case Study

### Purpose

Used to demonstrate one concrete example and extract a usable implication for the current deck.

### When To Use

- product success case,
- marketing campaign case,
- channel or ecosystem case,
- competitor reference case,
- proof of operating capability.

### Page Goal

The reader should understand not only what happened in the case, but why it matters for the present proposal.

### Standard Structure

- page title,
- case name and short background,
- one to three key result numbers,
- case breakdown: what happened and why it worked,
- implication: what this means for the current project.

### Content Limits

- case background: about 50 Chinese characters maximum,
- key result numbers: one to three,
- case breakdown: maximum three points,
- implication: one lead sentence plus one to two supporting points.

### Required Inputs

- page title,
- case name,
- short case background,
- result numbers,
- image or screenshot,
- implication for the current deck.

### Recommended Components

- case intro block,
- result stat,
- annotated image,
- implication panel,
- brand or platform tag.

### Do Not

- do not make this a pure image gallery,
- do not describe the case without extracting a takeaway,
- do not place multiple major cases on one page,
- do not omit the link between the case and the current proposal.

### Related Templates

- use `T03 Core Insight` if the case is only supporting a simple top-line message,
- use `T07 Comparison` if the case depends on before-and-after contrast.

---

## T01 Cover Page

### Purpose

Used to establish deck identity, audience, tone, and importance.

### When To Use

- proposal opening,
- executive deck opening,
- partnership pitch opening.

### Page Goal

The viewer should immediately understand what the deck is, who it is for, and that it carries high strategic weight.

### Standard Structure

- title,
- optional partner or audience line,
- optional date or version,
- optional confidentiality marker,
- strong hero treatment or atmosphere layer.

### Content Limits

- title: up to two lines,
- metadata: up to two short items,
- subtitle or partner line: short only.

### Required Inputs

- deck title,
- audience or partner label,
- date or version,
- optional confidentiality label.

### Recommended Components

- hero title,
- partner label,
- metadata line.

### Do Not

- do not add long explanatory copy,
- do not overload with many logos,
- do not turn the cover into a summary slide.

### Related Templates

- use `T02 Section Divider` for chapter breaks,
- use `T10 Closing Page` for the final emotional landing.

---

## T02 Section Divider

### Purpose

Used to reset pacing and signal the start of a new section.

### When To Use

- chapter transitions,
- major narrative shifts,
- movement from proof into plan or from plan into ask.

### Page Goal

The viewer should feel a clear transition without needing detailed explanation.

### Standard Structure

- section title,
- optional minimal line or graphic accent,
- page number if deck navigation requires it.

### Content Limits

- one short section title,
- no body copy by default.

### Required Inputs

- section title,
- optional section label or chapter number.

### Recommended Components

- hero heading,
- divider rule,
- minimal navigation cue.

### Do Not

- do not add argument bullets,
- do not place dense proof on a divider page,
- do not make it visually louder than the cover unless intentional.

### Related Templates

- use `T01 Cover Page` for deck opening,
- use `T03 Core Insight` for the first substantive page after the divider.

---

## T07 Comparison

### Purpose

Used to show contrast between two states, moments, or strategic choices.

### When To Use

- before vs. after,
- old market vs. current market,
- global vs. China,
- red ocean vs. new category.

### Page Goal

The reader should understand not just that two things differ, but why the contrast changes the strategic conclusion.

### Standard Structure

- page title,
- two parallel columns or panels,
- one contrast axis,
- optional bridge arrow or contrast label.

### Content Limits

- keep both sides structurally comparable,
- one contrast dimension per page,
- avoid more than one main visual cluster per side.

### Required Inputs

- comparison title,
- label for side A,
- label for side B,
- one to three proof points per side,
- visual or metric support.

### Recommended Components

- comparison pair,
- figure with caption,
- bridge arrow,
- contrast takeaway.

### Do Not

- do not compare more than two major states at once,
- do not let one side become a full essay,
- do not mix unrelated comparison dimensions.

### Related Templates

- use `T04 Two-Column Proof` if one side is clearly the argument and the other is proof,
- use `T06 Case Study` if the comparison is really centered on one example.

---

## T08 Timeline / Roadmap

### Purpose

Used to show sequence, pacing, or lifecycle planning.

### When To Use

- go-to-market planning,
- lifecycle media planning,
- roadmap phases,
- rollout stages.

### Page Goal

The viewer should understand what happens when, why each stage exists, and how the phases connect into one plan.

### Standard Structure

- page title,
- optional one-sentence planning thesis,
- ordered timeline or roadmap steps,
- optional footnote or spend logic.

### Content Limits

- keep phase count manageable,
- each phase should have one clear role,
- avoid mixing milestones and categories in the same sequence.

### Required Inputs

- page title,
- ordered phase names,
- one short objective per phase,
- optional trigger, timing, or spend note.

### Recommended Components

- timeline step,
- track line,
- phase label,
- footer takeaway.

### Do Not

- do not present unordered bullets as a roadmap,
- do not overload every phase with too much copy,
- do not hide the sequence logic.

### Related Templates

- use `T09 Budget / Resource Allocation` if the main focus is spend mix,
- use `T04 Two-Column Proof` if the page is really a process explanation with one visual.

---

## T09 Budget / Resource Allocation

### Purpose

Used to show how money, resources, or effort are distributed across strategic buckets.

### When To Use

- annual marketing budget,
- team allocation,
- strategic investment split,
- resource commitment page.

### Page Goal

The viewer should understand the total investment level, the split logic, and why the allocation supports the strategy.

### Standard Structure

- page title,
- one-sentence allocation thesis,
- total figure,
- visual split or allocation module,
- labeled bucket explanations.

### Content Limits

- one total figure,
- a manageable number of buckets,
- each bucket explanation should stay concise and decision-oriented.

### Required Inputs

- total amount,
- bucket labels,
- percentage or absolute allocation,
- one-line rationale per bucket,
- source status if the numbers are provisional.

### Recommended Components

- budget chart,
- stat block,
- legend card,
- allocation takeaway.

### Do Not

- do not show a split without explaining what each bucket funds,
- do not mix unrelated financial scopes on one page,
- do not use decorative charts that reduce legibility.

### Related Templates

- use `T08 Timeline / Roadmap` if the focus is sequence of spend,
- use `T05 Three-Pillar / Three-Card` if the focus is strategic pillars rather than resource distribution.

---

## T10 Closing Page

### Purpose

Used to end the deck with a clear emotional or strategic invitation.

### When To Use

- final page,
- call-to-action page,
- partnership close.

### Page Goal

The viewer should leave with one final, memorable line that reinforces the desired decision.

### Standard Structure

- one closing statement,
- optional subtle background treatment,
- optional page number or minimal metadata.

### Content Limits

- one main sentence or phrase,
- no dense supporting copy.

### Required Inputs

- closing line,
- optional tone direction,
- optional audience reference.

### Recommended Components

- closing headline,
- hero backdrop,
- minimal footer metadata.

### Do Not

- do not re-summarize the whole deck,
- do not add multiple asks on the final page,
- do not crowd the closing with charts or dense proof.

### Related Templates

- use `T01 Cover Page` as the opening complement,
- use `T02 Section Divider` if the page is transitional rather than final.

---

## Template Selection Guide

- Use `T03` when the page must land one judgment clearly.
- Use `T04` when the page must connect judgment with proof.
- Use `T05` when the page is built around three parallel drivers.
- Use `T06` when one example needs to prove a broader point.

## Content Budget Guardrails

Templates have content budgets, not just visual skeletons.

### Universal Fit Rules

- meaningful content must stay inside the safe box,
- title and takeaway must stay within documented line budgets,
- proof must remain readable at presentation size,
- the page may not rely on hidden overflow,
- if a page only fits after global shrinkage, the page is not solved.

- `T04 Two-Column Proof` should have one main visual proof area. A second visual should be a small support card, not another full proof image.
- `T04` should not carry a logo wall with many brands unless it is explicitly documented as a dense channel-wall exception.
- `T05 Three-Pillar / Three-Card` should keep the three cards structurally parallel. If one card needs a radically different amount of proof, change the recipe or split the page.
- `T06 Case Study` should have one clear hero proof area. If a supporting gallery becomes equally dominant, move to a gallery-based recipe.
- Pages that combine market size, hero proof, and three case studies should be split or reduce one layer to compact proof chips.
- `T07 Comparison` should have one comparison axis only. If the page is also trying to behave like a gallery or channel wall, it needs a recipe or a split.
- Section dividers should include a clear anchor or section map when the page is otherwise visually empty.

If a page only fits after shrinking everything, the selected template is probably wrong.

## Exception Rule

Create a new template only if all three conditions are true:

- an existing template cannot carry the message cleanly,
- the new pattern is likely to be reused,
- the new pattern will be documented in this file before broad use.

If the page still belongs to an existing template family but needs a repeatable internal composition pattern, document that pattern in [`04-page-recipes.md`](04-page-recipes.md) instead of creating a new template.

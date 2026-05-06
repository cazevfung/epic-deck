# 09 Typography System

## Purpose

This document turns typography into an executable production system.

It exists to solve two problems at once:

- preserve the original deck's expressive headline behavior,
- prevent dense slides from collapsing into unreadable or over-shrunk layouts.

## Core Rule

Typography is assigned by `content role` and constrained by `fit budget`.

Never assign type by personal preference or emergency shrinkage.

## Model

The type system has five layers:

1. `Primitive size tokens`
2. `Expressive extension tokens`
3. `Semantic type roles`
4. `Density modes`
5. `Fit-response rules`

## 1. Primitive Size Tokens

Primitive tokens remain the system foundation.

They should be used in shared CSS only, not directly in page markup.

The system now supports two ranges:

- `core range` for most pages,
- `expressive range` for covers, dividers, anchors, and selected hero pages.

## 2. Expressive Extension Tokens

The original Fortnite deck uses several headline scales beyond a standard title ladder.

Those roles are now first-class system behavior, not exceptions.

Examples:

- `display-cover`
- `display-anchor`
- `display-impact`
- `stat-hero`

These should appear only when the page job justifies them.

## 3. Semantic Type Roles

Templates and components should consume semantic roles, not raw token names.

### Hero Roles

- `display-cover`
  Use for cover and final close only.

- `display-anchor`
  Use for major chapter anchors, section hero pages, and high-impact thesis pages.

- `display-section`
  Use for section dividers and large transitions.

### Page-Title Roles

- `title-hero`
  Use when a content page needs a highly expressive main title but does not qualify for full hero display.

- `title-page`
  Default page title for most content slides.

- `title-block`
  Secondary module title, panel title, or card title.

### Message Roles

- `takeaway-hero`
  Use for an oversized memory line inside an anchor or strategy page.

- `takeaway`
  Default one-sentence page memory line.

- `body-lg`
  Lead explanation line or short interpretive paragraph.

- `body`
  Standard page explanation.

- `body-sm`
  Dense support copy, captions inside structured proof, and operational detail.

### Utility Roles

- `label`
  Eyebrows, compact headers, category labels.

- `caption`
  Image interpretation lines and secondary explanation attached to proof.

- `meta`
  Page number, source note, low-emphasis production metadata.

### Data Roles

- `stat-hero`
  Very large page-driving metric.

- `stat-value`
  Main metric on normal pages.

- `stat-label`
  Label paired with a stat.

## 4. Density Modes

Density mode changes how the system behaves without changing the meaning of content roles.

### `density-hero`

Use for:

- cover pages,
- section dividers,
- major anchor pages.

Behavior:

- expressive type roles allowed,
- fewer active role families,
- larger gaps between hierarchy levels.

### `density-standard`

Use for:

- strategy pages,
- proof pages,
- case pages,
- comparison pages.

Behavior:

- default title stack,
- stable body measure,
- one dominant title and one dominant proof axis.

### `density-dense`

Use for:

- channel walls,
- timelines,
- operational readiness,
- budget pages,
- high-evidence grids.

Behavior:

- support roles compress first,
- title and takeaway remain protected,
- spacing and measure tighten before size does.

## 5. Fit-Response Rules

Fit problems must be solved in order.

### Step Order

1. shorten the title or takeaway,
2. reduce duplicate support copy,
3. tighten measure or spacing,
4. switch to `density-dense` if the page family allows it,
5. split the page.

### Never Do This

- do not invent a one-off font size for one slide,
- do not shrink a page title below its semantic role,
- do not demote hero or takeaway copy into body sizes to rescue layout,
- do not hide overflow and call the page solved.

## Practical Size Table

Use this as the working quick-reference table.

| Level | Token | Main Use | Typical Semantic Roles |
| --- | --- | --- | --- |
| `01` | `--font-size-01` | very small metadata | `meta`, compact `label` |
| `02` | `--font-size-02` | support metadata | `label`, `caption`, `stat-label` |
| `03` | `--font-size-03` | dense body | `body-sm` |
| `04` | `--font-size-04` | standard body | `body` |
| `05` | `--font-size-05` | lead sentence | `body-lg`, `takeaway` on dense pages |
| `06` | `--font-size-06` | emphasized memory line | `takeaway`, `title-block` on large cards |
| `07` | `--font-size-07` | block title | `title-block` |
| `08` | `--font-size-08` | main page title | `title-page`, `stat-value` |
| `09` | `--font-size-09` | expressive page title | `title-hero` |
| `10` | `--font-size-10` | section display | `display-section` |
| `11` | `--font-size-11` | anchor display | `display-anchor`, `stat-hero` |
| `12` | `--font-size-12` | cover display | `display-cover` |

## Shared Role Mapping

- `display-cover` -> `--font-size-12`
- `display-anchor` -> `--font-size-11`
- `display-section` -> `--font-size-10`
- `title-hero` -> `--font-size-09`
- `title-page` -> `--font-size-08`
- `title-block` -> `--font-size-07`
- `takeaway-hero` -> `--font-size-06`
- `takeaway` -> `--font-size-06`
- `body-lg` -> `--font-size-05`
- `body` -> `--font-size-04`
- `body-sm` -> `--font-size-03`
- `caption` -> `--font-size-02`
- `label` -> `--font-size-02`
- `meta` -> `--font-size-01`
- `stat-hero` -> `--font-size-11`
- `stat-value` -> `--font-size-08`
- `stat-label` -> `--font-size-02`

## Line And Measure Rules

These are hard production rules, not suggestions.

### Hero Pages

- hero title: maximum `2` lines
- anchor takeaway: maximum `3` lines
- active size count: maximum `4`

### Standard Pages

- page title: maximum `2` lines
- takeaway: maximum `3` lines
- support bullets: maximum `3`
- each bullet: maximum `2` short lines

### Dense Pages

- page title: maximum `2` lines
- dense body group: maximum `4` short bullets per module
- caption: maximum `2` lines
- page should compress through spacing and grouping before title shrinkage

## Chinese-English Mixing Rules

- English hero words may act as graphic anchors.
- Chinese body text should remain slightly tighter and calmer.
- Do not let long English strings blow up card width or safe-box fit.
- Use semantic roles and text-measure utilities rather than ad hoc line-height changes.

## Template Guidance

- `T01`, `T02`, `T10` may use `display-cover`, `display-anchor`, and `display-section`.
- `T03` may use `title-hero` or `takeaway-hero` when acting as an anchor page.
- `T04`, `T06`, and `T07` should usually stay between `title-page` and `body-sm`, with rare `title-hero` exceptions.
- `T08` and `T09` should protect `title-page` and compress only support roles.

## Prohibited Practices

- do not use raw pixel font sizes directly in page markup,
- do not add per-slide type variables without formalizing them,
- do not let one page use six unrelated size jumps,
- do not solve overflow by shrinking every text role at once,
- do not line-clamp meaningful claims unless the brief explicitly permits it.

## Implementation Notes

The active implementation lives in:

- [`../styles/tokens.css`](../styles/tokens.css)
- [`../styles/base.css`](../styles/base.css)

Template mappings and fit budgets should stay aligned with:

- [`03-page-templates.md`](03-page-templates.md)
- [`11-quality-checklist.md`](11-quality-checklist.md)

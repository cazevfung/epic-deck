# 04 Page Recipes

## Purpose

This document defines recurring page patterns that sit below the main template families.

Templates answer:

- what kind of argument the page is making.

Recipes answer:

- how that argument is physically composed when the pattern repeats often enough to deserve a named implementation.

## Why Recipes Exist

Not every recurring page should become a new template.

Many pages still belong to an existing family such as:

- `T04 Two-Column Proof`,
- `T06 Case Study`,
- `T07 Comparison`,
- `T08 Timeline / Roadmap`.

But they may still need a more specific internal pattern to stay coherent across multiple decks and contributors.

Recipes reduce repeated one-off page logic without exploding the template count.

## Relationship To Templates

Use the template family first.

Then choose a recipe only when the page needs a repeated composition pattern inside that family.

Examples:

- `T07` may use `comparison-split`.
- `T04` may use `visual-stack`.
- `T06` may use `case-study-gallery`.
- dense exception pages may use `logo-wall` or `operations-grid`.

If a page can use the base template cleanly, do not force a recipe.

## When To Create A Recipe

Create or formalize a recipe only when all three conditions are true:

- the pattern recurs,
- the pattern has meaningful structural behavior beyond a generic grid,
- naming the pattern will reduce future custom work.

## Current Recipe Set

- `comparison-split`
- `market-shift-board`
- `validation-triptych`
- `visual-stack`
- `creator-ecosystem-split`
- `case-study-gallery`
- `launch-spectacle-proof`
- `channel-wall`
- `timeline-track`
- `operations-grid`

---

## `comparison-split`

### Base Family

Usually `T07 Comparison`.

### Purpose

Used when a page must show one strategic contrast with a clear left-to-right or old-to-new transition.

### When To Use

- old market vs. current market,
- before vs. after,
- local vs. global frame,
- legacy approach vs. new opportunity.

### Page Goal

The viewer should understand what changed and why that change alters the strategic conclusion.

### Structural Pattern

- standard comparison header,
- left comparison panel,
- center bridge or arrow zone,
- right comparison panel,
- each side carries one dominant proof cluster.

### Content Budget

- one contrast axis only,
- one lead statement per side,
- up to three proof points per side,
- one dominant visual cluster per side,
- center bridge should clarify transition, not become a third content area.

### Required Inputs

- side A label,
- side B label,
- transition logic,
- proof support for both sides,
- final contrast takeaway.

### Fit Rules

- both sides should feel structurally comparable,
- the page should not turn into one large side and one small side unless asymmetry is deliberate,
- the contrast should be legible without reading every body line.

### Do Not

- do not compare multiple dimensions at once,
- do not let the center bridge become a dense text column,
- do not use unrelated image treatments on each side unless the contrast itself requires that.

### Current Example Candidates

- Fortnite China slide 2.

### Alias Note

Use `market-shift-board` when the comparison becomes a flagship visual family with stronger title treatment, image-led contrast, and transition-stage emphasis.

---

## `market-shift-board`

### Base Family

Usually `T07 Comparison`.

### Purpose

Used when a comparison page is not just two panels, but a major strategic turning-point page with a strong center transition and image-led proof.

### When To Use

- market timing shift,
- genre migration,
- strategic old-world vs. new-world framing,
- category redefinition.

### Page Goal

The viewer should feel both the contrast and the momentum of change.

### Structural Pattern

- large comparison headline,
- two substantial proof panels,
- explicit transition bridge,
- one short strategic implication block.

### Content Budget

- one comparison axis only,
- one dominant proof area per side,
- bridge zone must stay lightweight,
- implication block should not become a third essay.

### Current Example Candidates

- Fortnite China slide 2 in the original deck.

---

## `validation-triptych`

### Base Family

Usually `T05 Three-Pillar / Three-Card`.

### Purpose

Used when three parallel validation signals need equal structural weight, each with metrics, an image, and a short conclusion.

### When To Use

- three market validations,
- three capability proofs,
- three comparable benchmarks,
- three category signals.

### Page Goal

The page should read as one structured proof system, not as three unrelated mini pages.

### Structural Pattern

- page title and summary,
- three parallel validation cards,
- each card contains a title, short stat group, one proof image, and one concluding line.

### Content Budget

- exactly three cards,
- each card gets one visual,
- each card gets one short conclusion,
- card body should stay compact enough that the cards remain visually equal.

### Current Example Candidates

- Fortnite China slide 3 in the original deck.

---

## `visual-stack`

### Base Family

Usually `T04 Two-Column Proof`.

### Purpose

Used when one text column is paired with a media column containing one large hero visual and one supporting image row.

### When To Use

- creator ecosystem explanation,
- launch strategy with one main proof visual and two support visuals,
- product or ecosystem explanation where the visual side needs controlled stacking.

### Page Goal

The viewer should understand the argument from the left column and see one clear visual hierarchy on the right.

### Structural Pattern

- left copy column with takeaway and support bullets,
- right visual column,
- top hero media slot,
- bottom supporting media row of two smaller slots.

### Content Budget

- one main takeaway,
- up to two support sections in the copy column,
- one hero visual,
- up to two support visuals,
- captions only where needed to preserve proof meaning.

### Required Inputs

- one main claim,
- one primary visual proof,
- up to two supporting visuals,
- short captions if the visual proof needs framing.

### Fit Rules

- the top hero visual must clearly dominate the bottom row,
- support visuals should feel related rather than decorative,
- text should not continue downward so far that it breaks the visual stack rhythm.

### Do Not

- do not treat the right column as a random image dump,
- do not let the two support visuals compete with the hero slot,
- do not overload the left column with essay-length bullets.

### Current Example Candidates

- Fortnite China slides 13 and 14.

---

## `creator-ecosystem-split`

### Base Family

Usually `T04 Two-Column Proof`.

### Purpose

Used when one column explains ecosystem logic and the other column proves it through one hero visual plus structured support media.

### When To Use

- creator economy explanation,
- UGC ecosystem page,
- platform enablement proof,
- community-plus-tooling page.

### Page Goal

The viewer should understand the system on the left and see tangible creator or platform proof on the right.

### Structural Pattern

- left text hierarchy,
- right hero visual,
- right support row or compact proof chips,
- captions that clarify platform function.

### Content Budget

- one main claim,
- up to two support sections on the text side,
- one hero proof visual,
- up to two support visuals or support cards.

### Current Example Candidates

- Fortnite China slides 13 and 14 in the original deck.

---

## `case-study-gallery`

### Base Family

Usually `T06 Case Study`.

### Purpose

Used when one named case needs to prove a broader point and also requires a controlled gallery of supporting evidence.

### When To Use

- one case with a hero visual plus collaboration gallery,
- one operating example with a top showcase row and supporting matrix,
- one benchmark product with a compact evidence bank.

### Page Goal

The viewer should understand the case first, then scan secondary evidence without losing the case logic.

### Structural Pattern

- case header and implication zone,
- one dominant case visual or stat anchor,
- secondary gallery or matrix,
- compact labels that keep the gallery interpretable.

### Content Budget

- one lead case only,
- one dominant case explanation,
- one hero proof area,
- one secondary gallery zone,
- gallery items should be brief and scannable.

### Required Inputs

- case name,
- case implication,
- key result numbers,
- one hero proof asset,
- gallery items or collaboration evidence.

### Fit Rules

- the viewer should know which example is the main case within two seconds,
- gallery density should not overpower the case takeaway,
- repeated thumbs must remain identifiable at presentation size.

### Do Not

- do not promote every gallery item to equal narrative importance,
- do not turn the case page into a pure collage,
- do not omit the implication for the current proposal.

### Current Example Candidates

- Fortnite China slides 5 and 7.

---

## `channel-wall`

### Base Family

Dense exception page, often adjacent to `T04` proof logic but treated as its own recipe.

### Purpose

Used when the page needs to prove breadth of channel, partner, or ecosystem coverage through grouped brand presence.

### When To Use

- media channel coverage,
- partner ecosystem coverage,
- distributor or platform network proof,
- grouped market access evidence.

### Page Goal

The viewer should understand both the organizing logic of the categories and the breadth of coverage without needing to decode an arbitrary cloud of logos.

### Structural Pattern

- KPI or thesis anchor near the top,
- grouped category sections,
- flexible logo tiles inside each category,
- text fallback where logo quality is inconsistent.

### Content Budget

- one thesis line,
- up to three KPI anchors,
- grouped categories instead of one giant undifferentiated wall,
- logo count may be high, but category count should stay manageable.

### Required Inputs

- category structure,
- logo list,
- text fallback names,
- proof of why these logos matter.

### Fit Rules

- logos must remain identifiable,
- category groupings must be obvious,
- the page should feel ordered rather than like a sticker sheet,
- text fallback should be available for weak or missing assets.

### Do Not

- do not force fixed-width columns on unpredictable logo shapes,
- do not rely on logos alone without category labels,
- do not let logo density erase the page thesis.

### Current Example Candidates

- Fortnite China slide 16.

### Alias Note

This replaces the older `logo-wall` label. The new name makes it clear that the page proves an organized coverage system, not just a pile of marks.

---

## `timeline-track`

### Base Family

Usually `T08 Timeline / Roadmap`.

### Purpose

Used when phases, milestones, or spend logic must be read as one continuous sequence across a controlled track.

### When To Use

- lifecycle media plans,
- roadmap phases,
- release sequence pages,
- phased operating logic.

### Page Goal

The viewer should grasp the sequence, stage roles, and rhythm of the plan at a glance.

### Structural Pattern

- header and optional planning thesis,
- one horizontal track,
- alternating or tiered phase cards,
- phase-to-phase rhythm with controlled spacing.

### Content Budget

- manageable phase count,
- one role per phase,
- brief phase copy,
- optional footer takeaway explaining budget or pacing logic.

### Required Inputs

- ordered phases,
- one short role per phase,
- sequencing logic,
- optional timing or spend note.

### Fit Rules

- the track must read in one direction,
- empty cells or spacing devices are allowed when they clarify rhythm,
- top and bottom phase blocks should feel intentionally balanced.

### Do Not

- do not turn the track into a paragraph timeline,
- do not mix unrelated categories and milestones in the same row,
- do not let decorative connectors overpower the phase logic.

### Current Example Candidates

- Fortnite China slide 17.

---

## `operations-grid`

### Base Family

Dense exception page, often adjacent to `T04` proof logic but treated as its own recipe.

### Purpose

Used when the page must communicate multiple operational readiness modules with parallel weight.

### When To Use

- compliance readiness,
- operating prerequisites,
- policy and infrastructure checklists,
- multi-part enablement frameworks.

### Page Goal

The viewer should see a complete readiness system rather than one dominant proof object.

### Structural Pattern

- page title and operational frame,
- parallel module cards,
- each card has a stable internal order,
- card set reads as one grid, not unrelated boxes.

### Content Budget

- fixed card count where possible,
- one title per card,
- two to four short bullets per card,
- one card pattern across the whole page.

### Required Inputs

- named readiness modules,
- short requirement lists,
- optional ownership or system references.

### Fit Rules

- every card should use the same visual grammar,
- bullet density should stay controlled,
- no single card should become a mini page of its own.

### Do Not

- do not mix one giant card with many small cards unless that hierarchy is explicit,
- do not solve overflow with extreme font shrinkage,
- do not let the grid spacing become the only organizing logic.

### Current Example Candidates

- Fortnite China slide 18.

---

## `launch-spectacle-proof`

### Base Family

Usually `T04 Two-Column Proof` or `T06 Case Study`.

### Purpose

Used when a launch or announcement page needs to retain a campaign-scale hero visual while still functioning as proof.

### When To Use

- announcement event proof,
- launch staging,
- hero partnership showcase,
- tentpole campaign evidence.

### Page Goal

The viewer should feel the scale of the moment and still understand why the moment matters strategically.

### Structural Pattern

- hero media board,
- short proof caption or takeaway,
- optional secondary support proof beneath or beside the hero frame,
- minimal but strong text hierarchy.

### Content Budget

- one hero media field,
- one short proof caption,
- up to one support row or one implication module,
- no dense essay copy.

### Current Example Candidates

- Fortnite China slide 26 in the PPT-derived material.

---

## Promotion Rule

A recipe should be promoted from candidate to standard when:

- it has been used successfully in at least two real pages,
- its structure is stable enough to describe clearly,
- it reduces future one-off layout work,
- it can be reviewed with objective fit checks.

## Review Standard

A recipe is healthy if:

- contributors can recognize when to use it,
- editors can assemble it without inventing new page logic,
- reviewers can tell when a page has drifted from the recipe,
- the recipe still leaves enough flexibility for content-specific proof.

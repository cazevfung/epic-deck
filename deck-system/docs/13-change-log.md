# 13 Change Log

## v0.4 - 2026-05-06

- Reframed the deck system around the original Fortnite China deck as a visual canon, not only a content source.
- Rewrote the visual, typography, image, and quality docs so the system preserves page-family identity instead of drifting toward generic template design.
- Added explicit art-direction modes: `mode-cinematic-dark`, `mode-analytical-dark`, `mode-brand-orange`, and `mode-platform-teal`.
- Expanded recipe language to better match the original deck's recurring page families such as `market-shift-board`, `validation-triptych`, `creator-ecosystem-split`, `channel-wall`, and `launch-spectacle-proof`.
- Strengthened workflow and QA rules around content budgets, overflow response order, safe-box discipline, screenshot review, and no-hidden-overflow enforcement.
- Expanded the typography model to support expressive hero and anchor scales while keeping fit behavior controlled through semantic roles and density rules.
- Prepared the CSS layer for richer visual modes, stronger components, and clearer fit utilities.

## v0.3 - 2026-05-01

- Reorganized the docs into a clearer spine so `00-04` now act as the core operating set.
- Merged the old workflow and protocol layers into `01-core-workflow.md`.
- Merged the old contribution guide and slide-intake standard into `02-contribution-and-intake.md`.
- Renamed template, recipe, layout, grid, QA, reference, and change-log docs into a clearer progression.
- Updated the README, page brief template, migration map, and cross-doc links to use the new structure.

## v0.2 - 2026-05-01

- Added `06b-slide-intake-standard.md` to normalize messy multi-party source material into one system-ready page brief.
- Added `06c-page-implementation-workflow.md` to define the editorial and layout sequence between intake and final page production.
- Upgraded `intake/page-brief-template.md` so briefs capture page role, primary claim, must-keep proof, fit risks, and expected density.
- Updated `06-contribution-guide.md` to point contributors and editors to the new intake and implementation workflow documents.
- Added `05b-page-recipes.md` to define recurring composition patterns that sit below the template families.
- Added `07b-reference-library.md` to turn the current Fortnite China deck into canonical examples, recipe examples, and anti-patterns for future deck work.
- Updated `05-page-templates.md` and `README.md` so templates, recipes, workflow, and reference usage are connected as one production system.
- Added a Fortnite China `normalized-briefs/` pilot set to pressure-test the intake template and implementation workflow against real slides.
- Added `06d-deck-execution-protocol.md` as the main reusable phase-based operating doc for future deck tasks.

## v0.1 - 2026-04-30

- Created initial `deck-system/` directory.
- Added project-level README for navigation and workflow.
- Added system overview document.
- Added first version of page template definitions for `T03`, `T04`, `T05`, and `T06`.
- Added contribution guide for multi-team submission workflow.
- Added page brief and asset naming templates.
- Added CSS and TypeScript structure scaffolding.
- Added visual, layout, component, and quality checklist documents.
- Added Fortnite China deck migration map.
- Added a lightweight TypeScript validation scaffold for page briefs.
- Expanded `05-page-templates.md` to cover the full baseline template set.
- Started wave-1 HTML integration on the Fortnite China deck by wiring standard template IDs, shared template classes, and deck-system stylesheet entry points into low-risk pages.
- Added `02b-typography-system.md` to formalize semantic type roles and density modes.
- Refactored typography tokens toward a primitive-plus-semantic model while keeping legacy aliases for migration.
- Added shared typography utility classes and density behavior in `styles/base.css`.
- Added a first-pass font audit and template-level type mapping guidance.
- Reduced the primitive typography scale and explicitly consolidated multiple semantic roles onto fewer physical font sizes.
- Added a practical font-size quick-reference table and a template combination table for production use.
- Upgraded the layout system into a stronger page-geometry spec with header anchors, content start rules, text measures, vertical rhythm, and hero exceptions.
- Expanded component and contribution rules for title blocks, takeaways, text blocks, and contributor-side text/header discipline.
- Added lightweight image guidelines, baseline image tokens, and reusable image framing/cluster helpers.
- Added preservation-first migration rules: existing metrics, proof assets, named examples, logos, captions, and caveats must not be silently removed during layout cleanup.
- Added old-vs-new content inventory and verification requirements to the contribution workflow and quality checklist.
- Added typography role-lock rules so dense mode cannot automatically demote takeaways or lead statements, and support copy must remain visually lower than the page thesis.

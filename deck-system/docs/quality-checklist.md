# 11 Quality Checklist

## Purpose

Use this checklist before calling any page production-ready.

The goal is not only technical fit. The page must also preserve message clarity, proof readability, and the deck's intended design character.

## Message Check

- Does the page communicate one primary message?
- Is the main takeaway identifiable within a few seconds?
- Are support points clearly subordinate to the main message?
- Is the page trying to carry more than one page job?

## Visual Identity Check

- Does the page still feel like a bespoke game-industry pitch rather than a generic template page?
- Has the correct visual mode been chosen for the page job?
- Is the page preserving hero moments, asymmetry, or image pressure when the source page depends on them?
- Has system consistency been achieved without flattening the page family?

## Preservation Check

- Has the new page been checked against the source page?
- Are all source metrics still present or explicitly merged into equivalent copy?
- Are all source proof assets still present, replaced by equivalent proof, or documented as intentionally removed?
- Are named examples, channels, companies, products, and case labels preserved?
- Are captions, footnotes, caveats, and source-sensitive notes still visible where they affect interpretation?
- If content was removed, is the reason documented rather than implied by layout pressure?

## Template And Recipe Check

- Has the page been assigned a template ID?
- Has the page been assigned a visual mode?
- If the page does not need a recipe, has `no-recipe` been considered explicitly?
- If the page uses a recipe, does it actually behave like that recipe?
- If the page is acting like a repeated exception, has the pattern been documented instead of patched?

## Fit And Overflow Check

These are hard pass-fail checks.

- Does all meaningful content remain inside the fixed safe box?
- Has the page been checked on the fixed `1920 x 1080` stage rather than a browser-shaped viewport?
- Is any meaningful content clipped, line-clamped, or hidden?
- Is the page only fitting because content entered the safe padding zone?
- Does the bottom edge remain clear of navigation, browser chrome, and footer collisions in the production stage?
- Are titles, takeaways, bullets, captions, and proof modules still within their documented budgets?

### Required Overflow Audit

Before approval, confirm:

- title line count is within template budget,
- active bullet count is within template budget,
- proof image count is within recipe budget,
- image captions remain readable,
- no `overflow: hidden` is masking meaningful content,
- screenshot review confirms the page fits visually, not only structurally.

Also confirm:

- no extra summary strip was added only because the brief contained metadata fields,
- the image hierarchy comes from the page argument rather than from a familiar recipe shape,
- no third proof image was introduced just to complete a `one big + two small` pattern.

## Typography Check

- Is the title concise, high-signal, and within line budget?
- Are hierarchy levels visually obvious within two seconds?
- Are hero roles used only where justified?
- Are takeaways and lead statements protected from dense-mode shrinkage?
- Are support bullets visually lower than the thesis?
- Do page-specific classes map back to semantic roles instead of one-off font sizes?

## Image And Proof Check

- Does every image have a role?
- Is the proof target visible at presentation size?
- Are the chosen aspect ratios coherent with the page family?
- Are overlay captions used only where they improve clarity or fit?
- Did any proof image, logo, or thumbnail disappear during cleanup?
- Has any strong source image been flattened into decoration without justification?

## Layout Check

- Is there one clear first focal point?
- Do major blocks align cleanly?
- Is the page using the correct template and recipe for its job?
- Is the density mode appropriate?
- Does the page rhythm still feel intentional after fit compression?
- Are decorative bleeds clearly separate from meaningful content?

## Data And Source Check

- Are key numbers plausible and interpretable?
- Are source notes present where needed?
- Are provisional or reconstructed numbers clearly marked?
- Are asset owners and usage status known?

## Production Check

- Has the page brief been fully translated into the page?
- Has the brief been translated selectively rather than literally?
- Is any page-specific styling hiding a missing component or recipe rule?
- Has the page been reviewed from an actual screenshot?
- Has a quick old-vs-new content inventory been performed for migrated pages?
- Could this page be promoted into the system as a clean example?

## Escalate If

- the page still has multiple competing messages,
- the page only fits because content was shrunk indiscriminately,
- proof is present but unreadable,
- the wrong template is doing too much work,
- repeated one-off styling is appearing,
- the page looks cleaner only because original evidence was lost,
- the design feels system-consistent but no longer feels like the intended deck family.

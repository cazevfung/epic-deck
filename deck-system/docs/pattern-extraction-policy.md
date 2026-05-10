# Pattern Extraction Policy

## Purpose

This file defines what is allowed to become a reusable system pattern.

The point is to stop us from extracting weak patterns too early.

## Extract Only After Proof

A pattern should be promoted only when:

- at least one rebuilt page is already strong,
- the pattern clearly comes from `style-bible.html` or a faithful extension of it,
- the pattern is likely to repeat,
- naming it will reduce future drift.

## Do Not Extract These Too Early

- generic two-column splits,
- generic card grids,
- generic light-page shells,
- convenience wrappers created only for one page,
- local CSS patches made to solve overflow.

These usually create system drift instead of system quality.

## Good Pattern Candidates

These are better extraction targets:

- dark divider family,
- light divider family,
- logo-plus-proof intro family,
- quote or manifesto family,
- side-by-side comparison family,
- proof wall family,
- campaign showcase family,
- full-bleed hero overlay family.

These are slide families, not abstract boxes.

## Pattern Record Format

When a pattern is strong enough, document only:

1. what family it belongs to,
2. what makes it persuasive,
3. what must stay fixed,
4. what can flex,
5. what common failure to avoid.

Do not turn it into a large taxonomy unless repetition truly demands it.

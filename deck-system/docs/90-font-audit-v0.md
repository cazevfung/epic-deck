# 90 Font Audit v0

## Purpose

This audit captures why the typography system needed a stricter structure.

## Current Risk Pattern

Before `Typography System v2`, the repository relied heavily on visually named font tokens such as:

- `--fs-h1`
- `--fs-h2`
- `--fs-h3`
- `--fs-big`
- `--fs-huge`
- `--fs-cover-title`
- `--fs-cover-sub`
- `--fs-stat`
- `--fs-year`
- `--fs-arrow`

These are useful for handcrafted deck design, but they are not strict enough for multi-author production because they do not encode:

- the content role,
- the acceptable use case,
- the density condition,
- the relationship between templates.

## Standardization Risks

- The same kind of takeaway may appear in different sizes on different pages.
- Card body text can drift across templates.
- Stats may compete with page titles if the relationship is not constrained.
- Labels, captions, and metadata can collapse into one blurry low-level text style.

## Production Response

The system now moves toward:

- primitive size tokens,
- semantic type roles,
- density modes,
- template-level type mapping.

The latest consolidation pass also reduces the actual number of physical font sizes so that multiple semantic roles intentionally share a smaller set of sizes.

Target direction:

- fewer real size values,
- stable role-to-size mapping,
- less page-to-page jumping in apparent hierarchy.

## Next Audit Pass

The next audit should measure:

- which legacy visual font tokens are still in active use,
- where semantic classes are missing,
- which page-specific selectors still override typography behavior,
- whether dense pages consistently use `density-dense`.

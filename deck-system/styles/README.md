# Styles Structure

## Why Shared CSS Exists

The CSS layer is the executable version of the visual system.

Its job is not only consistency. Its job is to preserve the deck's visual identity while making that identity reusable and safer to produce.

## File Roles

### `tokens.css`

Single source of truth for:

- palette roles,
- visual-mode tokens,
- expressive and standard type scales,
- spacing,
- radii,
- fit and content-budget tokens.

### `base.css`

Global foundation:

- reset,
- stage geometry,
- semantic typography classes,
- visual-mode utilities,
- fit and line-budget helpers.

### `components.css`

Reusable building blocks:

- cards,
- tags,
- stats,
- hero media boards,
- validation cards,
- channel wall modules,
- launch proof frames.

### `templates.css`

Template and recipe layout rules:

- core page families,
- comparison boards,
- stacked proof layouts,
- validation triptychs,
- channel walls,
- launch proof pages.

### `overrides.css`

Project-specific or temporary overrides that should stay limited and traceable.

## Rule Of Use

- modify `tokens.css` first when changing system-wide behavior,
- modify `base.css` when semantic behavior or fit utilities change,
- modify `components.css` when a repeated building block changes,
- modify `templates.css` when a page family or recipe changes,
- avoid placing repeatable rules in `overrides.css`,
- never use overrides to hide unresolved overflow or missing system rules.

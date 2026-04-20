# Font Swap Guide

## Current fonts (Phase A)

| Role | Font | Weight | CSS variable |
|------|------|--------|-------------|
| Headings (h1–h6) | Montserrat | 700 | `--font-montserrat` via `--font-display` |
| Body / UI | Inter | 300, 400, 500, 600 | `--font-inter` via `--font-sans` |

Loaded via `next/font/google` in `src/app/layout.tsx`. Both font variables are applied to `<html>` so they cascade down automatically.

## Planned swap (Phase A+1 — when licensed fonts are available)

Replace Montserrat with **Gotham** or **GT America** for headings to match the full brand specification.

### Steps

1. Obtain a licensed webfont kit (WOFF2 files) from the font vendor.
2. Place the font files in `public/fonts/`.
3. In `src/app/globals.css`, replace the `--font-display` variable:

```css
@font-face {
  font-family: 'Gotham';
  src: url('/fonts/Gotham-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

/* Then in @theme: */
--font-display: 'Gotham', ui-sans-serif, system-ui, sans-serif;
```

4. Remove the `Montserrat` import from `src/app/layout.tsx` and the `--font-montserrat` variable references.
5. Delete the `var(--font-montserrat)` CSS variable from the `<html>` className.

## Notes

- The `--font-display` token in `@theme` is what all `font-display` Tailwind utilities resolve to.
- Do not hardcode font family names in component files — always go through the token.

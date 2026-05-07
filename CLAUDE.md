# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Slide deck for the R Exchange 2026 opening keynote: "Positron: Data Science Without Constraints." 20 minutes, 17 slides. Speaker is Nick Strayer, Principal Engineer at Posit.

## Source-of-truth files

| File | Role |
|---|---|
| `src/slides.ts` | All slide content, speaker notes, and structure. Edit this to change what appears on screen. |
| `src/types.ts` | TypeScript types for every slide variant (discriminated union on `variant`). |
| `src/main.ts` | Renderer, presentation controller, speaker notes popup. |
| `index.html` | CSS theme and the `<div id="slideContainer">` shell. Rarely needs editing. |

## Development

```bash
npm run dev      # Vite dev server with hot reload
npm run build    # Type-check (tsc) + production build to dist/
npm run preview  # Serve the production build locally
```

Navigate slides with arrow keys, Page Up/Down, or touch swipe.

Speaker notes: press `N` to open a separate popup window with notes for the current slide. The popup auto-updates as you navigate.

## Architecture

**Slide data:** `src/slides.ts` exports `SECTIONS`, `FOOTER`, and `SLIDES`. Each slide is a typed object with a `variant` field. The `Slide` type in `src/types.ts` is a discriminated union of 11 variants: `title`, `who`, `phrase`, `thesis`, `list`, `build`, `premise`, `show`, `comparison`, `split`, `thanks`. TypeScript catches missing fields and typos at compile time.

**Rendering:** `src/main.ts` has a `RENDERERS` object mapping each variant to a function that returns inner HTML. `buildSlides()` iterates `SLIDES`, stamps out `<section>` elements into `#slideContainer`, then `SlidePresentation` populates chrome/footer and sets up navigation.

**Slide structure:** Each rendered slide is a `<section class="slide slide-{variant}">` with `data-section` (1-4), `data-num` (01-17), and `data-notes`. Three grid rows: chrome (section number + breadcrumb), content, footer.

**Animations:** Elements with class `reveal` fade-up when their slide gets `.visible` (triggered by IntersectionObserver at >50% visibility). Cards use `reveal-card` for a larger entrance. Stagger delay is `0.1s * nth-child`.

## Key constraints

- All type sizes use `clamp()` -- never fixed px/rem for display text.
- Posit Orange (`#EE6331`) is the primary accent.
- Only Open Sans (body/display) and Source Code Pro (mono). No other typefaces.
- Icons: one per slide max, only when meaningful. Recolor via CSS mask, not SVG edits.
- Logo appears on title (slide 1) and closing (slide 17) only.
- Background gradient: `#1a1a1a` -> `#404041` -> `#1a1a1a` at 135deg.

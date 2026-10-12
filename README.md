# React + Vite

## Portfolio case studies

Project content lives in `src/data/projects.js`, with card and hero images registered
in `src/data/project-images.js`. Adding a project automatically includes it on the
work page, in case-study navigation, and in the prerendered routes and sitemap.

The IMAAVY Caregiver Resource case study uses the supplied images in
`src/assets/imaavy caregiver/`. Its header uses the same responsive thumbnail
mockup as ICOTYDE; both use a shorter 21:9 frame, with the uncropped desktop and mobile
frames centered side by side, and `heroScreens` providing full-size desktop
and mobile image links underneath. The decorative browser controls are not interactive and are hidden
from assistive technology. Both responsive phone mockups include a compact mobile
Android Chrome-style toolbar beneath the status bar, with a home icon, site
controls, the project's domain, a tab counter, and a three-dot menu across Work
cards, homepage hover previews, and case-study headers. App-only phone mockups
keep their existing appearance. Desktop browser frames also show Chrome-style
back/forward, reload, site controls, bookmark, profile, and menu icons without
changing the frame height. A `liveUrl` button beneath the header mockups opens
the live website in a new tab. The introductory paragraph has extra vertical
padding, with a compact transition from project metadata into Overview.
The remaining screens
appear in the bottom `finalImages` carousel, with each desktop followed by its
matching mobile screens, including both mobile infusion locator views.
`resourceLinks` follow the carousel, and `figmaEmbedAtEnd` places the Figma embed
at the bottom of the case study. The supplied `Typography.png` is a sitemap and
is labeled as such in the research section. The carousel presents selected
screens, not the complete website.
IMAAVY uses the same password and session unlock as the other protected projects.
This is a client-side privacy gate, not secure access control: bundled content and
images remain publicly accessible. Do not rely on it for confidential material.
Every case study enables `horizontalSections`: on desktop screens (at least
1024px wide and 640px tall) and on portrait phones/tablets at least 500px tall,
sections 01–06 are pinned and vertical scrolling
moves them horizontally with Motion (`useScroll`/`useTransform`) parallax, before
the page continues vertically to the resource links (if any) and the Figma
embed (`figmaEmbedAtEnd`). On screens under 1024px, panels use a compact
single-column layout with shrinkable media, smaller parallax offsets, and
1.75× vertical scroll per panel so a swipe does not skip sections. Short
landscape screens and reduced-motion preferences keep the normal vertical layout.
All case studies use a 24px gap after the hero metadata and a top-aligned
first parallax panel, avoiding a large empty area before Overview on desktop
and mobile. Metadata beside a cover image aligns to the bottom of its row
so Impact is not separated from Overview by the taller image's empty space.
The stacked fallback keeps the same compact gap.

A project's optional `thumbnail` field renders its Work card and case-study
header as the same device mockup (`browser`, `responsive`, `phones`, or `tablet`)
using cropped screens from `src/assets/thumbnails/`. Case-study headers span the
content width in a 16:9 frame, with project details beneath. Optional
`heroScreens` provide full-size image links below the preview. Projects without a
thumbnail keep their
regular cover image.
Gaming Gear's three-phone case-study header is centered and capped at 880px
wide to reduce thumbnail enlargement, while its Work card and homepage preview
retain their existing sizing.
Its final screenshot carousel uses all 20 individual PNG frame exports in
`src/assets/gaming_gear/`, ordered from onboarding and discovery through filters,
product details, cart, checkout, and profile. Like IMAAVY, it shows uncropped
screens with captions, swipe/arrow navigation, and a full-size lightbox before
the Figma embed.

ICOTYDE HCP also uses `liveUrl` to show the same live-website button beneath its
header, linking to `https://www.icotydehcp.com/`.

Case studies end with a prominent next-project link and a secondary back-to-work
link. Navigation stacks on mobile, supports wrapping titles and keyboard focus,
and uses high-contrast colors in both themes with reduced-motion support.
The final project retains only the back-to-work link.

Work cards use equal-height grid rows without fixed pixel heights or truncating
content, including in the mobile single-column layout. Identical 16:9 thumbnail
frames and consistent spacing anchor each card's index and year at the same
position, independent of title or summary length.

The homepage's five project links show their matching Work thumbnails only on
pointer hover, with the project title, category, year, and summary beneath the
image, Motion enter/exit animation, and positioning based on the preview's size.
Previews are decorative, do not intercept clicks, dismiss on Escape or scrolling,
and respect reduced motion. Touch and keyboard navigation keep the plain links.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

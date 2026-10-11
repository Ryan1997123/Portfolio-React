# React + Vite

## Portfolio case studies

Project content lives in `src/data/projects.js`, with card and hero images registered
in `src/data/project-images.js`. Adding a project automatically includes it on the
work page, in case-study navigation, and in the prerendered routes and sitemap.

The IMAAVY Caregiver Resource case study uses the supplied images in
`src/assets/imaavy caregiver/`. Its `heroScreens` show scaled desktop and phone
landing images side by side in browser and phone-browser mockups, with full-size
image links. The decorative browser controls are not interactive and are hidden
from assistive technology. A `liveUrl` button beneath the header mockups opens
the live website in a new tab. The remaining screens
appear in the bottom `finalImages` carousel, with each desktop followed by its
matching mobile screens, including both mobile infusion locator views.
`resourceLinks` follow the carousel, and `figmaEmbedAtEnd` places the Figma embed
at the bottom of the case study. The supplied `Typography.png` is a sitemap and
is labeled as such in the research section. The carousel presents selected
screens, not the complete website.
IMAAVY uses the same password and session unlock as the other protected projects.
This is a client-side privacy gate, not secure access control: bundled content and
images remain publicly accessible. Do not rely on it for confidential material.
Every case study enables `horizontalSections`: on screens at least
1024px wide and 640px tall, sections 01–06 are pinned and vertical scrolling
moves them horizontally with Motion (`useScroll`/`useTransform`) parallax, before
the page continues vertically to the resource links (if any) and the Figma
embed (`figmaEmbedAtEnd`). Smaller
screens and reduced-motion preferences keep the normal vertical layout.

A project's optional `thumbnail` field renders its Work card and case-study
header as the same device mockup (`browser`, `responsive`, `phones`, or `tablet`)
using cropped screens from `src/assets/thumbnails/`. Case-study headers span the
content width in a 16:9 frame, with project details beneath. An explicit
`heroScreens` gallery takes precedence, preserving IMAAVY's existing desktop and
phone header with full-size image links. Projects without either keep their
regular cover image.

Case studies end with a prominent next-project link and a secondary back-to-work
link. Navigation stacks on mobile, supports wrapping titles and keyboard focus,
and uses high-contrast colors in both themes with reduced-motion support.
The final project retains only the back-to-work link.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

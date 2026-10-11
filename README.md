# React + Vite

## Portfolio case studies

Project content lives in `src/data/projects.js`, with card and hero images registered
in `src/data/project-images.js`. Adding a project automatically includes it on the
work page, in case-study navigation, and in the prerendered routes and sitemap.

The IMAAVY Caregiver Resource case study uses the supplied images in
`src/assets/imaavy caregiver/`. Its `heroScreens` show scaled desktop and phone
landing images side by side in browser and phone-browser mockups, with full-size
image links. The decorative browser controls are not interactive and are hidden
from assistive technology. The remaining screens
appear in the bottom `finalImages` carousel, with each desktop followed by its
matching mobile screens, including both mobile infusion locator views.
`resourceLinks` follow the carousel, and `figmaEmbedAtEnd` places the Figma embed
at the bottom of the case study. The supplied `Typography.png` is a sitemap and
is labeled as such in the research section. The carousel presents selected
screens, not the complete website. `scopeMetrics` record the confirmed scope:
2 designers, 2 device formats, and 17 showcased screens (2 header previews plus
15 carousel images), rather than unverified usability or business outcomes.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

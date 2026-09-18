import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getPageMetadata,
  getStructuredData,
  render,
  SEO_ROUTES,
} from "../dist-ssr/entry-server.js";

const rootDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(rootDirectory, "dist");
const template = await readFile(
  path.join(outputDirectory, "index.html"),
  "utf8",
);
const seoBlockPattern =
  /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;
const rootElement = '<div id="root"></div>';

if (!seoBlockPattern.test(template) || !template.includes(rootElement)) {
  throw new Error("The built HTML is missing its SEO or app-root marker.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderSeoHead(metadata) {
  const structuredData = JSON.stringify(getStructuredData(metadata)).replaceAll(
    "<",
    "\\u003c",
  );

  return `<!-- SEO_HEAD_START -->
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="title" content="${escapeHtml(metadata.title)}" />
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="author" content="Ryan Monaghan" />
    <meta name="robots" content="${escapeHtml(metadata.robots)}" />
    <link rel="canonical" href="${escapeHtml(metadata.canonical)}" />

    <meta property="og:type" content="${escapeHtml(metadata.ogType)}" />
    <meta property="og:url" content="${escapeHtml(metadata.canonical)}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:image" content="${escapeHtml(metadata.image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(metadata.image)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1584" />
    <meta property="og:image:height" content="396" />
    <meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />
    <meta property="og:site_name" content="Ryan Monaghan Portfolio" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(metadata.canonical)}" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${escapeHtml(metadata.image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />

    <script id="seo-structured-data" type="application/ld+json">${structuredData}</script>
    <!-- SEO_HEAD_END -->`;
}

for (const route of SEO_ROUTES) {
  const metadata = getPageMetadata(route);
  const appHtml = render(route);
  const pageHtml = template
    .replace(seoBlockPattern, renderSeoHead(metadata))
    .replace(rootElement, `<div id="root">${appHtml}</div>`);
  const relativeOutputPath =
    route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const outputPath = path.join(outputDirectory, relativeOutputPath);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, pageHtml);
}

const lastModified = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SEO_ROUTES.map(
  (route) => `  <url>
    <loc>https://www.ryandesigns.io${route}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`,
).join("\n")}
</urlset>
`;

await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);
console.log(`Prerendered ${SEO_ROUTES.length} routes.`);
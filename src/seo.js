import { projects } from "./data/projects.js";

export const SITE_URL = "https://www.ryandesigns.io";
export const SOCIAL_IMAGE_URL = `${SITE_URL}/ryan-monaghan-social-preview.png`;

const defaultDescription =
  "Ryan Monaghan is a New York product designer and front-end developer creating accessible digital products, healthcare experiences, design systems, and React interfaces.";

const staticPages = {
  "/": {
    title: "Ryan Monaghan | Product Designer & Front-End Developer",
    description: defaultDescription,
  },
  "/about": {
    title: "About Ryan Monaghan | Product Designer in New York",
    description:
      "Learn about Ryan Monaghan, a New York product designer with 5+ years of experience in UX, healthcare, SaaS, design systems, and front-end development.",
  },
  "/work": {
    title: "Product Design Case Studies | Ryan Monaghan",
    description:
      "Explore Ryan Monaghan's product design portfolio, including healthcare websites, mobile UX, interactive experiences, research, prototypes, and design systems.",
  },
  "/photography": {
    title: "Photography | Ryan Monaghan",
    description:
      "A collection of travel and street photography by New York product designer Ryan Monaghan, documenting places, architecture, and details from around the world.",
  },
  "/contact": {
    title: "Contact Ryan Monaghan | Product Designer",
    description:
      "Contact Ryan Monaghan about product design roles, UX and front-end collaborations, commissions, or digital product work in New York and beyond.",
  },
};

export const SEO_ROUTES = [
  "/",
  "/about",
  "/work",
  ...projects.map((project) => `/work/${project.slug}`),
  "/photography",
  "/contact",
];

function normalizePathname(value) {
  const pathname = (value || "/").split(/[?#]/)[0];
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

export function getPageMetadata(value) {
  const pathname = normalizePathname(value);
  const projectSlug = pathname.startsWith("/work/")
    ? pathname.slice("/work/".length)
    : null;
  const project = projectSlug
    ? projects.find((item) => item.slug === projectSlug)
    : null;
  const staticPage = staticPages[pathname];
  const isIndexable = Boolean(staticPage || project);

  const page = project
    ? {
        title: `${project.title} Case Study | Ryan Monaghan`,
        description: project.summary || project.description,
      }
    : staticPage || {
        title: "Page Not Found | Ryan Monaghan",
        description: defaultDescription,
      };

  return {
    ...page,
    pathname,
    canonical: `${SITE_URL}${pathname === "/" ? "/" : pathname}`,
    image: SOCIAL_IMAGE_URL,
    imageAlt: "Ryan Monaghan, product designer and front-end developer",
    ogType: project ? "article" : "website",
    project,
    robots: isIndexable
      ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : "noindex, nofollow",
  };
}

export function getStructuredData(metadata) {
  const websiteId = `${SITE_URL}/#website`;
  const personId = `${SITE_URL}/#person`;
  const webpageId = `${metadata.canonical}#webpage`;
  const graph = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: "Ryan Monaghan Portfolio",
      description: defaultDescription,
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Ryan Monaghan",
      url: `${SITE_URL}/`,
      image: SOCIAL_IMAGE_URL,
      jobTitle: "Product Designer and Front-End Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
      knowsAbout: [
        "Product Design",
        "UX Research",
        "UI Design",
        "Design Systems",
        "React",
        "Front-End Development",
      ],
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: metadata.canonical,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      inLanguage: "en-US",
    },
  ];

  if (metadata.project) {
    graph.push({
      "@type": "CreativeWork",
      name: metadata.project.title,
      description: metadata.project.summary || metadata.project.description,
      url: metadata.canonical,
      mainEntityOfPage: { "@id": webpageId },
      author: { "@id": personId },
      image: SOCIAL_IMAGE_URL,
      keywords: metadata.project.category,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
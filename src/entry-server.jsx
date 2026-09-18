import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "./App";
import { LanguageProvider } from "./lib/LanguageContext";
import { AboutPage } from "./pages/about-page";
import { CaseStudyPage } from "./pages/case-study-page";
import { PhotographyPage } from "./pages/photography-page";

export {
  getPageMetadata,
  getStructuredData,
  SEO_ROUTES,
} from "./seo";

export function render(pathname) {
  return renderToString(
    <LanguageProvider>
      <StaticRouter location={pathname}>
        <AppRoutes
          AboutPageComponent={AboutPage}
          CaseStudyPageComponent={CaseStudyPage}
          PhotographyPageComponent={PhotographyPage}
        />
      </StaticRouter>
    </LanguageProvider>,
  );
}
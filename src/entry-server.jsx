import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "./App";
import { LanguageProvider } from "./lib/LanguageContext";

export {
  getPageMetadata,
  getStructuredData,
  SEO_ROUTES,
} from "./seo";

export function render(pathname) {
  return renderToString(
    <LanguageProvider>
      <StaticRouter location={pathname}>
        <AppRoutes />
      </StaticRouter>
    </LanguageProvider>,
  );
}
import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
}

const BASE_URL = "https://ccleaks.com";
const SITE_NAME = "Inside Claude Code — The Unauthorized Field Guide";

export function SEOHead({ title, description, path = "/", type = "article" }: SEOHeadProps) {
  const fullTitle = path === "/" ? SITE_NAME : `${title} | CC_LEAK`;
  const url = `${BASE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(prop, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:url", url, "property");
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    let jsonLd = document.querySelector("script[data-seo='jsonld']") as HTMLScriptElement | null;
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      jsonLd.setAttribute("data-seo", "jsonld");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": type === "website" ? "WebSite" : "Article",
      name: fullTitle,
      description,
      url,
    });

    return () => {
      jsonLd?.remove();
    };
  }, [fullTitle, description, url, type]);

  return null;
}

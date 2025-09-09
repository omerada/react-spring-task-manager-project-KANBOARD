import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

export const useSEO = ({
  title = "Kanboard - Modern Proje Yönetimi",
  description = "Kanboard ile projelerinizi organize edin, görevlerinizi takip edin ve takım çalışmanızı geliştirin.",
  keywords = "kanban, proje yönetimi, görev takibi, takım çalışması, üretkenlik",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: SEOProps = {}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty = false
    ) => {
      const attributeName = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attributeName}="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attributeName, name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph meta tags
    updateMetaTag("og:title", ogTitle || title, true);
    updateMetaTag("og:description", ogDescription || description, true);
    updateMetaTag("og:type", "website", true);

    if (ogImage) {
      updateMetaTag("og:image", ogImage, true);
    }

    if (ogUrl) {
      updateMetaTag("og:url", ogUrl, true);
    }

    // Update Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", ogTitle || title);
    updateMetaTag("twitter:description", ogDescription || description);

    if (ogImage) {
      updateMetaTag("twitter:image", ogImage);
    }

    // Update theme color
    updateMetaTag("theme-color", "#4F46E5");

    // Add structured data for organization
    const addStructuredData = () => {
      let script = document.querySelector(
        "#structured-data"
      ) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script") as HTMLScriptElement;
        script.id = "structured-data";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Kanboard",
        description: description,
        url: window.location.origin,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "Kanboard Team",
        },
      };

      script.textContent = JSON.stringify(structuredData);
    };

    addStructuredData();
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl]);
};

export default useSEO;

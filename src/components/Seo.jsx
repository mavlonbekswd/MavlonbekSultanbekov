import { useEffect } from 'react';
import { buildPageStructuredData } from '../data/structuredData';
import { siteConfig } from '../data/profile';

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  let canonical = document.head.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.append(canonical);
  }

  canonical.setAttribute('href', href);
};

/**
 * @param {{
 *   title: string;
 *   description: string;
 *   path: string;
 *   image?: string;
 *   imageAlt?: string;
 *   type?: string;
 *   noIndex?: boolean;
 *   structuredData?: Record<string, unknown>;
 * }} props
 */
const Seo = ({
  title,
  description,
  path,
  image = siteConfig.socialImage,
  imageAlt = siteConfig.socialImageAlt,
  type = 'website',
  noIndex = false,
  structuredData,
}) => {
  useEffect(() => {
    const normalizedPath =
      path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
    const canonicalUrl = `${siteConfig.canonicalUrl}${normalizedPath}`;
    const imageUrl = image.startsWith('http')
      ? image
      : `${siteConfig.canonicalUrl}${image}`;
    const schema =
      structuredData ||
      buildPageStructuredData({
        title,
        description,
        path: normalizedPath,
      });

    document.title = title;
    upsertMeta('name', 'title', title);
    upsertMeta('name', 'description', description);
    upsertMeta(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow',
    );
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', siteConfig.title);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
    upsertCanonical(canonicalUrl);

    let script = /** @type {HTMLScriptElement | null} */ (
      document.getElementById('structured-data')
    );
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      document.head.append(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [
    description,
    image,
    imageAlt,
    noIndex,
    path,
    structuredData,
    title,
    type,
  ]);

  return null;
};

export default Seo;

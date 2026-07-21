import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { profile, siteConfig } from './src/data/profile.js';
import { buildBaseStructuredData } from './src/data/structuredData.js';

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const metadataReplacements = {
  __SITE_TITLE__: escapeHtml(siteConfig.title),
  __SITE_DESCRIPTION__: escapeHtml(siteConfig.description),
  __FULL_NAME__: escapeHtml(profile.fullName),
  __CANONICAL_URL__: siteConfig.canonicalUrl,
  __SITE_LOCALE__: siteConfig.locale,
  __THEME_COLOR__: siteConfig.themeColor,
  __SOCIAL_IMAGE_URL__: `${siteConfig.canonicalUrl}${siteConfig.socialImage}`,
  __SOCIAL_IMAGE_ALT__: escapeHtml(siteConfig.socialImageAlt),
  __STRUCTURED_DATA__: JSON.stringify(buildBaseStructuredData()),
};

const profileMetadataPlugin = {
  name: 'profile-metadata',
  transformIndexHtml(html) {
    return Object.entries(metadataReplacements).reduce(
      (result, [placeholder, value]) =>
        result.replaceAll(placeholder, value),
      html,
    );
  },
};

export default defineConfig({
  plugins: [react(), profileMetadataPlugin],
  base: '/',
});

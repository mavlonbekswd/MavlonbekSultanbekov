import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  pageSeo,
  profile,
  siteConfig,
} from '../src/data/profile.js';
import {
  getProjectText,
  projects,
} from '../src/data/projects.js';
import {
  buildPageStructuredData,
  buildProjectStructuredData,
} from '../src/data/structuredData.js';

const distDirectory = resolve(process.cwd(), 'dist');
const sourceHtml = await readFile(
  resolve(distDirectory, 'index.html'),
  'utf8',
);

const unpublishedLegacyAssets = [
  '.DS_Store',
  'CV-Mavlonbek Sultonbekov.pdf',
  'Cooming-Soon.webp',
  'MavlonoIcons.PNG',
  'SpeedFixLogo.webp',
  'carselaes_dash.png',
  'mee.webp',
];

await Promise.all(
  unpublishedLegacyAssets.map((asset) =>
    rm(resolve(distDirectory, asset), { force: true }),
  ),
);

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const replaceMeta = (html, attribute, key, value) => {
  const expression = new RegExp(
    `<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`,
    'i',
  );
  const replacement = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return html.replace(expression, replacement);
};

const applyMetadata = ({
  html,
  title,
  description,
  path,
  image = siteConfig.socialImage,
  imageAlt = siteConfig.socialImageAlt,
  type = 'website',
  noIndex = false,
  structuredData,
}) => {
  const canonicalUrl = `${siteConfig.canonicalUrl}${path}`;
  const imageUrl = image.startsWith('http')
    ? image
    : `${siteConfig.canonicalUrl}${image}`;
  let output = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`,
  );

  output = replaceMeta(output, 'name', 'title', title);
  output = replaceMeta(output, 'name', 'description', description);
  output = replaceMeta(
    output,
    'name',
    'robots',
    noIndex ? 'noindex, nofollow' : 'index, follow',
  );
  output = replaceMeta(output, 'property', 'og:type', type);
  output = replaceMeta(output, 'property', 'og:url', canonicalUrl);
  output = replaceMeta(output, 'property', 'og:title', title);
  output = replaceMeta(output, 'property', 'og:description', description);
  output = replaceMeta(output, 'property', 'og:image', imageUrl);
  output = replaceMeta(output, 'property', 'og:image:alt', imageAlt);
  output = replaceMeta(output, 'name', 'twitter:title', title);
  output = replaceMeta(output, 'name', 'twitter:description', description);
  output = replaceMeta(output, 'name', 'twitter:image', imageUrl);
  output = replaceMeta(output, 'name', 'twitter:image:alt', imageAlt);
  output = output.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );
  output = output.replace(
    /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
  );

  return output;
};

const pages = [
  {
    output: 'resume.html',
    ...pageSeo.resume,
    structuredData: buildPageStructuredData(pageSeo.resume),
  },
  {
    output: 'projects.html',
    ...pageSeo.projects,
    structuredData: buildPageStructuredData(pageSeo.projects),
  },
  {
    output: 'contact.html',
    ...pageSeo.contact,
    structuredData: buildPageStructuredData(pageSeo.contact),
  },
  {
    output: 'blog.html',
    ...pageSeo.blog,
    noIndex: true,
    structuredData: buildPageStructuredData(pageSeo.blog),
  },
  {
    output: '404.html',
    title: `Page not found | ${profile.fullName}`,
    description: 'The requested portfolio page could not be found.',
    path: '/404',
    noIndex: true,
    structuredData: buildPageStructuredData({
      title: `Page not found | ${profile.fullName}`,
      description: 'The requested portfolio page could not be found.',
      path: '/404',
      pageType: 'WebPage',
    }),
  },
  ...projects.map((project) => {
    const text = getProjectText(project, 'en');
    return {
      output: `projects/${project.slug}.html`,
      title: project.seo?.title || `${text.title} | ${profile.fullName}`,
      description: project.seo?.description || text.shortSummary,
      path: project.caseStudyUrl,
      image:
        project.seo?.image || project.image.fallback || project.image.src,
      imageAlt: project.seo?.imageAlt || project.image.alt,
      type: project.seo?.type || 'article',
      structuredData: buildProjectStructuredData(project, text.title),
    };
  }),
];

await Promise.all(
  pages.map(async ({ output, ...metadata }) => {
    const outputPath = resolve(distDirectory, output);
    await mkdir(resolve(outputPath, '..'), { recursive: true });
    await writeFile(
      outputPath,
      applyMetadata({ html: sourceHtml, ...metadata }),
      'utf8',
    );
  }),
);

console.log(`Generated ${pages.length} static route documents.`);

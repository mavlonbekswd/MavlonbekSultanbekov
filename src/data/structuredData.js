import { profile, siteConfig } from './profile.js';

const absoluteUrl = (path) =>
  path.startsWith('http') ? path : `${siteConfig.canonicalUrl}${path}`;

export const buildBaseStructuredData = () => {
  const professionalSocials = profile.socials
    .filter(({ id }) => ['github', 'linkedin', 'telegram'].includes(id))
    .map(({ href }) => href);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.canonicalUrl}/#person`,
        name: profile.fullName,
        url: siteConfig.canonicalUrl,
        image: absoluteUrl(siteConfig.socialImage),
        jobTitle: profile.professionalTitle,
        description: profile.secondaryContext,
        email: `mailto:${profile.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'London',
          addressCountry: 'GB',
        },
        knowsAbout: [
          ...profile.skills.core,
          ...profile.skills.appliedAi,
          ...profile.skills.tools,
        ],
        sameAs: professionalSocials,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.canonicalUrl}/#website`,
        url: siteConfig.canonicalUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: 'en-GB',
        publisher: {
          '@id': `${siteConfig.canonicalUrl}/#person`,
        },
      },
    ],
  };
};

export const buildPageStructuredData = ({
  title,
  description,
  path,
  pageType = 'ProfilePage',
}) => {
  const baseData = buildBaseStructuredData();
  const pageUrl = absoluteUrl(path);

  return {
    ...baseData,
    '@graph': [
      ...baseData['@graph'],
      {
        '@type': pageType,
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: {
          '@id': `${siteConfig.canonicalUrl}/#website`,
        },
        about: {
          '@id': `${siteConfig.canonicalUrl}/#person`,
        },
      },
    ],
  };
};

export const buildProjectStructuredData = (project, title) => {
  const pageUrl = absoluteUrl(project.caseStudyUrl);
  const baseData = buildBaseStructuredData();
  const description = project.seo?.description || project.shortSummary;
  const image = project.seo?.image || project.image.fallback || project.image.src;
  const projectEntity = {
    '@type': project.schemaType || 'CreativeWork',
    '@id': `${pageUrl}#project`,
    url: pageUrl,
    name: title,
    description,
    image: absoluteUrl(image),
    creator: {
      '@id': `${siteConfig.canonicalUrl}/#person`,
    },
    keywords: project.technologyStack.join(', '),
    sameAs: [project.githubUrl, project.liveDemoUrl].filter(Boolean),
  };

  if (project.schemaType === 'SoftwareApplication') {
    projectEntity.applicationCategory = project.applicationCategory;
    projectEntity.operatingSystem = project.operatingSystem;
    projectEntity.author = {
      '@id': `${siteConfig.canonicalUrl}/#person`,
    };
  }

  return {
    ...baseData,
    '@graph': [
      ...baseData['@graph'],
      projectEntity,
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.seo?.title || `${title} | ${profile.fullName}`,
        description,
        isPartOf: {
          '@id': `${siteConfig.canonicalUrl}/#website`,
        },
        mainEntity: {
          '@id': `${pageUrl}#project`,
        },
      },
    ],
  };
};

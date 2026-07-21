import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  pageSeo,
  profile,
  siteConfig,
} from '../src/data/profile.js';
import {
  carvonCaseStudy,
  carvonProject,
  carvonStatus,
  carvonVenture,
} from '../src/data/carvon.js';
import { projects } from '../src/data/projects.js';
import { certifications, experience } from '../src/data/resume.js';
import { buildProjectStructuredData } from '../src/data/structuredData.js';
import { validateContactForm } from '../src/utils/contactValidation.js';

test('professional positioning uses the approved title and description', () => {
  assert.equal(
    siteConfig.title,
    'Mavlonbek Sultonbekov | Data Analyst',
  );
  assert.equal(
    siteConfig.description,
    'Portfolio of Mavlonbek Sultonbekov, a Data Analyst specialising in SQL, Python, pandas, Power BI, PostgreSQL, Microsoft Fabric and applied AI workflows.',
  );
  assert.equal(profile.professionalTitle, 'Data Analyst');
  assert.equal(profile.heroEyebrow, 'DATA · ANALYTICS · APPLIED AI');
  assert.equal(profile.about.en.length, 2);
});

test('CV is available from the stable Data Analyst path', () => {
  const cvPath = resolve(
    process.cwd(),
    'public',
    profile.cv.path.replace(/^\//, ''),
  );

  assert.equal(profile.cv.available, true);
  assert.equal(
    profile.cv.path,
    '/cv/Mavlonbek-Sultonbekov-Data-Analyst-CV.pdf',
  );
  assert.equal(
    profile.cv.downloadName,
    'Mavlonbek-Sultonbekov-Data-Analyst-CV.pdf',
  );
  assert.ok(existsSync(cvPath), `Missing CV file: ${cvPath}`);
});

test('certificate records match the inspected PDFs and stable files exist', () => {
  assert.equal(certifications.length, 2);
  assert.deepEqual(
    certifications.map(({ title, issuer, issueDate, path }) => ({
      title,
      issuer,
      issueDate,
      path,
    })),
    [
      {
        title: 'Data Analytics (SQL, Python, Power BI)',
        issuer: 'MAAB Innovation LLC',
        issueDate: '31 March 2026',
        path: '/certificates/data-analytics-certificate.pdf',
      },
      {
        title: 'Commercial Software Development — Data Engineering',
        issuer: 'Itransition',
        issueDate: '5 June 2026',
        path: '/certificates/data-engineering-certificate.pdf',
      },
    ],
  );
  assert.equal(certifications[0].credentialId, '000266');
  assert.equal(certifications[1].credentialId, null);

  for (const certificate of certifications) {
    const certificatePath = resolve(
      process.cwd(),
      'public',
      certificate.path.replace(/^\//, ''),
    );
    assert.ok(
      existsSync(certificatePath),
      `Missing certificate file: ${certificatePath}`,
    );
  }
});

test('removed experience and stale primary positioning do not remain', () => {
  const publicProfileCopy = JSON.stringify({
    profile,
    pageSeo,
    experience,
  });
  const prohibitedPhrases = [
    ['BI', 'Developer'].join(' '),
    ['Data Engineering', 'experience'].join(' '),
    ['Software Engineering student with', 'Data Engineering', 'experience'].join(
      ' ',
    ),
    ['Quy', 'Mill'].join(' '),
    ['Assistant Night', 'Manager'].join(' '),
  ];

  for (const phrase of prohibitedPhrases) {
    assert.equal(
      publicProfileCopy.toLowerCase().includes(phrase.toLowerCase()),
      false,
      `Stale public copy found: ${phrase}`,
    );
  }
});

test('project records contain complete recruiter-facing fields', () => {
  const requiredFields = [
    'businessProblem',
    'solution',
    'technicalImplementation',
    'evidence',
    'technologyStack',
    'category',
    'image',
    'caseStudyUrl',
    'featured',
  ];

  const slugs = new Set();
  const ids = new Set();
  const caseStudyUrls = new Set();
  for (const project of projects) {
    for (const field of requiredFields) {
      assert.ok(project[field] !== undefined, `${project.id} is missing ${field}`);
    }
    assert.ok(!slugs.has(project.slug), `Duplicate slug: ${project.slug}`);
    slugs.add(project.slug);
    assert.ok(!ids.has(project.id), `Duplicate project id: ${project.id}`);
    ids.add(project.id);
    assert.ok(
      !caseStudyUrls.has(project.caseStudyUrl),
      `Duplicate case-study URL: ${project.caseStudyUrl}`,
    );
    caseStudyUrls.add(project.caseStudyUrl);
    assert.equal(project.caseStudyUrl, `/projects/${project.slug}`);

    for (const url of [
      project.githubUrl,
      project.liveDemoUrl,
      project.reportUrl,
    ].filter(Boolean)) {
      assert.notEqual(url, '#');
      assert.match(url, /^https:\/\//);
    }
  }
});

test('Carvon is the central-status-driven flagship project', () => {
  assert.equal(projects[0], carvonProject);
  assert.equal(carvonProject.priority, 1);
  assert.equal(carvonProject.tier, 'flagship');
  assert.equal(carvonProject.slug, 'carvon-ai');
  assert.equal(carvonProject.mvpStatus, carvonStatus.mvpStatus);
  assert.ok(['building', 'mvp-ready'].includes(carvonStatus.mvpStatus));
  assert.equal(carvonStatus.mvpStatus, 'building');
  assert.equal(carvonStatus.label, 'MVP in Development');
  assert.equal(
    carvonStatus.detail,
    'The secure identity, workspace and multi-tenant database foundation is implemented. Marketplace ingestion, governed KPI services and AI-assisted analysis are being developed.',
  );
  assert.equal(carvonStatus.repositoryVisibility, 'private');
  assert.equal(carvonProject.githubUrl, null);
  assert.equal(
    carvonProject.category,
    'SaaS · Data Platform · Applied AI',
  );
  assert.match(carvonProject.liveDemoUrl, /^https:\/\/carvon-ai\.com/);
  assert.equal(carvonVenture.projectId, carvonProject.id);
  assert.equal(carvonVenture.status, carvonStatus);
  assert.equal(carvonVenture.caseStudyUrl, carvonProject.caseStudyUrl);
});

test('Carvon evidence separates implementation from planned commerce and AI', () => {
  assert.match(carvonCaseStudy.aiCurrentState, /does not contain a production model/i);
  assert.ok(
    carvonCaseStudy.architecture.some(
      ({ label, status }) =>
        label === 'Marketplace connector services' && status === 'planned',
    ),
  );
  assert.ok(
    carvonCaseStudy.marketplacePipeline.every(
      ({ status }) => status === 'planned',
    ),
  );
  assert.match(
    carvonCaseStudy.limitations.join(' '),
    /deterministic demo records/i,
  );

  const prohibitedClaims = [
    '2,400 stores',
    '$310M',
    'SOC 2 Type II',
    '1.9M AI insights',
  ];
  const publicCarvonCopy = JSON.stringify({
    project: carvonProject,
    caseStudy: carvonCaseStudy,
  });
  for (const claim of prohibitedClaims) {
    assert.equal(
      publicCarvonCopy.includes(claim),
      false,
      `Unverified public claim found: ${claim}`,
    );
  }
});

test('Carvon media exists and is described', () => {
  for (const image of [carvonProject.image, ...carvonProject.screenshots]) {
    const imagePath = resolve(
      process.cwd(),
      'public',
      image.src.replace(/^\//, ''),
    );
    assert.ok(existsSync(imagePath), `Missing Carvon media: ${imagePath}`);
    assert.ok(image.width > 0 && image.height > 0);
    assert.ok(image.alt.length > 20);
  }
});

test('Carvon structured data and static discovery are configured', () => {
  assert.equal(
    carvonProject.seo.title,
    'Carvon AI — Commerce Intelligence SaaS | Mavlonbek Sultonbekov',
  );
  assert.equal(
    carvonProject.seo.description,
    'Engineering case study of Carvon AI, a Central Asia–first multi-tenant commerce intelligence platform built with Next.js, TypeScript, PostgreSQL and Supabase.',
  );
  const schema = buildProjectStructuredData(
    carvonProject,
    carvonProject.translations.en.title,
  );
  const softwareApplication = schema['@graph'].find(
    ({ '@type': type }) => type === 'SoftwareApplication',
  );
  assert.ok(softwareApplication);
  assert.equal(
    softwareApplication.url,
    'https://www.mavlonbek.com/projects/carvon-ai',
  );
  assert.equal(
    softwareApplication.applicationCategory,
    'BusinessApplication',
  );

  const sitemap = readFileSync(
    resolve(process.cwd(), 'public/sitemap.xml'),
    'utf8',
  );
  for (const project of projects) {
    assert.match(
      sitemap,
      new RegExp(
        `https://www\\.mavlonbek\\.com${project.caseStudyUrl.replaceAll(
          '/',
          '\\/',
        )}`,
      ),
    );
  }
});

test('new Carvon interface labels exist in every locale', () => {
  const requiredKeys = [
    'flagship-project',
    'live-product',
    'product-engineering-ventures',
    'read-carvon-case-study',
    'applied-ai-automation',
    'view-certificate',
    'download-pdf',
  ];

  for (const locale of ['en', 'ru', 'uz']) {
    const messages = JSON.parse(
      readFileSync(
        resolve(process.cwd(), `src/locales/${locale}.json`),
        'utf8',
      ),
    );
    for (const key of requiredKeys) {
      assert.ok(messages[key], `${locale}.json is missing ${key}`);
    }
  }
});

test('page canonicals are unique and use the production domain', () => {
  const paths = Object.values(pageSeo).map(({ path }) => path);
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(siteConfig.canonicalUrl, 'https://www.mavlonbek.com');
});

test('contact validation covers required fields and spam', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'not-an-email',
    subject: '',
    message: 'short',
    company: '',
  });
  assert.equal(invalid.isValid, false);
  assert.deepEqual(Object.keys(invalid.errors), [
    'name',
    'email',
    'subject',
    'message',
  ]);

  const valid = validateContactForm({
    name: 'Recruiter',
    email: 'recruiter@example.com',
    subject: 'Data analyst opportunity',
    message: 'I would like to discuss a data analyst opportunity.',
    company: '',
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.isSpam, false);

  const spam = validateContactForm({
    name: 'Bot',
    email: 'bot@example.com',
    subject: 'Spam',
    message: 'This is a honeypot submission.',
    company: 'https://spam.example',
  });
  assert.equal(spam.isSpam, true);
});

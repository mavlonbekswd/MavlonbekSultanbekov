# Mavlonbek Sultonbekov — Data Portfolio

Recruiter-focused portfolio for a Data Analyst, built with
React and Vite. The site highlights verified Microsoft Fabric and Power BI
work, detailed case studies, a technical resume, and an accessible contact
form.

## Local development

Use a current LTS release of Node.js (22 or newer).

```bash
npm install
npm run dev
```

Before deployment, run the complete local verification:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run build` creates the Vite bundle and route-specific static HTML
documents for search metadata and direct navigation.

## Content and configuration

- `src/data/profile.js` is the source of truth for identity, contact details,
  CV availability, skills, navigation categories, and page metadata.
- `src/data/projects.js` contains project evidence, case-study content, links,
  technology filters, and clearly marked documentation TODOs.
- `src/data/resume.js` contains experience, education, and verified certificate metadata.
- `src/locales/` contains English, Russian, and Uzbek interface copy.

The sidebar CV action uses the stable public file at
`public/cv/Mavlonbek-Sultonbekov-Data-Analyst-CV.pdf`. Certificate actions use
the evidence-backed files in `public/certificates/`.

## Environment variables

Copy `.env.example` to `.env` and provide only the services used in the target
environment. Never commit `.env`.

The contact form uses EmailJS public client identifiers. The optional Telegram
webhook also requires server-side Telegram credentials and
`SANITY_WEBHOOK_SECRET`.

## Deployment

The project includes Vercel clean-URL redirects, immutable asset caching,
canonical metadata, structured data, `robots.txt`, and `sitemap.xml`.
Production output is written to `dist/`.

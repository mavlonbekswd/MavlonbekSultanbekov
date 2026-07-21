export const siteConfig = Object.freeze({
  canonicalUrl: 'https://www.mavlonbek.com',
  title: 'Mavlonbek Sultonbekov | Data Analyst',
  description:
    'Portfolio of Mavlonbek Sultonbekov, a Data Analyst specialising in SQL, Python, pandas, Power BI, PostgreSQL, Microsoft Fabric and applied AI workflows.',
  locale: 'en_GB',
  themeColor: '#07080a',
  socialImage: '/imgForSeo.png',
  socialImageAlt: 'Mavlonbek Sultonbekov portfolio profile image',
});

export const profile = Object.freeze({
  fullName: 'Mavlonbek Sultonbekov',
  professionalTitle: 'Data Analyst',
  heroEyebrow: 'DATA · ANALYTICS · APPLIED AI',
  secondaryContext: 'Turning complex data into clear, practical decisions.',
  shortTagline:
    'I transform complex and imperfect data into clear analysis, reliable reporting and practical business decisions.',
  about: {
    en: [
      "I'm a curious and detail-oriented Data Analyst who enjoys understanding how businesses, systems and people behave through data. I like breaking complex problems into clear steps, questioning assumptions and turning information into practical decisions.",
      "I value accuracy, continuous learning and honest communication. I'm particularly interested in e-commerce, product analytics, entrepreneurship and applied AI — especially where technology can simplify difficult work and help people make better decisions.",
    ],
    ru: [
      'Я любознательный и внимательный к деталям аналитик данных. Мне нравится понимать через данные, как работают компании, системы и люди. Я разбиваю сложные задачи на понятные шаги, проверяю предположения и превращаю информацию в практические решения.',
      'Я ценю точность, постоянное обучение и честное общение. Особенно мне интересны электронная коммерция, продуктовая аналитика, предпринимательство и прикладной ИИ — прежде всего там, где технологии упрощают сложную работу и помогают людям принимать более обоснованные решения.',
    ],
    uz: [
      "Men qiziquvchan va detallarga e'tiborli Data Analystman. Bizneslar, tizimlar va odamlar qanday ishlashini ma'lumotlar orqali tushunishni yoqtiraman. Murakkab muammolarni aniq bosqichlarga ajrataman, taxminlarni tekshiraman va ma'lumotni amaliy qarorlarga aylantiraman.",
      "Men aniqlik, uzluksiz o'rganish va ochiq muloqotni qadrlayman. Ayniqsa e-commerce, product analytics, tadbirkorlik va amaliy AI menga qiziq — xususan texnologiya murakkab ishni soddalashtirib, odamlarga yaxshiroq qaror qabul qilishga yordam beradigan joylarda.",
    ],
  },
  email: 'mavlondata@gmail.com',
  location: 'London, UK',
  avatar: {
    src: '/mee-160.webp',
    srcSet: '/mee-160.webp 160w, /mee-320.webp 320w',
    alt: 'Portrait of Mavlonbek Sultonbekov',
  },
  phone: {
    value: '+447881196552',
    display: '+44 7881 196552',
    showPhone: false,
  },
  cv: {
    path: '/cv/Mavlonbek-Sultonbekov-Data-Analyst-CV.pdf',
    downloadName: 'Mavlonbek-Sultonbekov-Data-Analyst-CV.pdf',
    available: true,
    ariaLabel: "Download Mavlonbek Sultonbekov's Data Analyst CV as PDF",
  },
  availability: {
    available: true,
    label: 'Open to work',
    detail: 'Open to data analysis and product analytics opportunities',
  },
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/mavlonbekswd',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mavlonbek-sultanbekov-219098283/',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: 'https://t.me/mavlono_sulton',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/447881196552',
      requiresPhoneVisibility: true,
    },
  ],
  skills: {
    core: [
      'SQL',
      'Python',
      'pandas',
      'Power BI',
      'DAX',
      'PostgreSQL',
      'Microsoft Fabric',
    ],
    appliedAi: [
      'Agentic AI Workflows',
      'MCP Integrations',
      'AI Tool & Skill Design',
      'Prompt & Context Engineering',
      'AI-Assisted Development',
    ],
    tools: ['Excel', 'Power Query', 'GitHub'],
  },
  projectCategories: [
    'All',
    'SaaS',
    'Data Platform',
    'Applied AI',
    'Power BI',
    'Microsoft Fabric',
    'Python',
    'SQL',
    'Excel',
  ],
});

export const navigationItems = Object.freeze([
  { key: 'about', to: '/', end: true },
  { key: 'resume', to: '/resume' },
  { key: 'projects', to: '/projects' },
  { key: 'contact', to: '/contact' },
]);

export const pageSeo = Object.freeze({
  home: {
    title: siteConfig.title,
    description: siteConfig.description,
    path: '/',
  },
  resume: {
    title: `Resume | ${profile.fullName} - ${profile.professionalTitle}`,
    description:
      'Experience, education and technical skills of Mavlonbek Sultonbekov, a Data Analyst focused on reliable analysis, reporting and applied AI workflows.',
    path: '/resume',
  },
  projects: {
    title: `Data Projects | ${profile.fullName}`,
    description:
      'Explore SQL, Python, Power BI, Microsoft Fabric and applied AI portfolio projects by Data Analyst Mavlonbek Sultonbekov.',
    path: '/projects',
  },
  contact: {
    title: `Contact | ${profile.fullName} - ${profile.professionalTitle}`,
    description:
      'Contact Mavlonbek Sultonbekov about data analysis, reporting, dashboards, product analytics and applied AI workflows.',
    path: '/contact',
  },
  blog: {
    title: `Articles | ${profile.fullName}`,
    description:
      'Future articles by Mavlonbek Sultonbekov on Microsoft Fabric, Power BI, SQL, Python and data quality.',
    path: '/blog',
  },
});

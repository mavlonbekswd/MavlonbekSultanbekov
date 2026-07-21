import { carvonProject } from './carvon.js';

const projectTranslations = {
  fabric: {
    en: {
      title: 'Microsoft Fabric End-to-End Data Pipeline',
      shortSummary:
        'A five-source Microsoft Fabric pipeline using Bronze, Silver and Gold layers, validated transformations and four Power BI report pages.',
    },
    ru: {
      title: 'Сквозной пайплайн данных в Microsoft Fabric',
      shortSummary:
        'Пайплайн Microsoft Fabric из пяти источников с уровнями Bronze, Silver и Gold, проверкой преобразований и четырьмя страницами Power BI.',
    },
    uz: {
      title: "Microsoft Fabric'da boshdan-oxir ma'lumotlar pipeline'i",
      shortSummary:
        "Beshta manbali Microsoft Fabric pipeline'i: Bronze, Silver va Gold qatlamlari, tekshirilgan transformatsiyalar va to'rtta Power BI sahifasi.",
    },
  },
  carSales: {
    en: {
      title: 'Power BI Car Sales Analytics Dashboard',
      shortSummary:
        'An interactive Power BI report for YTD and MTD sales, average price, cars sold, weekly trends and regional comparisons.',
    },
    ru: {
      title: 'Дашборд анализа продаж автомобилей в Power BI',
      shortSummary:
        'Интерактивный отчёт Power BI по продажам YTD и MTD, средней цене, количеству автомобилей, недельным трендам и регионам.',
    },
    uz: {
      title: 'Power BI avtomobil savdosi tahliliy dashboardi',
      shortSummary:
        "YTD va MTD savdosi, o'rtacha narx, sotilgan avtomobillar, haftalik trendlar va hududiy taqqoslashlar uchun interaktiv Power BI hisoboti.",
    },
  },
};

export const projects = Object.freeze([
  carvonProject,
  {
    id: 'fabric-pipeline',
    slug: 'microsoft-fabric-end-to-end-data-pipeline',
    priority: 2,
    tier: 'standard',
    translations: projectTranslations.fabric,
    shortSummary: projectTranslations.fabric.en.shortSummary,
    businessProblem:
      'Bring urban mobility, air-quality, weather, exchange-rate and economic data into one governed analytics flow to explore how taxi activity relates to environmental and macroeconomic conditions in New York City.',
    solution:
      'Built a Microsoft Fabric medallion pipeline that ingests five public sources, cleans and types them in Silver, models daily analytical tables in a Gold warehouse and serves four Power BI report pages.',
    technicalImplementation:
      'Python requests and Fabric notebooks ingest Parquet, JSON and CSV data. PySpark creates validated Delta tables, T-SQL CTAS statements build the Gold star schema, and Power BI connects to the warehouse through DirectQuery.',
    evidence: [
      'Five documented public data sources',
      '2,964,624 NYC taxi rows ingested',
      '240,819 invalid taxi rows removed using documented rules',
      '2,723,805 clean taxi rows in Silver',
      'Four Power BI report pages',
    ],
    technologyStack: [
      'Microsoft Fabric',
      'PySpark',
      'Python',
      'SQL',
      'Power BI',
      'Delta Lake',
      'Great Expectations',
      'InfluxDB',
    ],
    category: 'Microsoft Fabric',
    filters: ['Microsoft Fabric', 'Power BI', 'Python', 'SQL'],
    image: {
      src: '/fabric-pipeline.svg',
      alt: 'Microsoft Fabric pipeline from five public data sources through Bronze, Silver and Gold layers into Power BI',
      width: 800,
      height: 420,
      presentation: 'cover',
    },
    githubUrl:
      'https://github.com/mavlonbekswd/fabric-data-engineering-project',
    liveDemoUrl: null,
    caseStudyUrl:
      '/projects/microsoft-fabric-end-to-end-data-pipeline',
    reportUrl: null,
    featured: true,
    mvpStatus: null,
    statusLabel: null,
    statusDetail: null,
    dataSources: [
      'NYC Yellow Taxi: 2,964,624 January 2024 trip rows',
      'OpenAQ: 1,000 hourly PM2.5 readings',
      'World Bank: 10 years of annual US GDP data',
      'ECB: 7,054 daily exchange-rate rows',
      'Open-Meteo: 744 hourly NYC weather records',
    ],
    cleaningProcess: [
      'Preserved source data unchanged in the Bronze Lakehouse.',
      'Typed columns, flattened nested JSON and extracted date/hour fields in Silver.',
      'Removed nulls, invalid fares and zero-distance taxi trips using documented business rules.',
      'Reduced 2,964,624 taxi rows to 2,723,805 valid Silver rows.',
    ],
    architecture:
      'Raw sources -> Bronze Lakehouse -> Silver Lakehouse -> Gold Warehouse -> Power BI. The Gold layer uses a star schema and aggregates taxi data into 6,679 daily zone summaries.',
    keyLogic: [
      'T-SQL CTAS statements create Gold analytical tables.',
      'Taxi and weather data are joined on date and hour for correlation analysis.',
      'Pearson correlation compares trip counts with temperature and precipitation.',
      'DirectQuery keeps Power BI connected to the Gold warehouse.',
    ],
    validation: [
      'Great Expectations checks Silver taxi, air-quality and weather tables.',
      'Checks cover null values, accepted ranges and row counts.',
      'A Discord webhook reports validation passes and failures.',
    ],
    findings: [
      'The dashboard enabled analysis of daily mobility, air quality, weather relationships and economic context.',
      'The documented January 2024 analysis found a weekly taxi pattern and joined 744 hourly taxi-weather observations.',
      'The project demonstrates end-to-end ingestion, data-quality checks, warehouse modelling and BI delivery; it does not claim production use by a company.',
    ],
    limitations: [
      'Taxi and weather comparisons cover January 2024, so seasonality across a full year is outside the current scope.',
      'The public portfolio currently provides an architecture visual rather than a live Power BI report link.',
      'Different source granularities require careful interpretation when comparing mobility with annual economic data.',
    ],
    nextSteps: [
      'Extend taxi and weather ingestion across additional months.',
      'Publish a recruiter-safe Power BI report or recorded walkthrough.',
      'Add automated source freshness checks and a concise data dictionary.',
    ],
  },
  {
    id: 'car-sales-dashboard',
    slug: 'power-bi-car-sales-analytics-dashboard',
    priority: 3,
    tier: 'standard',
    translations: projectTranslations.carSales,
    shortSummary: projectTranslations.carSales.en.shortSummary,
    businessProblem:
      'Make car-sales performance easier to inspect across time, region, body style, colour, manufacturer and other available dimensions.',
    solution:
      'Built an interactive Power BI report with overview and detail views, KPI cards, comparison visuals, slicers, weekly trends and a regional map.',
    technicalImplementation:
      'Power BI provides the report experience, while DAX measures calculate YTD and MTD sales, average price, cars sold and growth percentages. The current repository does not yet document the underlying model or preparation steps.',
    evidence: [
      'Live Power BI report is available',
      'Public GitHub repository is available',
      'Overview and detail report navigation',
      'KPI, weekly trend, regional and company comparison visuals',
    ],
    technologyStack: ['Power BI', 'DAX', 'Excel', 'SQL'],
    category: 'Power BI',
    filters: ['Power BI', 'SQL', 'Excel'],
    image: {
      src: '/carsales-dashboard-960.webp',
      srcSet:
        '/carsales-dashboard-640.webp 640w, /carsales-dashboard-960.webp 960w',
      fallback: '/carsales-dashboard-960.webp',
      alt: 'Power BI car sales dashboard with KPI cards, weekly sales trend, regional map and company comparison table',
      width: 960,
      height: 538,
      presentation: 'cover',
    },
    githubUrl: 'https://github.com/mavlonbekswd/PowerBI_projects',
    liveDemoUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiOTBjZTU2MGEtOTUzNS00MTYwLThhMWQtNjExYjgyNmExOTg0IiwidCI6ImIxNzNiMGY3LWMyNGItNGQ3OS04NzZlLWI1ZjBhZDUxNmQ0MSIsImMiOjZ9',
    caseStudyUrl:
      '/projects/power-bi-car-sales-analytics-dashboard',
    reportUrl: null,
    featured: true,
    mvpStatus: null,
    statusLabel: null,
    statusDetail: null,
    dataSources: [
      'Car-sales dataset used by the linked report.',
      'TODO: Document the original dataset source, licence, grain and field definitions in the repository.',
    ],
    cleaningProcess: [
      'The current repository does not document the data-cleaning workflow.',
      'TODO: Add the Power Query, SQL or Excel preparation steps and record the row-level validation checks.',
    ],
    architecture:
      'Power BI report with overview and detail pages, interactive slicers, DAX KPI measures and visuals for time, geography and category comparisons. The semantic model is not yet documented publicly.',
    keyLogic: [
      'YTD and MTD total-sales measures',
      'YTD and MTD average-price measures',
      'YTD and MTD cars-sold measures',
      'Growth percentage comparisons',
    ],
    validation: [
      'The visible report supports cross-checking KPIs across overview, trend and company-level visuals.',
      'TODO: Publish reconciliation rules, source totals and DAX validation notes.',
    ],
    findings: [
      'The dashboard enabled analysis of weekly sales trends, regional distribution, body style, colour and company performance.',
      'The project demonstrates interactive report design and DAX-based KPI development; it does not claim external business adoption.',
    ],
    limitations: [
      'The repository README currently contains only the project title.',
      'The data source, model relationships, cleaning steps and validation results are not documented yet.',
    ],
    nextSteps: [
      'Add a data dictionary and model diagram.',
      'Document the principal DAX measures and validation approach.',
      'Add a concise written findings section to the repository.',
    ],
  },
]);

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);

export const getProjectText = (project, language = 'en') => {
  const normalizedLanguage = language?.split('-')[0] || 'en';
  const translation =
    project.translations[normalizedLanguage] || project.translations.en;

  return {
    title: translation.title,
    shortSummary: translation.shortSummary,
  };
};

export const projectMatchesCategory = (project, category) =>
  category === 'All' || project.filters.includes(category);

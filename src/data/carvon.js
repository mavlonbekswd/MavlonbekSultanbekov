export const carvonStatus = Object.freeze({
  mvpStatus: 'building',
  label: 'MVP in Development',
  detail:
    'The secure identity, workspace and multi-tenant database foundation is implemented. Marketplace ingestion, governed KPI services and AI-assisted analysis are being developed.',
  liveProductUrl: 'https://carvon-ai.com',
  liveProductAccess: 'Public marketing and authentication routes; an account is required for protected product routes.',
  repositoryVisibility: 'private',
  repositoryUrl: null,
  lastEvidenceReview: '2026-07-20',
});

const translations = Object.freeze({
  en: {
    title: 'Carvon AI — Central Asian Commerce Intelligence Platform',
    shortSummary:
      'A Central Asia–first commerce analytics platform designed to unify fragmented marketplace data, calculate trusted business metrics and support evidence-grounded AI analysis.',
  },
  ru: {
    title: 'Carvon AI — платформа аналитики торговли в Центральной Азии',
    shortSummary:
      'Платформа аналитики электронной торговли с фокусом на Центральную Азию, предназначенная для объединения разрозненных данных маркетплейсов, расчёта надёжных бизнес-метрик и аналитики с ИИ, основанной на проверяемых данных.',
  },
  uz: {
    title: 'Carvon AI — Markaziy Osiyo savdo tahlili platformasi',
    shortSummary:
      "Markaziy Osiyo uchun yaratilayotgan savdo tahlili platformasi: tarqoq marketplace ma'lumotlarini birlashtirish, ishonchli biznes ko'rsatkichlarini hisoblash va dalillarga tayangan AI tahlilini qo'llab-quvvatlash uchun mo'ljallangan.",
  },
});

export const carvonMaturity = Object.freeze([
  {
    id: 'current',
    label: 'Current engineering foundation',
    status: 'implemented',
    summary:
      'Deployed application shell, Supabase authentication, protected sessions, organisation membership, RLS, onboarding and persisted profile/workspace settings.',
  },
  {
    id: 'mvp',
    label: 'MVP delivery scope',
    status: 'building',
    summary:
      'Tenant-safe marketplace ingestion, canonical commerce records, freshness-aware KPI calculations and a validated insights workflow for regional sellers.',
  },
  {
    id: 'future',
    label: 'Future expansion',
    status: 'planned',
    summary:
      'Broader automation, additional marketplace coverage, team workflows and carefully gated expansion beyond the initial Central Asian focus.',
  },
]);

export const carvonCaseStudy = Object.freeze({
  role: {
    title: 'Founder & Product Engineer',
    context: 'Independent SaaS Product',
    period: 'July 2026–Present',
    location: 'Remote',
    team: 'Solo product engineering, architecture and UX ownership',
  },
  problem:
    'Regional marketplace sellers can end up switching between channel-specific dashboards, exports and operating routines. Carvon explores a tenant-safe layer for normalising that fragmented work into one decision surface without pretending that every marketplace exposes the same data or workflow.',
  vision:
    'Build a Central Asia–first commerce intelligence product that starts with trustworthy data foundations, clearly explains freshness and confidence, and helps an operator move from a cross-channel signal to a human-approved action.',
  workflow: [
    {
      step: '1',
      title: 'Connect a regional channel',
      detail:
        'Authorise an account and declare the marketplace, organisation and sync scope. Connector execution is an MVP target, not a current production capability.',
      status: 'planned',
    },
    {
      step: '2',
      title: 'Normalise commerce records',
      detail:
        'Map channel-specific products, orders and inventory into canonical tenant-scoped records with source lineage and validation results.',
      status: 'planned',
    },
    {
      step: '3',
      title: 'Calculate comparable KPIs',
      detail:
        'Compute revenue, orders, average order value, unit volume, availability and channel concentration while exposing data freshness.',
      status: 'planned',
    },
    {
      step: '4',
      title: 'Explain a priority',
      detail:
        'Surface a ranked, evidence-linked insight with the metric movement, contributing records, confidence and a suggested next step.',
      status: 'prototype',
    },
    {
      step: '5',
      title: 'Keep the operator in control',
      detail:
        'Require review before an external change, record the decision and make automation reversible. This approval workflow is planned.',
      status: 'planned',
    },
  ],
  implementedFoundation: [
    'Next.js 15 and React 19 application deployed at carvon-ai.com.',
    'Supabase email/password authentication, Google OAuth code path and password-recovery flows.',
    'Middleware session refresh plus server-side protection for authenticated product routes.',
    'Profiles, organisations and organisation memberships with owner/admin/member roles.',
    'Row-level security, signup automation and restricted SECURITY DEFINER helper execution.',
    'Persisted three-step onboarding plus profile and owner-authorised workspace settings.',
    'Interactive dashboard, analytics, product, order, integrations, reports and insight screens using deterministic demo data.',
    'A basic application health endpoint.',
  ],
  architecture: [
    {
      label: 'Next.js product surface',
      detail: 'Marketing, auth, onboarding, settings and demo product workflows',
      status: 'implemented',
    },
    {
      label: 'Supabase auth & session layer',
      detail: 'Identity, password recovery, callback exchange and route protection',
      status: 'implemented',
    },
    {
      label: 'Tenant boundary',
      detail: 'Profiles, organisations, memberships, roles and RLS policies',
      status: 'implemented',
    },
    {
      label: 'Marketplace connector services',
      detail: 'Channel adapters, scheduling, retries and incremental sync',
      status: 'planned',
    },
    {
      label: 'Canonical commerce model',
      detail: 'Tenant-scoped products, orders, inventory, lineage and sync state',
      status: 'planned',
    },
    {
      label: 'KPI & insight services',
      detail: 'Metric calculation, evidence retrieval, ranking and evaluation',
      status: 'planned',
    },
  ],
  tenantModel: [
    {
      label: 'Authenticated user',
      detail: 'Supabase identity and profile',
      status: 'implemented',
    },
    {
      label: 'Organisation membership',
      detail: 'owner, admin or member role',
      status: 'implemented',
    },
    {
      label: 'Organisation workspace',
      detail: 'The current tenant boundary for settings and future commerce data',
      status: 'implemented',
    },
    {
      label: 'Tenant-scoped commerce rows',
      detail: 'Future records will require organisation ownership, RLS and audit fields',
      status: 'planned',
    },
  ],
  regionalStrategy: [
    {
      marketplace: 'Uzum Market',
      scope: 'Marketplace connector and canonical order/product mapping',
      phase: 'MVP target',
      status: 'Research',
    },
    {
      marketplace: 'Kaspi',
      scope: 'Marketplace connector and channel performance mapping',
      phase: 'MVP target',
      status: 'Research',
    },
    {
      marketplace: 'Wildberries',
      scope: 'Marketplace connector with explicit regional account boundaries',
      phase: 'MVP target',
      status: 'Research',
    },
    {
      marketplace: 'Ozon',
      scope: 'Marketplace connector after the shared ingestion contract is stable',
      phase: 'MVP follow-on',
      status: 'Planned',
    },
    {
      marketplace: 'OLX',
      scope: 'Listing and lead workflow only; not modelled as an order marketplace without verified APIs/data',
      phase: 'Exploration',
      status: 'Research',
    },
    {
      marketplace: 'Global channels',
      scope: 'No current connector claim; evaluate only after regional reliability',
      phase: 'Phase 4',
      status: 'Future',
    },
  ],
  connectorCapabilities: [
    {
      capability: 'Authentication',
      requirement:
        'Declare API key, OAuth, signed request or seller-report import per channel.',
    },
    {
      capability: 'Commerce coverage',
      requirement:
        'Record support separately for products, orders, inventory, fees, returns, advertising and settlements.',
    },
    {
      capability: 'Sync contract',
      requirement:
        'Document pagination, rate limits, historical availability, incremental cursor and expected frequency.',
    },
    {
      capability: 'Operational state',
      requirement:
        'Expose connector status as Research, Planned, In Development, Beta or Available from evidence—not marketing copy.',
    },
    {
      capability: 'Failure behaviour',
      requirement:
        'Persist attempt state, validation errors and retry eligibility without blocking unrelated tenants.',
    },
  ],
  canonicalCommerceModel: [
    {
      group: 'Tenant and connection',
      entities:
        'organisations, organisation_members, marketplace_connections, connector_accounts',
      status: 'partial',
      note:
        'Organisations and memberships exist; marketplace connection entities are planned.',
    },
    {
      group: 'Catalogue',
      entities:
        'products, product_variants, marketplace_listings, inventory_snapshots',
      status: 'planned',
      note:
        'Separate internal products from channel-specific listing identities.',
    },
    {
      group: 'Transactions',
      entities:
        'orders, order_items, returns, refunds, fees, commissions, settlements',
      status: 'planned',
      note:
        'Preserve marketplace states while mapping comparable canonical statuses.',
    },
    {
      group: 'Cost and performance',
      entities:
        'cost_of_goods, advertising_costs, currency_rates, daily_metrics',
      status: 'planned',
      note:
        'Only calculate profitability at the completeness level supported by available inputs.',
    },
    {
      group: 'Operations and lineage',
      entities: 'sync_runs, raw_payloads, import_errors, validation_results',
      status: 'planned',
      note:
        'Keep source lineage, freshness and failure visibility next to every derived dataset.',
    },
  ],
  marketplacePipeline: [
    {
      label: 'Regional marketplace APIs',
      detail: 'Uzum, Kaspi, Wildberries and Ozon; availability must be verified per channel',
      status: 'planned',
    },
    {
      label: 'Connector adapters',
      detail: 'Authentication, pagination, rate limits, cursors and retries',
      status: 'planned',
    },
    {
      label: 'Raw sync envelope',
      detail: 'Source payload, organisation, connector version and received timestamp',
      status: 'planned',
    },
    {
      label: 'Validation & normalisation',
      detail: 'Schema checks, deduplication, quarantine and canonical mapping',
      status: 'planned',
    },
    {
      label: 'Tenant-scoped commerce model',
      detail: 'Products, orders, inventory, source lineage and sync health',
      status: 'planned',
    },
    {
      label: 'KPI & experience layer',
      detail: 'Freshness-aware metrics, comparisons and explainable priorities',
      status: 'planned',
    },
  ],
  kpiModel: [
    {
      name: 'Net marketplace revenue',
      definition:
        'Recognised channel revenue after documented cancellations, returns and marketplace adjustments.',
    },
    {
      name: 'Orders and unit volume',
      definition:
        'Comparable fulfilled/order counts with channel status mappings made explicit.',
    },
    {
      name: 'Average order value',
      definition:
        'Net marketplace revenue divided by the matching order population and period.',
    },
    {
      name: 'Availability and stock risk',
      definition:
        'Sellable inventory, recent velocity and estimated coverage, subject to source freshness.',
    },
    {
      name: 'Cancellation and return rate',
      definition:
        'Channel-specific exception states mapped to a documented canonical definition.',
    },
    {
      name: 'Channel concentration',
      definition:
        'Revenue or volume share by marketplace to expose dependency risk.',
    },
    {
      name: 'Contribution margin readiness',
      definition:
        'Report only when fees, returns, advertising, cost of goods and required fulfilment costs are complete; otherwise show the missing inputs.',
    },
  ],
  metricBoundary:
    'Net profit must not be presented as trusted when cost of goods, advertising, tax, fulfilment or settlement adjustments are incomplete. Every metric needs a definition, grain, currency, time zone, source window and freshness state.',
  aiDataFlow: [
    {
      label: 'Validated KPI snapshot',
      detail: 'Only metrics that pass freshness and completeness gates',
      status: 'planned',
    },
    {
      label: 'Candidate signal rules',
      detail: 'Deterministic thresholds and comparisons before any model involvement',
      status: 'planned',
    },
    {
      label: 'Evidence packet',
      detail: 'Metric definition, source period, contributing records and limitations',
      status: 'planned',
    },
    {
      label: 'Explanation service',
      detail: 'Generate a concise summary and suggested investigation; no autonomous action',
      status: 'planned',
    },
    {
      label: 'Evaluation & policy gate',
      detail: 'Grounding, unsupported-claim, privacy and usefulness checks',
      status: 'planned',
    },
    {
      label: 'Human-reviewed insight',
      detail: 'Show confidence, evidence and reversible next steps in the product UI',
      status: 'prototype',
    },
  ],
  aiCurrentState:
    'The repository currently contains seeded insight examples and an interactive explanation-oriented UI. It does not contain a production model, retrieval pipeline or automated decision service.',
  aiGuardrails: [
    'Never present an insight without its metric window, freshness and supporting evidence.',
    'Separate deterministic KPI calculation from generated explanation.',
    'Treat model output as a recommendation; require operator review before external actions.',
    'Minimise tenant data sent to a model and redact unnecessary personal or customer fields.',
    'Log prompt/version/evidence references for later evaluation without logging sensitive payloads by default.',
  ],
  dashboardDecisions: [
    'Which products generate sales but weak or unverified margin?',
    'Which marketplace performs best after the fees and returns available from that source?',
    'Which products are approaching a stockout based on fresh inventory and recent velocity?',
    'Which listings are losing momentum between comparable periods?',
    'Which products or channels show a rising return or cancellation rate?',
    'Why did a governed sales or margin metric change between two periods?',
  ],
  architectureDecisions: [
    {
      decision: 'Use organisation-level tenancy',
      judgement:
        'A membership can carry owner/admin/member authority while future commerce data shares one explicit organisation key. This supports teams without tying data ownership to one user.',
      tradeoff:
        'Ownership transfer and sole-owner protection need a stronger database transaction before team management is production-ready.',
    },
    {
      decision: 'Put marketplace differences behind connectors',
      judgement:
        'Capability declarations prevent UI components from assuming that every source exposes orders, fees, inventory or settlement data.',
      tradeoff:
        'The adapter contract must stay small enough for an initial connector while preserving source-specific fields through raw lineage.',
    },
    {
      decision: 'Use PostgreSQL RLS as a tenant boundary',
      judgement:
        'Database policies protect direct client queries as well as application routes, which is valuable for the current Supabase architecture.',
      tradeoff:
        'Policies require adversarial tests and column-level hardening; an owner-aware UI alone is not the security boundary.',
    },
    {
      decision: 'Separate raw, canonical and metric layers',
      judgement:
        'Immutable source evidence, normalised commerce facts and governed KPIs have different change and validation needs.',
      tradeoff:
        'This adds modelling work, but avoids burying reconciliation logic in charts or losing the source payload needed for debugging.',
    },
    {
      decision: 'Keep financial calculation outside the language model',
      judgement:
        'Deterministic SQL or metric services remain the source of truth; AI can explain an evidence package and its limitations.',
      tradeoff:
        'The AI experience depends on a reliable metric and evaluation layer, so it follows—not precedes—the data MVP.',
    },
    {
      decision: 'Prioritise one reliable regional path',
      judgement:
        'A proven API or seller-report ingestion path validates the connector and canonical contracts better than several shallow “connected” badges.',
      tradeoff:
        'Coverage grows more slowly, but failures, freshness and reconciliation become inspectable.',
    },
    {
      decision: 'Defer global connectors',
      judgement:
        'Central Asian marketplace fragmentation is the product wedge. Amazon, Shopify, WooCommerce and eBay belong after regional contracts are validated.',
      tradeoff:
        'The product avoids generic breadth early and accepts a narrower initial addressable workflow.',
    },
    {
      decision: 'Use Supabase and PostgreSQL at the current stage',
      judgement:
        'They combine authentication, relational constraints, policies and migration-controlled SQL without a separate identity platform.',
      tradeoff:
        'Sustained connector volume may later justify background workers, queues, object storage and a dedicated analytical warehouse.',
    },
  ],
  securityPrivacy: {
    implemented: [
      'RLS is enabled for profiles, organisations and memberships.',
      'SECURITY DEFINER helpers pin an empty search path.',
      'Function execution is revoked by default and narrowly re-granted for authenticated helpers.',
      'The UI limits workspace updates to an owner-aware server action.',
    ],
    backlog: [
      'Restrict organisation updates so owners cannot mutate plan, owner_id or slug through the direct API.',
      'Prevent deletion of the sole owner membership and add an explicit ownership-transfer transaction.',
      'Fail closed, or render a clear configuration error, when Supabase environment variables are missing.',
      'Keep applied migrations immutable and add migration-level regression tests.',
      'Define retention, deletion, encryption and incident-response policies before real seller data is ingested.',
    ],
  },
  reliability: {
    current: [
      'Basic health endpoint is implemented.',
      'Portfolio audit ran the Carvon linter and TypeScript compiler successfully; lint reported three non-blocking warnings.',
      'Protected live routes redirect unauthenticated visitors to sign-in.',
    ],
    planned: [
      'Connector run ledger with cursor state, attempt count, latency and per-tenant outcome.',
      'Idempotency keys, exponential backoff, dead-letter quarantine and replay tools.',
      'Freshness and completeness service-level indicators for every connected channel.',
      'Structured logs, error monitoring, alert ownership and runbook links.',
      'Unit, policy, migration, connector-contract and end-to-end test coverage in CI.',
    ],
  },
  evidence: [
    'SQL migrations implement organisation-scoped profiles, organisations and memberships, row-level security, signup auto-provisioning and controlled function privileges.',
    'Supabase authentication, server-side protected routes, persisted onboarding and owner-authorised workspace settings are implemented and deployed at carvon-ai.com.',
    'Unauthenticated dashboard, onboarding and settings routes redirect to sign-in.',
    'Dashboard experiences are explicitly traceable to deterministic demo data.',
    'The service layer is currently empty, which keeps connector and AI claims in the planned column.',
  ],
  outcomes:
    'The present outcome is a credible engineering foundation and coherent product prototype—not validated commercial traction. It demonstrates product framing, multi-tenant database design, authentication, permission-aware settings and a realistic path from demo data to regional commerce ingestion.',
  hiringRelevance: [
    'Product engineering: translated an ambiguous regional seller problem into explicit product stages and user workflows.',
    'SaaS architecture: designed identity, membership, tenancy and protected route foundations.',
    'Data platform thinking: defined lineage, validation, canonical modelling, KPI semantics and freshness as product requirements.',
    'Responsible AI: separated calculation from explanation and made evidence, evaluation and human approval first-class.',
    'Frontend and UX: built a responsive, data-dense dashboard prototype with onboarding and settings flows.',
  ],
  fullTechnologyStack: [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Tailwind CSS 4',
    'shadcn/ui',
    'Supabase Auth',
    'Supabase SSR',
    'PostgreSQL',
    'Row Level Security',
    'TanStack Query',
    'TanStack Table',
    'Zod',
    'Zustand',
    'Recharts',
    'Vercel',
  ],
  limitations: [
    'Marketplace connectors, commerce tables and scheduled ingestion are not implemented.',
    'Analytics, product, order, integration, reporting, billing and AI screens use deterministic demo records.',
    'Google OAuth is implemented in code but was not independently completed end to end during this audit.',
    'The repository is private, so the public portfolio intentionally does not link to GitHub.',
    'The live marketing site contains unverified traction, compliance, customer and “live integration” claims that should be removed or labelled as sample content.',
    'No automated test suite or CI workflow is present yet.',
    'The live sign-in interface still uses “Karvon” branding; naming consolidation is in the backlog.',
  ],
  roadmap: [
    {
      phase: 'Phase 1 · Foundation hardening',
      status: 'current',
      items: [
        'Close ownership/RLS gaps and fail closed on missing production configuration.',
        'Add database policy tests, CI and error monitoring.',
        'Remove unsupported marketing claims and standardise the Carvon name.',
      ],
    },
    {
      phase: 'Phase 2 · Regional data MVP',
      status: 'next',
      items: [
        'Validate marketplace API access and choose the first production connector.',
        'Implement connector runs, canonical commerce tables, lineage and freshness.',
        'Ship reconciled KPI definitions with an operator-visible data-quality view.',
      ],
    },
    {
      phase: 'Phase 3 · Evaluated decision support',
      status: 'planned',
      items: [
        'Generate evidence-linked insights from validated KPI snapshots.',
        'Build evaluation datasets and usefulness/grounding/privacy gates.',
        'Add human approval, feedback and reversible action history.',
      ],
    },
    {
      phase: 'Phase 4 · Expansion',
      status: 'future',
      items: [
        'Add further regional channels and team workflows after reliability targets are met.',
        'Explore OLX listing/lead workflows separately from order commerce.',
        'Evaluate global connectors only after regional product-market and operational evidence.',
      ],
    },
  ],
});

export const carvonProject = Object.freeze({
  id: 'carvon-ai',
  slug: 'carvon-ai',
  shortTitle: 'Carvon AI',
  role: carvonCaseStudy.role.title,
  type: carvonCaseStudy.role.context,
  startedAt: '2026-07',
  region: 'Central Asia',
  priority: 1,
  tier: 'flagship',
  schemaType: 'SoftwareApplication',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  translations,
  shortSummary: translations.en.shortSummary,
  businessProblem:
    'Regional sellers need a more trustworthy way to compare fragmented marketplace operations without hiding channel differences or data freshness.',
  solution:
    'Built and deployed a multi-tenant SaaS prototype with real identity, tenancy, onboarding and settings foundations, plus demo-data product workflows for the commerce intelligence experience being developed.',
  technicalImplementation:
    'Next.js 15, React 19, TypeScript, Tailwind CSS and Supabase provide the current product foundation. PostgreSQL migrations define profiles, organisations, memberships, RLS and privilege hardening; the analytics and AI surfaces are currently deterministic UI prototypes.',
  dataSources: [
    'Current persisted data is limited to authenticated profiles, organisations, memberships and onboarding/workspace preferences.',
    'Commerce records visible in the dashboard come from deterministic demo data.',
    'Regional marketplace APIs are planned sources and must be verified per channel before a connector claim is made.',
  ],
  cleaningProcess: [
    'No production marketplace cleaning pipeline is implemented yet.',
    'The MVP contract calls for source envelopes, schema validation, deduplication, quarantine, canonical mapping and lineage.',
  ],
  architecture:
    'Implemented Next.js and Supabase identity/tenancy foundation -> planned marketplace adapters -> planned canonical commerce model -> planned KPI and evidence-linked insight services.',
  keyLogic: carvonCaseStudy.kpiModel.map(
    ({ name, definition }) => `${name}: ${definition}`,
  ),
  validation: [
    ...carvonCaseStudy.reliability.current,
    ...carvonCaseStudy.reliability.planned,
  ],
  findings: [
    ...carvonCaseStudy.evidence,
    carvonCaseStudy.outcomes,
  ],
  limitations: carvonCaseStudy.limitations,
  nextSteps: carvonCaseStudy.roadmap.flatMap(({ phase, items }) =>
    items.map((item) => `${phase}: ${item}`),
  ),
  evidence: carvonCaseStudy.evidence,
  cardEvidence: [
    'Organisation-scoped multi-tenancy with automated provisioning, Supabase authentication, protected routes, PostgreSQL RLS and migration-managed database privileges.',
  ],
  categories: [
    'SaaS',
    'Data Platform',
    'Applied AI',
    'Analytics Engineering',
  ],
  technologyStack: [
    'Next.js',
    'TypeScript',
    'PostgreSQL',
    'Supabase',
    'RLS',
    'Data Architecture',
    'Vercel',
  ],
  category: 'SaaS · Data Platform · Applied AI',
  filters: ['SaaS', 'Data Platform', 'Applied AI', 'SQL'],
  image: {
    src: '/images/projects/carvon-ai-commerce-intelligence.svg',
    alt: 'Carvon AI Central Asian commerce analytics dashboard',
    width: 1600,
    height: 1000,
    presentation: 'cover',
  },
  screenshots: [
    {
      src: '/carvon-ai-sign-in.jpg',
      alt: 'Live Carvon AI sign-in screen showing Google and email authentication options',
      width: 1280,
      height: 720,
      caption:
        'Live authentication interface captured on 17 July 2026. The current product still contains “Karvon” naming that is tracked for consolidation.',
    },
  ],
  githubUrl: carvonStatus.repositoryUrl,
  liveDemoUrl: carvonStatus.liveProductUrl,
  liveDemoLabelKey: 'live-product',
  caseStudyUrl: '/projects/carvon-ai',
  reportUrl: null,
  featured: true,
  mvpStatus: carvonStatus.mvpStatus,
  statusLabel: carvonStatus.label,
  statusDetail: carvonStatus.detail,
  seo: {
    title:
      'Carvon AI — Commerce Intelligence SaaS | Mavlonbek Sultonbekov',
    description:
      'Engineering case study of Carvon AI, a Central Asia–first multi-tenant commerce intelligence platform built with Next.js, TypeScript, PostgreSQL and Supabase.',
    image: '/images/projects/carvon-ai-commerce-intelligence.svg',
    imageAlt:
      'Carvon AI Central Asian commerce analytics dashboard prototype',
    type: 'website',
  },
});

export const carvonVenture = Object.freeze({
  id: 'carvon-ai-venture',
  projectId: carvonProject.id,
  status: carvonStatus,
  caseStudyUrl: carvonProject.caseStudyUrl,
  role: carvonCaseStudy.role,
  translations: {
    en: {
      title: 'Founder & Product Engineer',
      organisation: 'Carvon AI · Independent SaaS Product',
      location: 'Remote',
      date: 'July 2026–Present',
      bullets: [
        'Designed and deployed a Next.js/Supabase SaaS prototype with authentication, protected sessions, multi-tenant organisations, RLS, onboarding and persisted workspace settings.',
        'Defined a Central Asia–first marketplace data architecture, canonical KPI model and staged path from regional ingestion to explainable decision support.',
        'Built interactive commerce workflows with demo data while explicitly separating the implemented foundation from connectors, production analytics and AI that remain in development.',
      ],
    },
    ru: {
      title: 'Основатель и продуктовый инженер',
      organisation: 'Carvon AI · Независимый SaaS-продукт',
      location: 'Удалённо',
      date: 'Июль 2026–настоящее время',
      bullets: [
        'Спроектировал и развернул SaaS-прототип на Next.js/Supabase с аутентификацией, защищёнными сессиями, мультитенантными организациями, RLS, онбордингом и настройками рабочих пространств.',
        'Определил архитектуру данных для маркетплейсов Центральной Азии, каноническую модель KPI и поэтапный путь к объяснимой поддержке решений.',
        'Создал интерактивные торговые сценарии на демо-данных, чётко отделив реализованный фундамент от разрабатываемых коннекторов, аналитики и AI.',
      ],
    },
    uz: {
      title: 'Asoschi va Product Engineer',
      organisation: 'Carvon AI · Mustaqil SaaS mahsuloti',
      location: 'Masofadan',
      date: 'Iyul 2026–hozirgacha',
      bullets: [
        "Next.js/Supabase asosida autentifikatsiya, himoyalangan sessiyalar, multi-tenant tashkilotlar, RLS, onboarding va saqlanadigan workspace sozlamalari bilan SaaS prototipini yaratdim va joylashtirdim.",
        "Markaziy Osiyo marketplace'lari uchun data arxitekturasi, kanonik KPI modeli va tushuntiriladigan qaror yordamiga bosqichma-bosqich yo'lni belgiladim.",
        "Demo ma'lumotlar bilan interaktiv savdo oqimlarini qurdim va mavjud poydevorni ishlab chiqilayotgan connector, production analytics hamda AI'dan aniq ajratdim.",
      ],
    },
  },
});

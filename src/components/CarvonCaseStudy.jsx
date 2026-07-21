import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Database,
  ExternalLink,
  LockKeyhole,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProjectActions from './ProjectActions';
import ProjectImage from './ProjectImage';
import Seo from './Seo';
import {
  carvonCaseStudy,
  carvonMaturity,
  carvonProject,
  carvonStatus,
} from '../data/carvon';
import { buildProjectStructuredData } from '../data/structuredData';
import { getProjectText } from '../data/projects';

const statusLabels = {
  implemented: 'Implemented',
  current: 'Current',
  building: 'Building',
  next: 'Next',
  prototype: 'Prototype',
  planned: 'Planned',
  future: 'Future',
};

const StatusBadge = ({ status }) => (
  <span className="delivery-status" data-status={status}>
    <span aria-hidden="true" />
    {statusLabels[status] || status}
  </span>
);

const BulletList = ({ items, className = '' }) => (
  <ul className={`detail-list ${className}`.trim()}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const CaseSection = ({
  id,
  eyebrow = '',
  title,
  description = '',
  Icon = null,
  children,
  className = '',
}) => (
  <section
    className={`carvon-section ${className}`.trim()}
    aria-labelledby={id}
  >
    <header className="carvon-section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id}>
          {Icon &&
            createElement(Icon, {
              'aria-hidden': true,
              size: 22,
            })}
          {title}
        </h2>
      </div>
      {description && <p>{description}</p>}
    </header>
    {children}
  </section>
);

const FlowDiagram = ({ title, description, nodes }) => (
  <figure className="semantic-flow">
    <figcaption>
      <strong>{title}</strong>
      <span>{description}</span>
    </figcaption>
    <ol>
      {nodes.map((node) => (
        <li key={`${title}-${node.label}`}>
          <div>
            <StatusBadge status={node.status} />
            <h3>{node.label}</h3>
            <p>{node.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  </figure>
);

const CapabilityList = ({ items, status }) => (
  <ul className="capability-status-list">
    {items.map((item) => (
      <li key={item}>
        <StatusBadge status={status} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const CarvonCaseStudy = () => {
  const { t, i18n } = useTranslation();
  const text = getProjectText(carvonProject, i18n.resolvedLanguage);
  const structuredData = buildProjectStructuredData(
    carvonProject,
    text.title,
  );

  return (
    <>
      <Seo
        title={carvonProject.seo.title}
        description={carvonProject.seo.description}
        path={carvonProject.caseStudyUrl}
        image={carvonProject.seo.image}
        imageAlt={carvonProject.seo.imageAlt}
        type={carvonProject.seo.type}
        structuredData={structuredData}
      />

      <article className="page-card carvon-case-study" lang="en">
        <nav className="breadcrumb" aria-label={t('breadcrumb')}>
          <Link to="/projects">
            <ArrowLeft aria-hidden="true" size={16} />
            {t('back-to-projects')}
          </Link>
        </nav>

        <header className="carvon-hero">
          <div className="carvon-hero-copy">
            <div className="carvon-hero-labels">
              <span className="flagship-label">Flagship product case study</span>
              <span className="mvp-status">
                <span aria-hidden="true" />
                {carvonStatus.label}
              </span>
            </div>
            <p className="eyebrow">{carvonProject.category}</p>
            <h1 data-page-heading tabIndex={-1}>
              {text.title}
            </h1>
            <p className="page-lead">{text.shortSummary}</p>
            <p className="carvon-status-copy">{carvonStatus.detail}</p>

            <dl className="carvon-hero-facts">
              <div>
                <dt>Role</dt>
                <dd>{carvonCaseStudy.role.title}</dd>
              </div>
              <div>
                <dt>Context</dt>
                <dd>{carvonCaseStudy.role.context}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{carvonCaseStudy.role.period}</dd>
              </div>
            </dl>

            <ProjectActions project={carvonProject} showCaseStudy={false} />
            <p className="repository-note">
              <LockKeyhole aria-hidden="true" size={16} />
              Source repository is private, so no recruiter-facing GitHub link
              is shown.
            </p>
          </div>

          <figure className="carvon-hero-visual">
            <ProjectImage
              image={carvonProject.image}
              className="carvon-foundation-image"
              loading="eager"
            />
            <figcaption>
              Product-repository artwork representing the layered platform
              foundation.
            </figcaption>
          </figure>
        </header>

        <nav className="case-study-index" aria-label="Case study sections">
          <p className="eyebrow">On this page</p>
          <ul>
            <li>
              <a href="#executive-overview">Overview</a>
            </li>
            <li>
              <a href="#current-foundation">Current foundation</a>
            </li>
            <li>
              <a href="#mvp-scope">MVP architecture</a>
            </li>
            <li>
              <a href="#connector-strategy">Connectors</a>
            </li>
            <li>
              <a href="#ai-architecture">AI design</a>
            </li>
            <li>
              <a href="#expansion-strategy">Expansion</a>
            </li>
          </ul>
        </nav>

        <CaseSection
          id="executive-overview"
          eyebrow="01 · Executive overview"
          title="Executive overview"
          Icon={Radar}
          description="Carvon is a founder-led engineering prototype. Its implemented foundation, MVP delivery scope and future expansion remain visibly separate."
        >
          <div className="maturity-grid">
            {carvonMaturity.map((level) => (
              <article key={level.id}>
                <StatusBadge status={level.status} />
                <h3>{level.label}</h3>
                <p>{level.summary}</p>
              </article>
            ))}
          </div>
          <div className="two-column-copy section-subgrid">
            <div>
              <h3>My role</h3>
              <p>
                I own the product framing, UX, frontend, Supabase architecture,
                database migrations and staged data-platform design as an
                independent product engineer.
              </p>
            </div>
            <div>
              <h3>Team reality</h3>
              <p>
                This is currently a solo venture. There is no claim of a
                production operations team, external customer adoption or
                commercial traction.
              </p>
            </div>
          </div>
          <p className="section-callout">{carvonCaseStudy.outcomes}</p>
        </CaseSection>

        <CaseSection
          id="regional-market-problem"
          eyebrow="02 · Regional market problem"
          title="Regional market problem"
          Icon={CircleAlert}
          description="Fragmented channel operations need a common view without erasing source differences."
        >
          <p className="long-form-copy">{carvonCaseStudy.problem}</p>
        </CaseSection>

        <CaseSection
          id="product-strategy"
          eyebrow="03 · Product strategy"
          title="Product strategy"
          Icon={Rocket}
          description="Central Asia is the initial product wedge; global connector breadth is deferred until the regional data contract is reliable."
        >
          <p className="long-form-copy">{carvonCaseStudy.vision}</p>
          <div className="table-scroll section-subgrid" tabIndex={0}>
            <table className="strategy-table">
              <caption className="sr-only">
                Regional marketplace scope and delivery horizon
              </caption>
              <thead>
                <tr>
                  <th scope="col">Channel</th>
                  <th scope="col">Intended scope</th>
                  <th scope="col">Horizon</th>
                </tr>
              </thead>
              <tbody>
                {carvonCaseStudy.regionalStrategy.map((item) => (
                  <tr key={item.marketplace}>
                    <th scope="row">{item.marketplace}</th>
                    <td>{item.scope}</td>
                    <td>{item.phase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CaseSection>

        <CaseSection
          id="current-foundation"
          eyebrow="04 · Current engineering foundation"
          title="Current engineering foundation"
          Icon={CheckCircle2}
          description="These capabilities are evidenced in code; dashboard commerce records remain deterministic demo data."
        >
          <CapabilityList
            items={carvonCaseStudy.implementedFoundation}
            status="implemented"
          />
        </CaseSection>

        <CaseSection
          id="mvp-scope"
          eyebrow="05 · MVP architecture and delivery scope"
          title="MVP architecture and delivery scope"
          Icon={Workflow}
          description="The next product phase connects one reliable regional ingestion path to a tenant-scoped canonical model, governed metrics and decision workflows."
        >
          <ol className="workflow-steps">
            {carvonCaseStudy.workflow.map((item) => (
              <li key={item.step}>
                <span className="workflow-step-number">{item.step}</span>
                <div>
                  <StatusBadge status={item.status} />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="section-subgrid">
            <FlowDiagram
              title="Carvon MVP system boundary"
              description="Implemented identity and tenancy lead into planned connector, commerce and insight services."
              nodes={carvonCaseStudy.architecture}
            />
          </div>
          <div className="status-columns section-subgrid">
            <div>
              <h3>Operational evidence now</h3>
              <CapabilityList
                items={carvonCaseStudy.reliability.current}
                status="implemented"
              />
            </div>
            <div>
              <h3>MVP operational quality</h3>
              <CapabilityList
                items={carvonCaseStudy.reliability.planned}
                status="planned"
              />
            </div>
          </div>
        </CaseSection>

        <CaseSection
          id="tenant-architecture"
          eyebrow="06 · Multi-tenant database architecture"
          title="Multi-tenant database architecture"
          Icon={Database}
          description="The current RLS foundation protects identity and workspace records. Future commerce tables must inherit an explicit organisation boundary."
        >
          <FlowDiagram
            title="Tenant relationship"
            description="A user reaches an organisation through an active membership and role."
            nodes={carvonCaseStudy.tenantModel}
          />
        </CaseSection>

        <CaseSection
          id="security-privacy"
          eyebrow="07 · Authorization and security model"
          title="Authorization and security model"
          Icon={LockKeyhole}
          description="Implemented database controls are separated from the hardening work found during the audit."
        >
          <div className="status-columns">
            <div>
              <h3>Implemented</h3>
              <CapabilityList
                items={carvonCaseStudy.securityPrivacy.implemented}
                status="implemented"
              />
            </div>
            <div>
              <h3>Must be hardened</h3>
              <CapabilityList
                items={carvonCaseStudy.securityPrivacy.backlog}
                status="next"
              />
            </div>
          </div>
        </CaseSection>

        <CaseSection
          id="connector-strategy"
          eyebrow="08 · Marketplace connector strategy"
          title="Marketplace connector strategy"
          Icon={Radar}
          description="Every connector declares its capabilities and operational constraints instead of promising a uniform marketplace API."
        >
          <div className="table-scroll" tabIndex={0}>
            <table className="strategy-table">
              <caption className="sr-only">
                Marketplace connector research status
              </caption>
              <thead>
                <tr>
                  <th scope="col">Channel</th>
                  <th scope="col">Scope</th>
                  <th scope="col">Connector status</th>
                </tr>
              </thead>
              <tbody>
                {carvonCaseStudy.regionalStrategy.map((item) => (
                  <tr key={item.marketplace}>
                    <th scope="row">{item.marketplace}</th>
                    <td>{item.scope}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="decision-grid section-subgrid">
            {carvonCaseStudy.connectorCapabilities.map((item) => (
              <article key={item.capability}>
                <StatusBadge status="planned" />
                <h3>{item.capability}</h3>
                <p>{item.requirement}</p>
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          id="canonical-data-model"
          eyebrow="09 · Canonical commerce data model"
          title="Canonical commerce data model"
          Icon={Database}
          description="External schemas remain behind connectors; the internal model grows only as implemented ingestion paths require it."
        >
          <div className="entity-grid">
            {carvonCaseStudy.canonicalCommerceModel.map((group) => (
              <article key={group.group}>
                <StatusBadge
                  status={group.status === 'partial' ? 'building' : 'planned'}
                />
                <h3>{group.group}</h3>
                <p className="entity-list">{group.entities}</p>
                <p>{group.note}</p>
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          id="ingestion-pipeline"
          eyebrow="10 · Ingestion and data-quality pipeline"
          title="Ingestion and data-quality pipeline"
          Icon={Workflow}
          description="The service layer is not connected today; the diagram is the planned MVP implementation contract."
        >
          <FlowDiagram
            title="Planned regional ingestion flow"
            description="Regional API or seller report to source evidence, canonical records, governed metrics and product experiences."
            nodes={carvonCaseStudy.marketplacePipeline}
          />
        </CaseSection>

        <CaseSection
          id="kpi-model"
          eyebrow="11 · Governed KPI and semantic layer"
          title="Governed KPI and semantic layer"
          Icon={Database}
          description="The interface currently visualises sample metrics. Production metrics must be reconciled, freshness-aware and calculated outside UI components."
        >
          <p className="section-callout">{carvonCaseStudy.metricBoundary}</p>
          <div className="kpi-definition-grid">
            {carvonCaseStudy.kpiModel.map((metric) => (
              <article key={metric.name}>
                <StatusBadge status="planned" />
                <h3>{metric.name}</h3>
                <p>{metric.definition}</p>
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          id="ai-architecture"
          eyebrow="12 · AI Business Analyst architecture"
          title="AI Business Analyst architecture"
          Icon={Sparkles}
          description="The language model may explain validated results; it does not calculate revenue, fees, profit or inventory."
        >
          <p className="section-callout">{carvonCaseStudy.aiCurrentState}</p>
          <FlowDiagram
            title="Planned governed analysis flow"
            description="Authorised context and governed metric execution produce an evidence package before natural-language explanation."
            nodes={carvonCaseStudy.aiDataFlow}
          />
          <div className="section-subgrid">
            <h3>Evaluation and safety gates</h3>
            <BulletList items={carvonCaseStudy.aiGuardrails} />
          </div>
        </CaseSection>

        <CaseSection
          id="dashboard-workflows"
          eyebrow="13 · Dashboard decision workflows"
          title="Dashboard decision workflows"
          Icon={Radar}
          description="Each planned view is tied to a seller decision rather than a decorative chart."
        >
          <BulletList items={carvonCaseStudy.dashboardDecisions} />
        </CaseSection>

        <CaseSection
          id="engineering-tradeoffs"
          eyebrow="14 · Engineering decisions and trade-offs"
          title="Engineering decisions and trade-offs"
          Icon={ShieldCheck}
        >
          <div className="tradeoff-grid">
            {carvonCaseStudy.architectureDecisions.map((item) => (
              <article key={item.decision}>
                <h3>{item.decision}</h3>
                <p>{item.judgement}</p>
                <p>
                  <strong>Trade-off:</strong> {item.tradeoff}
                </p>
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          id="current-limitations"
          eyebrow="15 · Current limitations"
          title="Current limitations"
          Icon={CircleAlert}
        >
          <aside
            className="limitations-panel"
            aria-labelledby="limitations-list-title"
          >
            <h3 id="limitations-list-title">
              Boundaries found in the repository and live product
            </h3>
            <BulletList items={carvonCaseStudy.limitations} />
          </aside>
        </CaseSection>

        <CaseSection
          id="expansion-strategy"
          eyebrow="16 · Expansion strategy"
          title="Expansion strategy"
          Icon={Rocket}
          description="Regional reliability comes before AI-assisted workflows and global connector breadth."
        >
          <div className="roadmap-grid">
            {carvonCaseStudy.roadmap.map((phase) => (
              <article key={phase.phase}>
                <StatusBadge status={phase.status} />
                <h3>{phase.phase}</h3>
                <BulletList items={phase.items} />
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          id="technology-stack"
          eyebrow="17 · Technology stack"
          title="Technology stack"
          Icon={Database}
          description="The stack below is evidenced in the repository; the capability signals are tied to the implementation and architecture decisions above."
        >
          <ul className="stack-list" aria-label="Carvon AI technology stack">
            {carvonCaseStudy.fullTechnologyStack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <div className="section-subgrid">
            <h3>Recruiter-facing capability evidence</h3>
            <BulletList items={carvonCaseStudy.hiringRelevance} />
          </div>
        </CaseSection>

        <CaseSection
          id="product-links"
          eyebrow="18 · Repository and live-product links"
          title="Repository and live-product links"
          Icon={ExternalLink}
          description="The live site is public. The source repository is private, so an inaccessible GitHub CTA is intentionally omitted."
        >
          <div className="evidence-and-media">
            <div>
              <BulletList items={carvonCaseStudy.evidence} />
              <p className="repository-note">
                <LockKeyhole aria-hidden="true" size={16} />
                Repository visibility: private. Access can be granted directly
                when appropriate.
              </p>
              <ProjectActions
                project={carvonProject}
                showCaseStudy={false}
              />
            </div>
            {carvonProject.screenshots.map((screenshot) => (
              <figure className="product-screenshot" key={screenshot.src}>
                <ProjectImage
                  image={screenshot}
                  className="product-screenshot-image"
                />
                <figcaption>{screenshot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </CaseSection>

        <aside className="carvon-closing" aria-labelledby="carvon-closing-title">
          <div>
            <p className="eyebrow">Current product access</p>
            <h2 id="carvon-closing-title">Inspect the deployed foundation</h2>
            <p>
              The live site demonstrates the product shell and authentication
              boundary. Connector, KPI and AI service claims remain planned
              until they have production evidence.
            </p>
          </div>
          <ProjectActions project={carvonProject} showCaseStudy={false} />
        </aside>
      </article>
    </>
  );
};

export default CarvonCaseStudy;

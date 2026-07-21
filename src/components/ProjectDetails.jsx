import {
  ArrowLeft,
  CheckCircle2,
  Database,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import { createElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProjectActions from './ProjectActions';
import ProjectImage from './ProjectImage';
import Seo from './Seo';
import {
  getProjectBySlug,
  getProjectText,
} from '../data/projects';
import { profile } from '../data/profile';
import { buildProjectStructuredData } from '../data/structuredData';

/**
 * @param {{
 *   title: string;
 *   Icon?: import('lucide-react').LucideIcon;
 *   children: import('react').ReactNode;
 *   className?: string;
 * }} props
 */
const DetailSection = ({ title, Icon, children, className = '' }) => (
  <section className={`case-study-section ${className}`.trim()}>
    <h2>
      {Icon && createElement(Icon, { 'aria-hidden': true, size: 21 })}
      {title}
    </h2>
    {children}
  </section>
);

const BulletList = ({ items }) => (
  <ul className="detail-list">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const ProjectDetails = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <Seo
          title={`${t('project-not-found')} | ${profile.fullName}`}
          description={t('project-not-found-description')}
          path={`/projects/${slug || ''}`}
          noIndex
        />
        <article className="page-card empty-state">
          <h1 data-page-heading tabIndex={-1}>
            {t('project-not-found')}
          </h1>
          <p>{t('project-not-found-description')}</p>
          <Link className="button button-primary" to="/projects">
            <ArrowLeft aria-hidden="true" size={17} />
            {t('back-to-projects')}
          </Link>
        </article>
      </>
    );
  }

  const text = getProjectText(project, i18n.resolvedLanguage);
  const seoTitle = `${text.title} | ${profile.fullName}`;
  const structuredData = buildProjectStructuredData(project, text.title);
  const seoImage =
    'fallback' in project.image && project.image.fallback
      ? project.image.fallback
      : project.image.src;

  return (
    <>
      <Seo
        title={seoTitle}
        description={text.shortSummary}
        path={project.caseStudyUrl}
        image={seoImage}
        imageAlt={project.image.alt}
        type="article"
        structuredData={structuredData}
      />

      <article className="page-card case-study">
        <nav className="breadcrumb" aria-label={t('breadcrumb')}>
          <Link to="/projects">
            <ArrowLeft aria-hidden="true" size={16} />
            {t('back-to-projects')}
          </Link>
        </nav>

        <header className="case-study-header">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1 data-page-heading tabIndex={-1}>
              {text.title}
            </h1>
            <p className="page-lead">{text.shortSummary}</p>
          </div>
          <ProjectActions project={project} showCaseStudy={false} />
        </header>

        <figure className="case-study-figure">
          <ProjectImage
            image={project.image}
            className="case-study-image"
            loading="eager"
            sizes="(max-width: 980px) calc(100vw - 48px), 900px"
          />
          <figcaption>{project.image.alt}</figcaption>
        </figure>

        <div className="case-study-grid">
          <DetailSection title={t('project-overview')} Icon={Lightbulb}>
            <p>{project.solution}</p>
          </DetailSection>

          <DetailSection title={t('business-problem')} Icon={Database}>
            <p>{project.businessProblem}</p>
          </DetailSection>

          <DetailSection title={t('data-sources')}>
            <BulletList items={project.dataSources} />
          </DetailSection>

          <DetailSection title={t('data-cleaning')}>
            <BulletList items={project.cleaningProcess} />
          </DetailSection>

          <DetailSection title={t('architecture-model')}>
            <p>{project.architecture}</p>
          </DetailSection>

          <DetailSection title={t('technical-implementation')} Icon={Wrench}>
            <p>{project.technicalImplementation}</p>
          </DetailSection>

          <DetailSection title={t('key-logic')}>
            <BulletList items={project.keyLogic} />
          </DetailSection>

          <DetailSection title={t('validation-checks')} Icon={CheckCircle2}>
            <BulletList items={project.validation} />
          </DetailSection>

          <DetailSection title={t('key-findings')} className="case-study-wide">
            <BulletList items={project.findings} />
          </DetailSection>

          <DetailSection title={t('limitations')}>
            <BulletList items={project.limitations} />
          </DetailSection>

          <DetailSection title={t('improve-next')}>
            <BulletList items={project.nextSteps} />
          </DetailSection>
        </div>

        <aside className="evidence-panel" aria-labelledby="evidence-title">
          <div>
            <p className="eyebrow" id="evidence-title">
              {t('evidence')}
            </p>
            <h2>{t('inspect-the-work')}</h2>
          </div>
          <ul>
            {project.evidence.map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" size={18} />
                {item}
              </li>
            ))}
          </ul>
          <ProjectActions project={project} showCaseStudy={false} />
        </aside>
      </article>
    </>
  );
};

export default ProjectDetails;

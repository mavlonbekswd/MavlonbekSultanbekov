import {
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  DatabaseZap,
  Download,
  ExternalLink,
  GraduationCap,
  Rocket,
  Wrench,
} from 'lucide-react';
import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from './Seo';
import { carvonVenture } from '../data/carvon';
import { pageSeo, profile } from '../data/profile';
import {
  certifications,
  education,
  experience,
} from '../data/resume';

const TimelineItem = ({
  title,
  organisation,
  date,
  context,
  url,
  bullets,
}) => (
  <li className="timeline-item">
    <span className="timeline-marker" aria-hidden="true" />
    <div className="timeline-content">
      <div className="timeline-heading">
        <div>
          <h3>{title}</h3>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {organisation}
            <ExternalLink aria-hidden="true" size={15} />
          </a>
        </div>
        <p className="timeline-date">
          {date}
          {context && <span>{context}</span>}
        </p>
      </div>
      <ul className="timeline-bullets">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  </li>
);

const TimelineSection = ({ id, title, Icon, items, t }) => (
  <section className="resume-section" aria-labelledby={id}>
    <h2 id={id}>
      {createElement(Icon, { 'aria-hidden': true, size: 22 })}
      {title}
    </h2>
    <ol className="timeline">
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          title={t(item.roleKey || item.qualificationKey)}
          organisation={t(
            item.organisationKey || item.institutionKey,
          )}
          date={t(item.dateKey)}
          context={item.contextKey ? t(item.contextKey) : undefined}
          url={item.organisationUrl || item.institutionUrl}
          bullets={item.bulletKeys.map((key) => t(key))}
        />
      ))}
    </ol>
  </section>
);

const SkillGroup = ({ title, skills }) => (
  <section className="skill-panel">
    <h3>{title}</h3>
    <ul className="skill-list">
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </section>
);

const certificateIcons = {
  analytics: BarChart3,
  engineering: DatabaseZap,
};

const CertificationSection = ({ items, t }) => (
  <section className="resume-section" aria-labelledby="certifications">
    <h2 id="certifications">
      <Award aria-hidden="true" size={22} />
      {t('certifications')}
    </h2>
    <ul className="certificate-grid">
      {items.map((certificate) => {
        const Icon = certificateIcons[certificate.icon] || Award;

        return (
          <li key={certificate.id}>
            <article className="certificate-card">
              <div className="certificate-heading">
                <span className="certificate-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span className="certificate-category">
                  {certificate.category}
                </span>
              </div>
              <h3>{certificate.title}</h3>
              {certificate.certificateType && (
                <p className="certificate-type">
                  {certificate.certificateType}
                </p>
              )}
              <dl className="certificate-meta">
                <div>
                  <dt>{t('issuer')}</dt>
                  <dd>{certificate.issuer}</dd>
                </div>
                <div>
                  <dt>{t('issued')}</dt>
                  <dd>
                    <time dateTime={certificate.issueDateIso}>
                      {certificate.issueDate}
                    </time>
                  </dd>
                </div>
                {certificate.credentialId && (
                  <div>
                    <dt>{t('credential-id')}</dt>
                    <dd>{certificate.credentialId}</dd>
                  </div>
                )}
              </dl>
              <div className="certificate-actions">
                <a
                  className="button button-secondary"
                  href={certificate.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('view-certificate')}: ${certificate.title} (${t('opens-new-tab')})`}
                >
                  {t('view-certificate')}
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
                <a
                  className="button button-secondary"
                  href={certificate.path}
                  download={certificate.downloadName}
                  aria-label={`${t('download-pdf')}: ${certificate.title}`}
                >
                  <Download aria-hidden="true" size={16} />
                  {t('download-pdf')}
                </a>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  </section>
);

const VentureSection = ({ language, t }) => {
  const normalizedLanguage = language?.split('-')[0] || 'en';
  const text =
    carvonVenture.translations[normalizedLanguage] ||
    carvonVenture.translations.en;

  return (
    <section className="resume-section" aria-labelledby="independent-ventures">
      <h2 id="independent-ventures">
        <Rocket aria-hidden="true" size={22} />
        {t('product-engineering-ventures')}
      </h2>

      <article className="venture-card">
        <div className="venture-heading">
          <div>
            <p className="venture-status">
              <span aria-hidden="true" />
              {carvonVenture.status.label}
            </p>
            <h3>{text.title}</h3>
            <p>{text.organisation}</p>
          </div>
          <p className="timeline-date">
            {text.date}
            <span>{text.location}</span>
          </p>
        </div>
        <ul className="timeline-bullets">
          {text.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <Link className="text-link" to={carvonVenture.caseStudyUrl}>
          {t('read-carvon-case-study')}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </article>
    </section>
  );
};

const Resume = () => {
  const { t, i18n } = useTranslation();
  const dataExperience = experience.filter(({ group }) => group === 'data');
  const softwareExperience = experience.filter(
    ({ group }) => group === 'software',
  );

  return (
    <>
      <Seo {...pageSeo.resume} />

      <article className="page-card resume-page">
        <header className="page-header resume-header">
          <div>
            <p className="eyebrow">{profile.secondaryContext}</p>
            <h1 data-page-heading tabIndex={-1}>
              {t('resume-title')}
            </h1>
            <p className="page-lead">{t('resume-description')}</p>
          </div>
          <Link className="button button-primary" to="/contact">
            {t('discuss-opportunity')}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </header>

        <TimelineSection
          id="experience"
          title={t('experience')}
          Icon={BriefcaseBusiness}
          items={dataExperience}
          t={t}
        />

        <VentureSection language={i18n.resolvedLanguage} t={t} />

        <TimelineSection
          id="software-experience"
          title={t('additional-software-experience')}
          Icon={Wrench}
          items={softwareExperience}
          t={t}
        />

        <TimelineSection
          id="education"
          title={t('education')}
          Icon={GraduationCap}
          items={education}
          t={t}
        />

        <section className="resume-section" aria-labelledby="technical-profile">
          <h2 id="technical-profile">
            <Wrench aria-hidden="true" size={22} />
            {t('technical-profile')}
          </h2>
          <div className="skills-grid">
            <SkillGroup
              title={t('core-technical-skills')}
              skills={profile.skills.core}
            />
            <SkillGroup
              title={t('applied-ai-automation')}
              skills={profile.skills.appliedAi}
            />
            <SkillGroup title={t('tools')} skills={profile.skills.tools} />
          </div>
        </section>

        <CertificationSection items={certifications} t={t} />
      </article>
    </>
  );
};

export default Resume;

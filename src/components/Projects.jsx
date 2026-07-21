import { Check, DatabaseZap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectActions from './ProjectActions';
import ProjectImage from './ProjectImage';
import Seo from './Seo';
import {
  getProjectText,
  projectMatchesCategory,
  projects,
} from '../data/projects';
import { pageSeo, profile } from '../data/profile';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        projectMatchesCategory(project, activeCategory),
      ),
    [activeCategory],
  );

  return (
    <>
      <Seo {...pageSeo.projects} />

      <article className="page-card projects-page">
        <header className="page-header">
          <div>
            <p className="eyebrow">{profile.professionalTitle}</p>
            <h1 data-page-heading tabIndex={-1}>
              {t('projects-title')}
            </h1>
            <p className="page-lead">{t('projects-description')}</p>
          </div>
        </header>

        <div
          className="project-filters"
          role="group"
          aria-label={t('filter-projects')}
        >
          {profile.projectCategories.map((category) => {
            const isActive = activeCategory === category;
            const label = category === 'All' ? t('category-all') : category;

            return (
              <button
                className="filter-button"
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
              >
                {isActive && <Check aria-hidden="true" size={15} />}
                {label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {t('projects-filter-result', { count: filteredProjects.length })}
        </p>

        {filteredProjects.length > 0 ? (
          <div className="project-grid">
            {filteredProjects.map((project) => {
              const text = getProjectText(
                project,
                i18n.resolvedLanguage,
              );

              return (
                <article
                  className={`project-card ${
                    project.tier === 'flagship'
                      ? 'flagship-project-card'
                      : ''
                  }`.trim()}
                  key={project.id}
                >
                  <div className="project-card-media">
                    <ProjectImage
                      image={project.image}
                      className={`project-image ${
                        project.image.presentation === 'contain'
                          ? 'project-image-contain'
                          : ''
                      }`.trim()}
                      sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 1120px) 55vw, 420px"
                    />
                    {project.featured && (
                      <span className="featured-badge">
                        {project.tier === 'flagship'
                          ? t('flagship-project')
                          : t('featured-project')}
                      </span>
                    )}
                    {project.statusLabel && (
                      <span className="project-status-badge">
                        <span aria-hidden="true" />
                        {project.statusLabel}
                      </span>
                    )}
                  </div>

                  <div className="project-card-content">
                    <div>
                      <p className="project-category">
                        {project.category}
                      </p>
                      <h2>{text.title}</h2>
                      <p className="project-summary">{text.shortSummary}</p>
                      {project.statusDetail && (
                        <p className="project-status-detail">
                          {project.statusDetail}
                        </p>
                      )}
                    </div>

                    <dl className="project-facts">
                      {project.tier !== 'flagship' && (
                        <>
                          <div>
                            <dt>{t('business-problem')}</dt>
                            <dd>{project.businessProblem}</dd>
                          </div>
                          <div>
                            <dt>{t('solution')}</dt>
                            <dd>{project.solution}</dd>
                          </div>
                        </>
                      )}
                      <div>
                        <dt>{t('evidence')}</dt>
                        <dd>
                          {('cardEvidence' in project
                            ? project.cardEvidence
                            : project.evidence)
                            .slice(0, 2)
                            .join(' · ')}
                        </dd>
                      </div>
                    </dl>

                    <div
                      className="tag-list"
                      aria-label={t('technology-stack')}
                    >
                      {project.technologyStack.map((technology) => (
                        <span className="tag" key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>

                    <ProjectActions project={project} />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <DatabaseZap aria-hidden="true" size={34} />
            <h2>{t('no-projects-title')}</h2>
            <p>{t('no-projects-description')}</p>
          </div>
        )}
      </article>
    </>
  );
};

export default Projects;

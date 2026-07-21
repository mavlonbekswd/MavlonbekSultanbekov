import { ExternalLink, Github, LayoutDashboard, FileText } from 'lucide-react';
import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const externalActions = [
  {
    key: 'liveDemoUrl',
    labelKey: 'view-dashboard',
    icon: LayoutDashboard,
    className: 'button button-primary',
  },
  {
    key: 'githubUrl',
    labelKey: 'github',
    icon: Github,
    className: 'button button-secondary',
  },
  {
    key: 'reportUrl',
    labelKey: 'view-report',
    icon: FileText,
    className: 'button button-secondary',
  },
];

const ProjectActions = ({ project, showCaseStudy = true }) => {
  const { t } = useTranslation();

  return (
    <div className="project-actions">
      {showCaseStudy && project.caseStudyUrl && (
        <Link className="button button-primary" to={project.caseStudyUrl}>
          {t('view-case-study')}
          <ExternalLink aria-hidden="true" size={17} />
        </Link>
      )}

      {externalActions.map(({ key, labelKey, icon, className }) => {
        const href = project[key];
        if (!href) return null;
        const resolvedLabelKey =
          key === 'liveDemoUrl' && project.liveDemoLabelKey
            ? project.liveDemoLabelKey
            : labelKey;

        return (
          <a
            key={key}
            className={className}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {createElement(icon, { 'aria-hidden': true, size: 17 })}
            {t(resolvedLabelKey)}
          </a>
        );
      })}
    </div>
  );
};

export default ProjectActions;

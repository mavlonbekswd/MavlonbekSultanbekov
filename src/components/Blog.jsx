import { BookOpen, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from './Seo';
import { pageSeo } from '../data/profile';

const futureTopics = [
  'Microsoft Fabric',
  'Power BI',
  'SQL',
  'Python & pandas',
  'Data quality',
];

const Blog = () => {
  const { t } = useTranslation();

  return (
    <>
      <Seo {...pageSeo.blog} noIndex />
      <article className="page-card coming-soon-page">
        <div className="icon-container coming-soon-icon">
          <BookOpen aria-hidden="true" size={30} />
        </div>
        <p className="eyebrow">{t('articles')}</p>
        <h1 data-page-heading tabIndex={-1}>
          {t('articles-coming-soon')}
        </h1>
        <p className="page-lead">{t('articles-description')}</p>
        <ul className="tag-list" aria-label={t('future-article-topics')}>
          {futureTopics.map((topic) => (
            <li className="tag" key={topic}>
              {topic}
            </li>
          ))}
        </ul>
        <Link className="button button-primary" to="/contact">
          <Mail aria-hidden="true" size={18} />
          {t('contact-me')}
        </Link>
      </article>
    </>
  );
};

export default Blog;

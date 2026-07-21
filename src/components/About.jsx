import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from './Seo';
import { pageSeo, profile } from '../data/profile';

const About = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.split('-')[0] || 'en';
  const aboutCopy = profile.about[language] || profile.about.en;

  return (
    <>
      <Seo {...pageSeo.home} />

      <article className="page-card about-page">
        <header className="about-hero">
          <p className="eyebrow">{profile.heroEyebrow}</p>
          <h1 data-page-heading tabIndex={-1}>
            {profile.professionalTitle}
          </h1>
          <p className="hero-statement">{profile.shortTagline}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">
              {t('view-data-projects')}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="button button-secondary" to="/contact">
              <Mail aria-hidden="true" size={18} />
              {t('contact-me')}
            </Link>
          </div>
        </header>

        <section className="about-story" aria-labelledby="about-story-title">
          <p className="eyebrow">{t('about')}</p>
          <h2 id="about-story-title">{t('about-story-title')}</h2>
          <div className="about-introduction">
            {aboutCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </article>
    </>
  );
};

export default About;

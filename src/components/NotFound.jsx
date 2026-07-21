import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Seo from './Seo';
import { profile } from '../data/profile';

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <Seo
        title={`Page not found | ${profile.fullName}`}
        description="The requested portfolio page could not be found."
        path={location.pathname}
        noIndex
      />
      <article className="page-card empty-state">
        <p className="eyebrow">404</p>
        <h1 data-page-heading tabIndex={-1}>
          Page not found
        </h1>
        <p>The page may have moved or the link may be out of date.</p>
        <Link className="button button-primary" to="/">
          <ArrowLeft aria-hidden="true" size={17} />
          Return to the portfolio
        </Link>
      </article>
    </>
  );
};

export default NotFound;

import { lazy, Suspense, useEffect, useRef } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import { initGA, logPageView } from './utils/analytics';
import { profile } from './data/profile';
import './i18n';

const About = lazy(() => import('./components/About'));
const Resume = lazy(() => import('./components/Resume'));
const Projects = lazy(() => import('./components/Projects'));
const CarvonCaseStudy = lazy(
  () => import('./components/CarvonCaseStudy'),
);
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const Contact = lazy(() => import('./components/Contact'));
const Blog = lazy(() => import('./components/Blog'));
const NotFound = lazy(() => import('./components/NotFound'));

const RouteEffects = () => {
  const location = useLocation();
  const isInitialRoute = useRef(true);

  useEffect(() => {
    logPageView(location.pathname);
    if (location.hash) return undefined;

    window.scrollTo({ top: 0, behavior: 'auto' });

    if (isInitialRoute.current) {
      isInitialRoute.current = false;
      return undefined;
    }

    const focusHeading = () => {
      const heading = /** @type {HTMLElement | null} */ (
        document.querySelector('[data-page-heading]')
      );
      if (!heading) return false;
      heading.focus({ preventScroll: true });
      return true;
    };

    if (focusHeading()) return undefined;

    const main = document.getElementById('main-content');
    if (!main) return undefined;

    const observer = new MutationObserver(() => {
      if (focusHeading()) observer.disconnect();
    });
    observer.observe(main, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [location.hash, location.pathname]);

  return null;
};

const AppContent = () => {
  const { t } = useTranslation();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {t('skip-to-content')}
      </a>

      <RouteEffects />

      <div className="portfolio-shell">
        <div className="portfolio-layout">
          <Sidebar />

          <div className="content-column">
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              <Suspense
                fallback={
                  <div className="page-card route-loading" role="status">
                    <span className="loading-indicator" aria-hidden="true" />
                    {t('loading-page')}
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/about" element={<Navigate to="/" replace />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route
                    path="/projects/fabric-data-engineering"
                    element={
                      <Navigate
                        to="/projects/microsoft-fabric-end-to-end-data-pipeline"
                        replace
                      />
                    }
                  />
                  <Route
                    path="/projects/car-sales-dashboard"
                    element={
                      <Navigate
                        to="/projects/power-bi-car-sales-analytics-dashboard"
                        replace
                      />
                    }
                  />
                  <Route
                    path="/projects/carvon-ai"
                    element={<CarvonCaseStudy />}
                  />
                  <Route
                    path="/projects/:slug"
                    element={<ProjectDetails />}
                  />
                  <Route
                    path="/project"
                    element={<Navigate to="/projects" replace />}
                  />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route
                    path="/blog/:slug"
                    element={<Navigate to="/blog" replace />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <footer className="site-footer">
              <p>
                © {new Date().getFullYear()} {profile.fullName}
              </p>
              <p>{profile.professionalTitle}</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

import { Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../context/ThemeContext';
import { navigationItems } from '../data/profile';

const ThemeButton = ({ isDark, toggleTheme, className = '' }) => (
  <button
    className={`utility-button ${className}`.trim()}
    type="button"
    onClick={toggleTheme}
    aria-pressed={isDark}
    aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
  >
    {isDark ? (
      <Sun aria-hidden="true" size={19} />
    ) : (
      <Moon aria-hidden="true" size={19} />
    )}
  </button>
);

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <div className="mobile-utilities" aria-label={t('display-controls')}>
        <LanguageSwitcher />
        <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
      </div>

      <nav className="site-nav" aria-label={t('primary-navigation')}>
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {t(item.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="desktop-utilities">
          <LanguageSwitcher />
          <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

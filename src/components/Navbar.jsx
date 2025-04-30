import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [showNavbar, setShowNavbar] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

        useEffect(() => {
          const handleScroll = () => {
            const isMobile = window.innerWidth < 768;

            if (window.scrollY > lastScrollY) {
              setShowNavbar(isMobile ? true : false);
            } else {
              setShowNavbar(isMobile ? false : true);
            }

            setLastScrollY(window.scrollY);
          };

          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, [lastScrollY]);
  return (
    <>
    
      {/* Mobile Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        aria-label="dark/light button"
        className={`lg:hidden fixed  top-4 right-4 z-50  p-2 rounded-lg shadow-lg flex items-center justify-center
          ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5  ' : ' border border-gray-400 hover:border-gray-700 bg-gradient-to-r from-white to-white/80'}
          backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
          hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
      >
        {isDark ? 
          <FaSun className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} /> : 
          <FaMoon className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
        }
      </motion.button>

      {/* Mobile/Tablet Language Switcher */}
  <div className={`lg:hidden fixed  top-[16px] right-16 z-50 rounded-lg ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5  ' : ' border border-gray-400 hover:border-gray-700 bg-gradient-to-r from-white to-white/80'} `}>
        <LanguageSwitcher />
      </div>

      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: showNavbar ? 0 : -50, opacity: showNavbar ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className={`${isDark ? 'bg-[#1f1f1f]' : 'bg-[#EEEE] border border-gray-400 hover:border-gray-700'} fixed backdrop-blur-sm h-[55px] sm:h-[60px] md:h-[85px] lg:h-[70px] w-[92%] 
         lg:left-[560px]  custom-navbar-position  md:left-[130px] sm:w-[450px] md:w-[600px] sm:right-[206px] sm:translate-x-0  lg:top-[75px] lg:w-[800px] px-3 sm:px-4  left-[15px] md:px-6 md:bottom-[30px]      
          lg:px-6 rounded-[32px] shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-between`}
      >

        
        <ul className="flex items-center ml-3 text-white gap-3.5  sm:gap-5 md:gap-10 lg:gap-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive 
                  ? (isDark ? 'text-white' : 'text-black')
                  : (isDark ? 'text-gray-400' : 'text-gray-600')
                } hover:${isDark ? 'text-white' : 'text-black'}  
                ${i18n.language === 'ru' 
                  ? 'text-[13px] sm:text-sm md:text-sm lg:text-base' 
                    : 'text-[16px] sm:text-base md:text-lg  lg:text-xl'}`
              }
            >
              {t('about')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resume"
              className={({ isActive }) =>
                `${isActive 
                  ? (isDark ? 'text-white' : 'text-black')
                  : (isDark ? 'text-gray-400' : 'text-gray-600')
                } hover:${isDark ? 'text-white' : 'text-black'} transition-colors
                 ${i18n.language === 'ru' 
                 ? 'text-[13px] sm:text-sm md:text-sm lg:text-base' 
                    : 'text-[16px] sm:text-base md:text-lg lg:text-xl'}`
              }
            >
             {t('resume')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${isActive 
                  ? (isDark ? 'text-white' : 'text-black')
                  : (isDark ? 'text-gray-400' : 'text-gray-600')
                } hover:${isDark ? 'text-white' : 'text-black'} transition-colors 
                 ${i18n.language === 'ru' 
                 ? 'text-[13px] sm:text-sm md:text-sm lg:text-base' 
                    : 'text-[16px] sm:text-base md:text-lg lg:text-xl'}`
              }
            >
              {t('projects')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `${isActive 
                  ? (isDark ? 'text-white' : 'text-black')
                  : (isDark ? 'text-gray-400' : 'text-gray-600')
                } hover:${isDark ? 'text-white' : 'text-black'} transition-colors 
                ${i18n.language === 'ru' 
                  ? 'text-[13px] sm:text-sm md:text-sm lg:text-base' 
                    : 'text-[16px] sm:text-base md:text-lg lg:text-xl'}`
              }
            >
              {t('blog')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${isActive 
                  ? (isDark ? 'text-white' : 'text-black')
                  : (isDark ? 'text-gray-400' : 'text-gray-600')
                } hover:${isDark ? 'text-white' : 'text-black'} transition-colors 
                 ${i18n.language === 'ru' 
                    ? 'text-[13px] sm:text-sm md:text-sm lg:text-base' 
                    : 'text-[16px] sm:text-base md:text-lg lg:text-xl'} `
              }
            >
              {t('contact')}
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {/* Desktop Language Switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Desktop Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="dark/light button"
            className={`hidden lg:flex p-2.5 rounded-lg shadow-lg items-center justify-center
              ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
              backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
              hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
          >
            {isDark ? 
              <FaSun className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} /> : 
              <FaMoon className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
            }
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;

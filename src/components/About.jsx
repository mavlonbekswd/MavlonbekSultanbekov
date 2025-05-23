import { Helmet } from 'react-helmet';
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { pageVariants, staggerContainer, fadeInUp, scaleIn } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';
import { FaSearch } from "react-icons/fa";
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const About = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  <LanguageSwitcher />

  return (
    <>
    <Helmet>
  <title>About Me | Mavlonbek Sultanbekov</title>
  <meta
    name="description"
    content="Learn more about Mavlonbek Sultanbekov – a passionate software engineer based in Cambridge, UK, building modern and user-friendly digital experiences."
    
  />
  <meta
    name="keywords"
    content="Mavlonbek Sultanbekov, About Mavlonbek, Software Engineer, Web Developer, Cambridge, Portfolio"
  />
  <meta name="author" content="Mavlonbek Sultanbekov" />
  <link rel="canonical" href="https://www.mavlonbek.com/about" />
   </Helmet>

    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${isDark ? 'bg-[#1f1f1f]' : 'bg-[#EEEEEE]'} p-3 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.2)]`}

    >
      {/* About Me Section */}
      <motion.section variants={staggerContainer}>
        
        <motion.h2 variants={fadeInUp} className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4 flex items-center`}>
          {t("about_me")}
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`block mt-1.5 h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
          ></motion.span>
        </motion.h2>
        <motion.div variants={staggerContainer} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}  space-y-4`}>
          <motion.p variants={fadeInUp} className="text-base lg:text-lg  leading-relaxed">
            {t("about-me-p1")}
         



          </motion.p>
          <motion.p variants={fadeInUp} className="text-base lg:text-lg leading-relaxed"> <Trans i18nKey="about-me-p2">
    In addition to coding, I'm interested in marketing, entrepreneurship, and building tools that make life easier.
    My mission is simple: <span className='text-green-600'>turn creative ideas into impactful digital products.</span>
  </Trans>
          </motion.p>
        </motion.div>
      </motion.section>

      {/* What I'm Doing Section */}
      <motion.section variants={staggerContainer}>
        <motion.h2 variants={fadeInUp} className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4 flex items-center lg:mb-6 mt-6`}>
          {t("what-i-do")}
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`block h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
          ></motion.span>
        </motion.h2>
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Web Development Card */}
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} p-4 lg:p-6 rounded-2xl shadow-[0_3px_10px_#000000] shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
          >
            <div className="flex items-start gap-4">
              <div className={`text-${isDark ? 'white' : 'gray-800'} text-xl lg:text-2xl`}>
                <FaCode />
              </div>
              <div>
                <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>{t("web-development")}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
                 {t("web-dev-p")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Web Development Card */}
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} p-4 lg:p-6 rounded-2xl shadow-[0_3px_10px_#000000] shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
          >
            <div className="flex items-start gap-4">
              <div className={`text-${isDark ? 'white' : 'gray-800'} text-xl lg:text-2xl`}>
                <FaSearch />
              </div>
              <div>
                <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>{t("seo-opt")}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
                {t("seo-description")}

                </p>
              </div>
            </div>
          </motion.div>

          {/* Blog Management Card */}
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} p-4 lg:p-6 rounded-2xl shadow-[0_3px_10px_#000000] shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
          >
            <div className="flex items-start gap-4">
              <div className={`text-${isDark ? 'white' : 'gray-800'} text-xl lg:text-2xl`}>
                <BiMessageSquareDetail />
              </div>
              <div>
                <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>{t("blog-title")}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
                {t("blog-description")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
    </>
  );
};

export default About;
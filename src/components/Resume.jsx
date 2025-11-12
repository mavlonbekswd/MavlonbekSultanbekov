import { Helmet } from 'react-helmet';
import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaBriefcase, FaTrophy, FaGithub,FaMedal, FaStar, FaAward, } from 'react-icons/fa';
import { ExternalLink } from "lucide-react";
import { BsBook } from 'react-icons/bs';
import {  SiNumpy,  SiTableau, SiMysql } from 'react-icons/si';
import { pageVariants, staggerContainer, fadeInUp, scaleIn } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const PowerBISVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 48 48">
<path fill="#eda503" d="M38,44H26c-0.552,0-1-0.448-1-1V5c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1v38	C39,43.552,38.552,44,38,44z"></path><path fill="#ffca28" d="M30,44H18c-0.552,0-1-0.448-1-1V15c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1v28	C31,43.552,30.552,44,30,44z"></path><path fill="#ffe082" d="M22,44H10c-0.552,0-1-0.448-1-1V25c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1v18	C23,43.552,22.552,44,22,44z"></path>
</svg>
);



const SiPandas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 48 48">
<rect width="5" height="10" x="18" y="4" fill="#1a237e"></rect><rect width="5" height="10" x="18" y="25" fill="#1a237e"></rect><rect width="5" height="5" x="18" y="17" fill="#fbc02d"></rect><rect width="5" height="33" x="10" y="13" fill="#1a237e"></rect><rect width="5" height="10" x="26" y="33" fill="#1a237e"></rect><rect width="5" height="10" x="26" y="12" fill="#1a237e"></rect><rect width="5" height="5" x="26" y="25" fill="#ff4081"></rect><rect width="5" height="33" x="34" y="2" fill="#1a237e"></rect>
</svg>
);

const FaPython = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 48 48">
<path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
</svg>
)

const FaFileExcel = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 48 48">
<path fill="#169154" d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"></path><path fill="#18482a" d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"></path><path fill="#0c8045" d="M14 15.003H29V24.005000000000003H14z"></path><path fill="#17472a" d="M14 24.005H29V33.055H14z"></path><g><path fill="#29c27f" d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"></path><path fill="#27663f" d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"></path><path fill="#19ac65" d="M29 15.003H44V24.005000000000003H29z"></path><path fill="#129652" d="M29 24.005H44V33.055H29z"></path></g><path fill="#0c7238" d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"></path><path fill="#fff" d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"></path>
</svg>
)


const Resume = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();


  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"

      className={` space-y-8 lg:space-y-12 ${isDark ? 'bg-[#1f1f1f]' : 'bg-[#EEEEEE]'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.2)]`}
    >
      {/* Header with Download Button */}
      <motion.div variants={fadeInUp} className="flex justify-between items-center">
        <h2 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} flex items-center`}>
          {t("resume-sec")}
          <span
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`block mt-1.5 h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
          ></span>
        </h2>
        <a
          variants={scaleIn}
          href="/CV-Mavlonbek Sultonbekov.pdf"
          download

          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg
            ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
            backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
            hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
        >
          <FaDownload className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          <span className={`hidden  ${isDark ? 'text-white' : 'text-black'} sm:inline`}>{t("download-cv")}</span>
        </a>
      </motion.div>

            {/* Experience Section */}


      <section variants={staggerContainer} initial="initial" animate="animate">
        <h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
        <FaBriefcase className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
        {t("experience")}
        </h3>
        <div className="space-y-6">



    {/* Emotiv Online */}
<TimelineItem
  title={
    <div className="flex items-center gap-2">
      {/* Job + Company same line */}
      <span className="font-semibold text-lg">
        {t("emotiv-role")}
      </span>
      <a
        href="https://emotivonline.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
      >
        <span>{t("emotiv-title")}</span>
        <ExternalLink size={16} />
      </a>
    </div>
  }
  date={
    <span className="text-sm">
      {t("emotiv-date")}
    </span>
  }
  duration={
    <span className="text-sm">
      {t("emotiv-duration")}
    </span>
  }
  description={
    <div className="mt-2 leading-relaxed">
      <p>{t("emotiv-description1")}</p>
      <p>{t("emotiv-description2")}</p>
    </div>
  }
  isDark={isDark}
/>


                  {/* Itransition Group */}
            <TimelineItem
            title={
              <div className="flex items-center gap-2">
                {/* Job + Company same line */}
                <span className="font-semibold  text-lg">
                  {t("itransition-role")}
                </span>
                <a
                  href="https://www.itransition.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500  hover:text-blue-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>{t("itransition-title")}</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            }
            date={
              <span className="text-sm ">
                {t("itransition-date")}
              </span>
            }
            duration={
              <span className="text-sm  ">
                {t("itransition-duration")}
              </span>
            }
            description={
              <div className="mt-2 leading-relaxed  ">
                <p>{t("itransition-description1")}</p>
                <p>{t("itransition-description2")}</p>
              </div>
            }
            isDark={isDark}
          />



            {/* Quy Mill Hotel & Spa */}
            <TimelineItem
              title={
                <div className="flex items-center gap-2">
                  {/* Job + Company same line */}
                  <span className="font-semibold text-lg">
                    {t("quymill-role")}
                  </span>
                  <a
                    href="https://www.cambridgequymill.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    <span>{t("quymill-title")}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              }
              date={
                <span className="text-sm">
                  {t("quymill-date")}
                </span>
              }
              duration={
                <span className="text-sm">
                  {t("quymill-duration")}
                </span>
              }
              description={
                <div className="mt-2 leading-relaxed">
                  <p>{t("quymill-description1")}</p>
                  <p>{t("quymill-description2")}</p>
                </div>
              }
              isDark={isDark}
            />






         {/* SpeedFix Plumbing LTD */}
          <TimelineItem
            title={
              <div className="flex items-center gap-2">
                {/* Job + Company same line */}
                <span className="font-semibold text-lg">
                  {t("speedfix-role")}
                </span>
                <a
                  href="https://urgentplumbing.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>{t("speedfix-title")}</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            }
            date={
              <span className="text-sm">
                {t("speedfix-date")}
              </span>
            }
            duration={
              <span className="text-sm">
                {t("speedfix-duration")}
              </span>
            }
            description={
              <div className="mt-2 leading-relaxed">
                <p>{t("speedfix-description1")}</p>
                <p>{t("speedfix-description2")}</p>
              </div>
            }
            isDark={isDark}
          />



        </div>
      </section>

      {/* Education Section */}
      <motion.section variants={staggerContainer} initial="initial" animate="animate">
        <motion.h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <FaGraduationCap className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
          {t("education")}
        </motion.h3>
        <div className="space-y-6">
          {/* Anglia Ruskin University */}
<TimelineItem
  title={
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">{t("aru-degree")}</span>
      <a
        href="https://aru.ac.uk"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
      >
        <span>{t("aru-title")}</span>
        <ExternalLink size={16} />
      </a>
    </div>
  }
  date={<span className="text-sm">{t("aru-date")}</span>}
  description={
    <div className="mt-2 leading-relaxed">
      <p>{t("aru-description1")}</p>
      <p>{t("aru-description2")}</p>
    </div>
  }
  isDark={isDark}
/>

{/* MAAB Innovation LLC */}
<TimelineItem
  title={
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">{t("maab-degree")}</span>
      <a
        href="https://maab.uz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
      >
        <span>{t("maab-title")}</span>
        <ExternalLink size={16} />
      </a>
    </div>
  }
  date={<span className="text-sm">{t("maab-date")}</span>}
  description={
    <div className="mt-2 leading-relaxed">
      <p>{t("maab-description1")}</p>
      <p>{t("maab-description2")}</p>
    </div>
  }
  isDark={isDark}
/>

        </div>
      </motion.section>



      {/* Rewards Section */}
      {/* <section variants={staggerContainer} initial="initial" animate="animate">
        <motion.h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <FaTrophy className={`${isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} text-2xl`} />
          {t("rewards-title")}
        </motion.h3>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {[
          {
            title: t("rewards.hackathon.title"),
            description: t("rewards.hackathon.description"),
            year: "2023",
            Icon: FaTrophy,
            color: "#FFD700",
          },
          {
            title: t("rewards.top_performer.title"),
            description: t("rewards.top_performer.description"),
            year: "2023",
            Icon: FaMedal,
            color: "#C0C0C0",
          },
          {
            title: t("rewards.project_excellence.title"),
            description: t("rewards.project_excellence.description"),
            year: "2024",
            Icon: FaAward,
            color: "#CD7F32",
          }
        ] .map((reward) => (
            <motion.div
              key={reward.title}
              variants={fadeInUp}
              className={`p-4 rounded-xl ${
                isDark
                  ? 'bg-[#2a2a2a] text-[#e2e2e2]'
                  : 'bg-gray-100 text-gray-800'
              } hover:transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-start gap-3">
                <reward.Icon className="text-3xl" style={{ color: reward.color }} />
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {reward.title}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {reward.year}
                  </p>
                  <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {reward.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section> */}



      {/* Skills Section */}
      <section variants={staggerContainer} initial="initial" animate="animate">
        <h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <BsBook className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
          {t("skills.title")}
        </h3>
        <p className={isDark ? 'text-[#e2e2e2] mb-4' : 'text-gray-800 mb-4' }> {t("skills.description")}</p>
        <div
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {[
             { name: 'Excel', icon: FaFileExcel, color: '#217346' },
   { name: 'Power BI', icon: PowerBISVG },
  { name: 'Python', icon: FaPython },
  { name: 'NumPy', icon: SiNumpy, color: '#F2C811' },
  { name: 'Pandas', icon: SiPandas },
  { name: 'Tableau', icon: SiTableau, color: '#E97627' },
  { name: 'SQL', icon: SiMysql },
  { name: 'Github', icon: FaGithub, color: 'white' }
          ].map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                variants={fadeInUp}
                className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-[#2a2a2a] text-[#e2e2e2]'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <Icon className="text-xl" style={{ color: skill.color }} />
                <span>{skill.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

const TimelineItem = ({ title, date, duration, description, isDark }) => (
  <>

<Helmet>
  <title>Resume | Mavlonbek Sultanbekov</title>
  <meta
    name="description"
    content="View the resume of Mavlonbek Sultanbekov, a software engineer from Cambridge, UK. Download CV and explore experience, skills, and education."
  />
  <meta
    name="keywords"
    content="Resume, Mavlonbek Sultanbekov, CV, Software Engineer, Developer Experience, Skills, Download CV"
  />
  <meta name="author" content="Mavlonbek Sultanbekov" />
  <link rel="canonical" href="https://www.mavlonbek.com/resume/" />
</Helmet>

  <div
    variants={fadeInUp}
    className={`relative pl-6 pb-6 border-l-2 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'} last:border-0 last:pb-0`}
  >
    <div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className={`absolute -left-[9px] top-0 w-4 h-4 ${isDark ? 'bg-[#1f1f1f] border-[#e2e2e2]' : 'bg-white border-gray-800'} border-2 rounded-full`}
    ></div>
    <div>
      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-1`}>{title}</h4>


      <span className={`${isDark ? 'text-[#e2e2e2]' : 'text-gray-600'} text-sm mb-2 block`}>
  {date}
  <span className="text-xs ml-2 text-gray-400" >{duration}</span>
</span>


<div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm lg:text-base`}>{description} </div>
    </div>
  </div>
  </>
);

export default Resume;
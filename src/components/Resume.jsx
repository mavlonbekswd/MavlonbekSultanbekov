import { Helmet } from 'react-helmet';
import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaBriefcase, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaTrophy, FaMedal, FaStar, FaAward } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import { SiMongodb, SiTailwindcss } from 'react-icons/si';
import { pageVariants, staggerContainer, fadeInUp, scaleIn } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Resume = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
 

  return (
    <div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
     
      className={` space-y-8 lg:space-y-12 ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)]`}
    >
      {/* Header with Download Button */}
      <div variants={fadeInUp} className="flex justify-between items-center">
        <h2 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} flex items-center`}>
          {t("resume-sec")}
          <span
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`block h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
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
      </div>

      {/* Education Section */}
      <motion.section variants={staggerContainer} initial="initial" animate="animate">
        <motion.h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <FaGraduationCap className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
          {t("education")}
        </motion.h3>
        <div className="space-y-6">
          <TimelineItem 
            title={t("timeline.title")}
            date={t("timeline.date")}
            description={t("timeline.description")}
            isDark={isDark}
          />
          <TimelineItem 
            title={t("najot-title")}
            date={t("najot-date")}
            duration={t("najot-duration")}
            description={t("najot-description")}
            isDark={isDark}
          />
        </div>
      </motion.section>

      {/* Experience Section */}
      

      <section variants={staggerContainer} initial="initial" animate="animate">
        <h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
        <FaBriefcase className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
        {t("experience")}
        </h3>
        <div className="space-y-6">
          <TimelineItem 
            title={t("speedfix-title")}
            date={t("speedfix-date")}
            duration={t("speedfix-duration")}
           description={
  <div>
    <p>{t("speedfix-description1")}</p>
    <p>{t("speedfix-description2")}</p>
  </div>
}

            
            isDark={isDark}
          />

      <TimelineItem 
            title={t("freelance-title")}
            date="2023 — 2024"
            duration={t("freelance-duration")}
            description={t("freelance-description")}
            isDark={isDark}
          />
          
        </div>
      </section>

      {/* Rewards Section */}
      <section variants={staggerContainer} initial="initial" animate="animate">
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
      </section>

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
            { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
            { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
            { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
            { name: 'React', icon: FaReact, color: '#61DAFB' },
            { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
            { name: 'Git', icon: FaGitAlt, color: '#F05032' },
            { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' }
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
    </div>
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
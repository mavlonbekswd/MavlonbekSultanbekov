import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaBriefcase, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaTrophy, FaMedal, FaStar, FaAward } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import { SiMongodb, SiTailwindcss } from 'react-icons/si';
import { pageVariants, staggerContainer, fadeInUp, scaleIn } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

const Resume = () => {
  const { isDark } = useTheme();

  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 75 },
    { name: 'MongoDB', level: 70 },
    { name: 'Git', level: 80 },
    { name: 'Tailwind', level: 85 }
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
     
      className={` space-y-8 lg:space-y-12 ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)]`}
    >
      {/* Header with Download Button */}
      <motion.div variants={fadeInUp} className="flex justify-between items-center">
        <h2 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} flex items-center`}>
          Resume
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`block h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
          ></motion.span>
        </h2>
        <motion.a
          variants={scaleIn}
          href="/CS-resume MavlonbekSultonbekov.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 ${isDark ? 'bg-[#2a2a2a] text-[#e2e2e2] hover:bg-[#333]' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-xl transition-colors`}
        >
          <FaDownload />
          <span className="hidden sm:inline">Download CV</span>
        </motion.a>
      </motion.div>

      {/* Education Section */}
      <motion.section variants={staggerContainer} initial="initial" animate="animate">
        <motion.h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <FaGraduationCap className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
          Education
        </motion.h3>
        <div className="space-y-6">
          <TimelineItem 
            title="Anglia Ruskin University"
            date="2024 — Present"
            description="Pursuing a Bachelor's degree in Computer Science at Anglia Ruskin University, Cambridge. The course covers software engineering, data structures, algorithms, databases, networks, and cybersecurity. Emphasis is placed on practical problem solving, real-world application of code, and collaborative projects. Currently developing skills in JavaScript, Python, and system design while staying up-to-date with the latest trends in modern web technologies."
            isDark={isDark}
          />
          <TimelineItem 
            title="Najot Ta'lim academy"
            date="2023 — 2024"
            description="Completed an intensive program in modern web development and IT fundamentals in Uzbekistan Tashkent.  Gained hands-on experience by building multiple projects from scratch, collaborating in team-based coding environments, and applying industry-standard practices. The academy provided a strong foundation for future academic and freelance work."
            isDark={isDark}
          />
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section variants={staggerContainer} initial="initial" animate="animate">
        <motion.h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <FaBriefcase className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
          Experience
        </motion.h3>
        <div className="space-y-6">
          <TimelineItem 
            title="Freelance Developer"
            date="2023 — Present"
            description="Collaborated with clients globally to deliver modern, high-performance websites tailored to their unique needs. Specialized in building responsive and accessible user interfaces using React and Tailwind CSS, while optimizing SEO and performance."
            isDark={isDark}
          />
        </div>
      </motion.section>

      {/* Rewards Section */}
      <motion.section variants={staggerContainer} initial="initial" animate="animate">
        <motion.h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <FaTrophy className={`${isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} text-2xl`} />
          Rewards & Achievements
        </motion.h3>
        <motion.div 
          variants={staggerContainer} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            {
              title: "Hackathon Winner",
              year: "2023",
              description: "First place in regional web development hackathon",
              Icon: FaTrophy,
              color: "#FFD700"
            },
            {
              title: "Top Performer",
              year: "2023",
              description: "Recognized as top student at Najot Ta'lim",
              Icon: FaMedal,
              color: "#C0C0C0"
            },
            {
              title: "Project Excellence",
              year: "2024",
              description: "Best project award for innovative web solution",
              Icon: FaAward,
              color: "#CD7F32"
            }
          ].map((reward) => (
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
      </motion.section>

      {/* Skills Section */}
      <motion.section variants={staggerContainer} initial="initial" animate="animate">
        <motion.h3 variants={fadeInUp} className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-6 flex items-center gap-3`}>
          <BsBook className={isDark ? 'text-[#e2e2e2]' : 'text-gray-800'} />
          My Skills
        </motion.h3>
        <p className={isDark ? 'text-[#e2e2e2] mb-4' : 'text-gray-800 mb-4' }>Here are some of the technologies I work with daily, and the ones I'm continuously mastering :</p>
        <motion.div 
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
              <motion.div
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
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

const TimelineItem = ({ title, date, description, isDark }) => (
  <motion.div
    variants={fadeInUp}
    className={`relative pl-6 pb-6 border-l-2 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'} last:border-0 last:pb-0`}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className={`absolute -left-[9px] top-0 w-4 h-4 ${isDark ? 'bg-[#1f1f1f] border-[#e2e2e2]' : 'bg-white border-gray-800'} border-2 rounded-full`}
    ></motion.div>
    <div>
      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-1`}>{title}</h4>
      <span className={`${isDark ? 'text-[#e2e2e2]' : 'text-gray-600'} text-sm mb-2 block`}>{date}</span>
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm lg:text-base`}>{description}</p>
    </div>
  </motion.div>
);

export default Resume;
import { Helmet } from 'react-helmet';
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { pageVariants, staggerContainer, fadeInUp, scaleIn } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';
import { FaSearch } from "react-icons/fa";

const About = () => {
  const { isDark } = useTheme();

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
      className={`${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-3 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)]`}

    >
      {/* About Me Section */}
      <motion.section variants={staggerContainer}>
        <motion.h2 variants={fadeInUp} className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4 flex items-center`}>
          About Me
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`block h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
          ></motion.span>
        </motion.h2>
        <motion.div variants={staggerContainer} className={`${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-4`}>
          <motion.p variants={fadeInUp} className="text-base lg:text-lg leading-relaxed">
          I'm a passionate software engineer originally from Uzbekistan, currently based in Cambridge, UK. I specialize in crafting modern, responsive, and user-friendly web applications using the latest technologies like React.js, Tailwind CSS, and JavaScript.

        From the moment I discovered programming, I knew it was more than just code — it was a way to solve real-world problems creatively and efficiently. I’m constantly learning and exploring new tools and techniques to build digital experiences that are both functional and beautifully designed.

        Whether it's developing full-stack web apps, designing portfolios, or helping businesses grow online — I approach every project with attention to detail and a strong focus on user experience.



          </motion.p>
          <motion.p variants={fadeInUp} className="text-base lg:text-lg leading-relaxed">
          In addition to coding, I'm interested in marketing, entrepreneurship, and building tools that make life easier. My mission is simple: <span className='text-green-600'>turn creative ideas into impactful digital products.</span>
          </motion.p>
        </motion.div>
      </motion.section>

      {/* What I'm Doing Section */}
      <motion.section variants={staggerContainer}>
        <motion.h2 variants={fadeInUp} className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4 flex items-center lg:mb-6 mt-6`}>
          What I'm Doing
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
                <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>Web Development</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
                  I create high-quality websites using modern technologies, focusing on frontend development.
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
                <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>SEO Optimization</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
                I optimize websites for better search engine visibility by improving structure, content, speed, and accessibility to help them rank higher on Google.

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
                <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>Blog Management</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
                  I write useful and engaging blog posts on various topics, maintaining interactive communication with my audience.
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
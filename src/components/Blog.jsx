import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Helmet } from 'react-helmet';


const Blog = () => {
  const { isDark } = useTheme();

  return (
    <>
    <Helmet>
  <title>Blog | Mavlonbek Sultanbekov</title>
  <meta
    name="description"
    content="Read blog posts and thoughts by Mavlonbek Sultanbekov on programming, technology, and personal development."
  />
  <meta
    name="keywords"
    content="Mavlonbek Blog, Programming Articles, Developer Insights, Coding Tips"
  />
  <meta name="author" content="Mavlonbek Sultanbekov" />
  <link rel="canonical" href="https://www.mavlonbek.com/blog/" />
</Helmet>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
     
      className={`  ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)]`}
    >
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Coming Soon
        </motion.h2>
        
        <p className={`text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Exciting content is on the way!
        </p>
      </div>
    </motion.div>
    </>
  );
};

export default Blog;

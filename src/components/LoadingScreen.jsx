import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = () => {
  const { isDark } = useTheme();

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  const name = "Mavlonbek Sultonbekov";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className={`fixed inset-0 text-lg z-50 flex flex-col items-center justify-center ${
        isDark ? 'bg-[#1f1f1f]' : 'bg-white'
      }`}
    >
      
      {/* Animated text */}
      <div className="flex mb-8">
        {name.split("").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className={`text-3xl lg:text-4xl tracking-wide font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}
            
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      {/* Loading bar */}
      <div className={`w-48 h-[2px] ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ 
            x: '100%',
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.0,
            ease: "easeInOut"
          }}
          className={`w-full h-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}
        />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className={`mt-4 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        Portfolio
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen; 
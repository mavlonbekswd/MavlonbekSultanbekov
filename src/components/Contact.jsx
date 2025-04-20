import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { pageVariants, fadeInUp } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      
      className={`  ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)]`}
    >
      <motion.div variants={fadeInUp} className="space-y-8">
        <div className="space-y-4">
          <h2 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} flex items-center`}>
            Contact Me
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "2rem" }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className={`block h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
            ></motion.span>
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
            Feel free to reach out to me through any of these channels. I'm always open to new opportunities and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} p-6 rounded-2xl space-y-4`}>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Contact Information</h3>
            <div className="space-y-3">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-medium">Email:</span> mavlonbeksultanbekov3@gmail.com
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-medium">Location:</span> Cambridge, UK
              </p>
            </div>
          </div>

          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} p-6 rounded-2xl space-y-4`}>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-2xl transition-colors`}
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-2xl transition-colors`}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-2xl transition-colors`}
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#2a2a2a] text-white border-gray-600 focus:border-gray-500' 
                    : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#2a2a2a] text-white border-gray-600 focus:border-gray-500' 
                    : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className={`w-full px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-[#2a2a2a] text-white border-gray-600 focus:border-gray-500' 
                  : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isDark
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
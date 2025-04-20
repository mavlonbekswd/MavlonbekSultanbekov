import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTelegram,
  FaGithub,
  FaCopy,
  FaCheck,
  FaDribbble,
  FaFileDownload
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { FaWhatsapp } from 'react-icons/fa6';

const Sidebar = () => {
  const { isDark } = useTheme();
  const [downloadError, setDownloadError] = useState(false);

  const handleDownloadCV = () => {
    try {
      window.open('/CS-resume MavlonbekSultonbekov.pdf', '_blank');
      setDownloadError(false);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadError(true);
      setTimeout(() => setDownloadError(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`h-full ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)] overflow-y-auto`}
    >
      <div className="flex flex-col items-center w-full">
        {/* Avatar Section */}
        <div className="relative">
          <div className={`relative p-1 rounded-2xl ${isDark ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' : 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'}`}>
            <img
              src="/mee.jpg"
              alt="avatar"
              className={`w-24 md:w-26 lg:w-28 h-24 md:h-26 lg:h-28 object-cover rounded-xl ${
                isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'
              } p-2`}
            />
            
            {/* LinkedIn-style Open to Work Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute -bottom-2 -right-2 transform"
            >
              <div className={`relative group cursor-pointer`}>
                <div className={`w-16 md:w-18 lg:w-20 h-6 md:h-6.5 lg:h-7 rounded-full flex items-center justify-center ${
                  isDark 
                    ? 'bg-[#0A6] bg-opacity-90' 
                    : 'bg-[#0A6] bg-opacity-90'
                } border-2 border-[#0A66]`}>
                  <span className="text-[9px] md:text-[9.5px] lg:text-[10px] font-medium text-white">Open to work</span>
                </div>
                
 {/* Hover tooltip */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 p-2 rounded-lg text-[10px] 
                  ${isDark 
                    ? 'bg-[#2a2a2a] text-white' 
                    : 'bg-white text-gray-800'} 
                  shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center`}>
                  <p className="font-medium">Looking for new opportunities</p>
                  <div className={`absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 
                    ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}`}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Name + Role */}
        <h2 className={`text-base md:text-[1.05rem] lg:text-lg font-bold mt-4 md:mt-5 lg:mt-6 ${isDark ? 'text-white' : 'text-black'}`}>Mavlonbek Sultonbekov</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-xs md:text-[13px] lg:text-sm ${
            isDark 
              ? 'bg-[#2a2a2a] text-gray-300' 
              : 'bg-gray-100 text-gray-600'
          } px-3 md:px-3.5 lg:px-4 py-1 mt-2 rounded-xl backdrop-blur-sm`}
        >
          Software Engineer
        </motion.p>

        {/* Download CV Button */}
        <motion.button
          onClick={handleDownloadCV}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-3 md:mt-3.5 lg:mt-4 flex items-center gap-2 px-3 md:px-3.5 lg:px-4 py-1.5 md:py-1.75 lg:py-2 rounded-xl ${
            isDark
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors duration-200 relative text-sm md:text-[13px] lg:text-base`}
        >
          <FaFileDownload className="text-base md:text-[1.1rem] lg:text-lg" />
          <span>Download CV</span>
          
          {/* Error Message */}
          {downloadError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm ${
                isDark ? 'text-red-400' : 'text-red-500'
              }`}
            >
              Failed to download CV
            </motion.div>
          )}
        </motion.button>

        <div className={`w-full h-[1px] my-4 md:my-5 lg:my-6 ${isDark ? 'bg-gradient-to-r from-transparent via-gray-700 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`} />

        {/* Contact Info */}
        <div className="space-y-3 md:space-y-3.5 lg:space-y-4 w-full text-left">
          
          <ContactItem  
            icon={<FaEnvelope />}
            label="EMAIL"
            value="mavlonbeksultanbekov3@gmail.com" 
            className={`text-[11px] md:text-[12px] lg:text-[13px] tracking-tight`}
            isDark={isDark}
          />
          
          <ContactItem
            icon={<FaPhone />}
            label="PHONE"
            value="+44 07881196552"
            className="text-xs md:text-[13px] lg:text-sm"
            isDark={isDark}
          />
          <ContactItem
            icon={<FaMapMarkerAlt />}
            label="LOCATION"
            value="Cambridge, UK"
            className="text-xs md:text-[13px] lg:text-sm"
            isDark={isDark}
          />
        </div>
          
        {/* Socials */}
        <div className="flex gap-3 md:gap-3.5 lg:gap-4 mt-4 md:mt-5 lg:mt-6">
          <SocialIcon href="https://www.linkedin.com/in/mavlonbek-sultanbekov-219098283/" icon={<FaLinkedin />} isDark={isDark} />
          <SocialIcon  href="tg://resolve?domain=mavlono_sulton&text=Hello%20Mavlonbek%2C%20I%20found%20your%20portfolio%20and%20wanted%20to%20connect!

" icon={<FaTelegram />} isDark={isDark} />
          <SocialIcon href="https://github.com/mavlonbekswd" icon={<FaGithub />} isDark={isDark} />
          <SocialIcon   href="https://wa.me/447881196552?text=Hello%20Mavlonbek%2C%20I%20found%20your%20portfolio%20and%20wanted%20to%20connect!
" icon={<FaWhatsapp />} isDark={isDark} />
        </div>
      </div>
    </motion.div>
  );
};

// Contact Info Block
const ContactItem = ({ icon, label, value,  isDark, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (label === "EMAIL") {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (label === "PHONE") {
      window.location.href = `tel:${value.replace( '+4407881196552')}`; // remove spaces
    }
  };
  
  

  const isClickable = label === "EMAIL" || label === "PHONE";

  return (
    <motion.div
      whileHover={isClickable ? { x: 5 } : {}}
      className={`flex items-center gap-4 group ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={handleCopy}
    >
      <div className={`${
        isDark 
          ? 'bg-[#2a2a2a] text-gray-300' 
          : 'bg-gray-100 text-gray-600'
      } p-3 rounded-xl transition-all duration-300 ${
        isClickable ? 'group-hover:shadow-lg' : ''
      }`}>
        {icon}
      </div>
      <div className="flex-grow">
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
        <p className={`${className || 'text-sm'} ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{value}</p>
      </div>
      {isClickable && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {copied ? (
            <FaCheck className={isDark ? 'text-gray-300' : 'text-gray-600'} />
          ) : (
            <FaCopy className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          )}
        </div>
      )}
    </motion.div>
  );
};

// Social Icon Component
const SocialIcon = ({ href, icon, isDark }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.95 }}
    className={`${
      isDark
        ? 'bg-[#2a2a2a] text-gray-300 hover:text-white hover:bg-[#333]'
        : 'bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-200'
    } p-3 rounded-xl transition-all duration-200 text-lg`}
  >
    {icon}
  </motion.a>
);

export default Sidebar;
  
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPhone } from "react-icons/fa6";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTelegram,
  FaGithub,
  FaCopy,
  FaCheck,
  FaDownload
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { FaWhatsapp } from 'react-icons/fa6';

const Sidebar = () => {
  const { isDark } = useTheme();
  const [downloadError, setDownloadError] = useState(false);
  const { t } = useTranslation();
  

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
      className={`h-full ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.3)] overflow-y-auto`}
    >
      <div className="flex flex-col items-center w-full">
        {/* Avatar Section */}
        <div className="relative">
          <div className={`relative p-1 rounded-2xl ${isDark ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' : 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'}`}>
            <img
              src="/mee.webp"
              alt="avatar"
              loading="lazy"
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
                <div className={`w-19 md:w-20 lg:w-20 h-6 md:h-6.5 lg:h-7 rounded-full flex items-center justify-center ${
                  isDark 
                    ? 'bg-[#0A6] bg-opacity-90' 
                    : 'bg-[#0A6] bg-opacity-90'
                } border-2 border-[#0A66]`}>
                  <span className="text-[9px] md:text-[9.5px] lg:text-[10px] font-medium text-white">{t('open_to_work')}</span>
                </div>
                
 {/* Hover tooltip */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 p-2 rounded-lg text-[10px] 
                  ${isDark 
                    ? 'bg-[#2a2a2a] text-white' 
                    : 'bg-white text-gray-800'} 
                  shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center`}>
                  <p className="font-medium">{t('looking-for-new-opportunities')}</p>
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
        <motion.a
          href="/CS-resume MavlonbekSultonbekov.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-6 p-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2
            ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
            backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
            hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
        >
          <FaDownload className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
            {t("download-cv")}
          </span>
        </motion.a>

        <div className={`w-full h-[1px] my-4 md:my-5 lg:my-6 ${isDark ? 'bg-gradient-to-r from-transparent via-gray-700 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`} />

        {/* Contact Info */}
        <div className="space-y-2 lg:space-y-7 md:space-y-3.5 lg:space-y-4 w-full  text-left">
          
          <ContactItem  
            icon={<FaEnvelope />}
            label={t("contact-email")}
            value="mavlonbeksultanbekov3@gmail.com" 
            className={`text-[11px] md:text-[12px] lg:text-[13px] tracking-tight`}
            isDark={isDark}
          />
          
          <ContactItem
            icon={<FaPhone />}
            label={t("contact-phone")}
            value="+44 07881196552"
            className="text-xs md:text-[13px] lg:text-sm"
            isDark={isDark}
          />
          <ContactItem
            icon={<FaMapMarkerAlt />}
            label={t("contact-location")}
            value="Cambridge, UK"
            className="text-xs md:text-[13px] lg:text-sm"
            isDark={isDark}
          />
        </div>
          
        {/* Socials */}
        <div className="flex items-center lg:gap-5 gap-3 mt-9">
          <motion.a
            href="https://github.com/mavlonbekswd"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2.5 rounded-lg shadow-lg flex items-center justify-center
              ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
              backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
              hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
          >
            <FaGithub className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mavlonbek-sultanbekov-219098283/"
            target="_blank"
            rel="noopener noreferrer"
            
            className={`p-2.5 rounded-lg shadow-lg flex items-center justify-center
              ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
              backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
              hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
          >
            <FaLinkedin className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          </motion.a>
          <motion.a
            href="https://t.me/mavlono_sulton"
            target="_blank"
            rel="noopener noreferrer"
           
            className={`p-2.5 rounded-lg shadow-lg flex items-center justify-center
              ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
              backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
              hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
          >
            <FaTelegram className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          </motion.a>
          <motion.a
            href="https://wa.me/+4407881196552"
            target="_blank"
            rel="noopener noreferrer"
            
            className={`p-2.5 rounded-lg shadow-lg flex items-center justify-center
              ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
              backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
              hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
          >
            <FaWhatsapp className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// Contact Info Block
const ContactItem = ({ icon, label, value, isDark, className }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    if (label === "EMAIL") {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (label === "PHONE") {
      window.location.href = `tel:${value}`;
    }
  };

  const isClickable = label === "EMAIL" || label === "PHONE";

  return (
    <motion.div
      whileHover={isClickable ? { x: 5 } : {}}
      className={`flex items-center gap-4 group ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? handleCopy : undefined}
    >
      <div className={`p-2.5 rounded-lg shadow-lg flex items-center justify-center
        ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
        backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
        hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
      >
        <span className={`w-5 h-5 flex items-center justify-center ${isDark ? 'text-white' : 'text-black'}`}>
          {icon}
        </span>
      </div>
      <div className="flex-grow">
        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>{label}</p>
        <p className={`${className || 'text-sm'} ${isDark ? 'text-white' : 'text-black'}`}>{value}</p>
      </div>
      {isClickable && (
        <motion.div 
          className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg
            ${isDark ? 'text-white' : 'text-black'}`}
        >
          {copied ? (
            <FaCheck className="w-4 h-4" />
          ) : (
            <FaCopy className="w-4 h-4" />
          )}
        </motion.div>
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
    aria-label="links"
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
  
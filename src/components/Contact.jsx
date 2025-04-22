import { Helmet } from 'react-helmet';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { pageVariants, fadeInUp } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

// Notification component
const Notification = ({ status, message, onClose }) => {
  const { isDark } = useTheme();
  
  return (
    
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        status === 'loading' 
          ? (isDark ? 'bg-blue-900/90' : 'bg-blue-100') 
          : status === 'success'
          ? (isDark ? 'bg-green-900/90' : 'bg-green-100')
          : (isDark ? 'bg-red-900/90' : 'bg-red-100')
      } z-50`}
    >
      <div className="flex items-center space-x-3">
        {status === 'loading' && (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white"></div>
        )}
        {status === 'success' && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`text-xl ${isDark ? 'text-green-300' : 'text-green-600'}`}
          >
            <FaCheckCircle className="animate-bounce" />
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              rotate: [0, 15, -15, 15, -15, 0],
              transition: {
                duration: 0.5
              }
            }}
            className={`text-xl ${isDark ? 'text-red-300' : 'text-red-600'}`}
          >
            <MdError className="animate-pulse" />
          </motion.div>
        )}
        <p className={`${
          status === 'loading' 
            ? (isDark ? 'text-blue-200' : 'text-blue-800')
            : status === 'success'
            ? (isDark ? 'text-green-200' : 'text-green-800')
            : (isDark ? 'text-red-200' : 'text-red-800')
        }`}>
          {message}
        </p>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const { isDark } = useTheme();
  const form = useRef();
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const { t  } = useTranslation();

  const validateForm = (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);
    const newErrors = {};
    
    if (!formData.get('name').trim()) {
      newErrors.name = "form-name-required";
    }
    if (!formData.get('email').trim()) {
      newErrors.email = "form-email-required";
    }
    if (!formData.get('message').trim()) {
      newErrors.message = "form-message-required";
    }
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    if (!validateForm(e)) {
      return;
    }
    
    // Show loading notification
    setNotification({ status: 'loading', message: t("notification-sending") });

    emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    form.current,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
     )

    .then(
      (result) => {
        // Show success notification
        setNotification({ status: 'success', message: t("notification-success")  });
        e.target.reset();
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      }, 
      (error) => {
        // Show error notification
        setNotification({ status: 'error', message: t("notification-error")});
        console.error(error.text);
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      }
    );
  };

  return (
    <>
    <Helmet>
  <title>Contact | Mavlonbek Sultanbekov</title>
  <meta
    name="description"
    content="Get in touch with Mavlonbek Sultanbekov for collaborations, project inquiries, or just to say hello."
    
  />
  <meta
    name="keywords"
    content="Contact Mavlonbek, Email, Software Developer, Cambridge, Contact Form"
  />
  <meta name="author" content="Mavlonbek Sultanbekov" />
  <link rel="canonical" href="https://www.mavlonbek.com/contact/" />
  </Helmet>

      <AnimatePresence>
        {notification && (
          <Notification
            status={notification.status}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
      
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)]`}
      >
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-4">
            <h2 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} flex items-center`}>
            {t("contact-title")}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className={`block h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
              ></motion.span>
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base lg:text-lg leading-relaxed`}>
            {t("contact-description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} p-6 rounded-2xl space-y-4`}>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{t("contact-info")}</h3>
              <div className="space-y-3">
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-[14px] lg:text-[15px] `}>
                  <span className="font-medium">{t("contact-email")}:</span> mavlonbeksultanbekov3@gmail.com
                </p>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="font-medium">{t("contact-location")}:</span> Cambridge, UK
                </p>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="font-medium">{t("contact-phone")}: </span>
                  <a href='tel:+4407881196552' className="hover:underline">+4407881196552</a>
                </p>
              </div>
            </div>

            <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} p-6 rounded-2xl space-y-4`}>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{t("social-media")}</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/mavlonbekswd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-2xl transition-colors`}
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/mavlonbek-sultanbekov-219098283/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-2xl transition-colors`}
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://wa.me/447881196552?text=Hello%20Mavlonbek%2C%20I%20found%20your%20portfolio%20and%20wanted%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-2xl transition-colors`}
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="tg://resolve?domain=mavlono_sulton&text=Hello%20Mavlonbek%2C%20I%20found%20your%20portfolio%20and%20wanted%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-2xl transition-colors`}
                >
                  <FaTelegram />
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-6" ref={form} onSubmit={sendEmail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t("form-name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("form-name-placeholder")}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#2a2a2a] text-white border-gray-600 focus:border-gray-500' 
                      : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
                  } ${errors.name ? 'border-red-500' : 'border'} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  onChange={() => setErrors({...errors, name: ''})}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">{t(errors.name)}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t("form-email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  
                  placeholder={t("form-email-placeholder")}
                  title={t("form-email-title")}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#2a2a2a] text-white border-gray-600 focus:border-gray-500' 
                      : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
                  } ${errors.email ? 'border-red-500' : 'border'} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  onChange={() => setErrors({...errors, email: ''})}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">{t(errors.email)}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="message" className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t("form-message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                
                placeholder={t("form-message-placeholder")}
                title={t("form-message-title")}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#2a2a2a] text-white border-gray-600 focus:border-gray-500' 
                    : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
                } ${errors.message ? 'border-red-500' : 'border'} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                onChange={() => setErrors({...errors, message: ''})}
              ></textarea>
              {errors.message && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{t(errors.message)}</p>
              )}
            </div>
            <button 
              type="submit"
              aria-label="Send message"
              className={`px-6 py-3 rounded-lg shadow-lg font-medium flex items-center justify-center
                ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/10'}
                backdrop-blur-sm border-2 border-white/20 hover:border-white/30 transition-all duration-300
                hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                ${isDark ? 'text-white' : 'text-black'}`}
            >
              {t("form-submit")}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
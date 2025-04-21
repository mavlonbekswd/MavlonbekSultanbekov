import { Helmet } from 'react-helmet';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { pageVariants, fadeInUp } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

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

  

  const sendEmail = (e) => {
    e.preventDefault();
    
    // Show loading notification
    setNotification({ status: 'loading', message: 'Sending message...' });

    emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    form.current,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
     )

    .then(
      (result) => {
        // Show success notification
        setNotification({ status: 'success', message: ' Message sent successfully!' });
        e.target.reset();
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      }, 
      (error) => {
        // Show error notification
        setNotification({ status: 'error', message: 'Failed to send message. Try again.' });
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
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="font-medium">Phone: </span>
                  <a href='tel:+4407881196552' className="hover:underline">+4407881196552</a>
                </p>
              </div>
            </div>

            <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} p-6 rounded-2xl space-y-4`}>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Social Media</h3>
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
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
                  name="email"
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
                name="message"
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
                  ? 'bg-white text-black hover:bg-gray-200 disabled:bg-gray-400'
                  : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-600'
              }`}
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
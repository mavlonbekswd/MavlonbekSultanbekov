import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from './components/Blog';
import { HiOutlineUser } from "react-icons/hi2";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import LoadingScreen from './components/LoadingScreen';
import { initGA, logPageView } from "./utils/analytics";
import { LanguageProvider } from './context/LanguageContext';
import './i18n';
import { useTranslation } from 'react-i18next';



const AppContent = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const location = useLocation();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

  // Hide hint after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSidebar]);
 

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:items-center py-8 lg:py-20 font-sans relative">
      {/* Find me here hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-[22px] left-16 z-50"
          >
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className={`flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-black'}`}
            >
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="flex items-center"
              >
                <div className="w-2 h-2  transform rotate-45 border-l-2 border-b-2"
                  style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                  }}
                />
              </motion.div>
              <span className="text-xs font-medium bg-opacity-80 px-2 py-1 rounded-full backdrop-blur-sm border border-opacity-20"
                style={{
                  background: isDark ? 'rgba(31, 31, 31, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
                }}
              >
                {t("i-here")}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      <div className="flex flex-col lg:flex-row gap-12 w-full px-4 lg:px-0 lg:mx-auto relative" style={{ maxWidth: '1400px' }}>
        {/* Mobile Toggle Button */}
        <motion.button 
          onClick={() => setShowSidebar(!showSidebar)}
          className={`lg:hidden fixed top-4 left-4 z-50 
            ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : ' border border-gray-400 hover:border-gray-700 bg-gradient-to-r from-white to-white/80'} 
            p-2.5 rounded-lg shadow-lg flex items-center gap-2 backdrop-blur-sm
            border border-white/20 hover:border-white/30 transition-all duration-300
            hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: showSidebar ? [0, -10, 10, -10, 0] : 0,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.3,
            rotate: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <HiOutlineUser className={`w-4.5 h-4.5 ${isDark ? 'text-white' : 'text-black'}`} />
        </motion.button>

        {/* Sidebar with animation */}
        <motion.div 
          className={`fixed lg:fixed lg:w-[370px] lg:flex-shrink-0 w-[85%] h-[620px] lg:h-[730px] top-12 lg:top-11 left-13 z-40 sm:top-[20] md:w-[40%] overflow-y-auto lg:overflow-visible`}
          initial={{ x: "-100%" }}
          animate={{ 
            x: showSidebar ? 0 : window.innerWidth <= 1024 ? "-100%" : 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20
            }
          }}
        >
          <div className="h-full py-8 px-4">
            <Sidebar />
          </div>
        </motion.div>
        
        
        {/* Main Content */}
    <div className="w-full lg:w-[800px] pb-24 lg:pb-0 lg:ml-[420px]">
          {/* Desktop Navbar */}
          <div className="hidden lg:block sticky top-10 z-40 mb-[100px] 
    pb-24 
    lg:pb-0  
   ">
            <Navbar />
          </div>
          
          <div className="mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingScreen key="loading" />
              ) : (
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<About />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<Blog />} /> {/* 🔥 BUNI QO'SHISH SHART */}
                </Routes>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Bottom Navbar */}
        <div className="fixed bottom-14 left-0   right-0  lg:hidden z-30 px-7  pb-4 ">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    initGA();         // GA ni ishga tushuradi
    logPageView();    // Sahifaga kirishni qayd qiladi
  }, []);
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

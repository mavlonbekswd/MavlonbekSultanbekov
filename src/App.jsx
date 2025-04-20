import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from './components/Blog';
import { FaChevronRight } from "react-icons/fa";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import LoadingScreen from './components/LoadingScreen';

const AppContent = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

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
      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      <div className="flex  flex-col lg:flex-row gap-12 w-full px-4 lg:px-0 lg:mx-auto relative" style={{ maxWidth: '1400px' }}>
        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className={`lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg`}
        >
          <FaChevronRight className={`transition-transform duration-200 ${showSidebar ? 'rotate-180' : ''} text-black`} />
        </button>

        {/* Sidebar */}
        <div className={`fixed lg:fixed lg:w-[370px] lg:flex-shrink-0 w-[85%] h-lg lg:h-lg top-12 left-13 z-40 transition-transform duration-300 sm:top-[20] transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 overflow-y-auto lg:overflow-visible`}>
          <div className="h-full py-8 px-4">
            <Sidebar />
          </div>
        </div>
        
        
        {/* Main Content */}
    <div className="w-full lg:w-[800px] pb-24 lg:pb-0 lg:ml-[420px]">
          {/* Desktop Navbar */}
          <div className="hidden lg:block sticky top-10 z-40 mb-[100px]">
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
                </Routes>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Bottom Navbar */}
        <div className="fixed bottom-14 left-0   right-0  lg:hidden z-30 px-7  pb-4">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

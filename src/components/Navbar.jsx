import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} fixed backdrop-blur-sm h-[55px] sm:h-[60px] md:h-[65px] lg:h-[70px] w-[92%] left-[13px] sm:w-[450px] md:w-[300px] lg:w-[800px] px-3 sm:px-4 md:px-5 lg:px-6 rounded-[32px] shadow-[0_0_20px_rgba(255,255,255,0.5)] flex  items-center justify-between`}
    >
      <ul className="flex items-center text-white gap-3 sm:gap-6 md:gap-6 lg:gap-10">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive 
                ? (isDark ? 'text-white' : 'text-black')
                : (isDark ? 'text-gray-400' : 'text-gray-600')
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-ms sm:text-sm md:text-base lg:text-base font-medium`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resume"
            className={({ isActive }) =>
              `${isActive 
                ? (isDark ? 'text-white' : 'text-black')
                : (isDark ? 'text-gray-400' : 'text-gray-600')
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-ms sm:text-sm md:text-base lg:text-base font-medium`
            }
          >
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${isActive 
                ? (isDark ? 'text-white' : 'text-black')
                : (isDark ? 'text-gray-400' : 'text-gray-600')
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-ms sm:text-sm md:text-base lg:text-base font-medium`
            }
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `${isActive 
                ? (isDark ? 'text-white' : 'text-black')
                : (isDark ? 'text-gray-400' : 'text-gray-600')
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-ms sm:text-sm md:text-base lg:text-base font-medium`
            }
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive 
                ? (isDark ? 'text-white' : 'text-black')
                : (isDark ? 'text-gray-400' : 'text-gray-600')
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-ms sm:text-sm md:text-base lg:text-base font-medium`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-xl ${isDark ? 'bg-[#2a2a2a] text-white hover:bg-[#444]' : 'bg-gray-100 text-black hover:bg-gray-200'} transition-all`}
      >
        {isDark ? <FaSun className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <FaMoon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;

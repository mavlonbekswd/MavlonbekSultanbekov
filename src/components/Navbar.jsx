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
      className={`${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} backdrop-blur-sm px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-[32px]  shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-between `}

      
    >
      <ul className="flex items-center  text-white ml-2 gap-4 sm:gap-4 lg:gap-8">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive 
                ? (isDark ? 'text-white' : 'text-black')
                : (isDark ? 'text-gray-400' : 'text-gray-600')
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-sm sm:text-sm lg:text-base`
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
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-sm sm:text-sm lg:text-base`
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
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-sm sm:text-sm lg:text-base`
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
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-sm sm:text-sm lg:text-base`
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
              } hover:${isDark ? 'text-white' : 'text-black'} transition-colors text-sm sm:text-sm lg:text-base`
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
        className={`p-1.5 sm:p-3 rounded-xl ${isDark ? 'bg-[#2a2a2a] text-white hover:bg-[#444]' : 'bg-gray-100 text-black hover:bg-gray-200'} transition-all`}
      >
        {isDark ? <FaSun className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaMoon className="w-4 h-4 sm:w-5 sm:h-5" />}
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;

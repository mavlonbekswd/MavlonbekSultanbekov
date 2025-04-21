import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { pageVariants, staggerContainer, fadeInUp, scaleIn } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

// Sample projects data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "React",
    image: "/project1.jpg",
    description: "A full-featured e-commerce platform with cart functionality, user authentication, and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubLink: "https://github.com/yourusername/project1",
    liveLink: "https://project1.com"
  },
  {
    id: 2,
    title: "SpeedFixPlumbing Website",
    category: "JavaScript",
    image: "/SpeedFixLogo.png",
    description: "At SpeedFix Plumbing, we don't just solve problems — we redefine what it means to feel safe at home.",
    technologies: ["JavaScript", "React", "Scss"],
    githubLink: "https://github.com/mavlonbekswd/SpeedFixPlumbingComp.git",
    liveLink: "https://speedfixplumbing.co.uk/"
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "React",
    image: "/project3.jpg",
    description: "A responsive portfolio website with smooth animations and modern design.",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    githubLink: "https://github.com/yourusername/project3",
    liveLink: "https://project3.com"
  },
  // Add more projects as needed
];

const categories = ["All", "React", "JavaScript", "Node.js"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const { isDark } = useTheme();

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      
      className={` space-y-8 lg:space-y-12 ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.5)]`}
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} flex items-center`}>
          Projects
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`block h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
          ></motion.span>
        </h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                activeCategory === category
                  ? isDark ? 'bg-[#e2e2e2] text-black' : 'bg-gray-800 text-white'
                  : isDark ? 'bg-[#2a2a2a] text-[#e2e2e2]' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="initial"
              whileHover={{ y: -5 }}
              className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} rounded-2xl overflow-hidden cursor-pointer`}
              onClick={() => window.open(project.liveLink, '_blank')}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 p-4"
                >
                  <h3 className="text-white text-xl font-semibold text-center">{project.title}</h3>
                  <p className="text-gray-300 text-sm text-center">{project.description}</p>
                  <div className="flex items-center gap-2">
                    <FaExternalLinkAlt size={20} className="text-white" />
                    <span className="text-white text-sm">Visit Website</span>
                  </div>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>{project.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 ${
                        isDark ? 'bg-[#1f1f1f] text-[#e2e2e2]' : 'bg-gray-200 text-gray-700'
                      } text-xs rounded-full`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
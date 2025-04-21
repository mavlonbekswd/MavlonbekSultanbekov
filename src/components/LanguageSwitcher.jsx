import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { TbLanguage } from "react-icons/tb";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const { isDark } = useTheme();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' }
  ];

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-1.5 sm:p-2 md:p-4 lg:p-3 rounded-xl ${
        isDark ? 'bg-[#2a2a2a] text-white hover:bg-[#444]' : 'bg-gray-100 text-black hover:bg-gray-200'
      } transition-all flex items-center gap-1`}
      onClick={() => {
        const currentIndex = languages.findIndex(lang => lang.code === language);
        const nextIndex = (currentIndex + 1) % languages.length;
        changeLanguage(languages[nextIndex].code);
      }}
    >
      <TbLanguage className="w-3 h-3 sm:w-4 sm:h-4 md:w-7 md:h-7" />
      <span className="text-xs sm:text-sm md:text-base lg:text-sm font-medium">
        {languages.find(lang => lang.code === language)?.label}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher; 
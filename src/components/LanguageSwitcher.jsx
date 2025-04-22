import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { IoLanguageOutline } from "react-icons/io5";
import { TbLanguage } from "react-icons/tb";
import { MdOutlineLanguage } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' }
  ];

  const currentLanguage = i18n.language || 'en';

  const changeLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex].code);
  };

  return (
    <motion.button
      className={`lg:p-3 pt-2.5 pb-2.5 pl-1 pr-1 rounded-lg shadow-lg  flex items-center gap-1 sm:
        ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
        backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
        hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
      onClick={changeLanguage}
    >
      <MdOutlineLanguage className={`w-4 h-4 sm:left-4 ${isDark ? 'text-white' : 'text-black'}`} />
      <span className={`text-xs lg:left-16 font-medium ${isDark ? 'text-white' : 'text-black'}`}>
        {languages.find(lang => lang.code === currentLanguage)?.label}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;

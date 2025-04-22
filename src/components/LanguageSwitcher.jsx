import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { TbLanguage } from "react-icons/tb";
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`lg: p-2.5 rounded-lg shadow-lg flex items-center gap-2
        ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
        backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
        hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
      onClick={changeLanguage}
    >
      <TbLanguage className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} />
      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
        {languages.find(lang => lang.code === currentLanguage)?.label}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;

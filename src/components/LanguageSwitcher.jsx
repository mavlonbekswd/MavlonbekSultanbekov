import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { MdOutlineLanguage } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext'; // ✅

const LanguageSwitcher = () => {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage(); // ✅

  const languages = ['en', 'ru', 'uz'];

  const handleLanguageSwitch = () => {
    const currentIndex = languages.findIndex(lang => lang === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    changeLanguage(nextLanguage); // ✅ Contextdagi language ni ham yangilash
    i18n.changeLanguage(nextLanguage); // ✅ i18next dagi language ni ham yangilash
  };

  return (
    <motion.button
      className={`lg:p-3 pt-2.5 pb-2.5 pl-1 pr-1 rounded-lg shadow-lg flex items-center gap-1 
        ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-white to-white/80'}
        backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
        hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
      onClick={handleLanguageSwitch}
    >
      <MdOutlineLanguage className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} />
      <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-black'}`}>
        {language.toUpperCase()}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
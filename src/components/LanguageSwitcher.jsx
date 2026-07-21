import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'uz', name: "O'zbekcha" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentCode = i18n.resolvedLanguage?.split('-')[0] || 'en';
  const currentIndex = Math.max(
    languages.findIndex(({ code }) => code === currentCode),
    0,
  );
  const currentLanguage = languages[currentIndex];
  const nextLanguage = languages[(currentIndex + 1) % languages.length];

  const handleLanguageSwitch = () => {
    i18n.changeLanguage(nextLanguage.code);
  };

  return (
    <button
      className="utility-button language-button"
      type="button"
      onClick={handleLanguageSwitch}
      aria-label={`Language: ${currentLanguage.name}. Switch to ${nextLanguage.name}`}
      title={`Switch to ${nextLanguage.name}`}
    >
      <Languages aria-hidden="true" size={18} />
      <span aria-hidden="true">{currentLanguage.code.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;

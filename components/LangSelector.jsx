'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', lang: 'English', flag: '🇺🇸' },
  { code: 'tr', lang: 'Türkçe', flag: '🇹🇷' },
];

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  // Synchronise la langue avec le stockage local
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') || i18n.language;
    i18n.changeLanguage(storedLang).catch((error) =>
      console.error('Erreur lors du changement de langue :', error)
    );
    setSelectedLang(storedLang);
  }, [i18n]);

  const handleChangeLanguage = (code) => {
    i18n
      .changeLanguage(code)
      .then(() => {
        localStorage.setItem('lang', code);
        setSelectedLang(code);
      })
      .catch((error) =>
        console.error('Erreur lors du changement de langue :', error)
      );
  };

  return (
    <div className="flex justify-center items-center mt-2">
      <select
        value={selectedLang}
        onChange={(e) => handleChangeLanguage(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        {languages.map(({ code, lang, flag }) => (
          <option key={code} value={code}>
            {flag} {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LangSelector;

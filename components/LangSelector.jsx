"use client";
import React, { useEffect, useState } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  {
    code: "en",
    lang: "English",
    flag: "🇺🇸",
    country: "us", // country Code for The flag
  },
  {
    code: "tr",
    lang: "Türkçe",
    flag: "🇹🇷",
    country: "tr",
  },
];

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || i18n.language;
    }
    return i18n.language; // Fallback pour le serveur
  });

  // Apply language stored in localStorage on first render
  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || i18n.language;
    if (storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang).catch((error) => {
        console.error("Erreur lors du changement de langue :", error);
      });
    }
    setSelectedLang(storedLang);
  }, [i18n]);

  const handleChangeLanguage = (code) => {
    i18n
      .changeLanguage(code)
      .then(() => {
        localStorage.setItem("lang", code);
        setSelectedLang(code);
      })
      .catch((error) => {
        console.error("Erreur lors du changement de langue :", error);
      });
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-2">

      <Select value={selectedLang} onValueChange={handleChangeLanguage}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map(({ code, lang, country }) => (
            <SelectItem key={code} value={code}>
              <span className={`fi fi-${country} mr-2`} /> {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LangSelector;

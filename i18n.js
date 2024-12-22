import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Configuration de i18next

i18n
  .use(LanguageDetector) // Tarayıcı dil algılaması
  .use(Backend) // Dil dosyalarını dinamik yüklemek için
  .use(initReactI18next) // React entegrasyonu
  .init({
    lng: "en", // Başlangıç dili
    fallbackLng: "en", // Dil bulunamazsa geri dönüş dili
    interpolation: {
      escapeValue: false, // React'te güvenli olduğu için kapalı
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Dil dosyalarının doğru yolu
    },
    detection: {
      order: ["path", "localStorage", "cookie", "navigator"], // Dil algılama sırası
      caches: ["localStorage", "cookie"], // Algılanan dili saklama
    },
    debug: true, // Geliştirme sırasında hata ayıklama için etkin
  });

export default i18n;
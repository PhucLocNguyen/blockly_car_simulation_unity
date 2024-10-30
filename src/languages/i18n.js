import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as englishTranslateJson from"../languages/Components/en.json"
import * as vietnameseTranslateJson from"../languages/Components/vi.json"
const resources = {
  "en": {
    translation:englishTranslateJson
  },
  "vi": {
    translation: vietnameseTranslateJson
  }
};
const languageCurrent = localStorage.getItem("language")!=null?localStorage.getItem("language"):"vi";
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageCurrent,
    fallbackLng: 'en'
  });

export default i18n;
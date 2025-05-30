import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import conversation_en from "./locales/en/conversations.json";
import conversation_vi from "./locales/vi/conversations.json";

export const resources = {
  en: {
    conversations: conversation_en,
  },
  vi: {
    conversations: conversation_vi,
  },
};

export const lang = [{ vi: "🇻🇳 Tiếng Việt" }, { en: "🇬🇧 English" }];

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
  defaultNS: "conversations",
  ns: ["conversations"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import { initReactI18next } from "react-i18next";

export function loadResources(lang) {
  // We have hands on locales
  /* eslint-disable global-require, import/no-dynamic-require */
  return {
    common: require(`./public/static/locales/${lang}/common.json`),
    "elite-summon": require(`./public/static/locales/${lang}/elite-summon.json`),
    "fast-reward": require(`./public/static/locales/${lang}/fast-reward.json`),
    "hero-list": require(`./public/static/locales/${lang}/hero-list.json`),
    "item-cost": require(`./public/static/locales/${lang}/item-cost.json`),
    loot: require(`./public/static/locales/${lang}/loot.json`),
    "signature-item": require(`./public/static/locales/${lang}/signature-item.json`),
    "top-team": require(`./public/static/locales/${lang}/top-team.json`),
    translation: require(`./public/static/locales/${lang}/translation.json`),
  };
  /* eslint-enable global-require, import/no-dynamic-require */
}

export const resources = {
  en: loadResources("en"),
  fr: loadResources("fr"),
  dev: loadResources("dev"),
};

i18next
  .use(initReactI18next)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    resources,
    lng: "en",
    supportedLngs: ["dev", "en", "fr"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const i18nextInit = (router, namespaces = ["default"]) => {
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      lng: router.locale,
      supportedLngs: router.locales,
      fallbackLng: router.defaultLocale,
      react: {
        useSuspense: false,
      },
      resources: {},
    });
  }

  if (i18next.language !== router.locale) {
    i18next.changeLanguage(router.locale);
  }

  [
    "common",
    "elite-summon",
    "fast-reward",
    "hero-list",
    "item-cost",
    "loot",
    "signature-item",
    "top-team",
    "translation",
  ].forEach((ns) => {
    if (!i18next.hasResourceBundle(router.locale, ns)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const data = require(`./public/static/locales/${router.locale}/${ns}.json`);
      i18next.addResourceBundle(router.locale, ns, data);
    }
  });

  i18next.setDefaultNamespace(namespaces[0]);
};

export default i18nextInit;

// const LanguageDetector = require("i18next-browser-languagedetector");

// console.log(LanguageDetector);

module.exports = {
  browserLanguageDetection: true,
  // serializeConfig: false,
  i18n: {
    defaultLocale: "en_US",
    locales: ["en_US", "es_ES", "fr_FR", "it_IT", "pt_BR", "dev"],
    // use: [LanguageDetector],
  },
};

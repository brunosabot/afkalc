const path = require("path");

module.exports = {
  browserLanguageDetection: true,
  i18n: {
    defaultLocale: "en_US",
    locales: ["de_DE", "en_US", "es_ES", "fr_FR", "it_IT", "pt_BR", "ru_RU", "uk_UA", "dev"],
    localePath: path.resolve("./public/locales"),
  },
};

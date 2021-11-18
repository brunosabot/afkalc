const path = require("path");

module.exports = {
  browserLanguageDetection: true,
  i18n: {
    defaultLocale: "en_US",
    locales: ["en_US", "es_ES", "fr_FR", "it_IT", "pt_BR", "dev"],
    localePath: path.resolve("./public/static/locales"),
  },
};

import NextI18Next from "next-i18next";
// const { localeSubpaths } = require("next/config").default().publicRuntimeConfig;
const path = require("path");

const I18n = new NextI18Next({
  defaultLanguage: process.env.NODE_ENV === "development" ? "dev" : "en",
  otherLanguages: ["dev", "en", "fr"],
  localePath: path.resolve("./public/locales"),
});

export const useTranslation = I18n.useTranslation;
export const appWithTranslation = I18n.appWithTranslation;

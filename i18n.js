import NextI18Next from "next-i18next";
import path from "path";

const I18n = new NextI18Next({
  defaultLanguage: process.env.NODE_ENV === "development" ? "dev" : "en",
  otherLanguages: ["dev", "en", "fr"],
  localePath: path.resolve("./public/static/locales"),
});

export const { useTranslation, Trans } = I18n;
export const { appWithTranslation } = I18n;

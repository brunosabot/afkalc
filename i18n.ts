import NextI18Next from "next-i18next";
import { resolve } from "path";

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  localePath: resolve("./public/static/locales"),
  localeSubpaths: {
    dev: 'dev',
    fr: 'fr',
  },
  otherLanguages: ["dev", "fr"],
  ns: [
    "common",
    "elite-summon",
    "fast-reward",
    "hero-list",
    "item-cost",
    "loot",
    "signature-item",
    "top-team",
    "translation"
  ],
});

export const {appWithTranslation} = NextI18NextInstance;
export const {withTranslation} = NextI18NextInstance;
export const {useTranslation} = NextI18NextInstance;
export const {Trans} = NextI18NextInstance;
export const {i18n} = NextI18NextInstance;

export default NextI18NextInstance;
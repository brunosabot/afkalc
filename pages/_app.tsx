import dayjs from "dayjs";
import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import type { AppProps } from "next/app";
import React from "react";
import { initReactI18next, withSSR } from "react-i18next";
import Menu from "../components/functionnal/Menu";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import { resources } from "../i18n";
import "../styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

App.getInitialProps = async ({ router }: any) => {
  await i18next
    .use(initReactI18next)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      resources,
      lng: router.locale,
      supportedLngs: ["dev", "en", "fr"],
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });

  return {};
};

function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <Menu />
      <div style={{ maxWidth: "480px", margin: "auto", marginTop: "16px", marginBottom: "76px" }}>
        <Component {...pageProps} />
      </div>
    </FirebaseProvider>
  );
}

const ExtendedApp = withSSR()(App);

export default ExtendedApp;

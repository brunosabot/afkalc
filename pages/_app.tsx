import dayjs from "dayjs";
import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import { I18nContext } from "next-i18next";
import type { AppProps } from "next/app";
import React, { useContext, useEffect } from "react";
import Menu from "../components/functionnal/Menu";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import { appWithTranslation } from "../i18n";
import "../styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

function MyApp({ Component, pageProps }: AppProps) {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  useEffect(() => {
    const newLanguage = language === "dev" ? "en" : language;
    import(`dayjs/locale/${newLanguage}`).then(() => dayjs.locale(newLanguage));
  }, [language]);

  return (
    <FirebaseProvider>
      <Menu />
      <div style={{ maxWidth: "480px", margin: "auto", marginTop: "40px" }}>
        <Component {...pageProps} />
      </div>
    </FirebaseProvider>
  );
}

export default appWithTranslation(MyApp);

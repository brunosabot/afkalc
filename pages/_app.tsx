import "../styles/globals.css";
import Menu from "../components/functionnal/Menu";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import React, { useContext, useEffect } from "react";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import { I18nContext } from 'next-i18next'
import {appWithTranslation} from '../i18n'

dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

function MyApp({ Component, pageProps }) {

  const { i18n: { language } } = useContext(I18nContext);

  useEffect(()=> {
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

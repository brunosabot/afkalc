import dayjs from "dayjs";
import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import App from "next/app";
// import { useRouter } from "next/router";
import React from "react";
import Menu from "../components/functionnal/Menu";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import UserProvider from "../components/providers/UserProvider";
import { appWithTranslation, i18n } from "../i18n";
import "../styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

function MyApp({ Component, pageProps, i18nServerInstance, ...rest }: any) {
  const { language } = i18nServerInstance || i18n;
  dayjs.locale(language);
  // document.getElementsByTagName("html")[0].lang = language;

  return (
    <FirebaseProvider>
      <UserProvider>
        <Menu />
        <div id="page">
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </FirebaseProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);

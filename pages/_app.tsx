import dayjs from "dayjs";
import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import { useRouter } from "next/router";
import React from "react";
import { I18nextProvider } from "react-i18next";
import Menu from "../components/functionnal/Menu";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import i18nextInit from "../i18n";
import "../styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

function App({ i18n, Component, pageProps }: any) {
  const router = useRouter();

  i18nextInit(router, pageProps.i18nNamespaces);

  return (
    <I18nextProvider i18n={i18n}>
      <FirebaseProvider>
        <Menu />
        <div style={{ maxWidth: "480px", margin: "auto", marginTop: "16px", marginBottom: "76px" }}>
          <Component {...pageProps} />
        </div>
      </FirebaseProvider>
    </I18nextProvider>
  );
}

export default App;

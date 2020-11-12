import dayjs from "dayjs";
import "dayjs/locale/fr";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { initReactI18next } from "react-i18next";
import App from "./components/App";
import FirebaseProvider from "./components/providers/FirebaseProvider";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

const languages = ["en", "fr"];

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === "development",

    fallbackLng: process.env.NODE_ENV === "development" ? "dev" : "en",
    whitelist: process.env.NODE_ENV === "development" ? ["dev", ...languages] : languages,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

i18n.on("languageChanged", (lng) => {
  import(`dayjs/locale/${lng}`).then(() => dayjs.locale(lng));
});

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

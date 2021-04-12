import dayjs from "dayjs";
import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import { appWithTranslation } from "next-i18next";
import React from "react";
import AbyssalExpeditionProvider from "../components/providers/AbyssalExpeditionProvider";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import GuildProvider from "../components/providers/GuildProvider";
import PriorityListProvider from "../components/providers/PriorityListProvider";
import ProfileProvider from "../components/providers/ProfileProvider";
import UserProvider from "../components/providers/UserProvider";
import "../styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

function MyApp({ Component, pageProps }: any) {
  // eslint-disable-next-line no-underscore-dangle
  dayjs.locale(pageProps?._nextI18Next?.initialLocale ?? "en");

  return (
    <FirebaseProvider>
      <ProfileProvider>
        <PriorityListProvider>
          <AbyssalExpeditionProvider>
            <GuildProvider>
              <UserProvider>
                <Component {...pageProps} />
              </UserProvider>
            </GuildProvider>
          </AbyssalExpeditionProvider>
        </PriorityListProvider>
      </ProfileProvider>
    </FirebaseProvider>
  );
}

export default appWithTranslation(MyApp);

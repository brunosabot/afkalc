import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { appWithTranslation } from "next-i18next";
import React from "react";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import GuildProvider from "../components/providers/GuildProvider";
import PriorityListProvider from "../components/providers/PriorityListProvider";
import ProfileProvider from "../components/providers/ProfileProvider";
import UserProvider from "../components/providers/UserProvider";
import "../styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: any) {
  // eslint-disable-next-line no-underscore-dangle
  dayjs.locale(pageProps?._nextI18Next?.initialLocale ?? "en");

  return (
    <FirebaseProvider>
      <ProfileProvider>
        <PriorityListProvider>
          <GuildProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </GuildProvider>
        </PriorityListProvider>
      </ProfileProvider>
    </FirebaseProvider>
  );
}

export default appWithTranslation(MyApp);

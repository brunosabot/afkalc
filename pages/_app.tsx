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
import TreeListProvider from "../components/providers/TreeListProvider";
import UserProvider from "../components/providers/UserProvider";
import nextI18NextConfig from "../next-i18next.config";
import "../styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const MyApp = function MyApp({ Component, pageProps }: any) {
  // eslint-disable-next-line no-underscore-dangle
  dayjs.locale(pageProps?._nextI18Next?.initialLocale ?? "en_US");

  return (
    <FirebaseProvider>
      <ProfileProvider>
        <PriorityListProvider>
          <TreeListProvider>
            <GuildProvider>
              <UserProvider>
                <Component {...pageProps} />
              </UserProvider>
            </GuildProvider>
          </TreeListProvider>
        </PriorityListProvider>
      </ProfileProvider>
    </FirebaseProvider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);

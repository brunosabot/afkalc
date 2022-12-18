import dayjs from "dayjs";
import "dayjs/locale/es";
import "dayjs/locale/fr";
import "dayjs/locale/it";
import "dayjs/locale/pt-br";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { appWithTranslation } from "next-i18next";
import React from "react";
import FirebaseProvider from "../components/providers/FirebaseProvider";
import GuildProvider from "../components/providers/GuildProvider";
import PetListProvider from "../components/providers/PetListProvider";
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
  const locale = pageProps?._nextI18Next?.initialLocale ?? "en_US";

  dayjs.locale(locale.split("_")[0]);
  dayjs.locale(locale);

  return (
    <FirebaseProvider>
      <ProfileProvider>
        <PriorityListProvider>
          <TreeListProvider>
            <PetListProvider>
              <GuildProvider>
                <UserProvider>
                  <Component {...pageProps} />
                </UserProvider>
              </GuildProvider>
            </PetListProvider>
          </TreeListProvider>
        </PriorityListProvider>
      </ProfileProvider>
    </FirebaseProvider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);

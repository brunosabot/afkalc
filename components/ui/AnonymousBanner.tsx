import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import CardHelp from "./card/CardHelp";

interface Props {
  [key: string]: never;
}

const AnonymousBanner: React.FC<Props> = function AnonymousBanner() {
  const { t } = useTranslation();
  const { values } = useContext(FirebaseContext);

  if (values.isAuth && values.isAnonymous) {
    return (
      <div style={{ maxWidth: "800px", margin: "16px auto -16px auto" }}>
        <CardHelp>
          {t("temporary-account")} <Link href="/settings">{t("go-registration")}</Link>
        </CardHelp>
      </div>
    );
  }

  return null;
};

export default AnonymousBanner;

import Link from "next/link";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../providers/FirebaseProvider";
import CardHelp from "./card/CardHelp";

interface Props {
  [key: string]: never;
}

const AnonymousBanner: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { values } = useContext(FirebaseContext);

  if (values.isAuth && values.isAnonymous) {
    return (
      <CardHelp>
        {t("temporary-account")} <Link href="/settings">{t("go-registration")}</Link>
      </CardHelp>
    );
  }

  return null;
};

export default AnonymousBanner;

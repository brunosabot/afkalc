import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import useFirestoreWithBackup from "../../../hooks/useFirestoreWithBackup";
import { FirebaseContext } from "../../../providers/FirebaseProvider";
import CardShare from "../../../ui/card/CardShare";
import CardTitle from "../../../ui/card/CardTitle";

interface IProps {
  isView: boolean;
}

const ShareBanner: React.FC<IProps> = ({ isView }) => {
  const { t } = useTranslation("hero-list");
  const [id] = useFirestoreWithBackup("%ID%", "user", "shareId", "", nanoid(10), isView);
  const { values } = useContext(FirebaseContext);
  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  if (isView === true) {
    return <CardTitle>{t("somebodys-list")}</CardTitle>;
  }

  return (
    <CardShare
      label={t("label-share")}
      shouldCopy={values.isAuth}
      style={{ backgroundColor: "var(--hover-color)" }}
    >
      {id ? `https://afkalc.com${localePath}/hero-list/${id}` : t("login-needed")}
    </CardShare>
  );
};

export default ShareBanner;

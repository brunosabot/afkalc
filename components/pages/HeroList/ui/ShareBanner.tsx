import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { useTranslation } from "../../../../i18n";
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

  if (isView === true) {
    return <CardTitle>{t("somebodys-list")}</CardTitle>;
  }

  return (
    <CardShare
      label={t("label-share")}
      shouldCopy={values.isAuth}
      style={{ backgroundColor: "var(--hover-color)" }}
    >
      {id ? `https://afkalc.com/hero-list/${id}` : t("login-needed")}
    </CardShare>
  );
};

export default ShareBanner;

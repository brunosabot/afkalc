import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { useTranslation } from "../../../../i18n";
import useFirestoreWithBackup from "../../../hooks/useFirestoreWithBackup";
import { FirebaseContext } from "../../../providers/FirebaseProvider";
import CardTitle from "../../../ui/card/CardTitle";

interface IProps {
  isView: boolean;
}

const ShareBanner: React.FC<IProps> = ({ isView }) => {
  const { t } = useTranslation("hero-list");
  const [copy, setCopy] = useState(false);
  const [id] = useFirestoreWithBackup("%ID%", "user", "shareId", "", nanoid(10), isView);
  const { values } = useContext(FirebaseContext);

  let value = "";
  if (id) {
    value = `https://afkalc.heycoucou.com/hero-list/${id}`;
  } else if (values.isAuth === false) {
    value = t("login-needed");
  }

  if (isView === true) {
    return <CardTitle>{t("somebodys-list")}</CardTitle>;
  }

  return (
    <CardTitle>
      {t("label-share")}
      {copy ? (
        <div style={{ position: "absolute", top: "16px", right: "16px" }}>{t("label-copied")}</div>
      ) : null}
      <input
        className="hero-list__share"
        onClick={(e) => {
          if (values.isAuth === false) {
            return;
          }
          (e.target as HTMLInputElement).select();
          document.execCommand("copy");
          setCopy(true);
          setTimeout(() => setCopy(false), 3000);
        }}
        value={value}
        readOnly
      />
    </CardTitle>
  );
};

export default ShareBanner;

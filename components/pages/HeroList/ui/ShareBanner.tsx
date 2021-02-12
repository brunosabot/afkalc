import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "../../../../i18n";
import useFirestoreWithBackup from "../../../hooks/useFirestoreWithBackup";
import CardShareNew from "../../../ui/card/CardShareNew";
import CardTitle from "../../../ui/card/CardTitle";

interface IProps {
  isView: boolean;
}

const ShareBanner: React.FC<IProps> = ({ isView }) => {
  const { t } = useTranslation("hero-list");
  const [id] = useFirestoreWithBackup("%ID%", "user", "shareId", "", nanoid(10), isView);

  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  if (isView === true) {
    return <CardTitle>{t("somebodys-list")}</CardTitle>;
  }

  return (
    <CardShareNew>
      {id ? `https://afkalc.com${localePath}/hero-list/${id}` : t("login-needed")}
    </CardShareNew>
  );
};

export default React.memo(ShareBanner);

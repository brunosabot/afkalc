import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import CardShareNew from "../../../ui/card/CardShareNew";
import CardTitle from "../../../ui/card/CardTitle";

interface IProps {
  isView: boolean;
}

const ShareBanner: React.FC<IProps> = ({ isView }) => {
  const { t } = useTranslation("hero-list");
  const {
    values: { userId },
  } = useContext(ProfileContext);

  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  if (isView === true) {
    return <CardTitle>{t("somebodys-list")}</CardTitle>;
  }

  return (
    <CardShareNew>
      {userId ? `https://afkalc.com${localePath}/hero-list/${userId}` : t("login-needed")}
    </CardShareNew>
  );
};

export default React.memo(ShareBanner);

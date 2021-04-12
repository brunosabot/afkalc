import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import CardShareNew from "../../../ui/card/CardShareNew";

interface IProps {
  [key: string]: never;
}

const ShareBanner: React.FC<IProps> = () => {
  const { t } = useTranslation("hero-list");
  const {
    values: { userId },
  } = useContext(ProfileContext);

  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  return (
    <CardShareNew>
      {userId ? `https://afkalc.com${localePath}/hero-list/${userId}` : t("login-needed")}
    </CardShareNew>
  );
};

export default React.memo(ShareBanner);

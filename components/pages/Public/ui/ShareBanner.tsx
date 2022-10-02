import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import CardShareNew from "../../../ui/card/CardShareNew";

interface IProps {
  userId: string;
}

const ShareBanner: React.FC<IProps> = function ShareBanner({ userId }) {
  const { t } = useTranslation("hero-list");

  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  return (
    <CardShareNew>
      {userId ? `${process.env.NEXT_PUBLIC_URL}${localePath}/public/${userId}` : t("login-needed")}
    </CardShareNew>
  );
};

export default React.memo(ShareBanner);

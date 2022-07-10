import { useRouter } from "next/router";
import React from "react";
import CardShareNew from "../../../ui/card/CardShareNew";

interface IProps {
  url: string;
}

const ShareBanner: React.FC<IProps> = function ShareBanner({ url }) {
  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_URL}${localePath}/abex-relic-share/${url}`;

  return <CardShareNew>{fullUrl}</CardShareNew>;
};

export default ShareBanner;

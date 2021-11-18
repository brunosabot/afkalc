import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ProfileContext from "../../components/providers/ProfileContext";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "abex-relic-sell",
      "abex-relic",
      "common",
      "donate",
      "elder-tree",
      "elite-summon",
      "fast-reward",
      "guild",
      "hero-list",
      "item-cost",
      "loot",
      "priority-list",
      "settings",
      "signature-item",
      "top-team",
      "translation",
    ])),
  },
});

interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = function HeroList() {
  const router = useRouter();
  const { values } = useContext(ProfileContext);

  if (process.browser) {
    if (values.userId) {
      router.push(`/hero-list/${values.userId}`);
    } else {
      router.push(`/`);
    }
  }

  return <div />;
};

export default HeroList;

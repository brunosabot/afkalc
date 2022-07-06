import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "hero-list"])),
  },
});
interface IProps {
  [key: string]: never;
}

const TopTeam: React.FC<IProps> = function TopTeam() {
  const router = useRouter();

  if (process.browser) {
    router.push(`/top-team/,,,,,-,,,,,`);
  }

  return <div />;
};

export default TopTeam;

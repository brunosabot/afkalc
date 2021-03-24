import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ProfileContext from "../../components/providers/ProfileContext";
import LoginButton from "../../components/ui/button/LoginButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "hero-list"])),
  },
});
interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = () => {
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const { t } = useTranslation("hero-list");

  if (values.isAuth && values.userId) {
    router.push(`/hero-list/${values.userId}`);
  }

  return (
    <Card>
      <CardTitle>{t("common:require-login")}</CardTitle>
      <LoginButton />
    </Card>
  );
};

export default HeroList;

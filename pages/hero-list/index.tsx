import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import UserContext from "../../components/providers/UserContext";
import LoginButton from "../../components/ui/button/LoginButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import { useTranslation } from "../../i18n";

interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = () => {
  const router = useRouter();
  const { values } = useContext(FirebaseContext);
  const { values:userValues } = useContext(UserContext);
  const { t } = useTranslation("hero-list");

  if (values.isAuth && userValues.shareId) {
    router.push(`/hero-list/${userValues.shareId}`);
  }

  return (
    <Card>
      <CardTitle>{t("common:require-login")}</CardTitle>
      <LoginButton />
    </Card>
  );
};

export default HeroList;

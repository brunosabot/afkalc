import React from "react";
import { useTranslation } from "react-i18next";
import AnonymousLoginButton from "./button/AnonymousLoginButton";
import FacebookLoginButton from "./button/FacebookLoginButton";
import ForgottenPassword from "./button/ForgottenPassword";
import GoogleLoginButton from "./button/GoogleLoginButton";
import PasswordLoginButton from "./button/PasswordLoginButton";
import TwitterLoginButton from "./button/TwitterLoginButton";
import Card from "./card/Card";
import CardTitle from "./card/CardTitle";

interface Props {
  [key: string]: never;
}

const LoginBox: React.FC<Props> = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardTitle>{t("common:welcome")}</CardTitle>
      <GoogleLoginButton />
      <FacebookLoginButton />
      <TwitterLoginButton />
      <PasswordLoginButton />
      <AnonymousLoginButton />
      <ForgottenPassword />
    </Card>
  );
};

export default LoginBox;

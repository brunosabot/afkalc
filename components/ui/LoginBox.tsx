import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import AnonymousLoginButton from "./button/AnonymousLoginButton";
import FacebookLoginButton from "./button/FacebookLoginButton";
import ForgottenPassword from "./button/ForgottenPassword";
import GoogleLoginButton from "./button/GoogleLoginButton";
import PasswordLoginButton from "./button/PasswordLoginButton";
import TwitterLoginButton from "./button/TwitterLoginButton";
import Card from "./card/Card";
import CardHelp from "./card/CardHelp";
import CardTitle from "./card/CardTitle";
import styles from "./LoginBox.module.css";

interface Props {
  [key: string]: never;
}

const LoginBox: React.FC<Props> = function LoginBox() {
  const { values } = useContext(FirebaseContext);
  const { t } = useTranslation();
  return (
    <Card>
      <CardTitle>{t("common:welcome")}</CardTitle>
      <CardHelp>{t("common:user-on-app", { counter: values.userCounter })}</CardHelp>
      <GoogleLoginButton />
      <FacebookLoginButton />
      <TwitterLoginButton />
      <PasswordLoginButton />
      <AnonymousLoginButton />
      <ForgottenPassword />
      <Link href="/settings" className={styles.Settings}>
        {t("menu.settings")}
      </Link>
    </Card>
  );
};

export default LoginBox;

import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import ForgottenPassword from "./button/ForgottenPassword";
import PasswordLoginButton from "./button/PasswordLoginButton";
import Card from "./card/Card";
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
      <PasswordLoginButton />      
      <ForgottenPassword />
      <Link href="/settings">
        <a className={styles.Settings}>{t("menu.settings")}</a>
      </Link>
    </Card>
  );
};

export default LoginBox;

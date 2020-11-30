import Head from "next/head";
import React, { useContext } from "react";
import { FirebaseContext } from "../components/providers/FirebaseProvider";
import LangButton from "../components/ui/button/LangButton";
import LoginButton from "../components/ui/button/LoginButton";
import LogoutButton from "../components/ui/button/LogoutButton";
import Card from "../components/ui/card/Card";
import CardTitle from "../components/ui/card/CardTitle";
import MenuItem from "../components/ui/menu/MenuItem";
import { useTranslation } from "../i18n";

interface IProps {
  [key: string]: never;
}

const Home: React.FC<IProps> = () => {
  const { values } = useContext(FirebaseContext);
  const { t } = useTranslation("common");

  return (
    <Card>
      <CardTitle>{t("welcome")}</CardTitle>
      <Head>
        <title>{`${t("common:menu.home")} - Afkalc`}</title>
        <meta name="description" content={t("welcome")} />
      </Head>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {process.env.NODE_ENV === "development" ? <LangButton lang="dev" emoji="👨‍💻" /> : null}
        <LangButton lang="fr" emoji="🇫🇷" />
        <LangButton lang="en" emoji="🇺🇸‍" />
      </div>

      {values.isAuth ? <LogoutButton /> : <LoginButton />}

      <div style={{ padding: "0 16px 16px 16px" }}>
        <MenuItem to="/signature-item">{t("menu.signature-item")}</MenuItem>
        <MenuItem to="/elite-summon">{t("menu.elite-summon")}</MenuItem>
        <MenuItem to="/loot">{t("menu.loot")}</MenuItem>
        <MenuItem to="/fast-reward">{t("menu.fast-reward")}</MenuItem>
        <MenuItem to="/hero-list">{t("menu.hero-list")}</MenuItem>
        <MenuItem to="/top-team">{t("menu.top-team")}</MenuItem>
        <MenuItem to="/item-cost">{t("menu.item-cost")}</MenuItem>
      </div>
    </Card>
  );
};

export default Home;

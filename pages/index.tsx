import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { FirebaseContext } from "../components/providers/FirebaseProvider";
import LangButton from "../components/ui/button/LangButton";
import LoginButton from "../components/ui/button/LoginButton";
import LogoutButton from "../components/ui/button/LogoutButton";
import Card from "../components/ui/card/Card";
import CardTitle from "../components/ui/card/CardTitle";
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

      <div className="home-link__wrapper">
        <Link href="/signature-item">
          <a className="home-link">{t("menu.signature-item")}</a>
        </Link>
        <Link href="/elite-summon">
          <a className="home-link">{t("menu.elite-summon")}</a>
        </Link>
        <Link href="/loot">
          <a className="home-link">{t("menu.loot")}</a>
        </Link>
        <Link href="/fast-reward">
          <a className="home-link">{t("menu.fast-reward")}</a>
        </Link>
        <Link href="/hero-list">
          <a className="home-link">{t("menu.hero-list")}</a>
        </Link>
        <Link href="/top-team">
          <a className="home-link">{t("menu.top-team")}</a>
        </Link>
        <Link href="/item-cost">
          <a className="home-link">{t("menu.item-cost")}</a>
        </Link>
      </div>
    </Card>
  );
};

export default Home;

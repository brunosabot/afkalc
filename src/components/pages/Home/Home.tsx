import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import LangButton from "../../ui/button/LangButton";
import LoginButton from "../../ui/button/LoginButton";
import LogoutButton from "../../ui/button/LogoutButton";
import Card from "../../ui/card/Card";
import CardTitle from "../../ui/card/CardTitle";

interface IProps {
  [key: string]: never;
}

const Home: React.FC<IProps> = () => {
  const { values } = useContext(FirebaseContext);
  const { t } = useTranslation("common");

  return (
    <Card>
      <CardTitle>{t("welcome")}</CardTitle>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {process.env.NODE_ENV === "development" ? <LangButton lang="dev" emoji="👨‍💻" /> : null}
        <LangButton lang="en" emoji="🇺🇸‍" />
      </div>

      {values.isAuth ? <LogoutButton /> : <LoginButton />}

      <div className="home-link__wrapper">
        <NavLink className="home-link" to="/signature-item">
          {t("menu.signature-item")}
        </NavLink>
        <NavLink className="home-link" to="/elite-summon">
          {t("menu.elite-summon")}
        </NavLink>
        <NavLink className="home-link" to="/loot">
          {t("menu.loot")}
        </NavLink>
        <NavLink className="home-link" to="/hero-list">
          {t("menu.hero-list")}
        </NavLink>
        <NavLink className="home-link" to="/fast-reward">
          {t("menu.fast-reward")}
        </NavLink>
      </div>
    </Card>
  );
};

export default Home;

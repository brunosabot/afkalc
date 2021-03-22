import {
  mdiAccountGroup,
  mdiAccountHeart,
  mdiChevronTripleUp,
  mdiCircleMultiple,
  mdiDiamondStone,
  mdiFastForward,
  mdiGithub,
  mdiHome,
  mdiMap,
  mdiPlaylistCheck,
  mdiScript,
  mdiUpdate,
  mdiViewList,
} from "@mdi/js";
import Head from "next/head";
import React, { useContext } from "react";
import ProfileContext from "../components/providers/ProfileContext";
import LangButton from "../components/ui/button/LangButton";
import LoginButton from "../components/ui/button/LoginButton";
import LogoutButton from "../components/ui/button/LogoutButton";
import Card from "../components/ui/card/Card";
import CardTitle from "../components/ui/card/CardTitle";
import MenuItem from "../components/ui/menu/MenuItem";
import MenuItemExternal from "../components/ui/menu/MenuItemExternal";
import { useTranslation } from "../i18n";

interface IProps {
  [key: string]: never;
}

const Home: React.FC<IProps> = () => {
  const { values } = useContext(ProfileContext);
  const { t } = useTranslation("common");

  return (
    <div style={{ gap: "16px", display: "grid" }}>
      <Card>
        <CardTitle icon={mdiHome}>{t("common:welcome")}</CardTitle>
        <Head>
          <title>{`${t("common:menu.home")} - Afkalc`}</title>
          <meta name="description" content={t("common:welcome")} />
        </Head>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {process.env.NODE_ENV === "development" ? <LangButton lang="dev" emoji="👨‍💻" /> : null}
          <LangButton lang="fr" emoji="🇫🇷" />
          <LangButton lang="en" emoji="🇺🇸‍" />
        </div>

        {values.isAuth ? <LogoutButton /> : <LoginButton />}
      </Card>
      <Card>
        <div style={{ padding: "8px 16px" }}>
          <MenuItem to="/signature-item" icon={mdiChevronTripleUp}>
            {t("common:menu.signature-item")}
          </MenuItem>
          <MenuItem to="/elite-summon" icon={mdiScript}>
            {t("common:menu.elite-summon")}
          </MenuItem>
          <MenuItem to="/loot" icon={mdiUpdate}>
            {t("common:menu.loot")}
          </MenuItem>
          <MenuItem to="/fast-reward" icon={mdiFastForward}>
            {t("common:menu.fast-reward")}
          </MenuItem>
          <MenuItem to={`/hero-list/${values.userId}`} icon={mdiViewList}>
            {t("common:menu.hero-list")}
          </MenuItem>
          <MenuItem to="/top-team" icon={mdiAccountGroup}>
            {t("common:menu.top-team")}
          </MenuItem>
          <MenuItem to="/item-cost" icon={mdiDiamondStone}>
            {t("common:menu.item-cost")}
          </MenuItem>
          <MenuItem to="/tiers-list" icon={mdiPlaylistCheck}>
            {t("common:menu.priority-list")}
          </MenuItem>
          <MenuItem to="/abex-relic" icon={mdiMap}>
            {t("common:menu.abex-relic")}
          </MenuItem>
          <MenuItem to="/abex-relic-sell" icon={mdiCircleMultiple}>
            {t("common:menu.abex-relic-sell")}
          </MenuItem>
          <MenuItem to="/credit" icon={mdiAccountHeart}>
            {t("common:menu.credit")}
          </MenuItem>
          <MenuItemExternal to="https://github.com/brunosabot/afkalc" icon={mdiGithub}>
            {t("common:contribution.edit-on-github")}
          </MenuItemExternal>
        </div>
      </Card>
    </div>
  );
};

export default Home;

import {
  mdiAccountGroup,
  mdiAccountHeart,
  mdiAccountMultiplePlusOutline,
  mdiAccountSupervisor,
  mdiChevronTripleUp,
  mdiCircleMultiple,
  mdiCog,
  mdiDiamondStone,
  mdiDiscord,
  mdiEarth,
  mdiFastForward,
  mdiGithub,
  mdiHome,
  mdiMap,
  mdiPaw,
  mdiPlaylistCheck,
  mdiRoadVariant,
  mdiScript,
  mdiShare,
  mdiTree,
  mdiUpdate,
  mdiViewList,
} from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext } from "react";
import withLayoutPrivateColumn from "../components/layout/withLayoutPrivateColumn";
import { FirebaseContext } from "../components/providers/FirebaseProvider";
import ProfileContext from "../components/providers/ProfileContext";
import LangButton from "../components/ui/button/LangButton";
import LogoutButton from "../components/ui/button/LogoutButton";
import MoreLangButton from "../components/ui/button/MoreLangButton";
import Card from "../components/ui/card/Card";
import CardHelp from "../components/ui/card/CardHelp";
import CardTitle from "../components/ui/card/CardTitle";
import Donate from "../components/ui/Donate";
import MenuBox from "../components/ui/menu/MenuBox";
import MenuItem from "../components/ui/menu/MenuItem";
import MenuItemExternal from "../components/ui/menu/MenuItemExternal";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

interface IProps {
  [key: string]: never;
}

const Home: React.FC<IProps> = function Home() {
  const { values } = useContext(ProfileContext);
  const { values: firebaseValues } = useContext(FirebaseContext);
  const { t } = useTranslation("common");

  return (
    <>
      <Card>
        <CardTitle icon={mdiHome}>{t("common:welcome")}</CardTitle>
        <Head>
          <title>{`${t("common:menu.home")} - Afkalc`}</title>
          <meta name="description" content={t("common:welcome")} />
        </Head>
        <CardHelp>
          {t("common:logged-user-on-app", { counter: firebaseValues.userCounter })}
        </CardHelp>
      </Card>

      <Card>
        <CardTitle>{t("common:menu.category-box")}</CardTitle>
        <MenuBox>
          <MenuItem to={`/hero-list/${values.userId}`} icon={mdiViewList}>
            {t("common:menu.hero-list")}
          </MenuItem>
          <MenuItem to="/hero-list/pets" icon={mdiPaw}>
            {t("common:menu.pet-list")}
          </MenuItem>
          <MenuItem to="/elder-tree" icon={mdiTree}>
            {t("common:menu.elder-tree")}
          </MenuItem>
          <MenuItem to="/guild" icon={mdiAccountSupervisor}>
            {t("common:menu.guild")}
          </MenuItem>
          <MenuItem to="/tiers-list" icon={mdiPlaylistCheck}>
            {t("common:menu.priority-list")}
          </MenuItem>
          <MenuItem to="/top-team/0,0,0,0,0,0-0,0,0,0,0,0" icon={mdiAccountGroup}>
            {t("common:menu.top-team")}
          </MenuItem>
          <MenuItem to="/pve" icon={mdiRoadVariant}>
            {t("common:menu.pve")}
          </MenuItem>
          <MenuItem to={`/public/${values.userId}`} icon={mdiEarth}>
            {t("common:menu.public")}
          </MenuItem>
        </MenuBox>
      </Card>

      <Card>
        <CardTitle>{t("common:menu.category-abex")}</CardTitle>
        <MenuBox>
          <MenuItem to="/abex-relic" icon={mdiMap}>
            {t("common:menu.abex-relic")}
          </MenuItem>
          <MenuItem to="/abex-relic-sell" icon={mdiCircleMultiple}>
            {t("common:menu.abex-relic-sell")}
          </MenuItem>
          <MenuItem to="/abex-roster" icon={mdiAccountMultiplePlusOutline}>
            {t("common:menu.abex-roster")}
          </MenuItem>
          <MenuItem to="/abex-relic-share" icon={mdiShare}>
            {t("common:menu.abex-relic-share")}
          </MenuItem>
        </MenuBox>
      </Card>

      <Card>
        <CardTitle>{t("common:menu.category-calc")}</CardTitle>
        <MenuBox>
          <MenuItem to="/item-cost" icon={mdiDiamondStone}>
            {t("common:menu.item-cost")}
          </MenuItem>
          <MenuItem to="/loot" icon={mdiUpdate}>
            {t("common:menu.loot")}
          </MenuItem>
          <MenuItem to="/fast-reward" icon={mdiFastForward}>
            {t("common:menu.fast-reward")}
          </MenuItem>
          <MenuItem to="/signature-item" icon={mdiChevronTripleUp}>
            {t("common:menu.signature-item")}
          </MenuItem>
          <MenuItem to="/elite-summon" icon={mdiScript}>
            {t("common:menu.elite-summon")}
          </MenuItem>
        </MenuBox>
      </Card>

      <Card>
        <CardTitle>{t("common:menu.category-misc")}</CardTitle>
        <MenuBox>
          <MenuItem to="/credit" icon={mdiAccountHeart}>
            {t("common:menu.credit")}
          </MenuItem>
          <MenuItem to="/settings" icon={mdiCog}>
            {t("common:menu.settings")}
          </MenuItem>
          <MenuItemExternal to="https://discord.gg/NSZFSdr9BW" icon={mdiDiscord}>
            Discord
          </MenuItemExternal>
          <MenuItemExternal to="https://github.com/brunosabot/afkalc" icon={mdiGithub}>
            {t("common:contribution.edit-on-github")}
          </MenuItemExternal>
          <Donate />
        </MenuBox>
      </Card>

      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          {process.env.NODE_ENV === "development" ? <LangButton lang="dev" emoji="👨‍💻" /> : null}
          <LangButton lang="de_DE" emoji="🇩🇪" />
          <LangButton lang="en_US" emoji="🇺🇸‍" />
          <LangButton lang="es_ES" emoji="🇪🇸" />
          <LangButton lang="fr_FR" emoji="🇫🇷" />
          <LangButton lang="it_IT" emoji="🇮🇹" />
          <LangButton lang="pt_BR" emoji="🇧🇷" />
          <LangButton lang="ru_RU" emoji="🇷🇺" />
          <MoreLangButton />
        </div>

        <LogoutButton />
      </Card>
    </>
  );
};

export default withLayoutPrivateColumn(Home);

import {
  mdiAccountGroup, mdiAccountSupervisor,
  mdiChevronTripleUp,
  mdiCircleMultiple,
  mdiCog,
  mdiDiamondStone, mdiFastForward, mdiHome,
  mdiMap,
  mdiPlaylistCheck,
  mdiScript,
  mdiTree,
  mdiUpdate,
  mdiViewList
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
import Card from "../components/ui/card/Card";
import CardTitle from "../components/ui/card/CardTitle";
import MenuBox from "../components/ui/menu/MenuBox";
import MenuItem from "../components/ui/menu/MenuItem";

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
      </Card>

      <Card>
        <CardTitle>{t("common:menu.category-box")}</CardTitle>
        <MenuBox>
          <MenuItem to={`/hero-list/${values.userId}`} icon={mdiViewList}>
            {t("common:menu.hero-list")}
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
          <MenuItem to="/top-team" icon={mdiAccountGroup}>
            {t("common:menu.top-team")}
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
          <MenuItem to="/settings" icon={mdiCog}>
            {t("common:menu.settings")}
          </MenuItem>          
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
          <LangButton lang="en_US" emoji="🇺🇸‍" />
        </div>

        <LogoutButton />
      </Card>
    </>
  );
};

export default withLayoutPrivateColumn(Home);

import { mdiTree } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import ClassForm from "../../components/pages/ElderTree/ui/ClassForm";
import MainForm from "../../components/pages/ElderTree/ui/MainForm";
import Stat from "../../components/pages/ElderTree/ui/Stat";
import TotalEssence from "../../components/pages/ElderTree/ui/TotalEssence";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import CardWarn from "../../components/ui/card/CardWarn";
import elderTreeJson from "../../data/elder-tree.json";
import heroClassJson from "../../data/heroClass.json";
import HeroClass from "../../types/HeroClass";

const MAX_LEVEL = Object.keys(elderTreeJson.ranger).length - 1;

const heroClassData = heroClassJson as HeroClass[];

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "elder-tree"])),
  },
});

interface IProps {
  [key: string]: never;
}

const ElderTree: React.FC<IProps> = function ElderTree() {
  const { t } = useTranslation("elder-tree");
  const router = useRouter();

  const {
    actions: {
      setWarriorElderTree,
      setTankElderTree,
      setRangerElderTree,
      setMageElderTree,
      setSupportElderTree,
      setMainElderTree,
    },
    values,
  } = useContext(ProfileContext);

  return (
    <>
      <Card>
        <Head>
          <title>{`${t("common:menu.elder-tree")} - Afkalc`}</title>
        </Head>
        <CardTitle icon={mdiTree}>{t("common:menu.elder-tree")}</CardTitle>
        <TotalEssence />
        {values.elderTree.main <= 10 ? <CardHelp>{t("main-tree-empty")}</CardHelp> : null}
        <MainForm value={values.elderTree.main} onChange={setMainElderTree} />
        <ClassForm
          max={values.elderTree.main}
          value={values.elderTree.warrior}
          heroClass="duras-might"
          onChange={setWarriorElderTree}
        />
        <ClassForm
          max={values.elderTree.main}
          value={values.elderTree.tank}
          heroClass="duras-fortitude"
          onChange={setTankElderTree}
        />
        <ClassForm
          max={values.elderTree.main}
          value={values.elderTree.ranger}
          heroClass="duras-celerity"
          onChange={setRangerElderTree}
        />
        <ClassForm
          max={values.elderTree.main}
          value={values.elderTree.mage}
          heroClass="duras-sorcery"
          onChange={setMageElderTree}
        />
        <ClassForm
          max={values.elderTree.main}
          value={values.elderTree.support}
          heroClass="duras-sustenance"
          onChange={setSupportElderTree}
        />
        <CardActions>
          <CardAction onClick={() => router.push("/elder-tree/simulate")}>
            {t("simulate")}
          </CardAction>
        </CardActions>
      </Card>
      {heroClassData.map((heroClass) => (
        <Card key={heroClass}>
          <CardTitle>{t(`common:heroClass.${heroClass}`)}</CardTitle>
          {values.elderTree[heroClass] > MAX_LEVEL && <CardWarn>{t("max-data-reach")}</CardWarn>}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Stat stat="hp" heroClass={heroClass} />
            <Stat stat="hp.pr" heroClass={heroClass} />
            <Stat stat="atk" heroClass={heroClass} />
            <Stat stat="atk.pr" heroClass={heroClass} />
            <Stat stat="arm" heroClass={heroClass} />
            <Stat stat="arm.pr" heroClass={heroClass} />
            <Stat stat="hit" heroClass={heroClass} />
            <Stat stat="dodg" heroClass={heroClass} />
            <Stat stat="mspd" heroClass={heroClass} />
            <Stat stat="crit" heroClass={heroClass} />
            <Stat stat="lfs" heroClass={heroClass} />
          </div>
        </Card>
      ))}
    </>
  );
};

export default withLayoutPrivateColumn(ElderTree);

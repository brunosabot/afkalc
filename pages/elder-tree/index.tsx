import { mdiTree } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import ClassForm from "../../components/pages/ElderTree/ui/ClassForm";
import Stat from "../../components/pages/ElderTree/ui/Stat";
import TotalEssence from "../../components/pages/ElderTree/ui/TotalEssence";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import heroClassJson from "../../data/heroClass.json";
import HeroClass from "../../types/HeroClass";

const heroClassData = heroClassJson as HeroClass[];

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "elder-tree"])),
  },
});

interface IProps {
  [key: string]: never;
}

const ElderTree: React.FC<IProps> = () => {
  const { t } = useTranslation("elder-tree");
  const router = useRouter();

  const {
    actions: {
      setWarriorElderTree,
      setTankElderTree,
      setRangerElderTree,
      setMageElderTree,
      setSupportElderTree,
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
        <ClassForm
          value={values.elderTree.warrior}
          heroClass="warrior"
          onChange={setWarriorElderTree}
        />
        <ClassForm value={values.elderTree.tank} heroClass="tank" onChange={setTankElderTree} />
        <ClassForm
          value={values.elderTree.ranger}
          heroClass="ranger"
          onChange={setRangerElderTree}
        />
        <ClassForm value={values.elderTree.mage} heroClass="mage" onChange={setMageElderTree} />
        <ClassForm
          value={values.elderTree.support}
          heroClass="support"
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

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Stat stat="hp" heroClass={heroClass} />
            <Stat stat="hpPerc" heroClass={heroClass} />
            <Stat stat="atk" heroClass={heroClass} />
            <Stat stat="atkPerc" heroClass={heroClass} />
            <Stat stat="def" heroClass={heroClass} />
            <Stat stat="defPerc" heroClass={heroClass} />
            <Stat stat="acc" heroClass={heroClass} />
            <Stat stat="dodge" heroClass={heroClass} />
            <Stat stat="haste" heroClass={heroClass} />
            <Stat stat="crit" heroClass={heroClass} />
            <Stat stat="ll" heroClass={heroClass} />
          </div>
        </Card>
      ))}
    </>
  );
};

export default withLayoutPrivateColumn(ElderTree);

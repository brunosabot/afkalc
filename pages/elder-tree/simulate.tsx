import { mdiTree } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import ClassForm from "../../components/pages/ElderTree/ui/ClassForm";
import Stat from "../../components/pages/ElderTree/ui/Stat";
import TotalEssenceSimulation from "../../components/pages/ElderTree/ui/TotalEssenceSimulation";
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

const Simulation: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation("elder-tree");

  const [warrior, setWarrior] = useState<number>(0);
  const [tank, setTank] = useState<number>(0);
  const [ranger, setRanger] = useState<number>(0);
  const [mage, setMage] = useState<number>(0);
  const [support, setSupport] = useState<number>(0);

  return (
    <>
      <Card>
        <Head>
          <title>{`${t("common:menu.elder-tree")} - Afkalc`}</title>
        </Head>
        <CardTitle icon={mdiTree}>{t("common:menu.elder-tree")}</CardTitle>
        <TotalEssenceSimulation
          warrior={warrior}
          tank={tank}
          ranger={ranger}
          mage={mage}
          support={support}
        />
        <ClassForm value={warrior} heroClass="warrior" onChange={setWarrior} />
        <ClassForm value={tank} heroClass="tank" onChange={setTank} />
        <ClassForm value={ranger} heroClass="ranger" onChange={setRanger} />
        <ClassForm value={mage} heroClass="mage" onChange={setMage} />
        <ClassForm value={support} heroClass="support" onChange={setSupport} />
        <CardActions>
          <CardAction onClick={() => router.push("/elder-tree")}>{t("current-tree")}</CardAction>
        </CardActions>
      </Card>
      {heroClassData.map((heroClass) => {
        const level = {
          [HeroClass.warrior]: warrior,
          [HeroClass.tank]: tank,
          [HeroClass.ranger]: ranger,
          [HeroClass.mage]: mage,
          [HeroClass.support]: support,
        }[heroClass];

        return (
          <Card key={heroClass}>
            <CardTitle>{t(`common:heroClass.${heroClass}`)}</CardTitle>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Stat level={level} stat="hp" heroClass={heroClass} />
              <Stat level={level} stat="hp.pr" heroClass={heroClass} />
              <Stat level={level} stat="atk" heroClass={heroClass} />
              <Stat level={level} stat="atk.pr" heroClass={heroClass} />
              <Stat level={level} stat="arm" heroClass={heroClass} />
              <Stat level={level} stat="arm.pr" heroClass={heroClass} />
              <Stat level={level} stat="hit" heroClass={heroClass} />
              <Stat level={level} stat="dodg" heroClass={heroClass} />
              <Stat level={level} stat="mspd" heroClass={heroClass} />
              <Stat level={level} stat="crit" heroClass={heroClass} />
              <Stat level={level} stat="lfs" heroClass={heroClass} />
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default withLayoutPrivateColumn(Simulation);

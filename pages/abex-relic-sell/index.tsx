import { mdiHelpBox, mdiMap } from "@mdi/js";
import Head from "next/head";
import React, { useCallback, useMemo, useState } from "react";
import useFirestoreQuery from "../../components/hooks/useFirestoreQuery";
import useUserFirestoreDocument from "../../components/hooks/useUserFirestoreDocument";
import useCurrentToGoal from "../../components/pages/AbexRelicSell/hooks/useCurrentToGoal";
import Current from "../../components/pages/AbexRelicSell/types/Current";
import RelicChoiceList from "../../components/pages/AbexRelicSell/ui/RelicChoiceList";
import RelicList from "../../components/pages/AbexRelicSell/ui/RelicList";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTab from "../../components/ui/card/CardTab";
import CardTabs from "../../components/ui/card/CardTabs";
import CardTitle from "../../components/ui/card/CardTitle";
import Svg from "../../components/ui/Svg";
import { useTranslation } from "../../i18n";
import HeroClass from "../../types/HeroClass";

interface IProps {
  [key: string]: never;
}

type StringHeroClass = "ranger" | "mage" | "tank" | "warrior" | "support";

function toCurrent(data: any): Current {
  const output: Current = {
    [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
    [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
    [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
    [HeroClass.warrior]: [0, 0, 0, 0, 0, 0],
    [HeroClass.support]: [0, 0, 0, 0, 0, 0],
  };
  Object.keys(data).forEach((theClass: string) => {
    const heroClass = HeroClass[theClass as StringHeroClass];
    output[heroClass] = data[theClass];
  });

  return output;
}

const AbexRelicSell: React.FC<IProps> = () => {
  const { t } = useTranslation("abex-relic-sell");
  const [tab, setTab] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const document = useUserFirestoreDocument(`abex/%ID%`);
  const result = useFirestoreQuery(document);

  const currentRelic: Current = useMemo(
    () =>
      toCurrent(
        result.data?.currentRelic ?? {
          [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
          [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
          [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
          [HeroClass.warrior]: [0, 0, 0, 0, 0, 0],
          [HeroClass.support]: [0, 0, 0, 0, 0, 0],
        }
      ),
    [result.data?.currentRelic]
  );
  const goalRelic: Current = useMemo(
    () =>
      toCurrent(
        result.data?.goalRelic ?? {
          [HeroClass.ranger]: [5205, 5104, 5204, 5304, 5305, 5306],
          [HeroClass.mage]: [5405, 5404, 5202, 5304, 5305, 5406],
          [HeroClass.tank]: [5205, 5202, 5204, 5201, 5203, 5206],
          [HeroClass.warrior]: [5205, 5104, 5204, 5105, 5203, 5106],
          [HeroClass.support]: [5205, 5505, 5202, 5504, 5404, 5506],
        }
      ),
    [result.data?.goalRelic]
  );

  const setCurrentRelic = useCallback(() => document?.set({ currentRelic }, { merge: true }), [
    document,
    currentRelic,
  ]);
  const setGoalRelic = useCallback(() => document?.set({ goalRelic }, { merge: true }), [
    document,
    goalRelic,
  ]);

  useCurrentToGoal(currentRelic, goalRelic);

  if (result.status !== "success") return null;

  return (
    <Card>
      <CardTitle
        icon={mdiMap}
        action={<Svg onClick={() => setShowHelp(!showHelp)} d={mdiHelpBox} />}
      >
        {t("common:menu.abex-relic-sell")}
      </CardTitle>
      <Head>
        <title>{`${t("common:menu.abex-relic-sell")} - Afkalc`}</title>
        <meta name="description" content={t("abex-relic-sell-desc")} />
      </Head>

      {showHelp ? <CardHelp>{t("help")}</CardHelp> : null}

      <CardTabs>
        <CardTab active={tab === 0} onClick={() => setTab(0)}>
          {t("label-current")}
        </CardTab>
        <CardTab active={tab === 1} onClick={() => setTab(1)}>
          {t("label-goal")}
        </CardTab>
        <CardTab active={tab === 2} onClick={() => setTab(2)}>
          {t("label-inventory")}
        </CardTab>
      </CardTabs>

      {tab === 0 ? <RelicChoiceList current={currentRelic} setCurrent={setCurrentRelic} /> : null}
      {tab === 1 ? <RelicChoiceList current={goalRelic} setCurrent={setGoalRelic} /> : null}
      {tab === 2 ? <RelicList current={currentRelic} goal={goalRelic} /> : null}
    </Card>
  );
};

export default AbexRelicSell;

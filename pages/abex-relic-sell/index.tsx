import { mdiHelpBox, mdiMap } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import useCurrentToGoal from "../../components/pages/AbexRelicSell/hooks/useCurrentToGoal";
import RelicChoiceList from "../../components/pages/AbexRelicSell/ui/RelicChoiceList";
import RelicList from "../../components/pages/AbexRelicSell/ui/RelicList";
import AbyssalExpeditionContext from "../../components/providers/AbyssalExpeditionContext";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import LoginButton from "../../components/ui/button/LoginButton";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTab from "../../components/ui/card/CardTab";
import CardTabs from "../../components/ui/card/CardTabs";
import CardTitle from "../../components/ui/card/CardTitle";
import Svg from "../../components/ui/Svg";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "abex-relic-sell"])),
  },
});
interface IProps {
  [key: string]: never;
}

const AbexRelicSell: React.FC<IProps> = () => {
  const { t } = useTranslation("abex-relic-sell");
  const { values } = useContext(FirebaseContext);
  const [tab, setTab] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const { actions, values: abexValues } = useContext(AbyssalExpeditionContext);

  useEffect(() => actions.load());
  useCurrentToGoal(abexValues.currentRelics, abexValues.goalRelics);

  if (values.isAuth === false) {
    return (
      <Card>
        <CardTitle>{t("common:require-login")}</CardTitle>
        <LoginButton />
      </Card>
    );
  }

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

      {tab === 0 ? (
        <RelicChoiceList current={abexValues.currentRelics} setCurrent={actions.setCurrentRelics} />
      ) : null}
      {tab === 1 ? (
        <RelicChoiceList current={abexValues.goalRelics} setCurrent={actions.setGoalRelics} />
      ) : null}
      {tab === 2 ? (
        <RelicList
          inventory={abexValues.relicInventory}
          setInventory={actions.setRelicInventory}
          current={abexValues.currentRelics}
          goal={abexValues.goalRelics}
        />
      ) : null}
    </Card>
  );
};

export default AbexRelicSell;

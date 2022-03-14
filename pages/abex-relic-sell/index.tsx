import { mdiBackupRestore, mdiHelpBox, mdiMap } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext, useState } from "react";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import useCurrentToGoal from "../../components/pages/AbexRelicSell/hooks/useCurrentToGoal";
import RelicCalculator from "../../components/pages/AbexRelicSell/ui/RelicCalculator";
import RelicChoiceList from "../../components/pages/AbexRelicSell/ui/RelicChoiceList";
import RelicList from "../../components/pages/AbexRelicSell/ui/RelicList";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
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

const AbexRelicSell: React.FC<IProps> = function AbexRelicSell() {
  const { t } = useTranslation("abex-relic-sell");
  const [tab, setTab] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const { actions, values } = useContext(ProfileContext);

  useCurrentToGoal(values.abexCurrentRelics, values.abexGoalRelics);

  const resetRelics = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-reset-box"))) {
      actions.resetAbexRelicsAndInventory();
    }
  };

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
        <CardTab active={tab === 3} onClick={() => setTab(3)}>
          {t("label-calculator")}
        </CardTab>
      </CardTabs>

      {tab === 0 ? (
        <RelicChoiceList
          current={values.abexCurrentRelics}
          setCurrent={actions.setAbexCurrentRelics}
        />
      ) : null}
      {tab === 1 ? (
        <RelicChoiceList current={values.abexGoalRelics} setCurrent={actions.setAbexGoalRelics} />
      ) : null}
      {tab === 2 ? (
        <RelicList
          inventory={values.abexRelicInventory}
          setInventory={actions.setAbexRelicInventory}
          current={values.abexCurrentRelics}
          goal={values.abexGoalRelics}
        />
      ) : null}
      {tab === 3 ? (
        <RelicCalculator inventory={values.abexRelicInventory} current={values.abexCurrentRelics} />
      ) : null}

      <CardActions>
        <CardAction onClick={resetRelics} icon={mdiBackupRestore}>
          {t("reset-box")}
        </CardAction>
      </CardActions>
    </Card>
  );
};

export default withLayoutPrivate(AbexRelicSell);

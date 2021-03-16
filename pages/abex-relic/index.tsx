import { mdiMap } from "@mdi/js";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Camp from "../../components/pages/AbexRelic/Camp";
import AbyssalExpeditionContext from "../../components/providers/AbyssalExpeditionContext";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import LoginButton from "../../components/ui/button/LoginButton";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import Grid from "../../components/ui/layout/Grid";
import abexData from "../../data/abex.json";
import { useTranslation } from "../../i18n";

interface IProps {
  [key: string]: never;
}

const AbexRelic: React.FC<IProps> = () => {
  const { t } = useTranslation("abex-relic");
  const { values } = useContext(FirebaseContext);
  const { actions, values: abexValues } = useContext(AbyssalExpeditionContext);

  const [now, setNow] = useState(Math.round(Date.now() / 1000));

  useEffect(() => actions.load());
  useEffect(() => {
    const interval = setInterval(() => setNow(Math.round(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  });

  const resetTimers = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-reset-timers"))) {
      actions.resetTilesTimers();
    }
  };

  const resetFields = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("confirm-reset-box")) {
      actions.resetTiles();
    }
  };

  if (values.isAuth === false) {
    return (
      <Card>
        <CardTitle>{t("common:require-login")}</CardTitle>
        <LoginButton />
      </Card>
    );
  }

  return (
    <div
      style={{
        maxWidth: "100%",
        paddingTop: "24px",
        gap: "16px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Card>
        <CardTitle icon={mdiMap}>{t("common:menu.abex-relic")}</CardTitle>
        <Head>
          <title>{`${t("common:menu.abex-relic")} - Afkalc`}</title>
          <meta name="description" content={t("common:abex-relic-desc")} />
        </Head>
        <CardActions>
          <CardAction onClick={resetTimers}>{t("reset-timers")}</CardAction>
          <CardAction onClick={resetFields}>{t("reset-box")}</CardAction>
        </CardActions>
      </Card>

      <Grid>
        {abexData.campType.map((camp) => (
          <Camp
            set={(id, d) => actions.setTiles({ ...abexValues.tiles, [id]: d })}
            key={camp.id}
            now={now}
            camp={camp}
            data={abexValues.tiles}
          />
        ))}
      </Grid>
    </div>
  );
};

export default AbexRelic;

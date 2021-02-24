import { mdiMap } from "@mdi/js";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import useFirestoreQuery from "../../components/hooks/useFirestoreQuery";
import useUserFirestoreDocument from "../../components/hooks/useUserFirestoreDocument";
import Camp from "../../components/pages/AbexRelic/Camp";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import Grid from "../../components/ui/layout/Grid";
import abexData from "../../data/abex.json";
import { useTranslation } from "../../i18n";

interface DataLine {
  amount: number;
  garrison: number;
  timer: number;
  timestamp: number;
}

interface IProps {
  [key: string]: never;
}

const AbexRelic: React.FC<IProps> = () => {
  const { t } = useTranslation("abex-relic");

  const document = useUserFirestoreDocument(`abex/%ID%`);
  const result = useFirestoreQuery(document);
  const [now, setNow] = useState(Math.round(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.round(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  });

  const resetTimers = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-reset-timers"))) {
      const newData = { ...data };
      Object.keys(newData).forEach((key) => {
        newData[parseInt(key, 10)].timestamp = now;
        newData[parseInt(key, 10)].timer = 0;
      });
      setData(newData);
    }
  };

  const resetFields = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("confirm-reset-box")) {
      setData({});
    }
  };

  function setData(relicList: { [key: number]: DataLine }) {
    return document?.set({ relicList });
  }

  if (result.status !== "success") return null;

  const data = result.data?.relicList ?? {};

  return (
    <div
      style={{
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
            set={(id, d) => setData({ ...data, [id]: d })}
            key={camp.id}
            now={now}
            camp={camp}
            data={data}
          />
        ))}
      </Grid>
    </div>
  );
};

export default AbexRelic;

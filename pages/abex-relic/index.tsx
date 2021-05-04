import { mdiChartLineVariant, mdiMap } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import Camp from "../../components/pages/AbexRelic/Camp";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import Grid from "../../components/ui/layout/Grid";
import Svg from "../../components/ui/Svg";
import abexData from "../../data/abex.json";
import styles from "./index.module.css";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "abex-relic"])),
  },
});
interface IProps {
  [key: string]: never;
}

const AbexRelic: React.FC<IProps> = () => {
  const { t } = useTranslation("abex-relic");
  const { actions, values } = useContext(ProfileContext);

  const [now, setNow] = useState(Math.round(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.round(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  });

  const resetTimers = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-reset-timers"))) {
      actions.resetAbexTilesTimers();
    }
  };

  const resetFields = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("confirm-reset-box")) {
      actions.resetAbexTiles();
    }
  };

  const total = abexData.campType.reduce(
    (acc, camp) =>
      acc +
      values.abexTiles[camp.id]?.amount * camp.essencePerHour +
      (values.abexTiles[camp.id]?.garrison * camp.essencePerHour * camp.essenceBonusPercentage) /
        100,
    0
  );

  return (
    <>
      <Card>
        <CardTitle icon={mdiMap}>{t("common:menu.abex-relic")}</CardTitle>
        <Head>
          <title>{`${t("common:menu.abex-relic")} - Afkalc`}</title>
          <meta name="description" content={t("common:abex-relic-desc")} />
        </Head>

        <div className={styles.Tiles}>
          {Object.keys(values.abexTiles).map((tile) => {
            const tileId = +tile;

            if (values.abexTiles[tileId].amount === 0) return null;

            return (
              <React.Fragment key={tileId}>
                <span className={styles.TileLevel}>
                  {tileId > 50 ? "P" : "T"}
                  {tileId > 50 ? 100 - tileId : tileId}
                </span>
                {values.abexTiles[tileId].amount}
              </React.Fragment>
            );
          })}
        </div>

        {total ? (
          <span className={styles.RemainingTime}>
            <Svg d={mdiChartLineVariant} />
            {total}
            {t("label-per-hour")}
          </span>
        ) : null}

        <CardActions>
          <CardAction onClick={resetTimers}>{t("reset-timers")}</CardAction>
          <CardAction onClick={resetFields}>{t("reset-box")}</CardAction>
        </CardActions>
      </Card>

      <Grid>
        {abexData.campType.map((camp) => (
          <Camp
            set={(id, d) => actions.setAbexTiles({ ...values.abexTiles, [id]: d })}
            key={camp.id}
            now={now}
            camp={camp}
            data={values.abexTiles}
          />
        ))}
      </Grid>
    </>
  );
};

export default withLayoutPrivate(AbexRelic);

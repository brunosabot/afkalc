import { mdiChartLineVariant, mdiClockOutline } from "@mdi/js";
import { TFunction, useTranslation } from "next-i18next";
import React from "react";
import abexData from "../../../data/abex.json";
import Card from "../../ui/card/Card";
import CardTitle from "../../ui/card/CardTitle";
import Svg from "../../ui/Svg";
import styles from "./Camp.module.css";

interface DataLine {
  amount: number;
  garrison: number;
  timer: number;
  timestamp: number;
}

interface QualityType {
  [key: number]: string;
}

interface IProps {
  camp: any;
  data: any;
  now: number;
  set: (id: number, data: DataLine) => void;
}

function formatTime(sec: number, t: TFunction) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60);

  const hoursText = hours ? `${hours}${t("label-h")}` : "";
  const minutesText = minutes ? `${minutes}${t("label-m")}` : "";
  const secondsText = seconds ? `${seconds}${t("label-s")}` : "";

  return `${hoursText} ${minutesText} ${secondsText}`;
}

const dataQuality = abexData.relicQuality as QualityType;

const Camp: React.FC<IProps> = function Camp({ data, camp, now, set }) {
  const { t } = useTranslation("abex-relic");
  const timer = data[camp.id]?.timer ?? 0;
  const timestamp = data[camp.id]?.timestamp ?? now;
  const amount = data[camp.id]?.amount ?? 0;
  const garrison = data[camp.id]?.garrison ?? 0;
  const diffToNow = now - timestamp;

  const totalEssence = (timer + amount * diffToNow) % camp.relicCooldown;

  const localSet = (key: string) => (e: any) => {
    set(camp.id, {
      timer: totalEssence,
      timestamp: now,
      amount,
      garrison,
      [key]: parseInt(e?.target?.value || "0", 10),
    });
  };

  const relicQuality: string = dataQuality[camp.relicQuality] ?? null;

  if (relicQuality === null) return null;

  return (
    <Card>
      <CardTitle>
        {`${t(`city-${camp.name}`)} - `}
        <span className={styles[`Quality${camp.relicQuality}`]}>{t(`relic-${relicQuality}`)}</span>
      </CardTitle>

      <div className={styles.Form}>
        <div className={styles.FormItem}>
          {t("label-owned")}
          <input
            className={styles.FormItemInput}
            type="number"
            min="0"
            max="40"
            value={amount}
            inputMode="numeric"
            onChange={localSet("amount")}
          />
        </div>
        {camp.essenceBonusAscendingLevel ? (
          <div className={styles.FormItem}>
            {t("label-garrison")}
            <input
              className={styles.FormItemInput}
              type="number"
              min="0"
              value={garrison}
              max={amount}
              inputMode="numeric"
              onChange={localSet("garrison")}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.Details}>
        <progress className={styles.Progress} value={totalEssence} max={camp.relicCooldown} />
        <span className={styles.RemainingTime}>
          <Svg d={mdiChartLineVariant} />
          {amount * camp.essencePerHour +
            (garrison * camp.essencePerHour * camp.essenceBonusPercentage) / 100}
          {t("label-per-hour")}
        </span>
        {amount ? (
          <span className={styles.RemainingTime}>
            <Svg d={mdiClockOutline} />
            {formatTime((camp.relicCooldown - totalEssence) / amount, t)}
          </span>
        ) : null}
        <button className={styles.Button} type="button" onClick={localSet("timer")}>
          {t("reset-timer")}
        </button>
      </div>
    </Card>
  );
};

export default Camp;

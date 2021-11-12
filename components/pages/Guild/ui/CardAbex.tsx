import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import GuildContext from "../../../providers/GuildContext";
import CardTitle from "../../../ui/card/CardTitle";
import InputField from "../../../ui/InputField";
import styles from "./CardAbex.module.css";

interface IProps {
  [key: string]: never;
}

const CardAbex: React.FC<IProps> = function CardAbex() {
  const {
    actions: {
      setAbexAwayTimeLimit,
      setAbexFarmLimit,
      setAbexTilesT1Limit,
      setAbexTilesT2Limit,
      setAbexTilesT3Limit,
      setAbexTilesT4Limit,
      setAbexTilesT5Limit,
      setAbexTilesT6Limit,
      setAbexTilesT7Limit,
      setAbexTilesT8Limit,
    },
    values: {
      isOwner,
      guild: {
        abexAwayTimeLimit,
        abexFarmLimit,
        abexTilesT1Limit,
        abexTilesT2Limit,
        abexTilesT3Limit,
        abexTilesT4Limit,
        abexTilesT5Limit,
        abexTilesT6Limit,
        abexTilesT7Limit,
        abexTilesT8Limit,
      },
    },
  } = useContext(GuildContext);

  const { t } = useTranslation("guild");

  if (isOwner === false) return null;

  return (
    <>
      <CardTitle>{t("title-abex")}</CardTitle>

      <InputField
        label={t("label-away-time-limit")}
        name="away-time-limit"
        onChange={(e) => setAbexAwayTimeLimit(e)}
        value={abexAwayTimeLimit}
      />

      <InputField
        name="farm-limit"
        value={abexFarmLimit}
        label={t("label-farm-limit")}
        onChange={(value) => setAbexFarmLimit(parseInt(value, 10))}
      />

      <div className={styles.Tiles}>
        <InputField
          name="tiles-t1"
          value={abexTilesT1Limit}
          label={t("label-tiles-t1-limit")}
          onChange={(value) => setAbexTilesT1Limit(parseInt(value, 10))}
        />
        <InputField
          name="tiles-t2"
          value={abexTilesT2Limit}
          label={t("label-tiles-t2-limit")}
          onChange={(value) => setAbexTilesT2Limit(parseInt(value, 10))}
        />
        <InputField
          name="tiles-t3"
          value={abexTilesT3Limit}
          label={t("label-tiles-t3-limit")}
          onChange={(value) => setAbexTilesT3Limit(parseInt(value, 10))}
        />
        <InputField
          name="tiles-t4"
          value={abexTilesT4Limit}
          label={t("label-tiles-t4-limit")}
          onChange={(value) => setAbexTilesT4Limit(parseInt(value, 10))}
        />
        <InputField
          name="tiles-t5"
          value={abexTilesT5Limit}
          label={t("label-tiles-t5-limit")}
          onChange={(value) => setAbexTilesT5Limit(parseInt(value, 10))}
        />
        <InputField
          name="tiles-t6"
          value={abexTilesT6Limit}
          label={t("label-tiles-t6-limit")}
          onChange={(value) => setAbexTilesT6Limit(parseInt(value, 10))}
        />
        <InputField
          name="tiles-t7"
          value={abexTilesT7Limit}
          label={t("label-tiles-t7-limit")}
          onChange={(value) => setAbexTilesT7Limit(parseInt(value, 10))}
        />
        <InputField
          name="tiles-t8"
          value={abexTilesT8Limit}
          label={t("label-tiles-t8-limit")}
          onChange={(value) => setAbexTilesT8Limit(parseInt(value, 10))}
        />
      </div>
    </>
  );
};

export default CardAbex;

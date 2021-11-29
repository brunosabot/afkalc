import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import GuildContext, { IGuildGuild } from "../../../providers/GuildContext";
import CardHelp from "../../../ui/card/CardHelp";
import ListItem from "../../../ui/list/ListItem";
import AbexEssence from "./AbexEssence";
import AbexRelics from "./AbexRelics";
import AbexTile from "./AbexTile";
import AbexTiles from "./AbexTiles";
import styles from "./TabAbex.module.css";

interface IProps {
  [key: string]: never;
}

const faker = (guild: IGuildGuild) => ({
  1: {
    amount: guild.abexTilesT1Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
  2: {
    amount: guild.abexTilesT2Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
  3: {
    amount: guild.abexTilesT3Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
  4: {
    amount: guild.abexTilesT4Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
  5: {
    amount: guild.abexTilesT5Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
  6: {
    amount: guild.abexTilesT6Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
  7: {
    amount: guild.abexTilesT7Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
  8: {
    amount: guild.abexTilesT8Limit,
    garrison: 0,
    timer: 0,
    timestamp: 0,
  },
});

const TabAbex: React.FC<IProps> = function TabAbex() {
  const { values } = useContext(GuildContext);
  const { t } = useTranslation("guild");

  const tiles = faker(values.guild);

  return (
    <>
      <CardHelp>
        <div className={styles.LimitBlock}>
          <div className={styles.LimitLabel}>{t("label-away-time-limit")}</div>
          {values.guild.abexAwayTimeLimit}
        </div>
        <div className={styles.LimitBlock}>
          <div className={styles.LimitLabel}>{t("label-farm-limit")}</div>
          <AbexEssence total={values.guild.abexFarmLimit} guild={values.guild} />
          <AbexTile guild={values.guild} tiles={tiles} tile="1" />
          <AbexTile guild={values.guild} tiles={tiles} tile="2" />
          <AbexTile guild={values.guild} tiles={tiles} tile="3" />
          <AbexTile guild={values.guild} tiles={tiles} tile="4" />
          <AbexTile guild={values.guild} tiles={tiles} tile="5" />
          <AbexTile guild={values.guild} tiles={tiles} tile="6" />
          <AbexTile guild={values.guild} tiles={tiles} tile="7" />
          <AbexTile guild={values.guild} tiles={tiles} tile="8" />
        </div>
      </CardHelp>
      <div>
        {values.members.map((member) => {
          const date = member?.abexLastUpdate ? new Date(member?.abexLastUpdate) : new Date(0);
          const [hourOffset, minuteOffset] = values.guild.abexAwayTimeLimit
            .split(":")
            .map((e) => parseInt(e, 10));

          const dateOffset = new Date(date);
          dateOffset.setHours(dateOffset.getHours() + hourOffset);
          dateOffset.setMinutes(dateOffset.getMinutes() + minuteOffset);

          const isOverloadDate = dateOffset < new Date();

          return (
            <ListItem key={member.id}>
              <div className={styles.Label}>
                {member.playerName}
                <span className={`${styles.Date} ${isOverloadDate ? styles.Overload : ""}`}>
                  {member?.abexLastUpdate ? dayjs(new Date(date)).fromNow() : t("label-never")}
                </span>
              </div>

              <div className={styles.Values}>
                <AbexRelics member={member} />
                <AbexTiles member={member} />
              </div>
            </ListItem>
          );
        })}
      </div>
    </>
  );
};

export default TabAbex;

import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import React, { useContext, useState } from "react";
import GuildContext, { IGuildGuild } from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import Character from "../../../ui/afk/Character";
import ChooseCharacter from "../../../ui/afk/ChooseCharacter";
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
  const [activeUser, setActiveUser] = useState("");
  const { values } = useContext(GuildContext);
  const { values: profileValues, actions: profileActions } = useContext(ProfileContext);

  const { t } = useTranslation("guild");

  const tiles = faker(values.guild);

  return (
    <>
      <div className={styles.AbexBoxLabel}>{t("label-box-hero-list")}</div>
      <div className={styles.AbexBox}>
        {profileValues.abexBox.map((i, index) => (
          <ChooseCharacter
            hero={i}
            si={profileValues.heroes[i]?.si}
            fi={profileValues.heroes[i]?.fi}
            engrave={profileValues.heroes[i]?.engrave}
            ascend={profileValues.heroes[i]?.ascend}
            onSelect={(hero) => {
              const newBox = [...profileValues.abexBox];
              newBox[index] = hero;
              profileActions.setAbexBox(newBox);
            }}
          />
        ))}
      </div>

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
          const haveAbexHeroes = member.abexBox?.some((v) => v !== 0);

          return (
            <ListItem key={member.id}>
              <button
                type="button"
                className={`${styles.Label} ${haveAbexHeroes ? styles.LabelClickable : ""}`}
                onClick={() => setActiveUser(member?.id ?? "")}
              >
                {member.playerName}
                <span className={`${styles.Date} ${isOverloadDate ? styles.Overload : ""}`}>
                  {member?.abexLastUpdate ? dayjs(new Date(date)).fromNow() : t("label-never")}
                </span>
              </button>
              <button
                type="button"
                className={`${styles.Values} ${haveAbexHeroes ? styles.LabelClickable : ""}`}
                onClick={() => setActiveUser(member?.id ?? "")}
              >
                <AbexRelics member={member} />
                <AbexTiles member={member} />
              </button>
              {activeUser === member.id && haveAbexHeroes ? (
                <div className={styles.AbexSmallBox}>
                  {member.abexBox?.map((h) => (
                    <Character
                      id={h}
                      ascendLevel={member.heroes?.[h]?.ascend}
                      engraveLevel={member.heroes?.[h]?.engrave}
                      siLevel={member.heroes?.[h]?.si}
                      fiLevel={member.heroes?.[h]?.fi}
                    />
                  ))}
                </div>
              ) : null}
            </ListItem>
          );
        })}
      </div>
    </>
  );
};

export default TabAbex;

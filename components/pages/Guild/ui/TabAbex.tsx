import dayjs from "dayjs";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import GuildContext from "../../../providers/GuildContext";
import ListItem from "../../../ui/list/ListItem";
import AbexRelics from "./AbexRelics";
import AbexTiles from "./AbexTiles";
import styles from "./TabAbex.module.css";

interface IProps {
  [key: string]: never;
}

const TabAbex: React.FC<IProps> = () => {
  const { values } = useContext(GuildContext);
  const { t } = useTranslation("guild");

  return (
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
  );
};

export default TabAbex;

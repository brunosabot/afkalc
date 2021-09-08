import dayjs from "dayjs";
import React, { useContext } from "react";
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

  return (
    <div>
      {values.members.map((member) => {
        const date = member?.abexLastUpdate ? new Date(member?.abexLastUpdate) : undefined;

        return (
          <ListItem key={member.id}>
            <div className={styles.Label}>
              {member.playerName}
              <span className={styles.Date}>{date ? dayjs(new Date(date)).fromNow() : null}</span>
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

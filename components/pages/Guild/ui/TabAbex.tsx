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
      {values.members.map((member) => (
        <ListItem key={member.id}>
          {member.playerName}

          <div className={styles.Values}>
            <AbexRelics member={member} />
            <AbexTiles member={member} />
          </div>
        </ListItem>
      ))}
    </div>
  );
};

export default TabAbex;

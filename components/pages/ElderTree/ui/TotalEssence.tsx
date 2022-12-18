import Image from "next/image";
import React, { useContext, useMemo } from "react";
import elderTreeJson from "../../../../data/elder-tree.json";
import ElderTreeJson, { ElderTreeFaction } from "../../../../types/ElderTreeJson";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./TotalEssence.module.css";

const MAX_LEVEL = Object.keys(elderTreeJson.ranger).length - 1;

const elderTreeData = elderTreeJson as ElderTreeJson;

interface IProps {
  [key: string]: never;
}

function getCost(level: number, tree: ElderTreeFaction) {
  const finalLevel = Number.isNaN(+level) ? 0 : level;

  if (finalLevel > MAX_LEVEL) {
    return tree[MAX_LEVEL].totalcost + (finalLevel - MAX_LEVEL) * tree[MAX_LEVEL].cost;
  }

  return tree[finalLevel].totalcost;
}

const ElderTree: React.FC<IProps> = function ElderTree() {
  const { values } = useContext(ProfileContext);

  const totalEssence = useMemo(() => {
    const warrior = getCost(values.elderTree.warrior, elderTreeData.warrior);
    const tank = getCost(values.elderTree.tank, elderTreeData.tank);
    const ranger = getCost(values.elderTree.ranger, elderTreeData.ranger);
    const mage = getCost(values.elderTree.mage, elderTreeData.mage);
    const support = getCost(values.elderTree.support, elderTreeData.support);

    return warrior + tank + ranger + mage + support;
  }, [
    values.elderTree.mage,
    values.elderTree.ranger,
    values.elderTree.support,
    values.elderTree.tank,
    values.elderTree.warrior,
  ]);

  return (
    <div className={styles.TotalEssence}>
      <Image
        src="/loot/twisted-essence.jpg"
        className={styles.Image}
        alt="twisted-essence"
        height={32}
        width={32}
      />{" "}
      {totalEssence}
    </div>
  );
};

export default ElderTree;

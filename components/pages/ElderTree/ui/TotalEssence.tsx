import React, { useContext, useMemo } from "react";
import elderTreeJson from "../../../../data/elder-tree.json";
import ElderTreeJson from "../../../../types/ElderTreeJson";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./TotalEssence.module.css";

const elderTreeData = elderTreeJson as ElderTreeJson;

interface IProps {
  [key: string]: never;
}

const ElderTree: React.FC<IProps> = () => {
  const { values } = useContext(ProfileContext);

  const totalEssence = useMemo(
    () =>
      elderTreeData.warrior[values.elderTree.warrior].totalCost +
      elderTreeData.tank[values.elderTree.tank].totalCost +
      elderTreeData.ranger[values.elderTree.ranger].totalCost +
      elderTreeData.mage[values.elderTree.mage].totalCost +
      elderTreeData.support[values.elderTree.support].totalCost,
    [values]
  );

  return (
    <div className={styles.TotalEssence}>
      <img src="/loot/twisted-essence.jpg" className={styles.Image} alt="twisted-essence" />{" "}
      {totalEssence}
    </div>
  );
};

export default ElderTree;

import React, { useContext, useMemo } from "react";
import elderTreeJson from "../../../../data/elder-tree.json";
import ElderTreeJson from "../../../../types/ElderTreeJson";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./TotalEssence.module.css";

const elderTreeData = elderTreeJson as ElderTreeJson;

interface IProps {
  [key: string]: never;
}

const ElderTree: React.FC<IProps> = function ElderTree() {
  const { values } = useContext(ProfileContext);

  const totalEssence = useMemo(
    () =>
      elderTreeData.warrior[values.elderTree.warrior].totalcost +
      elderTreeData.tank[values.elderTree.tank].totalcost +
      elderTreeData.ranger[values.elderTree.ranger].totalcost +
      elderTreeData.mage[values.elderTree.mage].totalcost +
      elderTreeData.support[values.elderTree.support].totalcost,
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

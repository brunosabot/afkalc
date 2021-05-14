import React, { useContext, useMemo } from "react";
import elderTreeJson from "../../../../data/elder-tree.json";
import ElderTreeJson from "../../../../types/ElderTreeJson";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./TotalEssenceSimulation.module.css";

const elderTreeData = elderTreeJson as ElderTreeJson;

interface IProps {
  warrior: number;
  tank: number;
  ranger: number;
  mage: number;
  support: number;
}

const TotalEssenceSimulation: React.FC<IProps> = ({ warrior, tank, ranger, mage, support }) => {
  const { values } = useContext(ProfileContext);

  const currentEssence = useMemo(
    () =>
      elderTreeData.warrior[warrior ?? 0].totalCost +
      elderTreeData.tank[tank ?? 0].totalCost +
      elderTreeData.ranger[ranger ?? 0].totalCost +
      elderTreeData.mage[mage ?? 0].totalCost +
      elderTreeData.support[support ?? 0].totalCost,
    [mage, ranger, support, tank, warrior]
  );

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
      <span className={currentEssence > totalEssence ? styles.Error : undefined}>
        {currentEssence} / {totalEssence}
      </span>
    </div>
  );
};

export default TotalEssenceSimulation;

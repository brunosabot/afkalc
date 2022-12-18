import Image from "next/image";
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

const TotalEssenceSimulation: React.FC<IProps> = function TotalEssenceSimulation({
  warrior,
  tank,
  ranger,
  mage,
  support,
}) {
  const { values } = useContext(ProfileContext);

  const currentEssence = useMemo(
    () =>
      elderTreeData.warrior[warrior ?? 0].totalcost +
      elderTreeData.tank[tank ?? 0].totalcost +
      elderTreeData.ranger[ranger ?? 0].totalcost +
      elderTreeData.mage[mage ?? 0].totalcost +
      elderTreeData.support[support ?? 0].totalcost,
    [mage, ranger, support, tank, warrior]
  );

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
      <Image
        src="/loot/twisted-essence.jpg"
        className={styles.Image}
        alt="twisted-essence"
        height={32}
        width={32}
      />{" "}
      <span className={currentEssence > totalEssence ? styles.Error : undefined}>
        {currentEssence} / {totalEssence}
      </span>
    </div>
  );
};

export default TotalEssenceSimulation;

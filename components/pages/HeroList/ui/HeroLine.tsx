import React from "react";
import HeroLevel from "../../../../types/HeroLevel";
import Character from "../../../ui/afk/Character";
import AscendField from "./AscendField";
import styles from "./HeroLine.module.css";
import InnField from "./InnField";
import SiField from "./SiField";

interface IProps {
  id: number;
  name: string;
  setLevel: (id: number, field: HeroLevel) => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const HeroLine: React.FC<IProps> = ({ id, name, setLevel, getValue, isView }) => {
  return (
    <div key={id} className={styles.HeroLine}>
      <Character
        name={name}
        ascendLevel={getValue(id, "ascend")}
        disabled={getValue(id, "ascend") === 0}
      />
      <span className={styles.Name}>{name}</span>

      <SiField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
      <InnField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
      <AscendField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
    </div>
  );
};

export default HeroLine;

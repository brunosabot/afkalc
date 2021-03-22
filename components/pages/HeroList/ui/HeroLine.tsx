import { mdiLink } from "@mdi/js";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseHero from "../../../modal/ChooseHero";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import Character from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import AscendField from "./AscendField";
import InnField from "./FiField";
import styles from "./HeroLine.module.css";
import SiField from "./SiField";

interface IProps {
  id: number;
  name: string;
  setLevel: (id: number, field: keyof IFirebaseHeroesHero, value: number) => void;
  getValue: (id: number, field: keyof IFirebaseHeroesHero) => number;
  isView: boolean;
  shouldUnlockFi?: boolean;
  faction: string;
  link?: number;
}

const HeroLine: React.FC<IProps> = ({
  id,
  name,
  setLevel,
  getValue,
  isView,
  faction,
  link,
  shouldUnlockFi = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  let linkElement = null;
  if (faction === "dimensionals") {
    if (getValue(id, "ascend") === 0) {
      linkElement = (
        <div className={styles.Link}>
          <Svg d="" />
        </div>
      );
    } else if (link) {
      linkElement = <Character id={link} size="small" onClick={() => setShowModal(true)} />;
    } else {
      linkElement = (
        <div className={styles.Link}>
          <Svg d={mdiLink} onClick={() => setShowModal(true)} />
        </div>
      );
    }
  }

  return (
    <div key={id} className={styles.HeroLine}>
      <Character
        name={name}
        ascendLevel={getValue(id, "ascend")}
        disabled={getValue(id, "ascend") === 0}
        siLevel={getValue(id, "si")}
        innLevel={getValue(id, "fi")}
      />

      {linkElement}

      <span className={styles.Name}>{name}</span>

      <SiField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
      <InnField
        id={id}
        setLevel={setLevel}
        getValue={getValue}
        isView={isView}
        shouldUnlock={shouldUnlockFi}
      />
      <AscendField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />

      {faction === "dimensionals" && isView === false ? (
        <Modal active={showModal} onClose={() => setShowModal(false)}>
          <ChooseHero
            onlyHero
            current={link ? [link] : []}
            onSelect={(_, heroId) => {
              setLevel(id, "link", heroId);
              setShowModal(false);
            }}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default React.memo(HeroLine);

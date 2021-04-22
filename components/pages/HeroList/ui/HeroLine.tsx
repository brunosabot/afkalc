import { mdiLink } from "@mdi/js";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseHero from "../../../modal/ChooseHero";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import Character, { DetailType } from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import { UseSetLevelReturn } from "../../TiersList/hooks/useSetLevel";
import AscendField from "./AscendField";
import FiField from "./FiField";
import styles from "./HeroLine.module.css";
import SiField from "./SiField";

interface IProps {
  id: number;
  name: string;
  setLevel: UseSetLevelReturn;
  getValue: (id: number, field: keyof IFirebaseHeroesHero) => number;
  isView: boolean;
  shouldUnlockFi?: boolean;
  faction: string;
  link?: number;
  linkKey?: number;
}

const HeroLine: React.FC<IProps> = ({
  id,
  name,
  setLevel,
  getValue,
  isView,
  faction,
  link,
  linkKey,
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
      linkElement = (
        <>
          <Character id={link} size="small" onClick={() => setShowModal(true)} />
          {linkKey ? <img src="/loot/cosmic-key.jpg" className={styles.CosmicKey} alt="" /> : null}
        </>
      );
    } else {
      linkElement = (
        <div className={styles.Link}>
          <Svg d={mdiLink} onClick={() => setShowModal(true)} />
        </div>
      );
    }
  }

  const linkkey = getValue(id, "linkkey");

  return (
    <div key={id} className={styles.HeroLine}>
      <Character
        name={name}
        ascendLevel={getValue(id, "ascend")}
        disabled={getValue(id, "ascend") === 0}
        siLevel={getValue(id, "si")}
        fiLevel={getValue(id, "fi")}
      />

      {linkElement}

      <span className={styles.Name}>{name}</span>

      <SiField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
      <FiField
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
            current={link ? [link, 0, 0, 0, linkkey] : [0, 0, 0, 0, 0]}
            onSelect={(type, value) => {
              if (type === DetailType.LINKKEY) {
                setLevel(id, "LINKKEY", value).commit();
              } else {
                setLevel(id, "LINK", value).commit();
              }
            }}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default React.memo(HeroLine);

import { mdiLink } from "@mdi/js";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import { withTooltip } from "../../../functionnal/withTooltip";
import ChooseHero from "../../../modal/ChooseHero";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import Character, { DetailType } from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import { UseSetLevelReturn } from "../../TiersList/hooks/useSetLevel";
import styles from "./HeroLine.module.css";

interface IProps {
  id: number;
  name: string;
  setLevel: UseSetLevelReturn;
  getValue: (id: number, field: keyof IFirebaseHeroesHero) => number;
  onClick: () => undefined;
  isView: boolean;
  faction: string;
  link?: number;
  linkKey?: number;
  // Used by the tooltip
  // eslint-disable-next-line react/no-unused-prop-types
  label: any;
}

const HeroLine: React.FC<IProps> = function HeroLine({
  id,
  name,
  setLevel,
  getValue,
  isView,
  faction,
  link,
  linkKey,
  onClick,
}) {
  const [showModal, setShowModal] = useState(false);

  let linkElement = null;
  if (faction === "dimensionals") {
    if (getValue(id, "ascend") === 0) {
      linkElement = null;
    } else if (link) {
      linkElement = (
        <>
          <div className={styles.Dimensional}>
            <Character id={link} size="small" onClick={() => setShowModal(true)} />
          </div>
          {linkKey ? (
            <Image
              src="/loot/cosmic-key.jpg"
              className={styles.DimensionalKey}
              alt=""
              height={20}
              width={20}
            />
          ) : null}
        </>
      );
    } else {
      linkElement = (
        <div className={styles.Dimensional}>
          <Svg d={mdiLink} onClick={() => setShowModal(true)} />
        </div>
      );
    }
  }

  const linkkey = getValue(id, "linkkey");

  return (
    <div key={id} className={styles.HeroLine}>
      <Character
        id={id}
        name={name}
        ascendLevel={getValue(id, "ascend")}
        disabled={getValue(id, "ascend") === 0}
        siLevel={getValue(id, "si")}
        fiLevel={getValue(id, "fi")}
        engraveLevel={getValue(id, "engrave")}
        size="large"
        onClick={onClick}
      />

      {linkElement}

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

export default React.memo(withTooltip(HeroLine));

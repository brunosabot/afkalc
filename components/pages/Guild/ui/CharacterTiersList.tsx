import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import TiersListValidate from "../../../modal/TiersListValidate";
import { IFirebasePriorityListHero } from "../../../providers/types/IFirebasePriorityList";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Character from "../../../ui/afk/Character";
import styles from "./CharacterTiersList.module.css";

interface IProps {
  hero: IFirebasePriorityListHero;
  percentage: number;
  koPlayers: IFirebaseProfile[];
  okPlayers: IFirebaseProfile[];
}

const CharacterTiersList: React.FC<IProps> = function CharacterTiersList({
  koPlayers,
  okPlayers,
  hero,
  percentage,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${styles.CharacterTiersList} ${percentage >= 100 ? styles.IsOk : ""}`}
        onClick={() => setShowModal(true)}
      >
        <Character
          ascendLevel={hero.ascend}
          siLevel={hero.si}
          fiLevel={hero.fi}
          engraveLevel={hero.engrave}
          id={hero.hero}
          size="large"
        />
        {percentage.toFixed()}%
      </button>

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        {showModal && <TiersListValidate hero={hero} koPlayers={koPlayers} okPlayers={okPlayers} />}
      </Modal>
    </>
  );
};

export default CharacterTiersList;

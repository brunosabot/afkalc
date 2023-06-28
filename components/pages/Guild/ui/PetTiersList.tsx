import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import PetTiersListValidate from "../../../modal/PetTiersListValidate";
import { IFirebasePetListStep } from "../../../providers/types/IFirebasePetList";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Pet from "../../../ui/afk/Pet";
import styles from "./PetTiersList.module.css";

interface IProps {
  pet: IFirebasePetListStep;
  percentage: number;
  koPlayers: IFirebaseProfile[];
  okPlayers: IFirebaseProfile[];
}

const PetTiersList: React.FC<IProps> = function PetTiersList({
  koPlayers,
  okPlayers,
  pet,
  percentage,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${styles.PetTiersList} ${percentage >= 100 ? styles.IsOk : ""}`}
        onClick={() => setShowModal(true)}
      >
        <Pet
          agilityBuff={pet.level / 3}
          intelligenceBuff={pet.level / 3}
          strengthBuff={pet.level / 3}
          id={`${pet.pet}`}
        />
        {percentage.toFixed()}%
      </button>

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        {showModal && (
          <PetTiersListValidate pet={pet} koPlayers={koPlayers} okPlayers={okPlayers} />
        )}
      </Modal>
    </>
  );
};

export default PetTiersList;

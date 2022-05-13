import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Modal from "../../functionnal/Modal";
import ChooseHero from "../../modal/ChooseHero";
import useHero from "../../pages/TiersList/hooks/useHero";
import Character from "./Character";
import styles from "./ChooseCharacter.module.css";

interface Props {
  ascend?: number;
  hero?: number;
  si?: number;
  fi?: number;
  engrave?: number;
  onSelect: (value: number) => void;
}

const ChooseCharacter: React.FC<Props> = function ChooseCharacter({
  ascend,
  hero,
  onSelect,
  si,
  fi,
  engrave,
}) {
  const { t } = useTranslation("common");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { id, name } = getHero(t, hero) ?? { id: 0, name: "" };

  return (
    <>
      <div className={styles.ChooseCharacter}>
        {hero ? (
          <Character
            name={name}
            id={id}
            onClick={() => setShowModal(true)}
            siLevel={si}
            fiLevel={fi}
            ascendLevel={ascend}
            engraveLevel={engrave}
            size="large"
          />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseHero
          onlyHero
          shouldDisplayKey={false}
          current={[id, si || 0, fi || 0, engrave || 0, 0]}
          onSelect={(_, heroId) => {
            onSelect(heroId);
          }}
        />
      </Modal>
    </>
  );
};

export default ChooseCharacter;

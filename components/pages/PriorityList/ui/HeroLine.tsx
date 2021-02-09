import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseHero from "../../../modal/ChooseHero";
import Character from "../../../ui/afk/Character";
import useHero from "../hooks/useHero";
import styles from "./HeroLine.module.css";

interface Props {
  hero?: number;
  onSelect: (value: number, index: number) => void;
  onDelete?: (value: number, index: number) => void;
  onUp?: (value: number, index: number) => void;
  onDown?: (value: number, index: number) => void;
  index: number;
  length: number;
}

const HeroLine: React.FC<Props> = ({
  hero,
  onSelect,
  onDelete = () => {},
  onUp = () => {},
  onDown = () => {},
  index,
  length,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { id, name } = getHero(hero) ?? { id: 0, name: "" };

  return (
    <>
      <div className={styles.HeroLine}>
        <svg className={styles.Arrow} viewBox="0 0 24 24" onClick={() => onDelete(id, index)}>
          {hero ? (
            <path
              fill="currentColor"
              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            />
          ) : null}
        </svg>
        <svg className={styles.Arrow} viewBox="0 0 24 24" onClick={() => onUp(id, index)}>
          {hero && index > 0 ? (
            <path fill="currentColor" d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />
          ) : null}
        </svg>
        <svg className={styles.Arrow} viewBox="0 0 24 24" onClick={() => onDown(id, index)}>
          {hero && index + 1 < length ? (
            <path fill="currentColor" d="M9,4H15V12H19.84L12,19.84L4.16,12H9V4Z" />
          ) : null}
        </svg>

        {hero ? (
          <>
            <Character name={name} onClick={() => setShowModal(true)} />
            {name}
          </>
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseHero
          onlyHero
          current={[id]}
          onSelect={(_, heroId) => {
            onSelect(heroId, index);
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default HeroLine;

import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseItem from "../../../modal/ChooseItem";
import Item from "../../../ui/afk/Item";
import useItem from "../hooks/useItem";
import styles from "./ItemPicker.module.css";

interface Props {
  item?: string;
  onSelect: (value: string) => void;
}

const ItemPicker: React.FC<Props> = function ItemPicker({ item, onSelect }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getItem } = useItem();
  const { name, info, secondaryInfo } = getItem(item);

  return (
    <>
      <div className={styles.ItemPicker}>
        {item ? (
          <Item
            infos={info}
            name={name}
            secondaryInfos={secondaryInfo}
            onClick={() => setShowModal(true)}
          />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseItem
          current={name}
          onSelect={(itemId) => {
            onSelect(itemId);
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ItemPicker;

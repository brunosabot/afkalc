import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseItem from "../../../modal/ChooseItem";
import Item from "../../../ui/afk/Item";
import useItem from "../hooks/useItem";
import styles from "./ItemPicker.module.css";

interface Props {
  item?: number;
  onSelect: (value: number) => void;
}

const ItemPicker: React.FC<Props> = ({ item, onSelect }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getItem } = useItem();
  const { id, image } = getItem(item) ?? { id: 0, image: "" };

  return (
    <>
      <div className={styles.ItemPicker}>
        {item ? (
          <Item id={id} image={image} onClick={() => setShowModal(true)} />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseItem
          current={id}
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

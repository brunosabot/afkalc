import React, { useCallback } from "react";
import CloseThick from "../svg/close-thick.svg";
import styles from "./Modal.module.css";
import ModalPortal from "./ModalPortal";

interface Props {
  active: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = function Modal({ active, children, onClose }) {
  const onCloseWrapper = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onEchap = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    if (active) {
      window.addEventListener("keydown", onEchap);
    } else {
      window.removeEventListener("keydown", onEchap);
    }
  }, [onEchap, active]);

  return (
    <ModalPortal active={active}>
      <div className={styles.ModalWrapper} onClick={onCloseWrapper} role="presentation">
        <CloseThick className={styles.Close} onClick={onClose} />
        <div className={styles.Modal}>{children}</div>
      </div>
    </ModalPortal>
  );
};

export default Modal;

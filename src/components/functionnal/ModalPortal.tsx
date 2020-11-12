import React from "react";
import ReactDOM from "react-dom";

interface Props {
  active: boolean;
  children: React.ReactNode;
}

const modalRoot = document.getElementById("modal-root");

const Modal: React.FC<Props> = ({ active, children }) => {
  const elRef = React.useRef(document.createElement("div"));

  React.useEffect(() => {
    if (active && modalRoot !== null) {
      const { current } = elRef;
      modalRoot.appendChild(current);

      return () => {
        modalRoot.removeChild(current);
      };
    }

    return () => {};
  }, [active]);

  return elRef.current && active ? ReactDOM.createPortal(children, elRef.current) : null;
};

export default Modal;

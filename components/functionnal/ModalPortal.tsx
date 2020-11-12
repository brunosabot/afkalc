import React, { useEffect, useRef, useState } from "react";
import {createPortal} from "react-dom";

interface Props {
  active: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ active, children }) => {
  const rootRef = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false)

  const elRef = useRef<HTMLDivElement>();
  useEffect(() => {
    rootRef.current = document.getElementById("modal-root");
    elRef.current = document.createElement("div");
    rootRef.current.appendChild(elRef.current);
    setMounted(true);

    return () => {
      rootRef.current.removeChild(elRef.current);
      setMounted(false);
    }
  }, []);


  if (mounted === false) return null;
  if (active === false) return null;
  if (elRef.current === undefined) return null;

  return createPortal(children, elRef.current);
};

export default Modal;

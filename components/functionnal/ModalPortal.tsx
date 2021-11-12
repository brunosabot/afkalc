import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  active: boolean;
  children: React.ReactNode;
}

const ModalPortal: React.FC<Props> = function ModalPortal({ active, children }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    rootRef.current = document.getElementById("modal-root");
    elRef.current = document.createElement("div");
    if (elRef.current !== null) rootRef.current?.appendChild(elRef.current);
    setMounted(true);

    return () => {
      if (elRef.current !== null) rootRef.current?.removeChild(elRef.current);
      setMounted(false);
    };
  }, []);

  if (mounted === false) return null;
  if (active === false) return null;
  if (elRef.current === null) return null;

  return createPortal(children, elRef.current);
};

export default ModalPortal;

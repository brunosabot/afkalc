import { mdiContentCopy } from "@mdi/js";
import QRCode from "qrcode.react";
import React, { useCallback, useRef, useState } from "react";
import ListItem from "../../ui/list/ListItem";
import Svg from "../../ui/Svg";
import styles from "./Crypto.module.css";

interface IProps {
  label: string;
  value: string;
}

const Crypto: React.FC<IProps> = function Crypto({ label, value }) {
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    ref.current?.select();
    document.execCommand("copy");
  }, []);

  return (
    <ListItem actions={<Svg d={mdiContentCopy} onClick={onClick} />}>
      <b
        className={styles.Label}
        onClick={() => setShowQrCode(!showQrCode)}
        role="button"
        onKeyPress={() => {}}
        tabIndex={0}
      >
        {label}
      </b>
      <input className={styles.Value} ref={ref} value={value} />
      {showQrCode ? (
        <div className={styles.Code}>
          <QRCode value={value} />
        </div>
      ) : null}
    </ListItem>
  );
};

export default Crypto;

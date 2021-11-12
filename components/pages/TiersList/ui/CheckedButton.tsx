import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from "@mdi/js";
import React from "react";
import styles from "./CheckedButton.module.css";

interface IProps {
  showChecked: boolean;
  setShowChecked: (newValue: boolean) => void;
}

const CheckedButton: React.FC<IProps> = function CheckedButton({ showChecked, setShowChecked }) {
  return (
    <button
      type="button"
      onClick={() => setShowChecked(!showChecked)}
      className={`${styles.CheckedButton} ${showChecked ? styles.ShowCheck : ""}`}
    >
      <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
        <path fill="currentColor" d={showChecked ? mdiCheckboxMarked : mdiCheckboxBlankOutline} />
      </svg>
    </button>
  );
};

export default CheckedButton;

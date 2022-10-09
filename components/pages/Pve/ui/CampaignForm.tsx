import React from "react";
import styles from "./CampaignForm.module.css";

interface IProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
  helper?: string;
}

const CampaignForm: React.FC<IProps> = function CampaignForm({ onChange, value, label, helper }) {
  const isValid = /[0-9]+-[0-9]+/.test(value);

  return (
    <div className={`${styles.CampaignForm} ${isValid ? "" : styles.Invalid}`}>
      <span className={styles.Image} />
      <span className={styles.Label}>
        {label} {helper}
      </span>
      <input
        value={value}
        className={styles.Input}
        type="text"
        min="1"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default CampaignForm;

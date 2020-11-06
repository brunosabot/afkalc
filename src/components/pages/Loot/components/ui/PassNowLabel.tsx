import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  setPass: (value: string) => void;
}

const PassNowLabel: React.FC<IProps> = ({ setPass }) => {
  const {t} = useTranslation("loot");

  return (
    <span>
      {t("label-stage-date")}
      <button
        type="button"
        onClick={() => setPass(new Date().toLocaleString("en-US"))}
        className="input-field__label-link"
      >
        {t("label-stage-now")}
      </button>
    </span>
  );
};

export default PassNowLabel;

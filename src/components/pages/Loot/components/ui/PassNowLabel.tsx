import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  setPass: (value: string) => void;
}

const PassNowLabel: React.FC<IProps> = ({ setPass }) => {
  const { t } = useTranslation("loot");

  return (
    <span>
      {t("label-stage-date")}
      <button
        type="button"
        onClick={() => setPass(dayjs().format("L LTS"))}
        className="input-field__label-link"
      >
        {t("label-stage-now")}
      </button>
    </span>
  );
};

export default PassNowLabel;

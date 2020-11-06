import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  name: string;
}

const FactionLine: React.FC<IProps> = ({ name }) => {
  const { t } = useTranslation("hero-list");
  const fileName = name.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div className="hero-list__faction">
      <img className="hero-list__faction-image" src={`/factions/${fileName}.png`} alt={name} />
      <div className="hero-list__faction-name">{t(`faction-${name}`)}</div>
      <div className="hero-list__faction-label">{t("label-si")}</div>
      <div className="hero-list__faction-label">{t("label-inn")}</div>
      <div className="hero-list__faction-placeholder" />
    </div>
  );
};

export default FactionLine;

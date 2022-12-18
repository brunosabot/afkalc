import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import enemiesFactions from "../../../data/enemies.json";
import styles from "./Enemi.module.css";

interface IProps {
  size?: "large" | "small" | "default";
  id: number;
  highlight?: boolean;
  onClick?: () => void;
}

interface IEnemi {
  faction: string;
  slug: string;
  id: number;
  image: string;
}

const enemies = enemiesFactions as IEnemi[];

/**
 * TODO: Use i18n for name
 */
const Enemi: React.FC<IProps> = function Enemi({
  id,
  size = "default",
  highlight = false,
  onClick = () => {},
}) {
  const { t } = useTranslation("common");
  const resource = enemies.find((r) => r.id === id);

  if (resource === undefined) return null;

  const largeClassName = size === "large" ? styles.Large : "";
  const smallClassName = size === "small" ? styles.Small : "";
  const highlightClassName = highlight ? styles.Highlight : "";

  let dimension = 50;
  if (size === "large") dimension = 64;
  if (size === "small") dimension = 34;

  const src = `/api/enemy?heroImage=${resource.image}&faction=${resource.faction}`;

  return (
    <div
      className={`${styles.Wrapper} ${largeClassName} ${smallClassName} ${highlightClassName}`}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      onKeyPress={(event) => {
        if (event.key === "Enter") onClick();
      }}
    >
      <Image
        src={src}
        width={dimension}
        height={dimension}
        alt={t(`common:enemyName.${resource?.slug}`)}
      />
    </div>
  );
};

export default Enemi;

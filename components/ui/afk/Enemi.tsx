import React from "react";
import enemiesFactions from "../../../data/enemies.json";
import styles from "./Enemi.module.css";

interface IProps {
  size?: "large" | "small" | "default";
  name: string;
  highlight?: boolean;
  onClick?: () => void;
}

interface IEnemi {
  name: string;
  id: number;
  image: string;
}

interface IEnemiFaction {
  faction: string;
  characters: IEnemi[];
}

const enemiJson = enemiesFactions as IEnemiFaction[];
const defaultEnemies: IEnemi[] = [];
const enemies = enemiJson.reduce(
  (acc, v: IEnemiFaction) => [...acc, ...v.characters],
  defaultEnemies
);

/**
 * TODO: Use i18n for name
 */
const Enemi: React.FC<IProps> = ({
  name,
  size = "default",
  highlight = false,
  onClick = () => {},
}) => {
  const resource = enemies.find((r) => r.name === name);

  if (resource === undefined) return null;

  const largeClassName = size === "large" ? styles.Large : "";
  const smallClassName = size === "small" ? styles.Small : "";
  const highlightClassName = highlight ? styles.Highlight : "";

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
      <img src={resource.image} className={styles.Enemi} alt={resource?.name} />
    </div>
  );
};

export default Enemi;

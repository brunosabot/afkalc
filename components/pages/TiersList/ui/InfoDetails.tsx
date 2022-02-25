import React from "react";
import { DetailType } from "../../../ui/afk/Character";
import styles from "./InfoDetails.module.css";

interface IProps {
  value?: number;
  target?: number;
  children: string;
  isDone: boolean;
  type: DetailType;
}

const InfoDetails: React.FC<IProps> = function InfoDetails({
  isDone,
  value,
  target,
  type,
  children,
}) {
  if (target === null || target === undefined || Number.isNaN(target)) return null;
  if (type === DetailType.SI && target === -1) return null;
  if (type !== DetailType.SI && target === 0) return null;

  const isLocalDone = isDone === false && (value ?? -1) >= target;

  return (
    <span className={`${styles.InfosDetail} ${isLocalDone ? styles.IsDone : ""}`}>{children}</span>
  );
};

export default InfoDetails;

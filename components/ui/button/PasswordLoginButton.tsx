import { mdiClose, mdiSend } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { FormEvent, useCallback, useContext, useState } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import Svg from "../Svg";
import styles from "./PasswordLoginButton.module.css";

interface IProps {
  isLink?: boolean;
}

const PasswordLoginButton: React.FC<IProps> = function PasswordLoginButton({ isLink = false }) {
  const { t } = useTranslation("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const { actions } = useContext(FirebaseContext);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (step >= 1) {
        if (isLink) {
          actions.linkWithPassword(email, password);
        } else {
          actions.logInPassword(email, password).catch(() => setError(true));
        }
      }
      setStep(step + 1);
    },
    [actions, email, isLink, password, step]
  );

  const onCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newStep = Math.max(step - 1, 0);
      if (newStep === 0) {
        setEmail("");
        setPassword("");
        const target = e.target as HTMLElement | null;
        target?.blur();
      }
      setStep(newStep);
    },
    [step]
  );

  return (
    <form className={`${styles.Wrapper} ${step > 0 ? styles.Active : ""}`} onSubmit={onSubmit}>
      {step === 0 ? (
        <input
          key="email"
          className={`${styles.PasswordLoginInput} ${error ? styles.Error : ""}`}
          placeholder={t("label-email") ?? ""}
          autoComplete="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          value={email}
        />
      ) : (
        <input
          key="password"
          className={`${styles.PasswordLoginInput} ${error ? styles.Error : ""}`}
          placeholder={t("label-password") ?? ""}
          autoComplete="current-password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          value={password}
        />
      )}
      {step > 0 ? (
        <button type="button" className={styles.Cancel} onClick={onCancel}>
          <Svg d={mdiClose} />
        </button>
      ) : null}
      <button type="submit" className={styles.Submit}>
        <Svg d={mdiSend} />
      </button>
    </form>
  );
};

export default PasswordLoginButton;

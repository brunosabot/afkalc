import { mdiClose, mdiSend } from "@mdi/js";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import Svg from "../Svg";
import styles from "./PasswordLoginButton.module.css";

interface IProps {
  isLink?: boolean;
}

const PasswordLoginButton: React.FC<IProps> = ({ isLink = false }) => {
  const { t } = useTranslation("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const { actions } = useContext(FirebaseContext);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (step >= 1) {
        isLink
          ? actions.linkWithPassword(email, password)
          : actions.logInPassword(email, password).catch(() => setError(true));
      }
      setStep(step + 1);
    },
    [actions, email, isLink, password, step]
  );

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      const newStep = Math.max(step - 1, 0);
      if (newStep === 0) {
        setEmail("");
        setPassword("");
        e.target.blur();
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
          placeholder={t("label-email")}
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
          placeholder={t("label-password")}
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

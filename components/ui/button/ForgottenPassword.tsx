import { mdiClose, mdiSend } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { FormEvent, useCallback, useContext, useState } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import Svg from "../Svg";
import styles from "./ForgottenPassword.module.css";

interface IProps {
  [key: string]: never;
}

const ForgottenPassword: React.FC<IProps> = function ForgottenPassword() {
  const { t } = useTranslation();
  const { actions } = useContext(FirebaseContext);
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // actions.sendPasswordMail()
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (step >= 1) {
        await actions.sendPasswordMail(email);
        setSuccess(true);
      }
      setStep(step + 1);
    },
    [actions, email, step]
  );

  const onCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newStep = Math.max(step - 1, 0);
      if (newStep === 0) {
        setEmail("");
        const target = e.target as HTMLElement | null;
        target?.blur();
      }
      setStep(newStep);
    },
    [step]
  );

  if (step === 2) {
    return (
      <div className={styles.WrapperStep1}>
        <button className={styles.ForgottenPasswordStep1} type="button" onClick={() => setStep(0)}>
          {t("mail-sent")}
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form
        className={`${styles.Wrapper} ${step > 0 ? styles.Active : ""} ${
          error ? styles.Error : ""
        } ${success ? styles.Success : ""}`}
        onSubmit={onSubmit}
      >
        <input
          className={styles.ForgottenPassword}
          placeholder={t("label-email") ?? ""}
          autoComplete="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          value={email}
        />
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
  }

  return (
    <div className={styles.WrapperStep1}>
      <button className={styles.ForgottenPasswordStep1} type="button" onClick={() => setStep(1)}>
        {t("forgotten-password")}
      </button>
    </div>
  );
};

export default ForgottenPassword;

import { mdiClose, mdiSend } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { FormEvent, useCallback, useContext, useState } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import Svg from "../Svg";
import styles from "./ChangePasswordButton.module.css";

interface IProps {
  [key: string]: never;
}

const ChangePasswordButton: React.FC<IProps> = function ChangePasswordButton() {
  const { t } = useTranslation("settings");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const { actions } = useContext(FirebaseContext);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (step >= 1) {
        try {
          await actions.changePassword(oldPassword, newPassword);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
          setSuccess(false);
          setError(true);
        }
        setStep(0);
        setOldPassword("");
        setNewPassword("");

        const target = e.target as HTMLElement | null;
        target?.blur();
      }
      setStep(step + 1);
    },
    [actions, oldPassword, newPassword, step]
  );

  const onCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newStep = Math.max(step - 1, 0);
      if (newStep === 0) {
        setOldPassword("");
        setNewPassword("");

        const target = e.target as HTMLElement | null;
        target?.blur();
      }
      setStep(newStep);
    },
    [step]
  );

  return (
    <form
      className={`${styles.Wrapper} ${step > 0 ? styles.Active : ""} ${error ? styles.Error : ""} ${
        success ? styles.Success : ""
      }`}
      onSubmit={onSubmit}
    >
      {step === 0 ? (
        <input
          key="old-password"
          className={styles.ChangePasswordInput}
          placeholder={t("label-old-password") ?? ""}
          autoComplete="current-password"
          type="oldPassword"
          onChange={(e) => {
            setOldPassword(e.target.value);
            setError(false);
          }}
          value={oldPassword}
        />
      ) : (
        <input
          key="new-password"
          className={styles.ChangePasswordInput}
          placeholder={t("label-new-password") ?? ""}
          autoComplete="new-password"
          type="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError(false);
          }}
          value={newPassword}
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

export default ChangePasswordButton;

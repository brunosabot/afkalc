import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import styles from "./AnonymousLoginButton.module.css";

interface IProps {
  [key: string]: never;
}

const AnonymousLoginButton: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const { actions } = useContext(FirebaseContext);

  return (
    <div className={styles.Wrapper}>
      <button
        className={styles.AnonymousLoginButton}
        type="button"
        onClick={actions.logInAnonymously}
      >
        {t("app-discovery")}
      </button>
    </div>
  );
};

export default AnonymousLoginButton;

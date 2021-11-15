import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import styles from "./LogoutButton.module.css";

interface IProps {
  [key: string]: never;
}

const LogoutButton: React.FC<IProps> = function LogoutButton() {
  const { actions } = useContext(FirebaseContext);
  const { t } = useTranslation("common");

  return (
    <div className={styles.Wrapper}>
      <button
        className={styles.LogoutButton}
        type="button"
        onClick={actions.logOut}
        style={{ textDecoration: "underline" }}
      >
        {t("menu.logout")}
      </button>
    </div>
  );
};

export default LogoutButton;

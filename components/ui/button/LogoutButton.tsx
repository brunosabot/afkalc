import React, { useContext } from "react";
import { useTranslation } from "../../../i18n";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import styles from "./LogoutButton.module.css";

interface IProps {
  [key: string]: never;
}

const LogoutButton: React.FC<IProps> = () => {
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

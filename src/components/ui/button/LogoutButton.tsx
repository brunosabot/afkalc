import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../../providers/FirebaseProvider";

interface IProps {
  [key: string]: never;
}

const LogoutButton: React.FC<IProps> = () => {
  const { actions } = useContext(FirebaseContext);
  const {t} = useTranslation("common");

  return (
    <div className="login-button__wrapper">
      <button
        className="login-button"
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

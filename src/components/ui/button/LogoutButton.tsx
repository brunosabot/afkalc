import React, { useContext } from "react";
import { FirebaseContext } from "../../../FirebaseProvider";

interface IProps {
  [key: string]: never;
}

const LogoutButton: React.FC<IProps> = () => {
  const { actions } = useContext(FirebaseContext);

  return (
    <div className="login-button__wrapper">
      <button
        className="login-button"
        type="button"
        onClick={actions.logOut}
        style={{ textDecoration: "underline" }}
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default LogoutButton;

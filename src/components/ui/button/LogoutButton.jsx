import React, { useContext } from "react";
import { FirebaseContext } from "../../../FirebaseProvider";

const LogoutButton = () => {
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

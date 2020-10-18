import React, { useContext } from "react";
import { FirebaseContext } from "../../../FirebaseProvider";

const LoginButton = () => {
  const { actions } = useContext(FirebaseContext);

  return (
    <div className="login-button__wrapper">
      <button className="login-button" type="button" onClick={actions.logIn}>
        <img
          className="login-button__image"
          src="/google.png"
          height="46"
          alt="Connect with Google"
        />
      </button>
    </div>
  );
};

export default LoginButton;

import { mdiFacebook } from "@mdi/js";
import React, { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import Svg from "../Svg";
import styles from "./FacebookLoginButton.module.css";

interface IProps {
  isLink?: boolean;
}

const FacebookLoginButton: React.FC<IProps> = function FacebookLoginButton({ isLink = false }) {
  const { actions } = useContext(FirebaseContext);

  return (
    <div className={styles.Wrapper}>
      <button
        className={styles.FacebookLoginButton}
        type="button"
        onClick={isLink ? actions.linkWithFacebook : actions.logInFacebook}
      >
        <Svg d={mdiFacebook} />
        Sign in with Facebook
      </button>
    </div>
  );
};

export default FacebookLoginButton;

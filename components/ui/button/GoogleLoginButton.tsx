import React, { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import styles from "./GoogleLoginButton.module.css";

interface IProps {
  isLink?: boolean;
}

const GoogleLoginButton: React.FC<IProps> = function GoogleLoginButton({ isLink = false }) {
  const { actions } = useContext(FirebaseContext);

  return (
    <div className={styles.Wrapper}>
      <button
        className={styles.GoogleLoginButton}
        type="button"
        onClick={isLink ? actions.linkWithGoogle : actions.logInGoogle}
      >
        <img className={styles.Image} src="/google.png" height="46" alt="Connect with Google" />
      </button>
    </div>
  );
};

export default GoogleLoginButton;

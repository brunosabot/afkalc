import { mdiTwitter } from "@mdi/js";
import React, { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import Svg from "../Svg";
import styles from "./TwitterLoginButton.module.css";

interface IProps {
  isLink?: boolean;
}

const TwitterLoginButton: React.FC<IProps> = function TwitterLoginButton({ isLink = false }) {
  const { actions } = useContext(FirebaseContext);

  return (
    <div className={styles.Wrapper}>
      <button
        className={styles.TwitterLoginButton}
        type="button"
        onClick={isLink ? actions.linkWithTwitter : actions.logInTwitter}
      >
        <Svg d={mdiTwitter} />
        Sign in with Twitter
      </button>
    </div>
  );
};

export default TwitterLoginButton;

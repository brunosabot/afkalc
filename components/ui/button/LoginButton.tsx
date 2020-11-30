import React, { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import styles from "./LoginButton.module.css";

interface IProps {
  [key: string]: never;
}

const LoginButton: React.FC<IProps> = () => {
  const { actions } = useContext(FirebaseContext);

  return (
    <div className={styles.Wrapper}>
      <button className={styles.LoginButton} type="button" onClick={actions.logIn}>
        <img className={styles.Image} src="/google.png" height="46" alt="Connect with Google" />
      </button>
    </div>
  );
};

export default LoginButton;

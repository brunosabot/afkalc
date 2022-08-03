import React, { useContext } from "react";
import Menu from "../functionnal/Menu";
import { FirebaseContext } from "../providers/FirebaseProvider";
import AnonymousBanner from "../ui/AnonymousBanner";
import LoginBox from "../ui/LoginBox";

const withLayoutPrivate = <P extends object>(Component: React.ComponentType<P>) =>
  function T(pageProps: any) {
    const { values } = useContext(FirebaseContext);

    return (
      <>
        <Menu />
        <AnonymousBanner />
        <div id="page">{values.isAuth ? <Component {...pageProps} /> : <LoginBox />}</div>
      </>
    );
  };

export default withLayoutPrivate;

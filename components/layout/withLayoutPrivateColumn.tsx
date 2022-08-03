import React, { useContext } from "react";
import Menu from "../functionnal/Menu";
import { FirebaseContext } from "../providers/FirebaseProvider";
import AnonymousBanner from "../ui/AnonymousBanner";
import LoginBox from "../ui/LoginBox";

const withLayoutPrivateColumn = <P extends object>(Component: React.ComponentType<P>) =>
  function T(pageProps: any) {
    const { values } = useContext(FirebaseContext);

    return (
      <>
        <Menu />
        <AnonymousBanner />
        <div id="page">
          <div
            style={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {values.isAuth ? <Component {...pageProps} /> : <LoginBox />}
          </div>
        </div>
      </>
    );
  };

export default withLayoutPrivateColumn;

import React, { useContext } from "react";
import Menu from "../functionnal/Menu";
import { FirebaseContext } from "../providers/FirebaseProvider";
import AnonymousBanner from "../ui/AnonymousBanner";
import LoginBox from "../ui/LoginBox";

const withLayoutPrivateColumn = <P extends object>(Component: React.ComponentType<P>) => (...pageProps: any) => {
  const {values} = useContext(FirebaseContext);

  return (
    <>
      <Menu />
      <div id="page">
        <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>

        <AnonymousBanner />
        {(values.isAuth ? <Component {...pageProps} /> : <LoginBox />)}
        </div>
      </div>
    </>
  )
}

export default withLayoutPrivateColumn;

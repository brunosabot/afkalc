import React from "react";
import Menu from "../functionnal/Menu";

const withLayoutPublic = <P extends object>(Component: React.ComponentType<P>) =>
  function T(pageProps: any) {
    return (
      <>
        <Menu />
        <Component {...pageProps} />
      </>
    );
  };

export default withLayoutPublic;

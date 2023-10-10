import React from "react";
import Menu from "../functionnal/Menu";

const withLayoutPublic = <P extends object>(Component: React.ComponentType<P>) =>
  function T(pageProps: any) {
    return (
      <>
        <Menu />
        <div id="page">
          <Component {...pageProps} />
        </div>
      </>
    );
  };

export default withLayoutPublic;

import React from "react";
import Menu from "../functionnal/Menu";

const withLayoutPublic = <P extends object>(Component: React.ComponentType<P>) => (
  ...pageProps: any
) => (
  <>
    <Menu />
    <Component {...pageProps} />
  </>
);

export default withLayoutPublic;

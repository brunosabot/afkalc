import React from "react";
import Menu from "../functionnal/Menu";
import AnonymousBanner from "../ui/AnonymousBanner";

const withLayoutPublicColumn = <P extends object>(Component: React.ComponentType<P>) =>
  function T(pageProps: any) {
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
            <Component {...pageProps} />
          </div>
        </div>
      </>
    );
  };

export default withLayoutPublicColumn;

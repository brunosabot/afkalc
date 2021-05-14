import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <link href="/favicon-16x16.jpg" rel="icon" type="image/jpg" sizes="16x16" />
          <link href="/favicon-32x32.jpg" rel="icon" type="image/jpg" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-icon-180x180.jpg" />
          <meta name="theme-color" content="#94492e" />
          <meta name="color-scheme" content="dark light" />
        </Head>
        <body>
          <Main />
          <div id="modal-root" style={{ position: "fixed", zIndex: 100 }} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

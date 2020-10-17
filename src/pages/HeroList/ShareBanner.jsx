import { nanoid } from "nanoid";
import React, { useState } from "react";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";

const ShareBanner = ({ isView }) => {
  const [copy, setCopy] = useState(false);
  const [id] = useFirestoreWithBackup("%ID%", "user", "shareId", "", nanoid(10), isView);
  const value = id ? `https://afkalc.heycoucou.com/hero-list/${id}` : "";

  if (isView === true) {
    return <div style={{ marginTop: "16px" }} />;
  }

  return (
    <div style={{ fontWeight: "600", padding: "16px", position: "relative", height: "64px" }}>
      Share your hero list with the URL:
      {copy ? (
        <div style={{ position: "absolute", top: "16px", right: "16px" }}>Link copied</div>
      ) : null}
      <input
        className="hero-list__share"
        onClick={(e) => {
          e.target.select();
          document.execCommand("copy");
          setCopy(true);
          setTimeout(() => setCopy(false), 3000);
        }}
        value={value}
        readOnly
      />
    </div>
  );
};

export default ShareBanner;

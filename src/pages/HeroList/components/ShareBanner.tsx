import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import CardTitle from "../../../components/ui/card/CardTitle";
import { FirebaseContext } from "../../../FirebaseProvider";
import useFirestoreWithBackup from "../../../hooks/useFirestoreWithBackup";

interface IProps {
  isView: boolean;
}

const ShareBanner: React.FC<IProps> = ({ isView }) => {
  const [copy, setCopy] = useState(false);
  const [id] = useFirestoreWithBackup("%ID%", "user", "shareId", "", nanoid(10), isView);
  const { values } = useContext(FirebaseContext);

  let value = "";
  if (id) {
    value = `https://afkalc.heycoucou.com/hero-list/${id}`;
  } else if (values.isAuth === false) {
    value = "You need to be logged in to share yout list";
  }

  if (isView === true) {
    return <CardTitle>Viewing somebody&apos;s list</CardTitle>;
  }

  return (
    <CardTitle>
      Share your hero list with the URL:
      {copy ? (
        <div style={{ position: "absolute", top: "16px", right: "16px" }}>Link copied</div>
      ) : null}
      <input
        className="hero-list__share"
        onClick={(e) => {
          if (values.isAuth === false) {
            return;
          }
          (e.target as HTMLInputElement).select();
          document.execCommand("copy");
          setCopy(true);
          setTimeout(() => setCopy(false), 3000);
        }}
        value={value}
        readOnly
      />
    </CardTitle>
  );
};

export default ShareBanner;

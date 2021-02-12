import { useEffect, useState } from "react";
import firebase from "../../../providers/firebase";

const firestore = firebase.firestore();

export default function useLoadId(id: string) {
  const [viewId, setViewId] = useState("");

  useEffect(() => {
    firestore
      .collection("user")
      .where("shareId", "==", id)
      .get()
      .then((doc) => {
        if (doc.docs && doc.docs[0] && doc.docs[0].exists) {
          setViewId(doc.docs[0].id);
        }
      });
  }, [id, setViewId]);

  return viewId;
}

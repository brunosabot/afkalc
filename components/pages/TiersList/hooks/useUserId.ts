import { useEffect } from "react";
import firebase from "../../../providers/firebase";

const firestore = firebase.firestore();

export default function useUserId(id: string, setUserId: (value: string) => void) {
  useEffect(() => {
    firestore
      .collection("user")
      .where("shareId", "==", id)
      .get()
      .then((doc) => {
        if (doc.docs && doc.docs[0] && doc.docs[0].exists) {
          setUserId(doc.docs[0].id);
        }
      });
  }, [id, setUserId]);
}

import firebase from "firebase/app";
import { useCallback } from "react";

export default function useFirestorePartialUpdateRef<T>() {
  const partialUpdateRef = useCallback(
    (
      docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
      value: { [key: string]: T },
      owner: string
    ) => {
      docRef.get().then((doc) => {
        const localDoc = doc.exists ? doc.data() : {};

        docRef.set({ owner, ...localDoc, ...value });
      });
    },
    []
  );

  return partialUpdateRef;
}

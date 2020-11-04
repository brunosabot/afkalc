import { useCallback } from "react";
import firebase from "firebase";

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

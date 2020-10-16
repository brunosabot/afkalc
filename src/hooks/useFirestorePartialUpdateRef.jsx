import { useCallback } from "react";

export default function useFirestorePartialUpdateRef() {
  const partialUpdateRef = useCallback((docRef, value, owner) => {
    docRef.get().then((doc) => {
      const localDoc = doc.exists ? doc.data() : {};

      docRef.set({ owner, ...localDoc, ...value });
    });
  }, []);

  return partialUpdateRef;
}

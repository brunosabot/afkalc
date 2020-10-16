import { useCallback, useEffect, useState } from "react";
import useFirestorePartialUpdateRef from "./useFirestorePartialUpdateRef";

export default function useFirestoreValue(
  isView,
  docRef,
  key,
  uid,
  isAuth,
  defaultValue,
  forceCreate = null
) {
  const [firestoreValue, setLocalValue] = useState(defaultValue);
  const partialUpdateRef = useFirestorePartialUpdateRef();

  useEffect(() => {
    if (isView || isAuth) {
      docRef.onSnapshot((doc) => {
        if (doc && doc.exists && doc.data()[key]) {
          setLocalValue(doc.data()[key]);
        } else {
          if (forceCreate !== null && uid !== undefined) {
            partialUpdateRef(docRef, { [key]: forceCreate }, uid);
          }
          setLocalValue(defaultValue);
        }
      });
    }
  }, [
    isAuth,
    docRef,
    setLocalValue,
    defaultValue,
    forceCreate,
    isView,
    key,
    partialUpdateRef,
    uid,
  ]);

  const setValue = useCallback(
    (value) => {
      partialUpdateRef(docRef, { [key]: value }, uid);
      setLocalValue(value);
    },
    [docRef, key, uid, partialUpdateRef]
  );

  return [firestoreValue, setValue];
}

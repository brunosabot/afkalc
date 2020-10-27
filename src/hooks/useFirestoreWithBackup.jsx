import firebase from "firebase/app";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { FirebaseContext } from "../FirebaseProvider";
import useFirestorePartialUpdateRef from "./useFirestorePartialUpdateRef";
import useLocalStorageValue from "./useLocalStorageValue";
import useFirestoreValue from "./useFirestoreValue";

const firestore = firebase.firestore();

export default function useFirestoreWithBackup(
  firestorePath,
  localStoragePath,
  key,
  defaultValue,
  forceCreate = null,
  isView = false
) {
  const { values } = useContext(FirebaseContext);
  const dbPath = useMemo(
    () => `${localStoragePath}/${firestorePath}/`.replace("%ID%", values.uid),
    [localStoragePath, firestorePath, values.uid]
  );

  const docRef = useMemo(() => firestore.doc(dbPath), [dbPath]);
  const partialUpdateRef = useFirestorePartialUpdateRef();
  const [localStorageValue, setLocalStorageValue] = useLocalStorageValue(
    localStoragePath,
    key,
    defaultValue
  );
  const [firestoreValue, setFirestoreValue] = useFirestoreValue(
    isView,
    docRef,
    key,
    values.uid,
    values.isAuth,
    defaultValue,
    forceCreate
  );

  useEffect(() => {
    if (
      values.isAuth &&
      (firestoreValue === null || firestoreValue === undefined) &&
      localStorageValue !== null
    ) {
      partialUpdateRef(docRef, { [key]: localStorageValue }, values.uid);
    }
  }, [values.isAuth, firestoreValue, localStorageValue, docRef, key, values.uid, partialUpdateRef]);

  const setValue = useCallback(
    (value) => {
      if (values.isAuth) {
        setFirestoreValue(value);
      } else {
        setLocalStorageValue(value);
      }
    },
    [setFirestoreValue, setLocalStorageValue, values.isAuth]
  );

  const localValue = useMemo(() => (values.isAuth || isView ? firestoreValue : localStorageValue), [
    isView,
    values.isAuth,
    firestoreValue,
    localStorageValue,
  ]);

  return [localValue, setValue];
}

import { useCallback, useContext, useEffect, useMemo } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import firebase from "../providers/firebase";
import useFirestorePartialUpdateRef from "./useFirestorePartialUpdateRef";
import useFirestoreValue from "./useFirestoreValue";
import useLocalStorageValue from "./useLocalStorageValue";

const firestore = firebase.firestore();

export default function useFirestoreWithBackup<T>(
  firestorePath: string,
  localStoragePath: string,
  key: string,
  defaultValue: T,
  forceCreate: string | null = null,
  isView: boolean = false
): [T, (value: T) => void] {
  const { values } = useContext(FirebaseContext);
  const dbPath = useMemo(() => {
    if (firestorePath === "") return "";

    const path = `${localStoragePath}/${firestorePath}/`;
    if (path.indexOf("%ID%") === -1) return path;

    return values.uid === "" ? "" : path.replace("%ID%", values.uid);
  }, [localStoragePath, firestorePath, values.uid]);

  const docRef = useMemo(() => (dbPath ? firestore.doc(dbPath) : null), [dbPath]);
  const partialUpdateRef = useFirestorePartialUpdateRef();
  const [localStorageValue, setLocalStorageValue] = useLocalStorageValue<T>(
    localStoragePath,
    key,
    defaultValue
  );
  const [firestoreValue, setFirestoreValue] = useFirestoreValue<T>(
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
      docRef !== null &&
      values.isAuth &&
      (firestoreValue === null || firestoreValue === undefined) &&
      localStorageValue !== null
    ) {
      partialUpdateRef(docRef, { [key]: localStorageValue }, values.uid);
    }
  }, [values.isAuth, firestoreValue, localStorageValue, docRef, key, values.uid, partialUpdateRef]);

  const setValue = useCallback(
    (value: T) => {
      if (values.isAuth) {
        setFirestoreValue(value);
      } else {
        setLocalStorageValue(value);
      }
    },
    [setFirestoreValue, setLocalStorageValue, values.isAuth]
  );

  const localValue = useMemo(
    () => (values.isAuth || isView ? firestoreValue : localStorageValue),
    [isView, values.isAuth, firestoreValue, localStorageValue]
  );

  return [localValue, setValue];
}

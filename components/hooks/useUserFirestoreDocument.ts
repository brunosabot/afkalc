import { useContext, useMemo } from "react";
import firebase from "../providers/firebase";
import { FirebaseContext } from "../providers/FirebaseProvider";

const firestore = firebase.firestore();

export default function useUserFirestoreDocument(path: string | undefined) {
  const { values } = useContext(FirebaseContext);

  return useMemo(() => {
    if (path === undefined) {
      return undefined;
    }

    let formattedPath = path;

    if (path.indexOf("%ID%") > -1) {
      if (values.uid === "") {
        return undefined;
      }

      formattedPath = formattedPath.replace("%ID%", values.uid);
    }

    return firestore.doc(formattedPath);
  }, [path, values.uid]);
}

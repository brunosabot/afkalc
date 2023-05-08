import { useContext, useMemo } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import firebase from "../providers/firebase";

const firestore = firebase.firestore();

export default function useFirestoreDocumentReference(path: string | undefined) {
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

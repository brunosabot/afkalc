import { useContext, useMemo } from "react";
import firebase from "../providers/firebase";
import { FirebaseContext } from "../providers/FirebaseProvider";

const firestore = firebase.firestore();

export default function useUserFirestoreCollection(path: string) {
  const { values } = useContext(FirebaseContext);

  return useMemo(() => {
    let formattedPath = path;

    if (path.indexOf("%ID%") > -1) {
      if (values.uid === "") {
        return undefined;
      }

      formattedPath = formattedPath.replace("%ID%", values.uid);
    }

    return firestore.collection(formattedPath);
  }, [path, values.uid]);
}

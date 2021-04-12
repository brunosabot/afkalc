import { useContext, useMemo } from "react";
import firebase from "../providers/firebase";
import { FirebaseContext } from "../providers/FirebaseProvider";

const firestore = firebase.firestore();

export default function useFirestoreInQueryReference(
  path: string,
  field: string | firebase.firestore.FieldPath,
  valueList: string[]
) {
  const { values } = useContext(FirebaseContext);

  return useMemo(() => {
    let formattedPath = path;

    if (path.indexOf("%ID%") > -1) {
      if (values.uid === "") {
        return undefined;
      }

      formattedPath = formattedPath.replace("%ID%", values.uid);
    }

    const collections = [];
    while (valueList.length) {
      const splice = valueList.splice(0, 10);
      collections.push(firestore.collection(formattedPath).where(field, "in", splice));
    }

    return collections;
  }, [path, field, valueList, values.uid]);
}

import { useContext, useMemo } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import firebase from "../providers/firebase";

const firestore = firebase.firestore();

export default function useFirestoreQueryReference(
  path: string,
  field: string | firebase.firestore.FieldPath,
  condition: firebase.firestore.WhereFilterOp,
  value: string | string[]
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

    let searchValue;
    if (typeof value === "string") {
      searchValue = value.replace("%ID%", values.uid);
    } else {
      searchValue = value.map((v) => v.replace("%ID%", values.uid));
      searchValue.push("emptyId");
    }

    return firestore.collection(formattedPath).where(field, condition, searchValue);
  }, [condition, field, path, value, values.uid]);
}

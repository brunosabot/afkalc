import firebase from "firebase";
import { useEffect, useReducer } from "react";
import useMemoCompare from "./useMemoCompare";

interface Action {
  type: string;
  payload?: any;
}

interface State {
  status: string;
  data?: any;
  error?: any;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "idle":
      return { status: "idle", data: undefined, error: undefined };
    case "loading":
      return { status: "loading", data: undefined, error: undefined };
    case "success":
      return { status: "success", data: action.payload, error: undefined };
    case "error":
      return { status: "error", data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

export default function useFirestoreList(
  query: firebase.firestore.CollectionReference | undefined
) {
  const initialState = {
    status: query ? "loading" : "idle",
    data: undefined,
    error: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const queryCached = useMemoCompare(query, (prevQuery) => {
    if (prevQuery && query) {
      return query.isEqual(prevQuery);
    }
    return false;
  });

  useEffect(() => {
    if (!queryCached) {
      dispatch({ type: "idle" });
      return () => {};
    }

    dispatch({ type: "loading" });

    return queryCached.onSnapshot(
      (response: any) => {
        const data = response.docs ? getCollectionData(response) : getDocData(response);

        dispatch({ type: "success", payload: data });
      },
      (error: any) => {
        dispatch({ type: "error", payload: error });
      }
    );
  }, [queryCached]);

  return state;
}

function getDocData(doc: firebase.firestore.DocumentSnapshot) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

function getCollectionData(collection: any) {
  return collection.docs.map(getDocData);
}

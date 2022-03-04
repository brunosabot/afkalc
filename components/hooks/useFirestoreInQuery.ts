import firebase from "firebase/app";
import { useEffect, useReducer } from "react";
import IFirebaseDataState from "../providers/types/IFirebaseDataState";
import useMemoCompare from "./useMemoCompare";

interface Action {
  type: string;
  payload?: any[];
}

function reducer<T>(state: IFirebaseDataState<T>, action: Action) {
  switch (action.type) {
    case "idle":
      return { status: "idle", data: [], error: undefined };
    case "loading":
      return { status: "loading", data: action.payload || [], error: undefined };
    case "success":
      return { status: "success", data: action.payload, error: undefined };
    case "error":
      return { status: "error", data: [], error: action.payload };
    default:
      throw new Error("invalid action");
  }
}

function getDocData(doc: firebase.firestore.DocumentSnapshot) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

function getQueryData(collection: any) {
  return collection.docs.map(getDocData);
}

export default function useFirestoreInQuery<T>(
  queries: firebase.firestore.Query[] | undefined,
  lazy: boolean = false
): IFirebaseDataState<T> {
  const initialState = {
    status: queries ? "loading" : "idle",
    data: undefined,
    error: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const queriesCached = useMemoCompare(queries, (prevQueries) => {
    if (prevQueries && queries) {
      return queries.every((query) => prevQueries.some((prevQuery) => prevQuery.isEqual(query)));
    }
    return false;
  });

  useEffect(() => {
    if (!queriesCached || lazy) {
      dispatch({ type: "idle" });
      return () => {};
    }

    dispatch({ type: "loading" });
    const finalData: Record<string, T> = {};
    let done = 0;

    return queriesCached.forEach((queryCached) => {
      queryCached.onSnapshot(
        (response: any) => {
          done += 1;

          // response.doc;
          const queryData = getQueryData(response);
          queryData.forEach((item: T) => {
            const { id } = item as any;
            finalData[id] = item;
          });

          const data = {
            type: "loading",
            payload: Object.values(finalData),
          };

          if (done === 10) {
            data.type = "success";
          }

          dispatch(data);
        },
        (error: any) => {
          dispatch({ type: "error", payload: error });
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queriesCached, lazy]);

  return state as unknown as IFirebaseDataState<T>;
}

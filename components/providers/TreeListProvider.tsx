import React, { useCallback, useContext, useMemo, useState } from "react";
import useFirestoreInQuery from "../hooks/useFirestoreInQuery";
import useFirestoreInQueryReference from "../hooks/useFirestoreInQueryReference";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../hooks/useFirestoreQueryReference";
import firebase from "./firebase";
import useTreeListSetters from "./hooks/useTreeListSetters";
import ProfileContext from "./ProfileContext";
import TreeListContext, { ITreeListContext } from "./TreeListContext";
import IFirebaseTreeList from "./types/IFirebaseTreeList";

interface IProps {
  children: React.ReactNode;
}

const TreeListProvider: React.FC<IProps> = function TreeListProvider({ children }) {
  const [lazy, setLazy] = useState<boolean>(true);
  const { values } = useContext(ProfileContext);

  const treeListDocument = useFirestoreQueryReference(`tree-list`, "ownerId", "==", "%ID%");
  const favoriteQuery = useFirestoreInQueryReference(
    "tree-list",
    firebase.firestore.FieldPath.documentId(),
    values.favoriteTreeList
  );
  const treeListResult = useFirestoreQuery<IFirebaseTreeList[]>(treeListDocument, lazy);
  const favoriteResult = useFirestoreInQuery<IFirebaseTreeList[]>(favoriteQuery, lazy);

  const load = useCallback(() => setLazy(false), []);

  const { setSteps, setTitle, deleteList, createList } = useTreeListSetters();

  const value = useMemo<ITreeListContext>(
    () => ({
      actions: {
        load,
        setSteps,
        setTitle,
        createList,
        deleteList,
      },
      values: {
        favorites: (favoriteResult?.data ?? [])
          .concat()
          .sort((a: IFirebaseTreeList, b: IFirebaseTreeList) => a.title.localeCompare(b.title)),
        treeList: (treeListResult?.data ?? [])
          .concat()
          .sort((a: IFirebaseTreeList, b: IFirebaseTreeList) => a.title.localeCompare(b.title)),
      },
    }),
    [load, setSteps, setTitle, createList, deleteList, favoriteResult?.data, treeListResult?.data]
  );

  return <TreeListContext.Provider value={value}>{children}</TreeListContext.Provider>;
};

export default TreeListProvider;

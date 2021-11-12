import React, { useCallback, useContext, useMemo, useState } from "react";
import useFirestoreInQuery from "../hooks/useFirestoreInQuery";
import useFirestoreInQueryReference from "../hooks/useFirestoreInQueryReference";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../hooks/useFirestoreQueryReference";
import firebase from "./firebase";
import usePriorityListSetters from "./hooks/usePriorityListSetters";
import PriorityListContext, { IPriorityListContext } from "./PriorityListContext";
import ProfileContext from "./ProfileContext";
import IFirebasePriorityList from "./types/IFirebasePriorityList";

interface IProps {
  children: React.ReactNode;
}

const PriorityListProvider: React.FC<IProps> = function PriorityListProvider({ children }) {
  const [lazy, setLazy] = useState<boolean>(true);
  const { values } = useContext(ProfileContext);

  const priorityListDocument = useFirestoreQueryReference(`priority-list`, "ownerId", "==", "%ID%");
  const favoriteQuery = useFirestoreInQueryReference(
    "priority-list",
    firebase.firestore.FieldPath.documentId(),
    values.favoritePriorityList
  );
  const priorityListResult = useFirestoreQuery<IFirebasePriorityList[]>(priorityListDocument, lazy);
  const favoriteResult = useFirestoreInQuery<IFirebasePriorityList[]>(favoriteQuery, lazy);

  const load = useCallback(() => setLazy(false), []);

  const { setHeroes, setTitle, setRequirementValue, setRequirement, deleteList, createList } =
    usePriorityListSetters();

  const value = useMemo<IPriorityListContext>(
    () => ({
      actions: {
        load,
        setHeroes,
        setTitle,
        createList,
        setRequirementValue,
        setRequirement,
        deleteList,
      },
      values: {
        favorites: (favoriteResult?.data ?? [])
          .concat()
          .sort((a: IFirebasePriorityList, b: IFirebasePriorityList) =>
            a.title.localeCompare(b.title)
          ),
        priorityList: (priorityListResult?.data ?? [])
          .concat()
          .sort((a: IFirebasePriorityList, b: IFirebasePriorityList) =>
            a.title.localeCompare(b.title)
          ),
      },
    }),
    [
      load,
      setHeroes,
      setTitle,
      createList,
      setRequirementValue,
      setRequirement,
      deleteList,
      favoriteResult?.data,
      priorityListResult?.data,
    ]
  );

  return <PriorityListContext.Provider value={value}>{children}</PriorityListContext.Provider>;
};

export default PriorityListProvider;

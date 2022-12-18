import React, { useCallback, useContext, useMemo, useState } from "react";
import useFirestoreInQuery from "../hooks/useFirestoreInQuery";
import useFirestoreInQueryReference from "../hooks/useFirestoreInQueryReference";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../hooks/useFirestoreQueryReference";
import firebase from "./firebase";
import usePetListSetters from "./hooks/usePetListSetters";
import PetListContext, { IPetListContext } from "./PetListContext";
import ProfileContext from "./ProfileContext";
import IFirebasePetList from "./types/IFirebasePetList";

interface IProps {
  children: React.ReactNode;
}

const PetListProvider: React.FC<IProps> = function PetListProvider({ children }) {
  const [lazy, setLazy] = useState<boolean>(true);
  const { values } = useContext(ProfileContext);

  const petListDocument = useFirestoreQueryReference(`pet-list`, "ownerId", "==", "%ID%");
  const favoriteQuery = useFirestoreInQueryReference(
    "pet-list",
    firebase.firestore.FieldPath.documentId(),
    values.favoritePetList
  );
  const petListResult = useFirestoreQuery<IFirebasePetList[]>(petListDocument, lazy);
  const favoriteResult = useFirestoreInQuery<IFirebasePetList[]>(favoriteQuery, lazy);

  const load = useCallback(() => setLazy(false), []);

  const { setSteps, setTitle, deleteList, createList } = usePetListSetters();

  const value = useMemo<IPetListContext>(
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
          .sort((a: IFirebasePetList, b: IFirebasePetList) => a.title.localeCompare(b.title)),
        petList: (petListResult?.data ?? [])
          .concat()
          .sort((a: IFirebasePetList, b: IFirebasePetList) => a.title.localeCompare(b.title)),
      },
    }),
    [load, setSteps, setTitle, createList, deleteList, favoriteResult?.data, petListResult?.data]
  );

  return <PetListContext.Provider value={value}>{children}</PetListContext.Provider>;
};

export default PetListProvider;

import { useCallback, useContext } from "react";
import useFirestoreCollectionReference from "../../hooks/useFirestoreCollectionReference";
import ProfileContext from "../ProfileContext";
import IFirebaseTreeList, { IFirebaseTreeListStep } from "../types/IFirebaseTreeList";

export default function useTreeListSetters() {
  const { values } = useContext(ProfileContext);
  const collection = useFirestoreCollectionReference(`tree-list`);

  const setSteps = useCallback(
    (id: string, newSteps: IFirebaseTreeListStep[]) => {
      const newData: Partial<IFirebaseTreeList> = {
        steps: newSteps,
        treeListLastUpdate: new Date().toISOString(),
      };
      return collection?.doc(id)?.set(newData, { merge: true }) ?? Promise.resolve(undefined);
    },
    [collection]
  );

  const setTitle = useCallback(
    (id: string, newTitle: string) => {
      const newData: Partial<IFirebaseTreeList> = {
        title: newTitle,
        treeListLastUpdate: new Date().toISOString(),
      };
      return collection?.doc(id)?.set(newData, { merge: true }) ?? Promise.resolve(undefined);
    },
    [collection]
  );

  const createList = useCallback(async () => {
    const docRef = await collection?.add({
      title: "Unknown",
      ownerId: values.userId,
      steps: [],
      treeListLastUpdate: new Date().toISOString(),
    });
    return docRef?.id ?? undefined;
  }, [collection, values.userId]);

  const deleteList = useCallback(
    (id: string) => collection?.doc(id)?.delete() ?? Promise.resolve(undefined),
    [collection]
  );

  return {
    createList,
    deleteList,
    setSteps,
    setTitle,
  };
}

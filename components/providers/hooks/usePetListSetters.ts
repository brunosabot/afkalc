import { useCallback, useContext } from "react";
import useFirestoreCollectionReference from "../../hooks/useFirestoreCollectionReference";
import ProfileContext from "../ProfileContext";
import IFirebasePetList, { IFirebasePetListStep } from "../types/IFirebasePetList";

export default function usePetListSetters() {
  const { values } = useContext(ProfileContext);
  const collection = useFirestoreCollectionReference(`pet-list`);

  const setSteps = useCallback(
    (id: string, newSteps: IFirebasePetListStep[]) => {
      const newData: Partial<IFirebasePetList> = {
        steps: newSteps,
        petListLastUpdate: new Date().toISOString(),
      };
      return collection?.doc(id)?.set(newData, { merge: true }) ?? Promise.resolve(undefined);
    },
    [collection]
  );

  const setTitle = useCallback(
    (id: string, newTitle: string) => {
      const newData: Partial<IFirebasePetList> = {
        title: newTitle,
        petListLastUpdate: new Date().toISOString(),
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
      petListLastUpdate: new Date().toISOString(),
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

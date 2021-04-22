import { useCallback, useContext } from "react";
import useFirestoreCollectionReference from "../../hooks/useFirestoreCollectionReference";
import ProfileContext from "../ProfileContext";
import IFirebasePriorityList, {
  IFirebasePriorityListHero,
  IFirebasePriorityListRequirement,
} from "../types/IFirebasePriorityList";

export default function usePriorityListSetters() {
  const { values } = useContext(ProfileContext);
  const collection = useFirestoreCollectionReference(`priority-list`);

  const setHeroes = useCallback(
    (id: string, newHeroes: IFirebasePriorityListHero[]) => {
      const newData: Partial<IFirebasePriorityList> = {
        heroes: newHeroes,
        priorityListLastUpdate: new Date().toISOString(),
      };
      return collection?.doc(id)?.set(newData, { merge: true }) ?? Promise.resolve(undefined);
    },
    [collection]
  );

  const setTitle = useCallback(
    (id: string, newTitle: string) => {
      const newData: Partial<IFirebasePriorityList> = {
        title: newTitle,
        priorityListLastUpdate: new Date().toISOString(),
      };
      return collection?.doc(id)?.set(newData, { merge: true }) ?? Promise.resolve(undefined);
    },
    [collection]
  );

  const setRequirementValue = useCallback(
    (id: string, newRequirementValue: number) => {
      const newData: Partial<IFirebasePriorityList> = {
        requirementValue: newRequirementValue,
        priorityListLastUpdate: new Date().toISOString(),
      };
      return collection?.doc(id)?.set(newData, { merge: true }) ?? Promise.resolve(undefined);
    },
    [collection]
  );

  const setRequirement = useCallback(
    (id: string, newRequirement: IFirebasePriorityListRequirement) => {
      const newData: Partial<IFirebasePriorityList> = {
        requirement: newRequirement,
        priorityListLastUpdate: new Date().toISOString(),
      };
      return collection?.doc(id)?.set(newData, { merge: true }) ?? Promise.resolve(undefined);
    },
    [collection]
  );

  const createList = useCallback(async () => {
    const docRef = await collection?.add({
      title: "Unknown",
      ownerId: values.userId,
      heroes: [],
      priorityListLastUpdate: new Date().toISOString(),
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
    setHeroes,
    setTitle,
    setRequirementValue,
    setRequirement,
  };
}

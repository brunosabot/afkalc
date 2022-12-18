import { useCallback } from "react";
import useFirestoreDocumentReference from "../../hooks/useFirestoreDocumentReference";
import { defaultValues } from "../ProfileContext";
import IFirebaseDataState from "../types/IFirebaseDataState";
import IFirebaseProfile from "../types/IFirebaseProfile";

export default function useElderTreeSetters(result: IFirebaseDataState<IFirebaseProfile>) {
  const document = useFirestoreDocumentReference(`profile/%ID%`);

  const setWarriorElderTree = useCallback(
    async (newWarriorElderTree: number) => {
      await document?.set(
        {
          elderTree: {
            ...defaultValues.elderTree,
            ...result?.data?.elderTree,
            warrior: newWarriorElderTree ?? 0,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.elderTree]
  );
  const setTankElderTree = useCallback(
    async (newTankElderTree: number) => {
      await document?.set(
        {
          elderTree: {
            ...defaultValues.elderTree,
            ...result?.data?.elderTree,
            tank: newTankElderTree ?? 0,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.elderTree]
  );
  const setRangerElderTree = useCallback(
    async (newRangerElderTree: number) => {
      await document?.set(
        {
          elderTree: {
            ...defaultValues.elderTree,
            ...result?.data?.elderTree,
            ranger: newRangerElderTree ?? 0,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.elderTree]
  );
  const setMageElderTree = useCallback(
    async (newMageElderTree: number) => {
      await document?.set(
        {
          elderTree: {
            ...defaultValues.elderTree,
            ...result?.data?.elderTree,
            mage: newMageElderTree ?? 0,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.elderTree]
  );
  const setSupportElderTree = useCallback(
    async (newSupportElderTree: number) => {
      await document?.set(
        {
          elderTree: {
            ...defaultValues.elderTree,
            ...result?.data?.elderTree,
            support: newSupportElderTree ?? 0,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.elderTree]
  );
  const setMainElderTree = useCallback(
    async (newMainElderTree: number) => {
      await document?.set(
        {
          elderTree: {
            ...defaultValues.elderTree,
            ...result?.data?.elderTree,
            main: newMainElderTree ?? 0,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.elderTree]
  );

  return {
    setWarriorElderTree,
    setTankElderTree,
    setRangerElderTree,
    setMageElderTree,
    setSupportElderTree,
    setMainElderTree,
  };
}

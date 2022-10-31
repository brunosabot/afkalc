import { useCallback } from "react";
import useFirestoreDocumentReference from "../../hooks/useFirestoreDocumentReference";
import { defaultValues } from "../ProfileContext";
import IFirebaseDataState from "../types/IFirebaseDataState";
import IFirebaseProfile from "../types/IFirebaseProfile";

const defaultPetValues = {
  strengthBuff: 0,
  intelligenceBuff: 0,
  agilityBuff: 0,
};

export default function usePetSetters(result: IFirebaseDataState<IFirebaseProfile>) {
  const document = useFirestoreDocumentReference(`profile/%ID%`);

  const setPetStrengthBuff = useCallback(
    async (petId: string, strengthBuff: number) => {
      await document?.set(
        {
          pets: {
            ...defaultValues.pets,
            [petId]: {
              id: petId,
              ...defaultPetValues,
              ...result?.data?.pets?.[petId],
              strengthBuff,
            },
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pets]
  );

  const setPetIntelligenceBuff = useCallback(
    async (petId: string, intelligenceBuff: number) => {
      await document?.set(
        {
          pets: {
            ...defaultValues.pets,
            [petId]: {
              id: petId,
              ...defaultPetValues,
              ...result?.data?.pets?.[petId],
              intelligenceBuff,
            },
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pets]
  );

  const setPetAgilityBuff = useCallback(
    async (petId: string, agilityBuff: number) => {
      await document?.set(
        {
          pets: {
            ...defaultValues.pets,
            [petId]: {
              id: petId,
              ...defaultPetValues,
              ...result?.data?.pets?.[petId],
              agilityBuff,
            },
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pets]
  );

  return {
    setPetStrengthBuff,
    setPetIntelligenceBuff,
    setPetAgilityBuff,
  };
}

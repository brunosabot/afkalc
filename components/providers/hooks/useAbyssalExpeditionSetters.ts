import { useCallback } from "react";
import useFirestoreDocumentReference from "../../hooks/useFirestoreDocumentReference";
import { defaultValues } from "../ProfileContext";
import {
  IFirebaseAbyssalExpeditionClassRelics,
  IFirebaseAbyssalExpeditionInventory,
  IFirebaseAbyssalExpeditionTilesList,
} from "../types/IFirebaseAbyssalExpedition";
import IFirebaseDataState from "../types/IFirebaseDataState";
import IFirebaseProfile from "../types/IFirebaseProfile";

export default function useAbyssalExpeditionSetters(result: IFirebaseDataState<IFirebaseProfile>) {
  const document = useFirestoreDocumentReference(`profile/%ID%`);

  const setAbexCurrentRelics = useCallback(
    async (newAbexCurrentRelics: IFirebaseAbyssalExpeditionClassRelics) => {
      await document?.set(
        { abexCurrentRelics: newAbexCurrentRelics, abexLastUpdate: new Date().toISOString() },
        { merge: true }
      );
    },
    [document]
  );
  const setAbexGoalRelics = useCallback(
    async (newAbexGoalRelics: IFirebaseAbyssalExpeditionClassRelics) => {
      await document?.set(
        { abexGoalRelics: newAbexGoalRelics, abexLastUpdate: new Date().toISOString() },
        { merge: true }
      );
    },
    [document]
  );
  const setAbexRelicInventory = useCallback(
    async (newAbexRelicInventory: IFirebaseAbyssalExpeditionInventory) => {
      await document?.set(
        { abexRelicInventory: newAbexRelicInventory, abexLastUpdate: new Date().toISOString() },
        { merge: true }
      );
    },
    [document]
  );
  const resetAbexRelicsAndInventory = useCallback(async () => {
    await document?.set(
      {
        abexRelicInventory: defaultValues.abexRelicInventory,
        abexGoalRelics: defaultValues.abexGoalRelics,
        abexCurrentRelics: defaultValues.abexCurrentRelics,
        abexLastUpdate: new Date().toISOString(),
      },
      { merge: true }
    );
  }, [document]);
  const setAbexTiles = useCallback(
    async (newAbexTiles: IFirebaseAbyssalExpeditionTilesList) => {
      await document?.set(
        { abexTiles: newAbexTiles, abexLastUpdate: new Date().toISOString() },
        { merge: true }
      );
    },
    [document]
  );
  const setAbexBox = useCallback(
    async (newAbexBox: number[]) => {
      await document?.set(
        { abexBox: newAbexBox, abexLastUpdate: new Date().toISOString() },
        { merge: true }
      );
    },
    [document]
  );

  const resetAbexTilesTimers = useCallback(() => {
    const newAbexTiles = { ...result?.data?.abexTiles };
    Object.keys(newAbexTiles).forEach((key) => {
      newAbexTiles[parseInt(key, 10)].timestamp = Math.round(Date.now() / 1000);
      newAbexTiles[parseInt(key, 10)].timer = 0;
    });
    return setAbexTiles(newAbexTiles);
  }, [result?.data?.abexTiles, setAbexTiles]);

  const resetAbexTiles = useCallback(() => setAbexTiles({}), [setAbexTiles]);

  return {
    setAbexCurrentRelics,
    setAbexGoalRelics,
    setAbexRelicInventory,
    setAbexBox,
    resetAbexRelicsAndInventory,
    setAbexTiles,
    resetAbexTilesTimers,
    resetAbexTiles,
  };
}

import { useCallback } from "react";
import useFirestoreDocumentReference from "../../hooks/useFirestoreDocumentReference";
import { defaultValues } from "../ProfileContext";
import IFirebaseDataState from "../types/IFirebaseDataState";
import IFirebaseProfile from "../types/IFirebaseProfile";

export default function useAbyssalExpeditionSetters(result: IFirebaseDataState<IFirebaseProfile>) {
  const document = useFirestoreDocumentReference(`profile/%ID%`);

  const setAbexCurrentRelics = useCallback(
    async (newAbexCurrentRelics) => {
      await document?.set({ abexCurrentRelics: newAbexCurrentRelics }, { merge: true });
    },
    [document]
  );
  const setAbexGoalRelics = useCallback(
    async (newAbexGoalRelics) => {
      await document?.set({ abexGoalRelics: newAbexGoalRelics }, { merge: true });
    },
    [document]
  );
  const setAbexRelicInventory = useCallback(
    async (newAbexRelicInventory) => {
      await document?.set({ abexRelicInventory: newAbexRelicInventory }, { merge: true });
    },
    [document]
  );
  const resetAbexRelicsAndInventory = useCallback(async () => {
    await document?.set(
      {
        abexRelicInventory: defaultValues.abexRelicInventory,
        abexGoalRelics: defaultValues.abexGoalRelics,
        abexCurrentRelics: defaultValues.abexCurrentRelics,
      },
      { merge: true }
    );
  }, [document]);
  const setAbexTiles = useCallback(
    async (newAbexTiles) => {
      await document?.set({ abexTiles: newAbexTiles }, { merge: true });
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
    resetAbexRelicsAndInventory,
    setAbexTiles,
    resetAbexTilesTimers,
    resetAbexTiles,
  };
}

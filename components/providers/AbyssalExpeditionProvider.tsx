import React, { useCallback, useMemo, useState } from "react";
import useFirestoreDocument from "../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../hooks/useFirestoreDocumentReference";
import AbyssalExpeditionContext, {
  defaultValues,
  IAbyssalExpeditionContext
} from "./AbyssalExpeditionContext";
import IFirebaseAbyssalExpedition from "./types/IFirebaseAbyssalExpedition";

interface IProps {
  children: React.ReactNode;
}

const AbyssalExpeditionProvider: React.FC<IProps> = ({ children }) => {
  const [lazy, setLazy] = useState<boolean>(true);
  const abyssalExpeditionDocument = useFirestoreDocumentReference(`abyssal-expedition/%ID%`);
  const abyssalExpeditionResult = useFirestoreDocument<IFirebaseAbyssalExpedition>(
    abyssalExpeditionDocument,
    lazy
  );

  const load = useCallback(() => setLazy(false), []);

  const setCurrentRelics = useCallback(
    async (newCurrentRelics) => {
      await abyssalExpeditionDocument?.set({ currentRelics: newCurrentRelics }, { merge: true });
    },
    [abyssalExpeditionDocument]
  );
  const setGoalRelics = useCallback(
    async (newGoalRelics) => {
      await abyssalExpeditionDocument?.set({ goalRelics: newGoalRelics }, { merge: true });
    },
    [abyssalExpeditionDocument]
  );
  const setRelicInventory = useCallback(
    async (newRelicInventory) => {
      await abyssalExpeditionDocument?.set({ relicInventory: newRelicInventory }, { merge: true });
    },
    [abyssalExpeditionDocument]
  );
  const setTiles = useCallback(
    async (newTiles) => {
      await abyssalExpeditionDocument?.set({ tiles: newTiles }, { merge: true });
    },
    [abyssalExpeditionDocument]
  );

  const resetTilesTimers = useCallback(() => {
    const newTiles = { ...abyssalExpeditionResult?.data?.tiles };
    Object.keys(newTiles).forEach((key) => {
      newTiles[parseInt(key, 10)].timestamp = Math.round(Date.now() / 1000);
      newTiles[parseInt(key, 10)].timer = 0;
    });
    return setTiles(newTiles);
  }, [abyssalExpeditionResult?.data?.tiles, setTiles]);

  const resetTiles = useCallback(() => setTiles({}), [setTiles]);

  const value = useMemo<IAbyssalExpeditionContext>(
    () => ({
      actions: {
        load,
        setCurrentRelics,
        setGoalRelics,
        setRelicInventory,
        setTiles,
        resetTilesTimers,
        resetTiles,
      },
      values: {
        ...defaultValues,
        ...abyssalExpeditionResult?.data,
      },
    }),
    [
      load,
      setCurrentRelics,
      setGoalRelics,
      setRelicInventory,
      setTiles,
      resetTilesTimers,
      resetTiles,
      abyssalExpeditionResult?.data,
    ]
  );

  return (
    <AbyssalExpeditionContext.Provider value={value}>{children}</AbyssalExpeditionContext.Provider>
  );
};

export default AbyssalExpeditionProvider;

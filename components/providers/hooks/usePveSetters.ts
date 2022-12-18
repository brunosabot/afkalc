import { useCallback } from "react";
import useFirestoreDocumentReference from "../../hooks/useFirestoreDocumentReference";
import { defaultValues } from "../ProfileContext";
import IFirebaseDataState from "../types/IFirebaseDataState";
import IFirebaseProfile from "../types/IFirebaseProfile";

export default function usePveSetters(result: IFirebaseDataState<IFirebaseProfile>) {
  const document = useFirestoreDocumentReference(`profile/%ID%`);

  const setPVECampaign = useCallback(
    async (newCampaignPve: string) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            campaign: newCampaignPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVEKingTower = useCallback(
    async (newKingTowerPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            kingTower: newKingTowerPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVELightbearerTower = useCallback(
    async (newLightbearerTowerPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            lightbearerTower: newLightbearerTowerPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVEMaulerTower = useCallback(
    async (newMaulerTowerPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            maulerTower: newMaulerTowerPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVEWilderTower = useCallback(
    async (newWilderTowerPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            wilderTower: newWilderTowerPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVEGravebornTower = useCallback(
    async (newGravebornTowerPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            gravebornTower: newGravebornTowerPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVECelestialTower = useCallback(
    async (newCelestialTowerPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            celestialTower: newCelestialTowerPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVEHypogeanTower = useCallback(
    async (newHypogeanTowerPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            hypogeanTower: newHypogeanTowerPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVECrystal = useCallback(
    async (newCrystalPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            crystal: newCrystalPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );
  const setPVECrystalMax = useCallback(
    async (newCrystalMaxPve: number) => {
      await document?.set(
        {
          pve: {
            ...defaultValues.pve,
            ...result?.data?.pve,
            crystalMax: newCrystalMaxPve,
          },
        },
        { merge: true }
      );
    },
    [document, result?.data?.pve]
  );

  return {
    setPVECrystal,
    setPVECrystalMax,
    setPVECampaign,
    setPVEKingTower,
    setPVELightbearerTower,
    setPVEMaulerTower,
    setPVEWilderTower,
    setPVEGravebornTower,
    setPVECelestialTower,
    setPVEHypogeanTower,
  };
}

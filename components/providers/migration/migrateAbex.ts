import firebase from "../firebase";
import IFirebaseAbyssalExpedition from "../types/IFirebaseAbyssalExpedition";

export default function migrateAbex(id: string): Promise<void> {
  return new Promise((resolve) => {
    const firestore = firebase.firestore();
    const AbexDocument = firestore.doc(`abex/${id}`);

    AbexDocument.get().then((AbexResult) => {
      const AbexData = AbexResult.data() ?? {};
      const abyssalExpeditionDocument = firestore.doc(`abyssal-expedition/${id}`);

      const newAbyssalExpedition: IFirebaseAbyssalExpedition = {};
      if (AbexData.currentRelic !== undefined) {
        newAbyssalExpedition.currentRelics = AbexData.currentRelic;
      }
      if (AbexData.goalRelic !== undefined) {
        newAbyssalExpedition.goalRelics = AbexData.goalRelic;
      }
      if (AbexData.inventory !== undefined) {
        newAbyssalExpedition.relicInventory = AbexData.inventory;
      }
      if (AbexData.relicList !== undefined) {
        newAbyssalExpedition.tiles = AbexData.relicList;
      }

      abyssalExpeditionDocument.set(newAbyssalExpedition, { merge: true }).then(() => resolve());
    });
  });
}

// ./migrations/v0.0.1__typescript-example.ts
import firebase from "../firebase";

const firestore = firebase.firestore();

const profileCollection = firestore.collection("profile");

export async function migrate() {
  await firestore.collection("heroes").onSnapshot((heroLists: any) => {
    heroLists.docs.forEach((heroList: any) => {
      const data = heroList.data();
      profileCollection.doc(heroList.id).set({ heroes: data.heroes }, { merge: true });
    });
  });
  await firestore.collection("abyssal-expedition").onSnapshot((abyssalExpeditions: any) => {
    abyssalExpeditions.docs.forEach((abyssalExpedition: any) => {
      const data = abyssalExpedition.data();

      const newData: any = {};
      if (data.goalRelics) {
        newData.abexGoalRelics = data.goalRelics;
      }
      if (data.currentRelics) {
        newData.abexCurrentRelics = data.currentRelics;
      }
      if (data.relicInventory) {
        newData.abexRelicInventory = data.relicInventory;
      }
      if (data.tiles) {
        newData.abexTiles = data.tiles;
      }

      if (Object.keys(newData).length > 0) {
        profileCollection.doc(abyssalExpedition.id).set({ ...newData }, { merge: true });
      }
    });
  });
}

migrate();

const defaultExport = {};

export default defaultExport;

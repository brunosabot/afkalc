import firebase from "../firebase";
import migrateAbex from "./migrateAbex";
import migrateCampaign from "./migrateCampaign";
import migrateFastReward from "./migrateFastReward";
import migrateHeroList from "./migrateHeroList";
import migratePriorityList from "./migratePriorityList";
import migrateUser from "./migrateUser";

const firestore = firebase.firestore();

export default async function migrate(version: number | undefined, userId: string) {
  if (userId === "") return;

  const theVersion = version || 1;

  if (theVersion === 1) {
    const profileDocument = firestore.doc(`profile/${userId}`);
    profileDocument.set({ version: 2 }, { merge: true });

    await Promise.all([
      migrateUser(userId),
      migrateAbex(userId),
      migratePriorityList(userId),
      migrateHeroList(userId),
      migrateFastReward(userId),
      migrateCampaign(userId),
    ]);
  }
}

import firebase from "../firebase";
import IFirebaseProfile from "../types/IFirebaseProfile";

export default function migrateFastReward(id: string): Promise<void> {
  return new Promise((resolve) => {
    const firestore = firebase.firestore();
    const fastRewardDocument = firestore.doc(`fast-reward/${id}`);

    fastRewardDocument.get().then((fastRewardResult) => {
      const fastRewardData = fastRewardResult.data() ?? {};
      const profileDocument = firestore.doc(`profile/${id}`);

      const newProfile: IFirebaseProfile = {};
      if (fastRewardData.player !== undefined) {
        newProfile.playerLevel = fastRewardData.player;
      }
      if (fastRewardData.vip !== undefined) {
        newProfile.playerVipLevel = fastRewardData.vip;
      }

      profileDocument.set(newProfile, { merge: true }).then(() => resolve());
    });
  });
}

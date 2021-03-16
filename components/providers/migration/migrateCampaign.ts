import firebase from "../firebase";
import IFirebaseProfile from "../types/IFirebaseProfile";

export default function migrateFastReward(id: string): Promise<void> {
  return new Promise((resolve) => {
    const firestore = firebase.firestore();
    const fastRewardDocument = firestore.doc(`campaign/${id}`);

    fastRewardDocument.get().then((fastRewardResult) => {
      const fastRewardData = fastRewardResult.data() ?? {};
      const profileDocument = firestore.doc(`profile/${id}`);

      const newProfile: IFirebaseProfile = {};
      if (fastRewardData.level !== undefined) {
        newProfile.campaignLevel = fastRewardData.level;
      }
      if (fastRewardData.pass !== undefined) {
        newProfile.campaignSuccessDate = fastRewardData.pass;
      }

      profileDocument.set(newProfile, { merge: true }).then(() => resolve());
    });
  });
}

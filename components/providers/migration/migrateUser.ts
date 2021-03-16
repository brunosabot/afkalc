import firebase from "../firebase";
import IFirebaseProfile from "../types/IFirebaseProfile";

export default function migrateUser(id: string): Promise<void> {
  return new Promise((resolve) => {
    const firestore = firebase.firestore();
    const userDocument = firestore.doc(`user/${id}`);

    userDocument.get().then((user) => {
      const userData = user.data() ?? {};
      const profileDocument = firestore.doc(`profile/${id}`);

      const newProfile: IFirebaseProfile = {};
      if (userData.shareId !== undefined) {
        newProfile.shareId = userData.shareId;
      }

      profileDocument.set(newProfile, { merge: true }).then(() => resolve());
    });
  });
}

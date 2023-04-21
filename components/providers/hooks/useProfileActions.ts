import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { FirebaseContext } from "../FirebaseProvider";
import firebase from "../firebase";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function useProfileActions() {
  const router = useRouter();
  const { actions } = useContext(FirebaseContext);

  const deleteUser = useCallback(() => {
    const uid = auth.currentUser?.uid;

    if (uid === undefined) return;
    actions
      .reLogIn()
      .then(() =>
        Promise.all([
          firestore.collection("abex").doc(uid).delete(),
          firestore.collection("abyssal-expedition").doc(uid).delete(),
          firestore.collection("campaign").doc(uid).delete(),
          firestore.collection("fast-reward").doc(uid).delete(),
          firestore.collection("hero-list").doc(uid).delete(),
          firestore.collection("user").doc(uid).delete(),
          firestore.collection("heroes").doc(uid).delete(),
          firestore.collection("profile").doc(uid).delete(),
          firestore
            .collection("priority-list")
            .where("ownerId", "==", uid)
            .get()
            .then((snapshot) => {
              const deletePromises: Promise<void>[] = [];
              snapshot.forEach((doc) => {
                deletePromises.push(firestore.collection("priority-list").doc(doc.id).delete());
              });

              return Promise.all(deletePromises);
            }),
        ])
      )
      .then(() => {
        auth.currentUser?.delete();
      })
      .then(() => {
        router.push(`/`);
      });
  }, [actions, router]);

  const downloadData = useCallback(async () => {
    const uid = auth.currentUser?.uid;

    if (uid === undefined) return;

    const promises = [
      firestore.collection("abex").doc(uid).get(),
      firestore.collection("abyssal-expedition").doc(uid).get(),
      firestore.collection("campaign").doc(uid).get(),
      firestore.collection("fast-reward").doc(uid).get(),
      firestore.collection("hero-list").doc(uid).get(),
      firestore.collection("user").doc(uid).get(),
      firestore.collection("heroes").doc(uid).get(),
      firestore.collection("profile").doc(uid).get(),
    ];

    const snapshot = await firestore.collection("priority-list").where("ownerId", "==", uid).get();

    snapshot.forEach((doc) => {
      promises.push(firestore.collection("priority-list").doc(doc.id).get());
    });

    const userDataList = await Promise.all(promises);
    const text = userDataList.map((userData) => userData.data()).filter((data) => data);

    const element = window.document.createElement("a");
    element.setAttribute(
      "href",
      `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(text))}`
    );
    element.setAttribute("download", "user-data.json");

    element.style.display = "none";
    window.document.body.appendChild(element);

    element.click();

    window.document.body.removeChild(element);
  }, []);

  return {
    deleteUser,
    downloadData,
  };
}

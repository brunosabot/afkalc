import firebase from "../firebase";
import IFirebasePriorityList from "../types/IFirebasePriorityList";

export default function migratePriorityList(id: string): Promise<void> {
  return new Promise((resolve) => {
    const firestore = firebase.firestore();
    const priorityListCollection = firestore.collection(`user/${id}/priority-list/`);

    firestore
      .doc(`user/${id}`)
      .get()
      .then((userResult) => {
        const userData = userResult.data();

        if (userData?.shareId === undefined) {
          resolve();
          return;
        }

        priorityListCollection.onSnapshot(
          (response: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
            const newPriorityListCollection = firestore.collection("priority-list");

            const newListPromises = response.docs.map((list) => {
              const data = list.data();
              const newPriorityList: IFirebasePriorityList = {
                ownerId: data.owner,
                title: data.title,
                heroes: data.heroes.map((priorityHero: any) => ({
                  fi: priorityHero.fi,
                  si: priorityHero.si,
                  ascend: priorityHero.ascend,
                  hero: priorityHero.id,
                })),
                requirement: data.type ?? "",
                requirementValue: data.value ?? 0,
                legacyId: `${userData.shareId}$${list.id}`,
              };

              return newPriorityListCollection.add(newPriorityList);
            });

            Promise.all(newListPromises).then(() => resolve());
          }
        );
      });
  });
}

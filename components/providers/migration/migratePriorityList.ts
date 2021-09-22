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
                ownerId: data.owner ?? id,
                title: data.title ?? "",
                priorityListLastUpdate: "",
                heroes: data.heroes.map((priorityHero: any) => {
                  if (typeof priorityHero === "number") {
                    return {
                      fi: 0,
                      si: -1,
                      ascend: 0,
                      hero: priorityHero ?? 0,
                    };
                  }

                  return {
                    fi: priorityHero.fi ?? 0,
                    si: priorityHero.si ?? 0,
                    ascend: priorityHero.ascend ?? 0,
                    hero: priorityHero.id ?? 0,
                  };
                }),
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

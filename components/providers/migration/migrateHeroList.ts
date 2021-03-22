import firebase from "../firebase";
import { IFirebaseHeroesHero, IFirebaseHeroList } from "../types/IFirebaseHeroes";

export default function migrateHeroList(id: string): Promise<void> {
  return new Promise((resolve) => {
    const firestore = firebase.firestore();
    const heroListDocument = firestore.doc(`hero-list/${id}`);

    heroListDocument.get().then((heroListResult) => {
      const heroListData = heroListResult.data() ?? { levels: {} };
      const heroesDocument = firestore.doc(`heroes/${id}`);

      const defaultHeroList: IFirebaseHeroList = {};
      const heroes: IFirebaseHeroList = Object.keys(heroListData.levels).reduce((acc, heroId) => {
        const oldHero = heroListData.levels[heroId];
        const newHero: IFirebaseHeroesHero = {};

        if (oldHero.ascend !== undefined) {
          newHero.ascend = oldHero.ascend;
        }
        if (oldHero.si !== undefined) {
          newHero.si = oldHero.si;
        }
        if (oldHero.inn !== undefined) {
          newHero.fi = oldHero.inn;
        }

        return { ...acc, [heroId]: newHero };
      }, defaultHeroList);

      heroesDocument.set({ heroes }).then(() => resolve());
    });
  });
}

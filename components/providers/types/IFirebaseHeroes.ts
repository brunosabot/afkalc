export interface IFirebaseHeroesHero {
  fi?: number;
  si?: number;
  ascend?: number;
  link?: number;
}

export interface IFirebaseHeroList {
  [key: number]: IFirebaseHeroesHero;
}

export default interface IFirebaseHeroes {
  heroes: IFirebaseHeroList;
}

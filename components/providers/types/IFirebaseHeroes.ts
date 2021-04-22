export interface IFirebaseHeroesHero {
  fi?: number;
  si?: number;
  ascend?: number;
  link?: number;
  linkkey?: number;
}

export interface IFirebaseHeroList {
  [key: number]: IFirebaseHeroesHero;
}

export default interface IFirebaseHeroes {
  heroes: IFirebaseHeroList;
  id: string;
}

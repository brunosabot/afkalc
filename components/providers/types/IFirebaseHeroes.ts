export interface IFirebaseHeroesHero {
  fi?: number;
  si?: number;
  ascend?: number;
  link?: number;
  linkkey?: number;
  engrave?: number;
  partbody?: number;
  partboots?: number;
  parthead?: number;
  partweapon?: number;
  partbodyfaction?: number;
  partbootsfaction?: number;
  partheadfaction?: number;
  partweaponfaction?: number;
}

export interface IFirebaseHeroList {
  [key: number]: IFirebaseHeroesHero;
}

export default interface IFirebaseHeroes {
  heroes: IFirebaseHeroList;
  id: string;
}

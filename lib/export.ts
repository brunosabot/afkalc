import { IFirebaseHeroList } from "../components/providers/types/IFirebaseHeroes";
import { IFirebasePetList } from "../components/providers/types/IFirebasePets";
import IFirebaseProfile from "../components/providers/types/IFirebaseProfile";
import heroesJson from "../data/heroes.json";
import heroesUS from "../public/locales/en_US/common.json";
import { factionFactionMap } from "../types/Faction";

function getHeroAscend(ascendLevel: number) {
  if (ascendLevel === 1) return `elite`;
  if (ascendLevel === 2) return `elite-p`;
  if (ascendLevel === 3) return `legendary`;
  if (ascendLevel === 4) return `legendary-p`;
  if (ascendLevel === 5) return `mythic`;
  if (ascendLevel === 6) return `mythic-p`;
  if (ascendLevel === 7) return `ascend`;
  if (ascendLevel > 7) return `ascend-${ascendLevel - 7}`;

  return "-";
}

function getPartsAscend(ascendLevel: number) {
  if (ascendLevel === 1) return `crude`;
  if (ascendLevel === 2) return `common`;
  if (ascendLevel === 3) return `rare`;
  if (ascendLevel === 4) return `rare-p`;
  if (ascendLevel === 5) return `elite`;
  if (ascendLevel === 6) return `elite-p`;
  if (ascendLevel === 7) return `legendary`;
  if (ascendLevel === 8) return `legendary-p`;
  if (ascendLevel === 9) return `mythic`;
  if (ascendLevel === 10) return `mythic-t1`;
  if (ascendLevel === 11) return `mythic-t2`;
  if (ascendLevel === 12) return `mythic-t3`;
  if (ascendLevel === 13) return `mythic-t4`;

  return `none`;
}

function mapPets(pets: IFirebasePetList) {
  return Object.keys(pets).map((petId) => ({
    id: petId,
    agility: pets[petId].agilityBuff,
    intelligence: pets[petId].intelligenceBuff,
    strength: pets[petId].strengthBuff,
  }));
}

function mapHeroes(heroes: IFirebaseHeroList) {
  return Object.keys(heroes)
    .map((heroId) => +heroId)
    .map((heroId) => {
      const playerHero = heroes[heroId];
      const hero = heroesJson.find((heroJson) => heroJson.id === heroId);

      if (hero === undefined) return undefined;

      const heroName = heroesUS.heroesName[hero.slug as keyof typeof heroesUS.heroesName];

      if (heroName === undefined) return undefined;

      const bodyFaction = (playerHero.partbodyfaction ?? 0) as keyof typeof factionFactionMap;
      const bootsFaction = (playerHero.partbootsfaction ?? 0) as keyof typeof factionFactionMap;
      const headFaction = (playerHero.partheadfaction ?? 0) as keyof typeof factionFactionMap;
      const weaponFaction = (playerHero.partweaponfaction ?? 0) as keyof typeof factionFactionMap;

      return {
        name: heroName,
        isAwakened: hero.isAwakened,
        furniture: {
          mythicCount: playerHero.fi ?? 0,
        },
        signature: {
          level: playerHero.si ?? -1,
        },
        engrave: {
          level: playerHero.engrave ?? 0,
        },
        ascension: {
          level: getHeroAscend(playerHero.ascend ?? 0),
        },
        parts: {
          body: {
            level: getPartsAscend(playerHero.partbody ?? 0),
            faction: factionFactionMap[bodyFaction],
          },
          boots: {
            level: getPartsAscend(playerHero.partboots ?? 0),
            faction: factionFactionMap[bootsFaction],
          },
          head: {
            level: getPartsAscend(playerHero.parthead ?? 0),
            faction: factionFactionMap[headFaction],
          },
          weapon: {
            level: getPartsAscend(playerHero.partweapon ?? 0),
            faction: factionFactionMap[weaponFaction],
          },
        },
      };
    })
    .filter((data) => data !== undefined);
}

export function getProfileJson(firebaseProfile: IFirebaseProfile) {
  return {
    name: firebaseProfile.playerName,
    pets: mapPets(firebaseProfile.pets ?? []),
    heroes: mapHeroes(firebaseProfile.heroes ?? []),
    elderTree: firebaseProfile.elderTree,
  };
}

export default getProfileJson;

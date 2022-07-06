import enemiesJson from "../../../../data/enemies.json";

interface Enemi {
  faction: string;
  slug: string;
  id: number;
  image?: string;
}

const enemies = enemiesJson as Enemi[];

function getEnemi(t: any, enemy?: number) {
  const foundEnemy = enemies.find((e) => e.id === enemy);

  if (foundEnemy) {
    return { ...foundEnemy, name: t(`common:enemyName.${foundEnemy.slug}`) };
  }

  return undefined;
}

export default function useEnemi() {
  return { getEnemi };
}

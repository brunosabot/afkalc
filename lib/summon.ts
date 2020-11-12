export function getEstimatedDiamsForSummon(
  elite: number,
  eliteP: number,
  legendary: number,
  legendaryP: number,
  mythic: number,
  mythicP: number
) {
  const got = elite + eliteP * 2 + legendary * 2 + legendaryP * 4 + mythic * 4 + mythicP * 4;
  const p = 0.0461;
  const diamCost = 300;
  const assuredTry = 30;
  const powBase = 1 - p;
  const luck = 1 / p - (1 / p) * powBase ** assuredTry;

  if (got >= 8) {
    return 0;
  }

  return Math.round(diamCost * luck * (8 - got));
}

const def = {
  getEstimatedDiamsForSummon,
};

export default def;

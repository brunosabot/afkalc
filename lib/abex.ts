function reduceRank(acc: [number, number], value: number): [number, number] {
  const rank = Math.floor(value / 1000);
  if (acc[0] < rank) {
    return [rank, 1];
  }
  if (acc[0] === rank) {
    return [rank, acc[1] + 1];
  }
  return acc;
}

const defaultRank: [number, number] = [0, 0];

// eslint-disable-next-line import/prefer-default-export
export function getRelicRank(currentRelicStatus: number[]) {
  const [rank, count] = currentRelicStatus.reduce(reduceRank, defaultRank);

  if (rank === 0) return "";

  if (rank === 5 && count === 6) return "5.6";

  if (count === 6) return `${rank + 1}.0`;

  return `${rank}.${count}`;
}

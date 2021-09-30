export function getAscend(ascend: number, si: number, fi: number, engrave: number) {
  if (engrave > 0) return Math.max(8, ascend);
  if (fi > 0) return Math.max(7, ascend);
  if (si > 0) return Math.max(5, ascend);
  return ascend ?? 0;
}

const defaultExport = { getAscend };

export default defaultExport;

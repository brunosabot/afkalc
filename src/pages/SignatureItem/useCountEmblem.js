const { useMemo } = require("react");

const items = {
  0: {type: "primordial", count: 20},
  1: {type: "primordial", count: 10},
  2: {type: "primordial", count: 10},
  3: {type: "primordial", count: 10},
  4: {type: "primordial", count: 10},
  5: {type: "primordial", count: 15},
  6: {type: "primordial", count: 20},
  7: {type: "primordial", count: 20},
  8: {type: "primordial", count: 25},
  9: {type: "primordial", count: 30},
  10: {type: "primordial", count: 50},
  11: {type: "amplifying", count: 10},
  12: {type: "amplifying", count: 10},
  13: {type: "amplifying", count: 15},
  14: {type: "amplifying", count: 15},
  15: {type: "amplifying", count: 20},
  16: {type: "amplifying", count: 25},
  17: {type: "amplifying", count: 25},
  18: {type: "amplifying", count: 30},
  19: {type: "amplifying", count: 40},
  20: {type: "amplifying", count: 50},
  21: {type: "faction", count: 10},
  22: {type: "faction", count: 20},
  23: {type: "faction", count: 20},
  24: {type: "faction", count: 20},
  25: {type: "faction", count: 30},
  26: {type: "faction", count: 30},
  27: {type: "faction", count: 40},
  28: {type: "faction", count: 40},
  29: {type: "faction", count: 40},
  30: {type: "faction", count: 50},
  31: {type: "celest", count: 50},
  32: {type: "celest", count: 50},
  33: {type: "celest", count: 50},
  34: {type: "celest", count: 60},
  35: {type: "celest", count: 70},
  36: {type: "celest", count: 80},
  37: {type: "celest", count: 90},
  38: {type: "celest", count: 120},
  39: {type: "celest", count: 180},
  40: {type: "celest", count: 300},
}

export default function useCountEmblem(max, currentLevel) {

  return useMemo(() => {
    let primordial = 0;
    let amplifying = 0;
    let faction = 0;
    let celest = 0;
    for (let i = currentLevel + 1; i<= max; i++) {
      if (items[i].type === "primordial") {
        primordial += items[i].count;
      } else if (items[i].type === "amplifying") {
        amplifying+=items[i].count;
      } else if (items[i].type === "faction") {
        faction+=items[i].count;
      } else if (items[i].type === "celest") {
        celest+=items[i].count;
      }
    }

    return [primordial, amplifying, faction, celest];
  }, [max, currentLevel])

}
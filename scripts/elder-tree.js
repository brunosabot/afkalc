const fs = require("fs");
const path = require("path");

const ARBITRARY_DROPLET_OFFSET = 288;

const elderTreeFile = path.resolve(path.join(__dirname, "../data/elder-tree.json"));
const heroesFile = path.resolve(path.join(__dirname, "../data/heroes.json"));

const elderTreeData = fs.readFileSync(elderTreeFile);
const heroesData = fs.readFileSync(heroesFile);
const elderTreeJson = JSON.parse(elderTreeData);
const heroesJson = JSON.parse(heroesData);

const heroes = heroesJson.filter(({ faction }) => faction !== "dimensionals");
const heroesDroplets = ARBITRARY_DROPLET_OFFSET + heroes.length * 38;

const maxElderTreeValue = Math.floor(heroesDroplets / 24);
const maxElderBranchValue = maxElderTreeValue - 10;

const branchAdditionalStats = {
  warrior: { hp: 49725, atk: 3349, arm: 680 },
  tank: { hp: 51680, atk: 3204, arm: 695 },
  ranger: { hp: 42721, atk: 3761, arm: 622 },
  mage: { hp: 46308, atk: 3581, arm: 646 },
  support: { hp: 49283, atk: 3397, arm: 664 },
};

Object.keys(branchAdditionalStats).forEach((key) => {
  const stats = branchAdditionalStats[key];

  for (let i = 181; i <= maxElderBranchValue; i += 1) {
    const previousLevel = elderTreeJson[key][i - 1];

    if (i % 5 === 0) {
      elderTreeJson[key][i] = previousLevel;
    } else {
      elderTreeJson[key][i] = {
        ...previousLevel,
        hp: previousLevel.hp + stats.hp,
        atk: previousLevel.atk + stats.atk,
        arm: previousLevel.arm + stats.arm,
        totalcost: previousLevel.totalcost + previousLevel.cost,
      };
    }
  }
});

fs.writeFileSync(elderTreeFile, JSON.stringify(elderTreeJson, undefined, 2));

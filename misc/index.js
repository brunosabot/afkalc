// @ts-nocheck
const fs = require("fs");
const csv = require("fast-csv");

const readCSV = async (file) => {
  return new Promise((resolve) => {
    const data = [];

    fs.createReadStream(file)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data));
  });
};

function formatCSVOutput(data) {
  return data.reduce(
    (acc, row) => ({
      ...acc,
      [row[""]]: {
        cost: parseFloat(row.COST.replace(/,/g, "")),
        totalcost: parseFloat(row.TOTALCOST.replace(/,/g, "")),
        hp: parseFloat(row.HP.replace(/,/g, "")),
        atk: parseFloat(row.ATK.replace(/,/g, "")),
        arm: parseFloat(row.DEF.replace(/,/g, "")),
        "hp.pr": parseFloat(row["HP.PR"].replace(/,/g, "")),
        "atk.pr": parseFloat(row["ATK.PR"].replace(/,/g, "")),
        "arm.pr": parseFloat(row["DEF.PR"].replace(/,/g, "")),
        crit: parseFloat(row.CRIT.replace(/,/g, "")),
        hit: parseFloat(row.HIT.replace(/,/g, "")),
        dodg: parseFloat(row.DODG.replace(/,/g, "")),
        mspd: parseFloat(row.MSPD.replace(/,/g, "")),
        lfs: parseFloat(row.LFS.replace(/,/g, "")),
      },
    }),
    {}
  );
}

(async function () {
  const elderTreeJson = {
    warrior: formatCSVOutput(await readCSV("./might.csv")),
    tank: formatCSVOutput(await readCSV("./fortitude.csv")),
    ranger: formatCSVOutput(await readCSV("./celerity.csv")),
    mage: formatCSVOutput(await readCSV("./sorcery.csv")),
    support: formatCSVOutput(await readCSV("./sustenance.csv")),
  };

  fs.writeFileSync("../data/elder-tree.json", JSON.stringify(elderTreeJson, undefined, 2));
})();

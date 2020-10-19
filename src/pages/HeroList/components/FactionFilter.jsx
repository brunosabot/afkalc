import React from "react";
import Filter from "./Filter";

const FACTIONS = [
  "dimensionals",
  "celestials",
  "hypogeans",
  "lightbearers",
  "maulers",
  "wilders",
  "graveborns",
];

const FactionFilter = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={FACTIONS} />;
};

export default FactionFilter;

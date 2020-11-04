import React from "react";
import Filter from "./Filter";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const FACTIONS = [
  "dimensionals",
  "celestials",
  "hypogeans",
  "lightbearers",
  "maulers",
  "wilders",
  "graveborns",
];

const FactionFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={FACTIONS} />;
};

export default FactionFilter;

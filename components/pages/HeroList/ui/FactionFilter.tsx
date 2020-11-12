import React from "react";
import factions from "../../../../data/heroFaction.json";
import Filter from "./Filter";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const FactionFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={factions} />;
};

export default FactionFilter;

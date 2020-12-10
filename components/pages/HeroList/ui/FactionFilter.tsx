import React from "react";
import factions from "../../../../data/heroFaction.json";
import FilterButtons from "./FilterButtons";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const FactionFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return (
    <FilterButtons filter={filter} setFilter={setFilter} imagePath={imagePath} data={factions} />
  );
};

export default FactionFilter;

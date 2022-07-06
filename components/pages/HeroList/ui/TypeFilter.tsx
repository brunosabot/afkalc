import React from "react";
import FilterButtons from "./FilterButtons";

interface IProps {
  filter: string[];
  setFilter: (value: string) => void;
  imagePath: string;
}

const TYPES = ["strength", "agility", "intelligence"];

const TypeFilter: React.FC<IProps> = function TypeFilter({ filter, setFilter, imagePath }) {
  return <FilterButtons filter={filter} setFilter={setFilter} imagePath={imagePath} data={TYPES} />;
};

export default React.memo(TypeFilter);

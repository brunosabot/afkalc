import React from "react";
import Filter from "./Filter";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const TYPES = ["strength", "agility", "intelligence"];

const TypeFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={TYPES} />;
};

export default TypeFilter;

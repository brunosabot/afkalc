import React from "react";
import ascension from "../../../../data/heroAscension.json";
import FilterButtons from "./FilterButtons";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const RoleFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => (
  <FilterButtons filter={filter} setFilter={setFilter} imagePath={imagePath} data={ascension} />
);

export default RoleFilter;

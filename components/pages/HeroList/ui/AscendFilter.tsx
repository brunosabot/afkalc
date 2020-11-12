import React from "react";
import ascension from "../../../../data/heroAscension.json";
import Filter from "./Filter";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const RoleFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={ascension} />;
};

export default RoleFilter;

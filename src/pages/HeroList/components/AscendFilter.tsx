import React from "react";
import Filter from "./Filter";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const ROLES = ["elite", "legendary", "mythic", "ascended"];

const RoleFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={ROLES} />;
};

export default RoleFilter;

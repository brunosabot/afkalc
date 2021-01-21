import React from "react";
import roles from "../../../../data/heroRole.json";
import FilterButtons from "./FilterButtons";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const RoleFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => (
  <FilterButtons filter={filter} setFilter={setFilter} imagePath={imagePath} data={roles} />
);

export default React.memo(RoleFilter);

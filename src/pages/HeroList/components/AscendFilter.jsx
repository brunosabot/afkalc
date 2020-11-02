import React from "react";
import Filter from "./Filter";

const ROLES = ["elite", "legendary", "mythic", "ascended"];

const RoleFilter = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={ROLES} />;
};

export default RoleFilter;

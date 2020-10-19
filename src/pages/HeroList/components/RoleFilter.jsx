import React from "react";
import Filter from "./Filter";

const ROLES = [
  "tank",
  "aoe",
  "continuous",
  "debuffer",
  "control",
  "buffer",
  "burst",
  "regen",
  "assassin",
];

const RoleFilter = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={ROLES} />;
};

export default RoleFilter;

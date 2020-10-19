import React from "react";
import Filter from "./Filter";

const TYPES = ["strength", "agility", "intelligence"];

const TypeFilter = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={TYPES} />;
};

export default TypeFilter;

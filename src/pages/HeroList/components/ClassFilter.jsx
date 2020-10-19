import React from "react";
import Filter from "./Filter";

const CLASSES = ["mage", "tank", "warrior", "ranger", "support"];

const ClassFilter = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={CLASSES} />;
};

export default ClassFilter;

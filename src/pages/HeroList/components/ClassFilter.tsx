import React from "react";
import Filter from "./Filter";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const CLASSES = ["mage", "tank", "warrior", "ranger", "support"];

const ClassFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={CLASSES} />;
};

export default ClassFilter;

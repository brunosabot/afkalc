import React from "react";
import classes from "../../../../data/heroClass.json";
import Filter from "./Filter";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const ClassFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return <Filter filter={filter} setFilter={setFilter} imagePath={imagePath} data={classes} />;
};

export default ClassFilter;

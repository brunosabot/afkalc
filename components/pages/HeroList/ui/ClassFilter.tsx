import React from "react";
import classes from "../../../../data/heroClass.json";
import FilterButtons from "./FilterButtons";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
}

const ClassFilter: React.FC<IProps> = ({ filter, setFilter, imagePath }) => {
  return (
    <FilterButtons filter={filter} setFilter={setFilter} imagePath={imagePath} data={classes} />
  );
};

export default ClassFilter;

import React from "react";
import ascension from "../../../../data/heroAscension.json";
import FilterButtons from "./FilterButtons";

interface IProps {
  filter: string[];
  setFilter: (value: string) => void;
  imagePath: string;
}

const AscendFilter: React.FC<IProps> = function AscendFilter({ filter, setFilter, imagePath }) {
  return (
    <FilterButtons filter={filter} setFilter={setFilter} imagePath={imagePath} data={ascension} />
  );
};

export default React.memo(AscendFilter);

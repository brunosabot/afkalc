import React from "react";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
  data: string[];
}

const Filter: React.FC<IProps> = ({ filter, setFilter, imagePath, data }) => {
  return (
    <div className="hero-list__filter-wrapper">
      {data.map((e) => {
        return (
          <button
            key={e}
            className={`hero-list__filter ${filter === e ? "hero-list__filter--active" : ""}`}
            type="button"
            onClick={() => {
              setFilter(filter === e ? "" : e);
            }}
          >
            <img alt={e} className="hero-list__filter-image" src={`/${imagePath}/${e}.png`} />
          </button>
        );
      })}
    </div>
  );
};

export default Filter;

import React from "react";

const Filter = ({ filter, setFilter, imagePath, data }) => {
  return (
    <div className="hero-list__filter-wrapper">
      {data.map((e) => {
        return (
          <button
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

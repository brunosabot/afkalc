import React from "react";

const MenuOverlay = ({ isActive, setIsActive }) => {
  return (
    <button
      className={`menu__overlay${isActive ? " menu__overlay--active" : ""}`}
      onClick={() => setIsActive(false)}
      type="button"
      aria-label="Menu close overlay"
    />
  );
};

export default MenuOverlay;

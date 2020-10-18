import React from "react";

const MenuContent = ({ isActive, setIsActive, children }) => {
  return (
    <div
      className={`menu__content${isActive ? " menu__content--active" : ""}`}
      onClick={() => setIsActive(false)}
      role="button"
      tabIndex="-1"
      onKeyPress={() => setIsActive(false)}
    >
      {children}
    </div>
  );
};

export default MenuContent;

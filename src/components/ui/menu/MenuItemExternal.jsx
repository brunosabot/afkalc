import React from "react";

const MenuItemExternal = ({ children, to, icon }) => {
  return (
    <a className="menu__link" href={to} target="__blank">
      <svg className="menu__link-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d={icon} />
      </svg>
      {children}
    </a>
  );
};

export default MenuItemExternal;

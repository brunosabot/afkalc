import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  to: string;
  icon?: string;
}

const MenuItem: React.FC<IProps> = ({ children, to, icon = null }) => {
  return (
    <Link className="menu__link" to={to}>
      {icon !== null ? null : (
        <svg className="menu__link-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10,17L15,12L10,7V17Z" />
        </svg>
      )}
      {children}
    </Link>
  );
};

export default MenuItem;

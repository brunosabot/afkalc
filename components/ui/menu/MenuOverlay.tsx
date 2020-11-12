import React from "react";

interface IProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

const MenuOverlay: React.FC<IProps> = ({ isActive, setIsActive }) => {
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

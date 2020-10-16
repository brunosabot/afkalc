import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div
        className={`menu__overlay${isActive ? " menu__overlay--active" : ""}`}
        onClick={() => setIsActive(false)}
        role="button"
        tabIndex="-1"
        aria-label="Menu close overlay"
        onKeyPress={() => setIsActive(false)}
      />

      <svg className="menu__button" viewBox="0 0 24 24" onClick={() => setIsActive(true)}>
        <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>

      <nav
        className={`menu__content${isActive ? " menu__content--active" : ""}`}
        onClick={() => setIsActive(false)}
      >
        <Link className="menu__link" to="/">
          <svg className="menu__link-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,17L15,12L10,7V17Z" />
          </svg>
          Home
        </Link>
        <Link className="menu__link" to="/signature-item">
          <svg className="menu__link-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,17L15,12L10,7V17Z" />
          </svg>
          SI Emblem
        </Link>
        <Link className="menu__link" to="/elite-summon">
          <svg className="menu__link-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,17L15,12L10,7V17Z" />
          </svg>
          Elite summon
        </Link>
        <Link className="menu__link" to="/loot">
          <svg className="menu__link-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,17L15,12L10,7V17Z" />
          </svg>
          Loot
        </Link>
        <Link className="menu__link" to="/hero-list">
          <svg className="menu__link-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,17L15,12L10,7V17Z" />
          </svg>
          Hero List (Beta)
        </Link>
      </nav>
    </>
  );
};

export default Menu;

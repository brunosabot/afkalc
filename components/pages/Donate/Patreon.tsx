import React from "react";
import svgPatreon from "../../svg/patreon";
import Svg from "../../svg/Svg";
import classes from "./Patreon.module.css";

interface IPatreonProps {
  [key: string]: never;
}

const Patreon: React.FC<IPatreonProps> = function Patreon() {
  return (
    <div>
      <a
        href="https://www.patreon.com/bePatron?u=51828187"
        title="Become a patron"
        className={classes.Pateron}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Svg d={svgPatreon} />
        Become a patron
      </a>
    </div>
  );
};

export default Patreon;

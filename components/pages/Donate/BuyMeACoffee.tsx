import React from "react";
import svgBuyMeACoffee from "../../svg/buymeacoffee";
import Svg from "../../svg/Svg";
import classes from "./BuyMeACoffee.module.css";

interface IBuyMeACoffeeProps {
  [key: string]: never;
}

const BuyMeACoffee: React.FC<IBuyMeACoffeeProps> = function BuyMeACoffee() {
  return (
    <div>
      <a
        href="https://www.buymeacoffee.com/afkalc"
        title="Buy me a coffee"
        className={classes.BuyMeACoffee}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Svg d={svgBuyMeACoffee} />
        Buy me a coffee
      </a>
    </div>
  );
};

export default BuyMeACoffee;

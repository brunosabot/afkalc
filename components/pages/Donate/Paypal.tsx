import React from "react";
import svgPaypal from "../../svg/paypal";
import Svg from "../../svg/Svg";
import classes from "./Paypal.module.css";

interface IPaypalProps {
  [key: string]: never;
}

const Paypal: React.FC<IPaypalProps> = function Paypal() {
  return (
    <div>
      <a
        href="https://paypal.me/BrunoSabot"
        target="_blank"
        className={classes.Paypal}
        rel="noreferrer"
      >
        <Svg d={svgPaypal} />
        Donate with PayPal
      </a>
    </div>
  );
};

export default Paypal;

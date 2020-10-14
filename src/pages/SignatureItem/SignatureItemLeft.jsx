import React from "react";
import Card from "../../components/Card";

const SignatureItemLeft = ({ step, primoridial, amplifying, faction, celest }) => {
  if (primoridial === 0 && amplifying === 0 && faction === 0 && celest === 0) {
    return null;
  }

  return (
    <Card>
      <div className="emblem-count__block">
        <div className="emblem-count__title">SI + {step}</div>
        {primoridial > 0 ? (
          <div className="emblem-count__wrapper">
            {primoridial}
            <img src="/PrimEmb.jpg" className="emblem" alt="Primoridial emblem" />
          </div>
        ) : null}
        {amplifying > 0 ? (
          <div className="emblem-count__wrapper">
            {amplifying}
            <img src="/ApmEmblem.jpg" className="emblem" alt="Amplifying emblem" />
          </div>
        ) : null}
        {faction > 0 ? (
          <div className="emblem-count__wrapper">
            {faction}
            <img src="/GbEmblem.jpg" className="emblem" alt="Faction emblem" />
          </div>
        ) : null}
        {celest > 0 ? (
          <div className="emblem-count__wrapper">
            {celest}
            <img src="/CeleEmb.jpg" className="emblem" alt="Celest/Hypogean emblem" />
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default SignatureItemLeft;

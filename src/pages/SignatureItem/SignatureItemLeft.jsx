import React from "react";

const SignatureItemLeft = ({ step, primoridal, amplifying, faction, celest }) => {
  if (primoridal === 0 && amplifying === 0 && faction === 0 && celest === 0) {
    return null;
  }

  return (
    <div className="emblem-count__block">
      <div className="emblem-count__title">SI + {step}</div>
      {primoridal > 0 ? (
        <div className="emblem-count__wrapper">
          {primoridal}
          <img src="/PrimEmb.jpg" className="emblem" />
        </div>
      ) : null}
      {amplifying > 0 ? (
        <div className="emblem-count__wrapper">
          {amplifying}
          <img src="/ApmEmblem.jpg" className="emblem" />
        </div>
      ) : null}
      {faction > 0 ? (
        <div className="emblem-count__wrapper">
          {faction}
          <img src="/GbEmblem.jpg" className="emblem" />
        </div>
      ) : null}
      {celest > 0 ? (
        <div className="emblem-count__wrapper">
          {celest}
          <img src="/CeleEmb.jpg" className="emblem" />
        </div>
      ) : null}
    </div>
  );
};

export default SignatureItemLeft;

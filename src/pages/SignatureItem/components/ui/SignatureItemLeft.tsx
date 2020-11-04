import React from "react";
import Card from "../../../../components/ui/card/Card";
import EmblemChip from "./EmblemChip";

interface IProps {
  step: number;
  primordial: number;
  amplifying: number;
  faction: number;
  celest: number;
}

const SignatureItemLeft: React.FC<IProps> = ({ step, primordial, amplifying, faction, celest }) => {
  if (primordial === 0 && amplifying === 0 && faction === 0 && celest === 0) {
    return null;
  }

  return (
    <Card>
      <div className="emblem-count__block">
        <div className="emblem-count__title">{`SI +${step}`}</div>
        <EmblemChip count={primordial} image="/PrimEmb.jpg" name="Primordial emblem" />
        <EmblemChip count={amplifying} image="/ApmEmblem.jpg" name="Amplifying emblem" />
        <EmblemChip count={faction} image="/GbEmblem.jpg" name="Faction emblem" />
        <EmblemChip count={celest} image="/CeleEmb.jpg" name="Celest/Hypogean emblem" />
      </div>
    </Card>
  );
};

export default SignatureItemLeft;

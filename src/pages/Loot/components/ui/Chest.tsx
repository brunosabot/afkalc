import React from "react";
import { getDuration, getFrom } from "../../../../lib/time";
import ColWithImage from "../../../../components/ui/list/ColWithImage";

interface IChest {
  image: string;
  Content: string;
  CD: number;
}

interface IProps {
  pass: string;
  chest: IChest;
}

const Chest: React.FC<IProps> = ({ pass, chest }) => {
  const date = new Date(pass);
  const obtainedDate = new Date(date.getTime() + chest.CD * 1000);
  const isOK = obtainedDate <= new Date();

  const actions = (
    <>
      <div className="loot__duration">{getDuration(chest.CD)}</div>
      <div className="loot__remaining">{isOK ? "OK" : getFrom(date, chest.CD)}</div>
    </>
  );

  return (
    <ColWithImage key={chest.Content} image={chest.image} title={chest.Content} actions={actions} />
  );
};

export default Chest;

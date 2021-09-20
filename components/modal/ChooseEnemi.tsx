import React from "react";
import factions from "../../data/enemies.json";
import Enemi from "../ui/afk/Enemi";
import CharacterGrid from "../ui/CharacterGrid";
import FactionLine from "./components/ui/FactionLine";

interface Props {
  onSelect: (value: number) => void;
  current: number;
}

const ChooseEnemi: React.FC<Props> = ({ current, onSelect }) => (
  <>
    {factions.map((faction) => (
      <React.Fragment key={faction.faction}>
        <FactionLine name={faction.faction} />
        <CharacterGrid>
          {faction.characters.map(({ id, name, image }) => (
            <Enemi key={name} name={name} onClick={() => onSelect(id)} highlight={current === id} />
          ))}
        </CharacterGrid>
      </React.Fragment>
    ))}
  </>
);

export default ChooseEnemi;

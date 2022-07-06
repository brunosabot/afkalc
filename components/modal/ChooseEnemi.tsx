import React from "react";
import enemies from "../../data/enemies.json";
import heroes from "../../data/heroes.json";
import ICharacter from "../../types/ICharacter";
import Character from "../ui/afk/Character";
import Enemi from "../ui/afk/Enemi";
import CharacterGrid from "../ui/CharacterGrid";

interface Hero {
  type: "h" | "e";
  id: number;
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  artifact: number;
}

interface Props {
  onSelect: (value: Hero) => void;
  enemi: Hero;
}

interface IFactions {
  [key: string]: ICharacter[];
}

const factions: IFactions = (heroes as ICharacter[]).reduce(
  (acc, value) => ({
    ...acc,
    [value.faction]: [...acc[value.faction], value],
  }),
  {
    lightbearers: [],
    maulers: [],
    wilders: [],
    graveborns: [],
    celestials: [],
    hypogeans: [],
    dimensionals: [],
    none: [],
  }
);

const ChooseEnemi: React.FC<Props> = function ChooseEnemi({ enemi, onSelect }) {
  return (
    <>
      <CharacterGrid>
        {enemies.map((enemy) => (
          <Enemi
            key={enemy.id}
            id={enemy.id}
            onClick={() => onSelect({ ...enemi, id: enemy.id, type: "e" })}
            highlight={enemi.id === enemy.id && enemi.type === "e"}
            size="large"
          />
        ))}
      </CharacterGrid>
      {Object.keys(factions).map((faction) => (
        <CharacterGrid key={faction}>
          {factions[faction].map(({ id, name }) => (
            <Character
              size="large"
              key={id}
              name={name}
              id={id}
              onClick={() => onSelect({ ...enemi, id, type: "h" })}
              highlight={enemi.id === id && enemi.type === "h"}
            />
          ))}
        </CharacterGrid>
      ))}
    </>
  );
};

export default ChooseEnemi;

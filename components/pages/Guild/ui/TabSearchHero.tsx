import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useMemo, useState } from "react";
import GuildContext from "../../../providers/GuildContext";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Character from "../../../ui/afk/Character";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import SearchHero from "./SearchHero";
import SearchListItem from "./SearchListItem";

interface IProps {
  onSearch: (value: number) => void;
}

function filterHeroes(hero: number, si: number, fi: number, ascend: number, reverse: boolean) {
  return (box: IFirebaseProfile) => {
    const vAscend = box?.heroes?.[hero]?.ascend ?? -1;
    const vSi = box?.heroes?.[hero]?.si ?? 0;
    const vFi = box?.heroes?.[hero]?.fi ?? 0;

    const result = vAscend >= ascend && vSi >= si && vFi >= fi;

    return reverse ? !result : result;
  };
}

const TabSearchHero: React.FC<IProps> = ({ onSearch }) => {
  const { t } = useTranslation("guild");
  const { values } = useContext(GuildContext);
  const [heroes, setHeroes] = useState([
    { hero: 1, si: -1, fi: 0, ascend: 0, engrave: 0, reverse: false },
  ]);

  const foundBoxes = useMemo(() => {
    let { members } = values;

    heroes.forEach((h) => {
      members = members.filter(filterHeroes(h.hero, h.si, h.fi, h.ascend, h.reverse));
    });

    return members
      .sort((a, b) => a.playerName?.localeCompare(b.playerName ?? "") ?? 0)
      .map((box) => values.members.find((member) => member.id === box.id));
  }, [heroes, values]);

  useEffect(() => {
    onSearch(foundBoxes.length);
  }, [foundBoxes, onSearch]);

  return (
    <>
      <CardActions>
        <CardAction
          onClick={() =>
            setHeroes([
              ...heroes,
              { hero: 1, si: -1, fi: 0, ascend: 0, engrave: 0, reverse: false },
            ])
          }
        >
          {t("label-another-character")}
        </CardAction>
      </CardActions>

      {heroes.map((hero, i) => (
        <SearchHero
          key={hero.hero}
          index={i}
          hero={hero}
          onChange={(h) => {
            const newHeroes = [...heroes];
            if (h === null) {
              newHeroes.splice(i, 1);
            } else {
              newHeroes[i] = h;
            }
            setHeroes(newHeroes);
          }}
        />
      ))}

      {foundBoxes.map((member) => {
        if (member === undefined) return null;
        return (
          <SearchListItem
            member={member}
            key={member.id ?? ""}
            isOwner={values.guild.ownerId === member.id}
            isDeputy={(values.guild.deputies || []).includes(member.id ?? "")}
          >
            <Character
              id={heroes[0].hero}
              siLevel={member.heroes?.[heroes[0].hero]?.si}
              ascendLevel={member.heroes?.[heroes[0].hero]?.ascend}
              fiLevel={member.heroes?.[heroes[0].hero]?.fi}
              engraveLevel={member.heroes?.[heroes[0].hero]?.engrave}
              disabled={member.heroes?.[heroes[0].hero]?.ascend === undefined}
            />
          </SearchListItem>
        );
      })}
    </>
  );
};

export default TabSearchHero;

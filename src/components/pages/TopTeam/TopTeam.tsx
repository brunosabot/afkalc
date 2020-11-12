import React, { useCallback, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Card from "../../ui/card/Card";
import useDescription from "./components/hooks/useDescription";
import useTitle from "./components/hooks/useTitle";
import Board from "./components/ui/Board";
import EnemiPosition from "./components/ui/EnemiPosition";
import PlayerPosition from "./components/ui/PlayerPosition";
import ShareBanner from "./components/ui/ShareBanner";

interface Props {
  [key: string]: never;
}

const TopTeam: React.FC<Props> = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [t1, t2, t3, t4, t5, t6] = id
    .split("")
    .map((e) => decodeURIComponent(e))
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  const [team, setTeam] = useState({ 1: t1, 2: t2, 3: t3, 4: t4, 5: t5, 6: t6 });
  const onSelect = useCallback(
    (position) => (heroId: number) => {
      setTeam({
        ...team,
        [position]: heroId,
      });
    },
    [team]
  );
  const title = useTitle(team[6]);
  const description = useDescription(team[1], team[2], team[3], team[4], team[5]);

  return (
    <Card>
      <Helmet titleTemplate="%s - Afkalc">
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Board>
        <ShareBanner data={team} />
        <PlayerPosition onSelect={onSelect} position={1} hero={team[1]} />
        <PlayerPosition onSelect={onSelect} position={2} hero={team[2]} />
        <PlayerPosition onSelect={onSelect} position={3} hero={team[3]} />
        <PlayerPosition onSelect={onSelect} position={4} hero={team[4]} />
        <PlayerPosition onSelect={onSelect} position={5} hero={team[5]} />
        <EnemiPosition onSelect={onSelect} position={6} enemi={team[6]} />
      </Board>
    </Card>
  );
};

export default TopTeam;

import Head from "next/head";
import React, { useCallback, useState } from "react";
import useDescription from "../../components/pages/TopTeam/hooks/useDescription";
import useTitle from "../../components/pages/TopTeam/hooks/useTitle";
import Board from "../../components/pages/TopTeam/ui/Board";
import EnemiPosition from "../../components/pages/TopTeam/ui/EnemiPosition";
import PlayerPosition from "../../components/pages/TopTeam/ui/PlayerPosition";
import ShareBanner from "../../components/pages/TopTeam/ui/ShareBanner";
import Card from "../../components/ui/card/Card";

interface Props {
  [key: string]: never;
}

const TopTeam: React.FC<Props> = () => {
  const [team, setTeam] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const onSelect = useCallback(
    (position) => (heroId: number) => setTeam({ ...team, [position]: heroId }),
    [team]
  );

  const title = useTitle(team[6]);
  const description = useDescription(team[1], team[2], team[3], team[4], team[5]);

  return (
    <Card>
      <Head>
        <title>{`${title} - Afkalc`}</title>
        <meta name="description" content={description} />
      </Head>
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

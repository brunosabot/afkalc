import Head from "next/head";
import React, { useCallback, useState } from "react";
import useDescription from "../../components/pages/TopTeam/hooks/useDescription";
import useTitle from "../../components/pages/TopTeam/hooks/useTitle";
import Board from "../../components/pages/TopTeam/ui/Board";
import PlayerPosition from "../../components/pages/TopTeam/ui/PlayerPosition";
import ShareBanner from "../../components/pages/TopTeam/ui/ShareBanner";
import { DetailType } from "../../components/ui/afk/Character";
import Card from "../../components/ui/card/Card";

interface Props {
  [key: string]: never;
}

const TopTeam: React.FC<Props> = () => {
  const [team, setTeam] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [siList, setSiList] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [innList, setInnList] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [artifactList, setArtifactList] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

  const onSelect = useCallback(
    (type:DetailType, position:number) => (value: number) => {
      if (type === DetailType.HERO) setTeam({ ...team, [position]: value })
      if (type === DetailType.SI) setSiList({ ...siList, [position]: value })
      if (type === DetailType.INN) setInnList({ ...innList, [position]: value })
      if (type === DetailType.ARTIFACT) setArtifactList({ ...artifactList, [position]: value })
    },
    [artifactList, innList, siList, team]
  );

  const title = useTitle(team[6]);
  const description = useDescription(team, siList, innList, artifactList);

  return (
    <Card>
      <Head>
        <title>{`${title} - Afkalc`}</title>
        <meta name="description" content={description} />
      </Head>
      <Board>
        <ShareBanner team={team} si={siList} inn={innList} artifact={artifactList} />
        <PlayerPosition onSelect={onSelect} position={1} hero={team[1]} si={siList[1]} inn={innList[1]} artifact={artifactList[1]} />
        <PlayerPosition onSelect={onSelect} position={2} hero={team[2]} si={siList[2]} inn={innList[2]} artifact={artifactList[2]} />
        <PlayerPosition onSelect={onSelect} position={3} hero={team[3]} si={siList[3]} inn={innList[3]} artifact={artifactList[3]} />
        <PlayerPosition onSelect={onSelect} position={4} hero={team[4]} si={siList[4]} inn={innList[4]} artifact={artifactList[4]} />
        <PlayerPosition onSelect={onSelect} position={5} hero={team[5]} si={siList[5]} inn={innList[5]} artifact={artifactList[5]} />
      </Board>
    </Card>
  );
};

export default TopTeam;

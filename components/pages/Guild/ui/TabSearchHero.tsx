import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import Modal from "../../../functionnal/Modal";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import GuildContext from "../../../providers/GuildContext";
import IFirebaseHeroes from "../../../providers/types/IFirebaseHeroes";
import Character from "../../../ui/afk/Character";
import useHero from "../../TiersList/hooks/useHero";
import MemberListItem from "./MemberListItem";
import styles from "./TabSearchHero.module.css";

interface IProps {
  [key: string]: never;
}

function filterHeroes(hero: number, si: number, fi: number, ascend: number) {
  return (box: IFirebaseHeroes) => {
    const vAscend = box?.heroes?.[hero]?.ascend ?? -1;
    const vSi = box?.heroes?.[hero]?.si ?? 0;
    const vFi = box?.heroes?.[hero]?.fi ?? 0;
    return vAscend >= ascend && vSi >= si && vFi >= fi;
  };
}

function getAscendName(ascend: number) {
  return ascendLevels.find((level) => level.key === ascend)?.name;
}

const TabSearchHero: React.FC<IProps> = () => {
  const { values } = useContext(GuildContext);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [hero, setHero] = useState<number>(1);
  const [si, setSi] = useState<number>(0);
  const [fi, setFi] = useState<number>(0);
  const [ascend, setAscend] = useState<number>(0);
  const { getHero } = useHero();

  const searchString = [getHero(hero)?.name];
  if (ascend > 0) searchString.push(t(`common:ascension-${getAscendName(ascend)}`));
  if (si > 0) searchString.push(`${t("common:concept.si")} +${si}`);
  if (fi > 0) searchString.push(`${t("common:concept.fi")} ${fi}/9`);

  return (
    <>
      <div className={styles.SearchBox}>
        <Character
          id={hero}
          ascendLevel={ascend}
          siLevel={si}
          fiLevel={fi}
          onClick={() => setShowModal(true)}
        />
        {searchString.join(", ")}
      </div>

      {values.boxes
        .filter(filterHeroes(hero, si, fi, ascend))
        .map((box) => values.members.find((member) => member.id === box.id))
        .filter((member) => member)
        .map((member) => (
          <MemberListItem
            id={member?.id ?? ""}
            isOwner={values.guild.ownerId === member?.id}
            isDeputy={values.guild.deputies.includes(member?.id ?? "")}
          >
            {member?.playerName || t("label-player-unknown")}
          </MemberListItem>
        ))}

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChoosePriorityHero
          si={si}
          fi={fi}
          hero={hero}
          ascend={ascend}
          onSelect={(selectedHero) => {
            setHero(selectedHero.hero);
            setSi(selectedHero.si);
            setFi(selectedHero.fi);
            setAscend(selectedHero.ascend);
          }}
        />
      </Modal>
    </>
  );
};

export default TabSearchHero;

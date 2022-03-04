import { mdiCog } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useContext, useState } from "react";
import Modal from "../../../functionnal/Modal";
import GuildContext from "../../../providers/GuildContext";
import Card from "../../../ui/card/Card";
import CardTab from "../../../ui/card/CardTab";
import CardTabs from "../../../ui/card/CardTabs";
import CardTitle from "../../../ui/card/CardTitle";
import Chip from "../../../ui/Chip";
import Svg from "../../../ui/Svg";
import GuildParams from "./GuildParams";
import TabAbex from "./TabAbex";
import TabMemberList from "./TabMemberList";
import TabSearchHero from "./TabSearchHero";

interface IProps {
  [key: string]: never;
}

const View: React.FC<IProps> = function View() {
  const { t } = useTranslation("guild");
  const { values } = useContext(GuildContext);
  const [tab, setTab] = useState<number>(0);
  const [showParams, setShowParams] = useState<boolean>(false);
  const [search, setSearch] = useState<number>(0);

  return (
    <Card>
      <CardTitle action={<Svg onClick={() => setShowParams(!showParams)} d={mdiCog} />}>
        {values.guild.name}
      </CardTitle>
      <CardTabs>
        <CardTab active={tab === 0} onClick={() => setTab(0)}>
          {t("members")}
          {tab === 0 ? <Chip>{values.members.length}</Chip> : null}
        </CardTab>
        <CardTab active={tab === 1} onClick={() => setTab(1)}>
          {t("hero-search")}
          {tab === 1 ? <Chip>{search}</Chip> : null}
        </CardTab>
        <CardTab active={tab === 2} onClick={() => setTab(2)}>
          {t("abyssal-expedition")}
        </CardTab>
      </CardTabs>

      {tab === 0 ? <TabMemberList /> : null}
      {tab === 1 ? <TabSearchHero onSearch={setSearch} /> : null}
      {tab === 2 ? <TabAbex /> : null}

      <Modal
        active={showParams}
        onClose={() => {
          setShowParams(false);
        }}
      >
        <GuildParams />
      </Modal>
    </Card>
  );
};

export default View;

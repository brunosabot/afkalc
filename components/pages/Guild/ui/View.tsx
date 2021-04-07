import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import GuildContext from "../../../providers/GuildContext";
import Card from "../../../ui/card/Card";
import CardTab from "../../../ui/card/CardTab";
import CardTabs from "../../../ui/card/CardTabs";
import CardTitle from "../../../ui/card/CardTitle";
import TabMemberList from "./TabMemberList";
import TabSearchHero from "./TabSearchHero";

interface IProps {
  [key: string]: never;
}

const View: React.FC<IProps> = () => {
  const { t } = useTranslation("guild");
  const { values } = useContext(GuildContext);
  const [tab, setTab] = useState<number>(0);

  return (
    <Card>
      <CardTitle>{values.guild.name}</CardTitle>
      <CardTabs>
        <CardTab active={tab === 0} onClick={() => setTab(0)}>
          {t("members")}
        </CardTab>
        <CardTab active={tab === 1} onClick={() => setTab(1)}>
          {t("hero-search")}
        </CardTab>
      </CardTabs>

      {tab === 0 ? <TabMemberList /> : null}
      {tab === 1 ? <TabSearchHero /> : null}
    </Card>
  );
};

export default View;

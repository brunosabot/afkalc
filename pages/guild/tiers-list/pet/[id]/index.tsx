import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useFirestoreDocument from "../../../../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivate from "../../../../../components/layout/withLayoutPrivate";
import BackTiersList from "../../../../../components/pages/Guild/ui/BackTiersList";
import PetTiersList from "../../../../../components/pages/Guild/ui/PetTiersList";
import PetTiersListItem from "../../../../../components/pages/Guild/ui/PetTiersListItem";
import GuildContext from "../../../../../components/providers/GuildContext";
import IFirebasePetList from "../../../../../components/providers/types/IFirebasePetList";
import IFirebaseProfile from "../../../../../components/providers/types/IFirebaseProfile";
import Card from "../../../../../components/ui/card/Card";
import CardAction from "../../../../../components/ui/card/CardAction";
import CardActions from "../../../../../components/ui/card/CardActions";
import CardTitle from "../../../../../components/ui/card/CardTitle";
import pets from "../../../../../data/pets.json";
import { isValidSelf } from "../../../../../lib/petTiersList";
import IPet from "../../../../../types/IPet";

const typedPets: IPet[] = pets as IPet[];

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "guild", "priority-list"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

enum Sort {
  Name,
  LastUpdate,
  Percentage,
}

interface IProps {
  [key: string]: never;
}

const TiersList: React.FC<IProps> = function TiersList() {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { t: tC } = useTranslation("common");
  const { values: guildValues, actions: guildActions } = useContext(GuildContext);
  const { id } = router.query;

  const [sort, setSort] = useState(Sort.Name);
  const document = useFirestoreDocumentReference(`pet-list/${id}`);
  const result = useFirestoreDocument<IFirebasePetList>(document);

  useEffect(() => guildActions.load(), [guildActions]);

  if (
    document === undefined ||
    result.status !== "success" ||
    result.data === undefined ||
    result.data === null
  ) {
    return null;
  }

  if (result.data === undefined) return null;

  const list = result.data;

  const guildMembers = guildValues.members
    .map((member) => {
      let firstKo: number = 0;
      let totalKoCount = 0;

      list.steps.forEach((pet) => {
        const isPetValidSelf = isValidSelf(pet, member.pets?.[pet.pet]);

        if (isPetValidSelf === false) {
          totalKoCount += 1;

          if (firstKo === 0) {
            firstKo = pet.pet;
          }
        }
      });

      return {
        id: member.id,
        playerName: member.playerName,
        percentage: (100 * (list.steps.length - totalKoCount)) / list.steps.length,
        firstKoPet: tC(`petName.${typedPets.find((pet) => pet.id === `${firstKo}`)?.id ?? ""}`),
      };
    })
    .sort((playerA, playerB) => {
      if (sort === Sort.Percentage) {
        return playerA.percentage < playerB.percentage ? 1 : -1;
      }

      const playerNameA = playerA.playerName || "";
      const playerNameB = playerB.playerName || "";

      return playerNameA.localeCompare(playerNameB);
    });

  return (
    <>
      <Head>
        <title>{`${t("common:menu.pet-list")} - Afkalc`}</title>
        <meta name="description" content="" />
      </Head>

      <BackTiersList id={id as string} />

      <Card>
        <CardTitle>{result.data.title}</CardTitle>
        <div style={{ display: "flex", gap: "16px", padding: "16px", flexWrap: "wrap" }}>
          {result.data.steps.map((step) => {
            let totalOkCount = 0;
            const koPlayers: IFirebaseProfile[] = [];
            const okPlayers: IFirebaseProfile[] = [];

            guildValues.members.forEach((member) => {
              const isPetValidSelf = isValidSelf(step, member.pets?.[step.pet]);

              if (isPetValidSelf) {
                totalOkCount += 1;
                okPlayers.push(member);
              } else if (member.playerName) {
                koPlayers.push(member);
              }
            });

            return (
              <PetTiersList
                pet={step}
                percentage={(100 * totalOkCount) / guildValues.members.length}
                koPlayers={koPlayers}
                okPlayers={okPlayers}
              />
            );
          })}
        </div>
      </Card>

      <Card>
        <CardTitle>{guildValues.guild.name}</CardTitle>
        <CardActions>
          <CardAction onClick={() => setSort(Sort.Name)}>{t("sort-by-name")}</CardAction>
          <CardAction onClick={() => setSort(Sort.Percentage)}>
            {t("sort-by-percentage")}
          </CardAction>
        </CardActions>
        {guildMembers.map((member) => (
          <PetTiersListItem
            key={member.id}
            href={`/guild/tiers-list/pet/${id}/${member.id}`}
            name={member.playerName}
            percentage={member.percentage}
            petName={member.firstKoPet}
          />
        ))}
      </Card>
    </>
  );
};

export default withLayoutPrivate(TiersList);

import { mdiAccountPlus } from "@mdi/js";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useFirestoreDocument from "../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import GuildContext from "../../components/providers/GuildContext";
import ProfileContext from "../../components/providers/ProfileContext";
import IFirebaseGuild from "../../components/providers/types/IFirebaseGuild";
import IFirebaseProfile from "../../components/providers/types/IFirebaseProfile";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import InputField from "../../components/ui/InputField";
import ListItem from "../../components/ui/list/ListItem";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "guild"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

interface IProps {
  [key: string]: never;
}

const GuildId: React.FC<IProps> = function GuildId() {
  const [name, setName] = useState<string>("");
  const { t } = useTranslation("guild");
  const router = useRouter();
  const { actions, values } = useContext(GuildContext);
  const { actions: profileActions, values: profileValues } = useContext(ProfileContext);
  const { id } = router.query;

  const document = useFirestoreDocumentReference(id ? `guild/${id}` : undefined);
  const result = useFirestoreDocument<IFirebaseGuild>(document);
  const leaderDocument = useFirestoreDocumentReference(
    result.data?.ownerId ? `profile/${result.data.ownerId}` : undefined
  );
  const leaderResult = useFirestoreDocument<IFirebaseProfile>(leaderDocument);

  useEffect(() => actions.load());

  if (profileValues.playerName === "") {
    return (
      <Card>
        <CardTitle>{t("title-player-name")}</CardTitle>
        <InputField
          label={t("label-player-name")}
          name="name"
          onChange={(e) => setName(e)}
          value={name}
        />
        <CardActions>
          <CardAction
            onClick={() => {
              profileActions.setPlayerName(name);
              setName("");
            }}
          >
            {t("label-update")}
          </CardAction>
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <Head>
        <title>{`${t("common:menu.guild")} - Afkalc`}</title>
        <meta name="description" content={t("common:guild-desc")} />
      </Head>
      <Card>
        <CardTitle>{t("title-join-specific-guild", { name: result.data?.name })}</CardTitle>
        <div style={{ margin: "8px 0" }}>
          <ListItem actions={leaderResult.data?.playerName}>{t("label-guild-leader")}</ListItem>
          <ListItem actions={result.data?.members.length}>{t("label-member-count")}</ListItem>
        </div>
        {values.guild?.id ? null : (
          <CardActions>
            <CardAction
              icon={mdiAccountPlus}
              onClick={() => {
                actions.joinGuild(id as string);
                router.push("/guild");
              }}
            >
              {t("label-join-guild")}
            </CardAction>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default withLayoutPrivateColumn(GuildId);

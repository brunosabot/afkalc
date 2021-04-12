import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import Register from "../../components/pages/Guild/ui/Register";
import View from "../../components/pages/Guild/ui/View";
import GuildContext from "../../components/providers/GuildContext";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "guild"])),
  },
});
interface IProps {
  [key: string]: never;
}

const Guild: React.FC<IProps> = () => {
  const { t } = useTranslation("guild");
  const { actions, values } = useContext(GuildContext);

  useEffect(() => actions.load());

  return (
    <>
      <Head>
        <title>{`${t("common:menu.guild")} - Afkalc`}</title>
        <meta name="description" content={t("common:guild-desc")} />
      </Head>
      {values.guild?.id ? <View /> : <Register />}
    </>
  );
};

export default withLayoutPrivateColumn(Guild);

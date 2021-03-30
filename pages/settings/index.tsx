import { mdiAccountRemove, mdiCog, mdiDownload } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useCallback, useContext } from "react";
import ListItem from "../../components/pages/Credit/ui/ListItem";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import InputField from "../../components/ui/InputField";
import List from "../../components/ui/list/List";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "settings"])),
  },
});

interface IProps {
  [key: string]: never;
}

const Home: React.FC<IProps> = () => {
  const { t } = useTranslation("settings");
  const { values, actions } = useContext(ProfileContext);

  const deleteUser = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-remove")) === false) {
      actions.deleteUser();
    }
  }, [actions, t]);

  return (
    <>
      <Card>
        <CardTitle icon={mdiCog}>{t("common:menu.settings")}</CardTitle>
        <Head>
          <title>{`${t("common:menu.settings")} - Afkalc`}</title>
          <meta name="description" content={t("common:settings-desc")} />
        </Head>

        <InputField
          name="player-name"
          value={values.playerName}
          label={t("player-name")}
          onChange={actions.setPlayerName}
        />
      </Card>
      <Card>
        <CardTitle icon={mdiCog}>{t("user-data")}</CardTitle>
        <List>
          {values.userId ? (
            <>
              <ListItem>
                ID:&nbsp;
                {values.userId}
              </ListItem>
              <ListItem>{t("label-rgpd")}</ListItem>
            </>
          ) : (
            <ListItem>{t("label-no-need-rgpd")}</ListItem>
          )}
        </List>

        <CardActions>
          {values.userId ? (
            <>
              <CardAction onClick={actions.downloadData} icon={mdiDownload}>
                {t("label-download-data")}
              </CardAction>
              <CardAction onClick={deleteUser} icon={mdiAccountRemove}>
                {t("label-remove-account")}
              </CardAction>
            </>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
};

export default Home;

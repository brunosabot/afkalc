import { mdiAccountMultiplePlusOutline } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext } from "react";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import ProfileContext from "../../components/providers/ProfileContext";
import ChooseCharacter from "../../components/ui/afk/ChooseCharacter";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import styles from "./index.module.css";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "abex-roster"])),
  },
});
interface IProps {
  [key: string]: never;
}

const AbexRoster: React.FC<IProps> = function AbexRoster() {
  const { values: profileValues, actions: profileActions } = useContext(ProfileContext);

  const { t } = useTranslation("abex-roster");

  return (
    <Card>
      <CardTitle icon={mdiAccountMultiplePlusOutline}>{t("common:menu.abex-roster")}</CardTitle>
      <Head>
        <title>{`${t("common:menu.abex-roster")} - Afkalc`}</title>
        <meta name="description" content={t("abex-roster-desc") ?? ""} />
      </Head>

      <div className={styles.AbexBox}>
        {profileValues.abexBox.map((i, index) => (
          <ChooseCharacter
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            hero={i}
            si={profileValues.heroes[i]?.si}
            fi={profileValues.heroes[i]?.fi}
            engrave={profileValues.heroes[i]?.engrave}
            ascend={profileValues.heroes[i]?.ascend}
            onSelect={(hero) => {
              const newBox = [...profileValues.abexBox];
              newBox[index] = hero;
              profileActions.setAbexBox(newBox);
            }}
          />
        ))}
      </div>

      <CardActions>
        <CardAction onClick={() => profileActions.setAbexBox([...new Array(25)].map(() => 0))}>
          {t("label-clear-characters")}
        </CardAction>
        <CardAction onClick={() => profileActions.setAbexBox([...new Array(30)].map(() => 0))}>
          {t("label-clear-characters-star")}
        </CardAction>
      </CardActions>
    </Card>
  );
};

export default withLayoutPrivate(AbexRoster);

import { mdiAccountRemove, mdiCog, mdiDownload } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useContext } from "react";
import ListItem from "../../components/pages/Credit/ui/ListItem";
import firebase from "../../components/providers/firebase";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import Card from "../../components/ui/card/Card";
import CardAction from "../../components/ui/card/CardAction";
import CardActions from "../../components/ui/card/CardActions";
import CardTitle from "../../components/ui/card/CardTitle";
import List from "../../components/ui/list/List";

const firestore = firebase.firestore();

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
  const router = useRouter();
  const {
    values,
    actions: { reLogIn },
  } = useContext(FirebaseContext);

  const deleteUser = useCallback(() => {
    const uid = firebase.auth().currentUser?.uid;

    if (uid === undefined) return;
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-remove")) === false) return;

    reLogIn()
      .then(() =>
        Promise.all([
          firestore.collection("abex").doc(uid).delete(),
          firestore.collection("abyssal-expedition").doc(uid).delete(),
          firestore.collection("campaign").doc(uid).delete(),
          firestore.collection("fast-reward").doc(uid).delete(),
          firestore.collection("hero-list").doc(uid).delete(),
          firestore.collection("user").doc(uid).delete(),
          firestore.collection("heroes").doc(uid).delete(),
          firestore.collection("profile").doc(uid).delete(),
          firestore
            .collection("priority-list")
            .where("ownerId", "==", uid)
            .get()
            .then((snapshot) => {
              const deletePromises: Promise<void>[] = [];
              snapshot.forEach((doc) => {
                deletePromises.push(firestore.collection("priority-list").doc(doc.id).delete());
              });

              return Promise.all(deletePromises);
            }),
        ])
      )
      .then(() => {
        firebase.auth().currentUser?.delete();
      })
      .then(() => {
        router.push(`/`);
      });
  }, [reLogIn, router, t]);

  const downloadData = useCallback(async () => {
    const uid = firebase.auth().currentUser?.uid;

    if (uid === undefined) return;

    const promises = [
      firestore.collection("abex").doc(uid).get(),
      firestore.collection("abyssal-expedition").doc(uid).get(),
      firestore.collection("campaign").doc(uid).get(),
      firestore.collection("fast-reward").doc(uid).get(),
      firestore.collection("hero-list").doc(uid).get(),
      firestore.collection("user").doc(uid).get(),
      firestore.collection("heroes").doc(uid).get(),
      firestore.collection("profile").doc(uid).get(),
    ];

    const snapshot = await firestore.collection("priority-list").where("ownerId", "==", uid).get();

    snapshot.forEach((doc) => {
      promises.push(firestore.collection("priority-list").doc(doc.id).get());
    });

    const userDataList = await Promise.all(promises);
    const text = userDataList.map((userData) => userData.data()).filter((data) => data);

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(text))}`
    );
    element.setAttribute("download", "user-data.json");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }, []);

  return (
    <Card>
      <CardTitle icon={mdiCog}>{t("common:menu.settings")}</CardTitle>
      <Head>
        <title>{`${t("common:menu.settings")} - Afkalc`}</title>
        <meta name="description" content={t("common:settings-desc")} />
      </Head>

      <List>
        {values.uid ? (
          <>
            <ListItem>
              ID:&nbsp;
              {values.uid}
            </ListItem>
            <ListItem>{t("label-rgpd")}</ListItem>
          </>
        ) : (
          <ListItem>{t("label-no-need-rgpd")}</ListItem>
        )}
      </List>

      <CardActions>
        {values.uid ? (
          <>
            <CardAction onClick={downloadData} icon={mdiDownload}>
              {t("label-download-data")}
            </CardAction>
            <CardAction onClick={deleteUser} icon={mdiAccountRemove}>
              {t("label-remove-account")}
            </CardAction>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Home;

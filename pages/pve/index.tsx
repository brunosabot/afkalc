import { mdiRoadVariant } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext } from "react";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import CampaignForm from "../../components/pages/Pve/ui/CampaignForm";
import FactionForm from "../../components/pages/Pve/ui/FactionForm";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "pve"])),
  },
});

interface IProps {
  [key: string]: never;
}

const ElderTree: React.FC<IProps> = function ElderTree() {
  const { t } = useTranslation("pve");

  const {
    actions: {
      setPVECampaign,
      setPVEKingTower,
      setPVELightbearerTower,
      setPVEMaulerTower,
      setPVEWilderTower,
      setPVEGravebornTower,
      setPVECelestialTower,
      setPVEHypogeanTower,
      setPVECrystal,
      setPVECrystalMax,
    },
    values,
  } = useContext(ProfileContext);

  return (
    <Card>
      <Head>
        <title>{`${t("common:menu.pve")} - Afkalc`}</title>
      </Head>
      <CardTitle icon={mdiRoadVariant}>{t("common:menu.pve")}</CardTitle>
      <CampaignForm
        label={t("label-campaign")}
        value={values.pve.campaign}
        onChange={setPVECampaign}
        helper={t("label-campaign-helper")}
      />
      <FactionForm
        label={t("label-kings-tower")}
        value={values.pve.kingTower}
        faction="king"
        onChange={setPVEKingTower}
      />
      <FactionForm
        label={t("label-lightbearer-tower")}
        value={values.pve.lightbearerTower}
        faction="lightbearers"
        onChange={setPVELightbearerTower}
      />
      <FactionForm
        label={t("label-mauler-tower")}
        value={values.pve.maulerTower}
        faction="maulers"
        onChange={setPVEMaulerTower}
      />
      <FactionForm
        label={t("label-wilder-tower")}
        value={values.pve.wilderTower}
        faction="wilders"
        onChange={setPVEWilderTower}
      />
      <FactionForm
        label={t("label-graveborn-tower")}
        value={values.pve.gravebornTower}
        faction="graveborns"
        onChange={setPVEGravebornTower}
      />
      <FactionForm
        label={t("label-celestial-tower")}
        value={values.pve.celestialTower}
        faction="celestials"
        onChange={setPVECelestialTower}
      />
      <FactionForm
        label={t("label-hypogean-tower")}
        value={values.pve.hypogeanTower}
        faction="hypogeans"
        onChange={setPVEHypogeanTower}
      />
      <FactionForm
        label={t("label-crystal")}
        value={values.pve.crystal}
        faction="king"
        onChange={setPVECrystal}
      />
      <FactionForm
        label={t("label-crystal-max")}
        value={values.pve.crystalMax}
        faction="king"
        onChange={setPVECrystalMax}
      />
    </Card>
  );
};

export default withLayoutPrivateColumn(ElderTree);

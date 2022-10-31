import { mdiPaw } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext, useMemo, useState } from "react";
import Modal from "../../components/functionnal/Modal";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import EditPet, { SetLevelType } from "../../components/modal/EditPet";
import ProfileContext from "../../components/providers/ProfileContext";
import PetTooltip from "../../components/tooltip/PetTooltip";
import Pet from "../../components/ui/afk/Pet";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import PetGrid from "../../components/ui/PetGrid";
import petsJson from "../../data/pets.json";
import IPet from "../../types/IPet";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "hero-list"])),
  },
});

const typedPets: IPet[] = petsJson as IPet[];

interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = function HeroList() {
  const { actions, values } = useContext(ProfileContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  // router.push(`/hero-list/${values.userId}`);
  const { t } = useTranslation("hero-list");

  const [petToEdit, setPetToEdit] = useState("");
  const setLevel = (id: string, type: SetLevelType, value: number) => {
    if (type === "agilityBuff") actions.setPetAgilityBuff(id, value);
    if (type === "strengthBuff") actions.setPetStrengthBuff(id, value);
    if (type === "intelligenceBuff") actions.setPetIntelligenceBuff(id, value);
  };

  const petToEditValues = useMemo(
    () =>
      values.pets[petToEdit] ?? {
        id: petToEdit,
        agilityBuff: 0,
        strengthBuff: 0,
        intelligenceBuff: 0,
      },
    [petToEdit, values.pets]
  );

  return (
    <Card>
      <CardTitle icon={mdiPaw}>{t("common:menu.pet-list")}</CardTitle>

      <Head>
        <title>{`${t("common:menu.pet-list")} - Afkalc`}</title>
        <meta name="description" content="" />
      </Head>

      <PetGrid size="large">
        {typedPets.map((pet) => {
          const thePet = values.pets[pet.id] ?? {
            id: pet.id,
            strengthBuff: -1,
            intelligenceBuff: -1,
            agilityBuff: -1,
          };

          return (
            <Pet
              label={<PetTooltip pet={thePet} />}
              id={thePet.id}
              strengthBuff={thePet.strengthBuff}
              intelligenceBuff={thePet.intelligenceBuff}
              agilityBuff={thePet.agilityBuff}
              onClick={() => {
                setPetToEdit(thePet.id);
                setShowModal(true);
              }}
            />
          );
        })}
      </PetGrid>

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <EditPet pet={petToEditValues} setLevel={setLevel} />
      </Modal>
    </Card>
  );
};

export default withLayoutPrivate(HeroList);

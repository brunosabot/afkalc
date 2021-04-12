import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ProfileContext from "../../components/providers/ProfileContext";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "hero-list"])),
  },
});
interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = () => {
  const router = useRouter();
  const { values } = useContext(ProfileContext);

  if (process.browser) {
    if (values.userId) {
      router.push(`/hero-list/${values.userId}`);
    } else {
      router.push(`/`);
    }
  }

  return <div />;
};

export default HeroList;

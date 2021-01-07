import { useMemo } from "react";
import { useTranslation } from "../../../../i18n";
import useEnemi from "./useEnemi";

export default function useTitle(enemi: number) {
  const { t } = useTranslation("top-team");
  const { getEnemi } = useEnemi();

  return useMemo(() => {
    const enemiData = getEnemi(enemi);

    if (enemiData === undefined) {
      return t("common:menu.top-team");
    }

    return `${enemiData.name} - ${t("common:menu.top-team")}`;
  }, [enemi, getEnemi, t]);
}

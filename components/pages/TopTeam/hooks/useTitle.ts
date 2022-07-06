import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import useEnemi from "./useEnemi";
import useHero from "./useHero";

interface Hero {
  id: number;
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  artifact: number;
}

interface Enemy extends Hero {
  type: "h" | "e";
}

export default function useTitle(enemies: Enemy[]) {
  const { t } = useTranslation("top-team");
  const { getEnemi } = useEnemi();
  const { getHero } = useHero();

  return useMemo(() => {
    const enemyNames = enemies
      .filter((enemy) => enemy.id > 0)
      .map((enemy) => {
        if (enemy.type === "h") {
          return { ...enemy, ...getHero(t, enemy.id) };
        }
        return { ...enemy, ...getEnemi(t, enemy.id) };
      })
      .map((enemy) => enemy?.name);

    if (enemyNames.length === 0) {
      return t("common:menu.top-team");
    }

    return `${enemyNames.join(", ")} - ${t("common:menu.top-team")}`;
  }, [enemies, getEnemi, getHero, t]);
}

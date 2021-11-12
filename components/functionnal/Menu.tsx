import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import ProfileContext from "../providers/ProfileContext";
import MenuBurger from "../ui/menu/MenuBurger";
import MenuToolbar from "../ui/menu/MenuToolbar";
import MenuToolbarLink from "../ui/menu/MenuToolbarLink";

interface IProps {
  [key: string]: never;
}

const Menu: React.FC<IProps> = function Menu() {
  const { t } = useTranslation("common");
  const { values } = useContext(ProfileContext);

  return (
    <MenuToolbar>
      <MenuToolbarLink to="/" image="/loot/frame.png">
        <MenuBurger />
        {t("menu.home")}
      </MenuToolbarLink>

      <MenuToolbarLink to="/loot" image="/loot/small-h-gold.jpg">
        {t("menu.short-loot")}
      </MenuToolbarLink>
      <MenuToolbarLink to={`/hero-list/${values.userId}`} image="/heroes/belinda.jpg">
        {t("menu.short-hero-list")}
      </MenuToolbarLink>
      <MenuToolbarLink to="/top-team" image="/enemies/wrizz.jpg">
        {t("menu.short-top-team")}
      </MenuToolbarLink>
      <MenuToolbarLink to="/item-cost" image="/loot/diamond.jpg">
        {t("menu.short-item-cost")}
      </MenuToolbarLink>
    </MenuToolbar>
  );
};

export default Menu;

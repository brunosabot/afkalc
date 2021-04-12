import { mdiAccountRemove, mdiCrown, mdiOctagramOutline, mdiViewList } from "@mdi/js";
import Link from "next/link";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import GuildContext from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import Svg from "../../../ui/Svg";
import styles from "./MemberListItem.module.css";

interface IProps {
  children: string;
  id: string;
  isOwner: boolean;
  isDeputy: boolean;
}

const MemberListItem: React.FC<IProps> = ({ children, id, isOwner, isDeputy }) => {
  const { actions, values } = useContext(GuildContext);
  const { values: profileValues } = useContext(ProfileContext);
  const { t } = useTranslation("guild");

  const onRemove = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-kick"))) {
      actions.removeFromGuild(id);
    }
  }, [actions, id, t]);

  return (
    <div className={styles.MemberListItem}>
      <span className={styles.Name}>
        {children}
        {isOwner ? <Svg d={mdiCrown} /> : null}
        {isDeputy ? <Svg d={mdiOctagramOutline} /> : null}
      </span>
      {id !== profileValues.userId && values.guild.ownerId === profileValues.userId ? (
        <Svg d={mdiAccountRemove} onClick={onRemove} />
      ) : null}

      <Link href={`/hero-list/${id}`}>
        <a className={styles.Link} href={`/hero-list/${id}`}>
          <Svg d={mdiViewList} />
        </a>
      </Link>
    </div>
  );
};

export default MemberListItem;

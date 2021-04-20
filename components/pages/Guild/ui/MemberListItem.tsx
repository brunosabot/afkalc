import { mdiAccountRemove, mdiCrown, mdiNuke, mdiOctagramOutline, mdiViewList } from "@mdi/js";
import Link from "next/link";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import GuildContext from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Svg from "../../../ui/Svg";
import styles from "./MemberListItem.module.css";

interface IProps {
  isOwner: boolean;
  isDeputy: boolean;
  member: IFirebaseProfile;
}

const MemberListItem: React.FC<IProps> = ({ member, isOwner, isDeputy }) => {
  const { actions, values } = useContext(GuildContext);
  const { values: profileValues } = useContext(ProfileContext);
  const { t } = useTranslation("guild");

  const onRemove = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (member.id && window.confirm(t("confirm-kick"))) {
      actions.removeFromGuild(member.id);
    }
  }, [actions, member.id, t]);

  const onRemoveGuild = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (member.id && window.confirm(t("confirm-drop-guild"))) {
      actions.removeGuild(member.id);
    }
  }, [actions, member.id, t]);

  return (
    <div className={styles.MemberListItem}>
      <span className={styles.Content}>
        <span className={styles.Title}>
          {member.playerName || t("label-player-unknown")}
          {isOwner ? <Svg d={mdiCrown} /> : null}
          {isDeputy ? <Svg d={mdiOctagramOutline} /> : null}
        </span>
        {member.campaignLevel ? (
          <span className={styles.Subtitle}>{`${t("label-campaign")} ${
            member.campaignLevel
          }`}</span>
        ) : null}
      </span>

      <div className={styles.Actions}>
        {member.id !== profileValues.userId && values.guild.ownerId === profileValues.userId ? (
          <Svg d={mdiAccountRemove} onClick={onRemove} />
        ) : null}

        {member.id === values.guild.ownerId && values.guild.ownerId === profileValues.userId ? (
          <Svg d={mdiNuke} onClick={onRemoveGuild} />
        ) : null}

        <Link href={`/hero-list/${member.id}`}>
          <a className={styles.Link} href={`/hero-list/${member.id}`}>
            <Svg d={mdiViewList} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MemberListItem;

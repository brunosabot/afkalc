import { mdiAccountRemove, mdiCrown, mdiOctagramOutline, mdiViewList } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useCallback, useContext } from "react";
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
        {(values.isOwner || (values.isDeputy && isOwner === false && isDeputy === false)) &&
        member.id !== profileValues.userId ? (
          <Svg d={mdiAccountRemove} onClick={onRemove} />
        ) : null}

        <Link href={`/hero-list/${member.id}`}>
          <a className={styles.Link}>
            <Svg d={mdiViewList} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MemberListItem;

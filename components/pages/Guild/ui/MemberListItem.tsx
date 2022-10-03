import { mdiAccountRemove, mdiCrown, mdiOctagramOutline, mdiViewList } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useCallback, useContext, useMemo } from "react";
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

const MemberListItem: React.FC<IProps> = function MemberListItem({ member, isOwner, isDeputy }) {
  const { actions, values } = useContext(GuildContext);
  const { values: profileValues } = useContext(ProfileContext);
  const { t } = useTranslation("guild");

  const dateOffset = new Date(member.heroesLastUpdate ?? 0);
  dateOffset.setMonth(dateOffset.getMonth() + 1);

  const isOverloadDate = dateOffset < new Date();

  const lastUpdateAgo = useMemo(
    () =>
      member.heroesLastUpdate
        ? dayjs(new Date(member.heroesLastUpdate ?? 0)).fromNow()
        : t("label-never"),
    [member.heroesLastUpdate, t]
  );

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
          <span>{member.playerName || t("label-player-unknown")}</span>
          {isOwner ? <Svg d={mdiCrown} /> : null}
          {isDeputy ? <Svg d={mdiOctagramOutline} /> : null}

          {member.campaignLevel ? (
            <span className={styles.Campaign}>
              {t("label-campaign")} {member.campaignLevel}
            </span>
          ) : null}
        </span>

        <span className={`${styles.Subtitle} ${isOverloadDate ? styles.Overload : ""}`}>
          {lastUpdateAgo}
        </span>
      </span>

      <div className={styles.Actions}>
        {(values.isOwner || (values.isDeputy && isOwner === false && isDeputy === false)) &&
        member.id !== profileValues.userId ? (
          <Svg d={mdiAccountRemove} onClick={onRemove} />
        ) : null}

        <Link href={`/public/${member.id}`}>
          <a className={styles.Link}>
            <Svg d={mdiViewList} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MemberListItem;

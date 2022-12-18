import { mdiCrown, mdiOctagramOutline, mdiViewList } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Svg from "../../../ui/Svg";
import styles from "./SearchListItem.module.css";

interface IProps {
  children?: React.ReactNode;
  isOwner: boolean;
  isDeputy: boolean;
  member: IFirebaseProfile;
}

const SearchListItem: React.FC<IProps> = function SearchListItem({
  children,
  member,
  isOwner,
  isDeputy,
}) {
  const { t } = useTranslation("guild");

  return (
    <div className={styles.SearchListItem}>
      {children}
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
        <Link href={`/hero-list/${member.id}`} className={styles.Link}>
          <Svg d={mdiViewList} />
        </Link>
      </div>
    </div>
  );
};

export default SearchListItem;

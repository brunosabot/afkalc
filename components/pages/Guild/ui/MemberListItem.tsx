import { mdiAccountRemove, mdiCrown, mdiOctagramOutline, mdiViewList } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import Image from "next/image";
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
  showTree: boolean;
  showTower: boolean;
  member: IFirebaseProfile;
}

const MemberListItem: React.FC<IProps> = function MemberListItem({
  member,
  isOwner,
  isDeputy,
  showTree,
  showTower,
}) {
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
    if (member.id && window.confirm(t("confirm-kick") ?? "")) {
      actions.removeFromGuild(member.id);
    }
  }, [actions, member.id, t]);

  return (
    <div className={styles.MemberListItem}>
      <div className={styles.ContentWrapper}>
        <span className={styles.Content}>
          <span className={styles.Title}>
            <span>{member.playerName || t("label-player-unknown")}</span>
            {isOwner ? <Svg d={mdiCrown} /> : null}
            {isDeputy ? <Svg d={mdiOctagramOutline} /> : null}
            {member.pve?.campaign ? (
              <span className={styles.Campaign}>
                - {t("label-stage")} {member.pve?.campaign}
              </span>
            ) : null}
            {member.pve?.crystal && member.pve?.crystalMax ? (
              <span className={styles.Campaign}>
                - {t("label-level")} {member.pve?.crystal}/{member.pve?.crystalMax}
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

          <Link href={`/public/${member.id}`} className={styles.Link}>
            <Svg d={mdiViewList} />
          </Link>
        </div>
      </div>
      {showTree ? (
        <div className={styles.TreeWrapper}>
          <div className={styles.TreeItem}>
            <Image
              src="/elder-tree/tree-level.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />
            {member.elderTree?.main ?? 0}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/elder-tree/duras-might.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.elderTree?.warrior ?? 0}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/elder-tree/duras-fortitude.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.elderTree?.tank ?? 0}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/elder-tree/duras-celerity.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.elderTree?.ranger ?? 0}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/elder-tree/duras-sorcery.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.elderTree?.mage ?? 0}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/elder-tree/duras-sustenance.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.elderTree?.support ?? 0}
          </div>
        </div>
      ) : null}

      {showTower ? (
        <div className={styles.TreeWrapper}>
          <div className={styles.TreeItem}>
            <span className={styles.Image}>👑</span> {member.pve?.kingTower ?? 1}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/factions/lightbearers.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.pve?.lightbearerTower ?? 1}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/factions/maulers.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.pve?.maulerTower ?? 1}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/factions/wilders.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.pve?.wilderTower ?? 1}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/factions/graveborns.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.pve?.gravebornTower ?? 1}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/factions/celestials.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.pve?.celestialTower ?? 1}
          </div>
          <div className={styles.TreeItem}>
            <Image
              src="/factions/hypogeans.png"
              className={styles.Image}
              alt=""
              height={20}
              width={20}
            />{" "}
            {member.pve?.hypogeanTower ?? 1}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MemberListItem;

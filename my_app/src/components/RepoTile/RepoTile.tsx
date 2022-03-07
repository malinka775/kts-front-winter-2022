import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

import styles from "./RepoTile.module.scss";

type RepoTileProps = {
  RepoItem: RepoItem;
};

const getFormatedDate: (dateStr: string) => string = (dateStr) => {
  const date: Date = new Date(dateStr);
  const days = date.getDate();
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
  };
  return `${days} ${date.toLocaleString("en-US", options)}`;
};

const RepoTile: React.FC<RepoTileProps> = ({ RepoItem }) => {
  const navigation = useNavigate();
  return (
    <div
      className={styles.repo}
      onClick={(e) =>
        navigation(`/repos/${RepoItem.name}`, {
          state: { selectedRepo: RepoItem },
        })
      }
    >
      <Avatar
        src={RepoItem.owner.avatar_url}
        letter={RepoItem.owner.login[0].toUpperCase()}
      />
      <div className={styles.repo__info}>
        <div className={styles.repo__info__title}> {RepoItem.name}</div>
        <span className={styles.repo__info__authorLink}>
          {RepoItem.owner.login}
        </span>
        <div className={styles.repo__otherInfo}>
          <div className={styles.repo__stars}>
            <StarIcon currentColor={"var(--color-star-icon)"} />
            <span className={styles.repo__stars__number}>
              {RepoItem.stargazers_count}
            </span>
          </div>
          <div className={styles.repo__otherInfo__updates}>
            Updated {getFormatedDate(RepoItem.updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);

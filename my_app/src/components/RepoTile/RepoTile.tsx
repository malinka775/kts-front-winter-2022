import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItemModel } from "@store/models/gitHub";
import { useNavigate } from "react-router-dom";

import styles from "./RepoTile.module.scss";

type RepoTileProps = {
  repo: RepoItemModel;
};

const RepoTile: React.FC<RepoTileProps> = ({ repo }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.repo} onClick={(e) => navigate(`${repo.name}`)}>
      <Avatar src={repo.owner.avatarUrl} letter={repo.owner.firstLetter} />
      <div className={styles.repo__info}>
        <div className={styles.repo__info__title}> {repo.name}</div>
        <span className={styles.repo__info__authorLink}>
          {repo.owner.login}
        </span>
        <div className={styles.repo__otherInfo}>
          <div className={styles.repo__stars}>
            <StarIcon currentColor={"var(--color-star-icon)"} />
            <span className={styles.repo__stars__number}>
              {repo.stargazersCount}
            </span>
          </div>
          <div className={styles.repo__otherInfo__updates}>
            Updated {repo.updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);

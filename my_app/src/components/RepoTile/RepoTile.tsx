import React from "react";
import "./RepoTile.css";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItem } from "src/store/GitHubStore/types";

type RepoTileProps = {
  RepoItem: RepoItem;
  onClick: (e: React.MouseEvent) => void;
};

type DateTimeFormatOptions = {
  localeMatcher?: "lookup" | "best fit";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
  formatMatcher?: "basic" | "best fit";
  hour12?: boolean;
  timeZone?: string;
};

const getFormatedDate: (dateStr: string) => string = (dateStr) => {
  const date = new Date(dateStr);
  const days = date.getDate();
  const options: DateTimeFormatOptions = {
    month: "short",
  };
  return `${days} ${date.toLocaleString("en-US", options)}`;
};

const RepoTile: React.FC<RepoTileProps> = ({ RepoItem, onClick }) => {
  return (
    <div className="repo" onClick={onClick}>
      <Avatar
        src={RepoItem.owner.avatar_url}
        letter={RepoItem.owner.login[0].toUpperCase()}
      />
      <div className="repo__info">
        <div className="repo__info__title">{RepoItem.name}</div>
        <a className="repo__info__author-link">{RepoItem.owner.login}</a>
        <div className="repo__other-info">
          <div className="repo__stars">
            <StarIcon currentColor={"var(--color-star-icon)"} />
            <span className="repo__stars__number">
              {RepoItem.stargazers_count}
            </span>
          </div>
          <div className="repo__other-info__updates">
            Updated {getFormatedDate(RepoItem.updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);

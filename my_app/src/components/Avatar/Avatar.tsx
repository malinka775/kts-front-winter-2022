import React from "react";

import "./Avatar.css";

type AvatarProps = {
  src?: string;
  alt?: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  return (
    <div className="repo__avatar">
      {src ? (
        <img className="repo__avatar__img" src={src} alt={alt} />
      ) : (
        <span className={"repo__avatar__letter"}>{letter}</span>
      )}
    </div>
  );
};

export default React.memo(Avatar);

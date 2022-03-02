import React from "react";

import "./Avatar.css";

type AvatarProps = {
  src?: string;
  alt?: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  return (
    <div className="avatar">
      {src ? (
        <img className="avatar__img" src={src} alt={alt} />
      ) : (
        <span className={"avatar__letter"}>{letter}</span>
      )}
    </div>
  );
};

export default React.memo(Avatar);

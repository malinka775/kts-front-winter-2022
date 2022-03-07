import React from "react";

import styles from "./Avatar.module.scss";

type AvatarProps = {
  src?: string;
  alt?: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  return (
    <div className={styles.avatar}>
      {src ? (
        <img className={styles.avatar__img} src={src} alt={alt} />
      ) : (
        <span className={styles.avatar__letter}>{letter}</span>
      )}
    </div>
  );
};

export default React.memo(Avatar);

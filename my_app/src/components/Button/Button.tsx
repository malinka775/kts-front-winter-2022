import React from "react";

import styles from "./Button.module.scss";

type ButtonProps = React.PropsWithChildren<{
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}>;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default React.memo(Button);

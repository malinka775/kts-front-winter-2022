import React from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default React.memo(Button);

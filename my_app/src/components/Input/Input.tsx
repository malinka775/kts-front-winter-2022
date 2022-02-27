import React from "react";

import styles from "./Input.module.scss";

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  disabled,
  onChange,
}) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default React.memo(Input);

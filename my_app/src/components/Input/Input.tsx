import React from "react";

import "./Input.css";

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
      className="searchbar__input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default React.memo(Input);

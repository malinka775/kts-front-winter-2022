import React from "react";

import "./Button.css";

type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default React.memo(Button);

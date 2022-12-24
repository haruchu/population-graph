import { useState } from "react";

export type CheckboxProps = {
  text: string;
  onChange: (isChecked: boolean) => void;
};

export const Checkbox = ({ text, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <button
      className={isChecked ? "checkbox checked" : "checkbox not-checked"}
      onClick={() => {
        setIsChecked(!isChecked);
        onChange(isChecked);
      }}
    >
      <span>{text}</span>
    </button>
  );
};

import React from "react";
import { FaCheck } from "react-icons/fa";

type CheckboxProps = {
  disabled?: boolean;
  defaultChecked?: boolean;
  id?: string | number;
  label?: string;
  checked?: boolean;
  onChangeHandler?: (checked: boolean) => void;
};

const Checkbox = ({
  disabled = false,
  defaultChecked = false,
  id,
  label,
  onChangeHandler,
  checked,

}: CheckboxProps) => {
  const generatedId = String(id || label || "checkbox");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onChangeHandler?.(isChecked);
  };

  return (
    <div className="flex items-center ">
      {/* Hidden Native Input */}
      <input
        type="checkbox"
        id={generatedId}
        className="absolute opacity-0"
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={changeHandler}
        checked={checked}
        aria-checked={checked}
      />

      {/* Custom Checkbox UI */}
      <label
        htmlFor={generatedId}
        className={`
          w-8 h-8
          border-2 border-violet-500
          rounded
          flex items-center justify-center
          transition-all duration-200
          ${checked ? 'bg-violet-500 border-transparent' : 'bg-white'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus-within:ring-2 focus-within:ring-violet-300
        `}
        tabIndex={disabled ? -1 : 0} // Make label focusable only when enabled
        role="checkbox"
        aria-checked={checked}
      >
        {checked && <FaCheck className="text-yellow-300" size={20} />}
      </label>

      {/* Optional Label Text */}
      {label && (
        <label htmlFor={generatedId} className="ml-2 cursor-pointer font-semibold text-white">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
"use client"
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

type CheckboxProps = {
  disabled?: boolean;
  defaultChecked?: boolean;
  id?: string | number;
  label?: string | number;
  onChangeHandler:(isChecked:boolean)=>void
};

const Checkbox = ({
  disabled = false,
  defaultChecked = false,
  id,
  label,
  onChangeHandler
}: CheckboxProps) => {
  const generatedId = String(id || label || "checkbox");
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChangeHandler(isChecked)
  };

  // Optional: for debugging
  useEffect(() => {
    console.log("Checked:", checked);
  }, [checked]);

  return (
    <div className="flex items-center">
      {/* Container for checkbox */}
      <div className="relative h-8 w-8 flex items-center justify-center">
        {/* Hidden Native Input */}
        <input
          type="checkbox"
          id={generatedId}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={checked}
        />

        {/* Custom Checkbox UI */}
        <div
          className={`
            h-full w-full
            border-2 border-violet-500
            rounded
            flex items-center justify-center
            transition-all duration-200
            ${checked ? 'bg-violet-500 border-transparent' : 'bg-white'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          aria-hidden="true"
        >
          {checked && <FaCheck className="text-yellow-300" size={20} />}
        </div>
      </div>

      {/* Optional Label Text */}
      {label && (
        <label 
          htmlFor={generatedId} 
          className="ml-2 cursor-pointer font-semibold text-white select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
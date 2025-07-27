"use client"
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

type CheckboxProps = {
  disabled?: boolean;
  defaultChecked?: boolean;
  id?: string | number;
  label?: string | number;
  isChecked?: boolean 
  onChangeHandler: (isChecked: boolean) => void
};

const Checkbox = ({
  disabled = false,
  defaultChecked = false,
  id,
  label,
  isChecked,
  onChangeHandler
}: CheckboxProps) => {
  const generatedId = String(id || label || "checkbox");
  
  // Only use local state if isChecked prop is not provided (uncontrolled component)
  const [localChecked, setLocalChecked] = useState(defaultChecked);
  
  // Determine which checked state to use
  const checked = isChecked !== undefined ? isChecked : localChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    // If controlled component (isChecked provided), only call onChangeHandler
    if (isChecked !== undefined) {
      onChangeHandler(newChecked);
    } else {
      // If uncontrolled component, update local state and call onChangeHandler
      setLocalChecked(newChecked);
      onChangeHandler(newChecked);
    }
  };

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
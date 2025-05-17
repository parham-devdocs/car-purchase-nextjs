"use client";
import React, { useState } from 'react';

interface InputProps {
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', placeholder = '', required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative w-full max-w-md">
      {/* Label with floating effect */}
      <label
        htmlFor={id}
        className={`absolute left-4 px-1 transition-all duration-200 pointer-events-none bg-white text-violet-500
          ${isFocused || value
            ? ' top-[3px] text-xs '
            : 'top-[14px] text-base '
          }
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input with inner violet border on focus */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        className={`
          w-full border-2 border-blue-300 rounded-md px-4 py-4 outline-none
          focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors relative z-10
        `}
      />

      {/* Inner violet border (only visible on focus) */}
      {isFocused && (
        <div className="absolute top-0 left-0 h-full w-2 bg-violet-400 rounded-l-md z-0"></div>
      )}
    </div>
  );
};

export default Input;
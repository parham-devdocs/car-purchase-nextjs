"use client";
import React, { InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  color?:string
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', placeholder = '',color, required = false,...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
const valueHandler=(e)=>{
setValue(e.target.value)


}
  return (
    <div className="relative w-full border-2 border-violet-500 rounded-md px-4 py-2">
      {/* Label with floating effect */}
      <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none top-1  text-[14px] ${color ? `text-${color}` : 'text-violet-500'} `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => {valueHandler(e)}}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        className={`
           outline-none w-5/6
          ${`focus:border-${color || 'blue-600'}`} transition-colors relative z-10 outline-0 mt-3
        `}
        {...props}
      />

      {/* Inner violet border (only visible on focus) */}
      {isFocused && (
        <div className={`absolute top-0 left-0 h-full w-2 ${color ? `bg-${color}` : 'bg-violet-500'} rounded-l-md z-0`}></div>
      )}
    </div>
  );
};

export default Input;
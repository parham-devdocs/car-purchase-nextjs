 "use client";
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';

interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;

  }

interface InputProps  {
  label: string;
  id?: string;
  required?: boolean;
  color?:string;
  options:Option[]
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;

}

const SelectInput: React.FC<InputProps > = ({ label,onChange,options, id,color, required = false,...props }) => {
  const [isFocused, setIsFocused] = useState(false);
 
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(()=>false);

  return (
    <div className="relative w-full border-2 border-blue-300 rounded-md pl-2 py-2 cursor-pointer">
      {/* Label with floating effect */}
      <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none top-1  text-[14px] ${color ? `text-${color}` : 'text-violet-500'} `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        id={id}
        name={label}
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        required={required}
        className={`
           outline-none
           w-full 
          ${`focus:border-${color || 'blue-600'}`}  transition-colors relative z-10 outline-none mt-3 cursor-pointer
        `}
        {...props}
      >
        {options.map(option=>{
            return <option key={option.label} value={option.value} label={option.label} disabled={option.disabled} className=' py-2 cursor-pointer bg-white dark:text-white dark:bg-gray-800 text-violet-500  hover:bg-violet-500 hover:text-violet-500 '/>
        })}
      </select>

      {/* Inner violet border (only visible on focus) */}
      {isFocused && (
        <div className={`absolute top-0 left-0 h-full w-2 ${color ? `bg-${color}` : 'bg-violet-500'} rounded-l-md z-0`}></div>
      )}
    </div>
  );
};

export default SelectInput;
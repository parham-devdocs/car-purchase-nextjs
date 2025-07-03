"use client";
import React, { useState, forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller, useForm, FieldValues } from "react-hook-form";

interface InputProps {
  id?: string;
  color?: string;
  onChangeHandler?: (value: string) => void;
}

// Define props + forwarded ref type
type PhoneNumberInputProps = InputProps & {
  control: any; // better would be Control<FieldValues>
};

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  ({ id, color, onChangeHandler, control,...props }, forwardedRef) => {

    return (
      <div className="relative w-full h-full text-violet-500 dark:text-violet-500 border-2 rounded-sm outline-0">
        <label
          htmlFor={id}
          className={`absolute left-2 transition-colors duration-200  px-1 pointer-events-none top-1 text-[14px] ${
            color ? `text-${color}` : "text-violet-500"
          }`}
        >
          Phone Number
        </label>

        <Controller
          control={control}
          name="phone"
          rules={{ required: true }}
          render={({ field }) => {
            const { ref: rhfRef, ...rest } = field;

            const mergedRef = (node: HTMLInputElement | null) => {
              rhfRef?.(node); // Let react-hook-form manage its own ref

              // Forward the ref to parent
              if (typeof forwardedRef === "function") {
                forwardedRef(node);
              } else if (forwardedRef) {
                forwardedRef.current = node;
              }
            };

            return (
              <PhoneInput
              
                {...rest}
                inputProps={{
                  ref: mergedRef,
                }}
                {...props}
                country="US"
              
                onChange={(value) => {
                  field.onChange(value);
                  if (onChangeHandler) onChangeHandler(value);
                  console.log({...props})
                }}
                containerClass="w-full max-w-md mx-auto mt-4 "
                inputClass="w-full h-16 px-5 py-3 pl-16 border-0 rounded-lg shadow-sm focus:outline-none text-base"
                buttonClass="bg-gray-100 border-0 focus:outline-none"
                dropdownClass="absolute top-full left-0 z-20 mt-1 w-64 bg-white border border-gray-300 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                searchClass="w-full px-4 py-2 focus:outline-none"
              />
            );
          }}
        />

     
      </div>
    );
  }
);

export default PhoneNumberInput;
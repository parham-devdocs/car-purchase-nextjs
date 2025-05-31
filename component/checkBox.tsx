import { ChangeEvent, useState } from "react";
import { FaCheck } from "react-icons/fa";

export interface CheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  id?: string;
  label?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(!!props.defaultChecked);
  const id = props.id || props.label || "checkbox";

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    props.onChangeHandler(event);
  };

  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        id={id}
        className="absolute appearance-none opacity-0 w-6 h-6 cursor-pointer"
        defaultChecked={props.defaultChecked}
        disabled={props.disabled}
        onChange={changeHandler}
      />

      {/* Custom checkbox box */}
      <div
        className={`
          w-6 h-6
          border-2 border-violet-500
          rounded
          flex items-center justify-center
          cursor-pointer
          transition-all duration-200
          ${isChecked ? 'bg-violet-500 border-transparent' : 'bg-white'}
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          focus:ring-2 focus:ring-violet-300
        `}
        onClick={() => {
          if (!props.disabled) {
            const newChecked = !isChecked;
            setIsChecked(newChecked);
            // Create synthetic event to pass to onChangeHandler
            const fakeEvent = {
              target: {
                checked: newChecked,
                value: '', // adjust if needed
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            props.onChangeHandler(fakeEvent);
          }
        }}
      >
        {/* Check icon */}
        {isChecked && <FaCheck className="text-white text-sm" />}
      </div>
    </div>
  );
};

export default Checkbox;
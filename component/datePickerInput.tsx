import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Date_Picker = ({label,required,id,color,onChangeHandler}:{label:string,required:boolean,id?: string,color?:string,onChangeHandler:(date:any)=>void}) => {
  const [isFocused,setIsFocused]=useState(false)
  const [startDate, setStartDate] = useState<any>(new Date());

  function changeInput(date:Date) {
    const formatedDate= format( new Date(date),  "yyyy-MM-dd" )

    setStartDate(formatedDate)
    onChangeHandler(formatedDate)
  }
function focusHandler() {
    setIsFocused(true)
}
function blurHandler() {
    setIsFocused(false)
}
const toDay=new Date()
const renderDayContents = (day, date) => {
  const tooltipText = `Tooltip for date: ${date}`;
  return (
    <span
      title={tooltipText}
    >
      {day}
    </span>
  );};
  return (
    <div className="relative w-full h-full border-2 border-blue-300 rounded-md pl-2 py-2 ">
       <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none top-1  text-[14px] ${color ? `text-${color}` : 'text-violet-500'} `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center">
      <DatePicker
      onFocus={focusHandler}
      onBlur={blurHandler}
      className=" outline-0 absolute cursor-pointer z-50"
      renderDayContents={renderDayContents}
      portalId="root-portal"
      popperClassName="react-datepicker-popper" 
      
          renderCustomHeader={({
        monthDate,
        customHeaderCount,
        decreaseMonth,
        increaseMonth,
        
      }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            onClick={decreaseMonth}
            style={{
              visibility: customHeaderCount === 0 ? "visible" : "hidden",
            }}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            onClick={increaseMonth}
           
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => {changeInput(date as Date )}}
      monthsShown={1}
    />
      </div>
    {isFocused &&  <div className={` absolute top-0 left-0 bg-${color ? color:"violet-500"} h-full w-2`}/>} 
    </div>
  );
};

export default Date_Picker;
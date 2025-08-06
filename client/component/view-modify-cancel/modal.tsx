import React from 'react'
import Button from '../Button'

const Modal = ({text,onCloseHandler,onActionHandler}:{text:string,onCloseHandler:()=>void,onActionHandler:()=>void}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[3px] bg-opacity-60 transition-colors duration-500">
    <div 
      className="
        w-full max-w-md mx-auto p-6 sm:p-8 rounded-lg shadow-xl
        bg-white dark:bg-gray-800
        transform transition-all duration-300 ease-in-out
        hover:shadow-2xl
      "
    >
      <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-100 mb-6 text-center">
        {text}
      </p>
  
      <div className="flex justify-center gap-4 mt-6">
        <Button label="Cancel" fn={onCloseHandler} />
        <Button label="Confirm" fn={onActionHandler} />
      </div>
    </div>
  </div>
  )
}

export default Modal


import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className=' w-full h-full mt-16  '>
 <div className=' bg-blue-800 w-full mt-16 xl:px-32 px-12 md:px-20  py-14 dark:bg-gray-800   '>
     <h1 className=' text-white xl:text-5xl md:text-4xl text-3xl'>View /Modify / Cancel A Reservation</h1>
         </div>
         <div className=' w-full h-fit bg-blue-500  py-14 xl:px-32 px-12 md:px-20 dark:bg-gray-800 ' >
         {children} 

         </div>
    </div>
   
  )
}

export default layout
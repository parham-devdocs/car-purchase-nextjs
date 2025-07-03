
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  
  return (
    <div className='flex flex-col min-h-screen w-full py-16 bg-blue-900 dark:bg-black'>{children}</div>
  )
}

export default Layout
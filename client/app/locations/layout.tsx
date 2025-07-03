

import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex flex-col min-h-screen w-full mt-16'>{children}</div>
  )
}

export default Layout
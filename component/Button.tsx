

import Link from 'next/link'
import React from 'react'

const Button = ({label,link,className}:{label:string,link:string,className?:string}) => {
  return (
  <button className={`${className}  hover:bg-violet-600 transition-all duration-300 border-2 border-violet-600 px-4 py-1 cursor-pointer hover:text-white rounded-sm`} ><Link href={link}>{label}</Link></button>
  )
}

export default Button
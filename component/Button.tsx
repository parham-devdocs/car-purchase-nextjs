

import { Span } from 'next/dist/trace'
import Link from 'next/link'
import React from 'react'

const Button = ({label,link,fn,type,className}:{label:string,link?:string,type:string,fn?:()=>void,className?:string}) => {
  return (
  <button onClick={fn} className={`${className}  hover:bg-violet-600 transition-all duration-300 border-2 border-violet-600 px-4 py-1 cursor-pointer hover:text-white rounded-sm`} >{link ?<Link href={link}>{label}</Link> : <span>{label}</span>} </button>
  )
}

export default Button


import { Span } from 'next/dist/trace'
import Link from 'next/link'
import React from 'react'

const Button = ({label,disabled,link,onSubmit,fn,type="button",className}:{label:string,disabled?:boolean,link?:string,onSubmit?:any,type?:"button" | "submit" | "reset",fn?:()=>void,className?:string}) => {
  return (
  <button onClick={fn} disabled={disabled} onSubmit={onSubmit} type={type} className={`${className} dark:bg-violet-500 dark:text-white transition-all duration-500 dark:hover:bg-violet-700   hover:bg-violet-600 border-2 border-violet-600 px-4 py-1 cursor-pointer hover:text-white rounded-sm`} >{link ?<Link href={link}>{label}</Link> : <span>{label}</span>} </button>
  )
}

export default Button
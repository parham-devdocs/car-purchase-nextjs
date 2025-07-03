import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';
import Logo  from "../public/alamo_site_logo.png";
import { CgClose } from 'react-icons/cg';
type LinkItem = {
  label: string;
  link?: string;
  items?: LinkItem[];
};

const Menu = ({ items,closeSidebar,headerIsAvailable }: { items: LinkItem[],closeSidebar?:()=>void,headerIsAvailable:boolean }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <div className=' flex flex-col gap-4 dark:bg-gray-800 h-full'>
     {headerIsAvailable && <div className=' flex items-center justify-between my-4 mx-4  '><Image src={Logo} alt='logo'/><button className=' text-violet-600' onClick={closeSidebar}><CgClose size={25}/></button></div> }   
<ul className="w-full bg-white dark:bg-gray-800 transition-all duration-500 p-5 space-y-4 overflow-y-auto">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col dark:text-stone-300  ">
          {item.link ? (
            <Link
              href={item.link}
              className="flex justify-between items-center py-3 px-2 dark:text-stone-300 hover:bg-gray-100  rounded-md"
            >
              <span className="text-gray-800 dark:text-stone-300">{item.label}</span>
              {item.items && <BsArrowDownCircle size={18} />}
            </Link>
          ) : (
            <button
              onClick={() => toggleSubMenu(item.label)}
              className="flex justify-between items-center cursor-pointer w-full text-left py-3 px-2 dark:text-stone-300 hover:bg-gray-100  rounded-md focus:outline-none"
            >
              <span className="text-gray-800 dark:text-stone-300 ">{item.label}</span>
              {item.items && expandedItem === item.label ? (
                <BsArrowDownCircle size={18} />
              ) : (
                <BsArrowDownCircle size={18} />
              )}
            </button>
          )}

          {/* Render Submenu if Expanded */}
          {!item.link && item.items && expandedItem === item.label && (
            <ul className=" my-2 space-y-2 border-l-2 border-gray-200 pl-4">
              {item.items.map((subItem) => (
                <li key={subItem.label}>
                  <Link
                    href={subItem.link || '#'}
                    className="text-gray-700 dark:text-stone-300 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded-md block"
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
                  <hr className=' opacity-20'/>

        </li>
      ))}
    </ul>
    </div>
    
  );
};

export default Menu;
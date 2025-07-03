"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiGlobalFill } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';
import { Button, Input } from "./index";
import { CgClose, CgMenu } from 'react-icons/cg';
import Menu from './menu';
import { SignInDropDown } from './signInDropDown';
import ToggleButton from './lightModeToggleButton';
const Logo = '/alamo_site_logo.png';
type LinkItem = {
  label: string;
  link?: string;
  items?: LinkItem[];
  icon?: ReactElement;
};

const Navbar = () => {
  const [openIndex, setOpenIndex] = useState<{ type: 'left' | 'right', index: number } | null>(null);
const [openSidebar,setOpenSidebar]=useState<boolean>(false)
const toggleSidebar=()=>{
  setOpenSidebar(prev=>!prev)
}
  const leftSideItems: LinkItem[] = [
    {
      label: "Reservations",
      items: [
        { label: "Start a Reservation", link: "/" },
        { label: "View/Modify/Cancel", link: "/reserve/view-modify-cancel" },
        { label: "Past Trips/Receipts", link: "/reserve/past-trips" }
      ]
    },
    {
      label: "Deals",
      items: [
        { label: "Featured Deals", link: "/deals/featured-deals" },
        { label: "Join Alamo Insiders", link: "/deals/join-alamo" },
        { label: "Sign Up For Email Specials", link: "/deals/SignUpForEmailSpecials" },
        { label: "Airlines & Hotel Partners", link: "/deals/airlines-hotelPartners" }
      ]
    },
    {
      label: "Check In",
      items: [
        { label: "Accelerated Check-In", link: "/check-in/acceleratedCheckIn" },
        { label: "Skip The Counter", link: "/check-in/skip-counter" }
      ]
    },
    { label: "Locations", link: "/locations" },
    { label: "Vehicles", link: "/vehicles" }
  ];

  const rightSideItems: LinkItem[] = [
    {
      label: "Help",
      items: [
        { label: "Help & FAQs", link: "/help/help-FAQs" },
        { label: "Customer Support", link: "/help/customer-support" }
      ]
    },
    {
      label: "USA(En)",
      icon: <RiGlobalFill />,
      items: [
        { label: "English", link: "/language/english" },
        { label: "Español", link: "/language/spanish" },
        { label: "Français", link: "/language/french" }
      ]
    },
    { label: "Login",icon:< BsPerson size={23}/> }
  ];

  // Close dropdown on outside click
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (type: 'left' | 'right', index: number) => {
    setOpenIndex(prev =>
      prev?.type === type && prev.index === index ? null : { type, index }
    );
  };

  return (
    <div ref={navbarRef} className="w-full fixed top-0 left-0 bg-white transition-all duration-500  dark:bg-gray-800 py-3 px-6 flex items-center justify-between z-50 shadow-md">
      {/* Left Side Items */}
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Image src={Logo} alt="Alamo Logo" width={100} height={70} />
        </Link>
        <ul className=" lg:flex space-x-8 text-sm font-semibold hidden ">
          {leftSideItems.map((item, index) => (
            <li key={index} className="relative group">
              {item.link ? (
                <Link href={item.link} className="hover:text-blue-600 transition-colors text-blue-900 dark:text-stone-200 dark:hover:text-stone-400 text-xl">
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu('left', index)}
                    className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors text-blue-900 dark:text-stone-300 dark:hover:text-stone-400 text-xl focus:outline-none"
                  >
                    {item.label}
                    {openIndex?.type === 'left' && openIndex?.index === index ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {openIndex?.type === 'left' && openIndex?.index === index && (
                    <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-10">
                      <DropDownMenu items={item.items || []} direction={openIndex.type}/>
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>


<div className="flex gap-4 items-center">
  <ToggleButton/>
{rightSideItems.map((item, index) => (
  <div key={index} className="relative">
    
    {item.link ? (
      <Link href={item.link} className={`${
        item.label === "Sign Up"
          ? "text-violet-600 hover:text-violet-400"
          : "text-blue-900 hover:text-blue-600"
      } transition-colors text-xl`}>
        {item.label}
      </Link>
    ) : (
      <>
        <button
          onClick={() => toggleMenu('right', index)}
          className={`${
            item.label === "Sign In"
              ? "text-violet-600 hover:text-violet-400 dark:text-stone-300 dark:hover:text-stone-400"
              : "text-blue-900 hover:text-blue-600 hidden xl:flex dark:text-stone-300 dark:hover:text-stone-400"
          } flex items-center gap-1 transition-colors text-blue-900 text-xl focus:outline-none`}
        >
          {item.icon}
          {item.label}
          {openIndex?.type === 'right' && openIndex?.index === index ? (
            <IoMdArrowDropup />
          ) : (
            <IoMdArrowDropdown />
          )}
        </button>
{/* <ToggleButton/> */}
        {/* Conditional Dropdown */}
        {openIndex?.type === 'right' && openIndex?.index === index && (
          <>
            {item.label === "Login" ? (
              <SignInDropDown />
            ) : (
              <ul className="absolute top-full right-0 mt-1  shadow-lg rounded-md py-2 min-w-[200px] z-10">
                <DropDownMenu items={item.items || []} direction={openIndex.type} />
              </ul>
            )}
          </>
        )}
        
      </>
    )}

  
  </div>
))}
             <div className=' hidden md:flex items-center gap-3'><span className=' text-sm text-violet-600 hidden xl:flex'>OR</span> <Button label='Join' link='/sign-up' className=' text-xl  '/> </div> 
             <div className='md:hidden h-full relative'>
  {openSidebar ? (
    <CgClose onClick={toggleSidebar} className='text-violet-600 text-2xl' />
  ) : (
    <CgMenu onClick={toggleSidebar} className='text-violet-600 text-2xl' />
  )}

  {/* Sidebar Overlay */}
  <div className={`fixed top-0 right-0 w-3/4 sm:w-full h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
      openSidebar ? 'translate-x-0' : 'translate-x-full'
    }`
  }>
    <Menu items={leftSideItems} closeSidebar={()=>setOpenSidebar(false)} headerIsAvailable={true}/>
  </div>
</div>
</div>
    </div>
  );
};

export default Navbar;

// Dropdown Menu Component
function DropDownMenu({ items ,direction}: { items: LinkItem[] ,direction:"right"| "left"}) {
  return (
    <div className='border-t-8 border-b-8 border-blue-600 dark:bg-gray-800 bg-white   dark:text-stone-300 dark: dark:border-violet-500 px-2 py-1 relative'>
        <IoMdArrowDropdown size={23} className={` absolute ${direction==="right" ? " right-7":" left-7"} -top-7 text-blue-600 dark:text-violet-500 `}/>
      {items.map((item, idx) => (
        <li key={idx}>
          <Link
            href={item.link || '#'}
            className='block py-2 px-1.5 hover:bg-blue-200 dark:hover:bg-stone-300 text-black dark:text-stone-300 dark:hover:text-black rounded-sm w-full text-left'
          >
            {item.label}
          </Link>
        </li>
      ))}
    </div>
  );
}



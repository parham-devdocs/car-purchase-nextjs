"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiGlobalFill } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';
import { Button, Input } from "./index";
const Logo = '/alamo_site_logo.png';

type LinkItem = {
  label: string;
  link?: string;
  items?: LinkItem[];
  icon?: ReactElement;
};

const Navbar = () => {
  const [openIndex, setOpenIndex] = useState<{ type: 'left' | 'right', index: number } | null>(null);

  const leftSideItems: LinkItem[] = [
    {
      label: "Reservations",
      items: [
        { label: "Start a Reservation", link: "/reserve/reservation" },
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
    { label: "Sign In",icon:<
        BsPerson size={23}/>
     }
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
    <div ref={navbarRef} className="w-full fixed top-0 left-0 bg-white py-3 px-6 flex items-center justify-between z-50 shadow-md">
      {/* Left Side Items */}
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Image src={Logo} alt="Alamo Logo" width={100} height={70} />
        </Link>
        <ul className="flex space-x-8 text-sm font-semibold">
          {leftSideItems.map((item, index) => (
            <li key={index} className="relative group">
              {item.link ? (
                <Link href={item.link} className="hover:text-blue-600 transition-colors text-blue-900 text-xl">
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu('left', index)}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors text-blue-900 text-xl focus:outline-none"
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
  {rightSideItems.map((item, index) => (
    <div key={index} className="relative">
      {item.link ? (
        <Link href={item.link} className={` ${item.label==="Sign In" ? "text-violet-600 hover:text-violet-400" :" text-blue-900 hover:text-blue-600" }  transition-colors  text-xl`}>
          {item.label}
        </Link>
      ) : (
        <>
          <button
            onClick={() => toggleMenu('right', index)}
            className={` ${item.label==="Sign In" ? "text-violet-600 hover:text-violet-400" :" text-blue-900 hover:text-blue-600" } flex items-center gap-1 hover:text-blue-600 transition-colors text-blue-900 text-xl focus:outline-none`}
          >
            {item.icon}
            {item.label}

            {openIndex?.type === 'right' && openIndex?.index === index ? (
              <IoMdArrowDropup />
            ) : (
              <IoMdArrowDropdown />
            )}
          </button>

          {/* Conditional Dropdown */}
          {openIndex?.type === 'right' && openIndex?.index === index && (
            <>
              {item.label === "Sign In" ? (
              <SignInDropDown />
              ) : (
                <ul className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-10">
                  <DropDownMenu items={item.items || []} direction={openIndex.type} />
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  ))}
              <span className=' text-sm text-violet-600'>OR</span> <Button label='Join' link='/Sign-Up' className=' text-xl'/> 

</div>
    </div>
  );
};

export default Navbar;

// Dropdown Menu Component
function DropDownMenu({ items ,direction}: { items: LinkItem[] ,direction:"right"| "left"}) {
  return (
    <div className='border-t-8 border-b-8 border-blue-600 px-2 py-1 relative'>
        <IoMdArrowDropdown size={23} className={` absolute ${direction==="right" ? " right-7":" left-7"} -top-7 text-blue-600 `}/>
      {items.map((item, idx) => (
        <li key={idx}>
          <Link
            href={item.link || '#'}
            className='block py-2 px-1.5 hover:bg-blue-200 w-full text-left'
          >
            {item.label}
          </Link>
        </li>
      ))}
    </div>
  );
}


function SignInDropDown() {
    return(
        <div className='border-t-8 border-b-8 border-blue-600 px-8 py-5  w-[400px] absolute -left-40 top-14 shadow'>
              <IoMdArrowDropdown size={23} className={` absolute right-7 -top-7 text-blue-600 `}/>
<div className='  flex gap-6 flex-col text-center'>
<h2 className=' text-2xl text-blue-900 font-bold'>Alamo Insiders</h2>
<p className=' text-blue-900 text-sm font-bold -mt-6'>Not a member yet ? <Link className=' underline text-violet-600' href="/Sign-Up">Join now</Link></p>
<Input label='Email Address Or Username ' required/>
<Input label='Password ' required type='password'/>
<div className=' flex gap-3'>
<input type="checkbox" id='checkbox' className=' w-7 h-7 checked:bg-violet-600 focus:b'/>
<label htmlFor="checkbox" className=' text-violet-600'>stay signed in</label>
</div>
<Button label='Sign In' link='/Sign-In' className=' h-16 text-xl font-bold'/>
</div>
    </div>
    )
}
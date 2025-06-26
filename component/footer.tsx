"use client"
import React from 'react';
import Menu from './menu';
import Link from 'next/link';

type LinkItem = {
  label: string;
  link?: string;
  items?: LinkItem[];
};
const footerLinks: LinkItem[] = [
    {
      label: "Customer Support",
      items: [
        { label: "Help & FAQs",link:"#" },
        { label: "Customers with Disabilities" ,link:"#"}
      ]
    },
    {
      label: "Reservations",
      items: [
        { label: "Start a Reservation",link:"#" },
        { label: "View/Modify/Cancel",link:"#" },
        { label: "Accelerated Check-In",link:"#" },
        { label: "Skip the Counter",link:"#" },
        { label: "Past Trips/Receipts",link:"#" },
        { label: "One-Way Car Rental",link:"#" }
      ]
    },
    {
      label: "Alamo Deal Retriever®",
      items: [
        { label: "Car Rental Deals",link:"#" },
        { label: "Sign Up for Email Specials",link:"#" }
      ]
    },
    {
      label: "Alamo Insiders",
      items: [
        { label: "Alamo Insiders" },
        { label: "Sign In" }
      ]
    },
    {
      label: "Programs",
      items: [
        { label: "Partner Rewards Program",link:"#" },
        { label: "Global Franchise Opportunities",link:"#" },
        { label: "Travel Agents", link: "#" },
        { label: "Tour Operators", link: "#" }
      ]
    },
    {
      label: "Vehicles",
      items: [
        { label: "Cars",link:"#"},
        { label: "SUVs",link:"#" },
        { label: "Trucks",link:"#" },
        { label: "Vans",link:"#" }
      ]
    },
    {
      label: "Company",
      items: [
        { label: "About Alamo",link:"#" },
        { label: "Careers", link: "#" },
        { label: "Used Cars",link:"#" },
        { label: "Alamo App",link:"#" }
      ]
    },
    {
      label: "Policies / Sitemap",
      items: [
        { label: "Privacy Policy", link: "#" },
        { label: "Cookie Policy", link: "#" },
        { label: "Terms of Use",link:"#" },
        { label: "Sitemap",link:"#" }
      ]
    }
  ];
const Footer = () => {
  return (
    <div className='w-full px-10 py-5 transition-all duration-500 dark:bg-gray-900 '>
      <hr />
      <div className=" hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-8 mt-5 ">
  {footerLinks.map((section, index) => (
    <div key={index} className="flex flex-col">
      <h4 className="font-bold text-lg mb-2 dark:text-stone-600">{section.label}</h4>
      <ul className="space-y-1">
        {section.items && section.items.map((item, subIndex) => (
          <li key={subIndex}>
              <Link
                href={item.link || ""}
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline dark:text-white"
              >
                {item.label}
              </Link>
          
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
<div className=' sm:hidden'><Menu items={footerLinks} headerIsAvailable={false}/></div>
    </div>
  );
};

export default Footer;
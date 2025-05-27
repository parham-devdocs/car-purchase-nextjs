"use client"
import React from 'react';
import Menu from './menu';

type LinkItem = {
  label: string;
  link?: string;
  items?: LinkItem[];
};
const footerLinks: LinkItem[] = [
    {
      label: "Customer Support",
      items: [
        { label: "Help & FAQs" },
        { label: "Customers with Disabilities" }
      ]
    },
    {
      label: "Reservations",
      items: [
        { label: "Start a Reservation" },
        { label: "View/Modify/Cancel" },
        { label: "Accelerated Check-In" },
        { label: "Skip the Counter" },
        { label: "Past Trips/Receipts" },
        { label: "One-Way Car Rental" }
      ]
    },
    {
      label: "Alamo Deal Retriever®",
      items: [
        { label: "Car Rental Deals" },
        { label: "Sign Up for Email Specials" }
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
        { label: "Partner Rewards Program" },
        { label: "Global Franchise Opportunities" },
        { label: "Travel Agents", link: "#" },
        { label: "Tour Operators", link: "#" }
      ]
    },
    {
      label: "Vehicles",
      items: [
        { label: "Cars" },
        { label: "SUVs" },
        { label: "Trucks" },
        { label: "Vans" }
      ]
    },
    {
      label: "Company",
      items: [
        { label: "About Alamo" },
        { label: "Careers", link: "#" },
        { label: "Used Cars" },
        { label: "Alamo App" }
      ]
    },
    {
      label: "Policies / Sitemap",
      items: [
        { label: "Privacy Policy", link: "#" },
        { label: "Cookie Policy", link: "#" },
        { label: "Terms of Use" },
        { label: "Sitemap" }
      ]
    }
  ];
const Footer = () => {
  return (
    <div className='w-full px-10 py-5 mt-10 '>
      <hr />
      <div className=" hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-8 mt-5 ">
  {footerLinks.map((section, index) => (
    <div key={index} className="flex flex-col">
      <h4 className="font-bold text-lg mb-2">{section.label}</h4>
      <ul className="space-y-1">
        {section.items && section.items.map((item, subIndex) => (
          <li key={subIndex}>
            {item.link ? (
              <a
                href={item.link}
                target={item.link.startsWith('#') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
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
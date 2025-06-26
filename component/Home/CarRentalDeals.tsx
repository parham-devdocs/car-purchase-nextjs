import Image from "next/image";
import CarsPic from "../../public/content-imagery-illustration-deals@3x.avif";
import Link from "next/link";
import { IoTicketSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const deals= [
      {
        id: 1,
        title: "Book Early Deal",
        subtitle: "Plan Ahead Specials",
        description: "Check out great last minute car rental specials from Alamo for daily and weekly rentals in the U.S and Canada.",
      },
      {
        id: 2,
        title: "Last Minute Deal",
        subtitle: "Last Minute Specials",
        description: "Check out great last minute car rental specials from Alamo for daily and weekly rentals in the U.S and Canada.",
      },
      {
        id: 3,
        title: "Rent and Save",
        subtitle: "$20 off $225 or More",
        description: "Check out great last minute car rental specials from Alamo for daily and weekly rentals in the U.S and Canada.",
      },
      {
        id: 4,
        title: "Rent and Save",
        subtitle: "10% Off 3+ Day One-Way Rental",
        description: "Check out great last minute car rental specials from Alamo for daily and weekly rentals in the U.S and Canada.",
      }
    ]
  
const CarRentalDeals = () => {
  return (
    <div className=" bg-blue-500 dark:bg-gray-800 transition-all duration-500 px-7 py-6">
        <Image src={CarsPic} alt="cars"/>
        <div className=" flex md:flex-row flex-col items-center justify-between">
            <h3 className=" text-white text-xl font-bold">Featured Car Rental Deals</h3>
            <Link href={"/car-rental-deals"} className=" text-yellow-400 font-bold">View All Deals</Link>
        </div>
        <hr className=" text-white"/>
        <div className="w-full flex flex-wrap gap-3 my-4 justify-center">
  {deals.map(deal => (
    <div key={deal.id} className="flex-none md:flex-grow-0 w-[300px]">
      <Card
        description={deal.description}
        title={deal.title}
        subtitle={deal.subtitle}
      />
    </div>
  ))}
</div>
    </div>
  )
}

export default CarRentalDeals



import React from 'react'

const Card = ({title,subtitle,description}:{title:string,subtitle:string,description:string}) => {
  return (
    <div className=" py-4 px-4 bg-white dark:bg-neutral-800 rounded-sm space-y-2 md:w-[300px] w-full h-40 transition-all duration-500">
<p className=" text-green-800 gap-2 flex text-md ml-1"><IoTicketSharp/>{title}</p>
<p className=" text-violet-500 gap-2 flex text-xl">{subtitle}<IoIosArrowForward/></p>
<p className="line-clamp-2 overflow-hidden dark:text-white">
  {description}
</p>    </div>
  )
}


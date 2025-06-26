"use client"
import Image from "next/image";
import CarPercentageImage from "../../public/illutration-circle-car-5-percent-off.svg";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Button from "../Button";
import { useState } from "react";
const SignInSignUpSection = () => {
  const [termsAndPoliciesOpen,setTermsAndPolisiesOpen]=useState(false)

  return (
    <div className="w-full min-h-[300px] flex md:flex-row flex-col items-center justify-center px-8 md:gap-[100px] gap-12 transition-all duration-500 bg-blue-800 py-10 text-white dark:bg-gray-800">
      {/* Image */}
      <Image src={CarPercentageImage} alt="car-image" height={200} width={200} />

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-start items-center gap-8 w-full max-w-4xl">
        {/* Text Section */}
        <div className="flex flex-col md:text-left text-center md:items-start items-center space-y-4">
          <p className="text-blue-400 font-extrabold">Signing Up is Fast & Free</p>
          <h2 className="font-bold text-2xl">
            Before you reserve, save with Alamo Insiders!
          </h2>
          <p>
            As an Alamo Insider, you'll{" "}
            <span className="font-bold">save 5% off</span> base rates (time and
            mileage) of pay later reservations. Terms apply.* Plus, save time at
            the counter by activating accelerated check-in when you sign up –
            simply add more information to your profile!
          </p>
          <button className="hidden md:flex items-center gap-1 text-yellow-300 font-semibold text-[17px] cursor-pointer" onClick={()=>setTermsAndPolisiesOpen(prev=>!prev)}>
            <IoIosArrowDropdownCircle size={20} /> Terms & Conditions
          </button>
          {termsAndPoliciesOpen === true && <p className=" md:block hidden">*On Pay Later retail rates in the United States, Canada, Mexico, Latin America and the Caribbean. Discount applies only to the base rate charge (time and mileage) and does not apply to applicable taxes, fees, surcharges, refueling, drop-off, delivery, youthful driver, additional driver, pick up, or one way charges or any optional product or service (such as optional damage waiver of $50 or less per day), which are the responsibility of the Renter.</p>}

        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center md:items-start gap-5 w-full  mt-4 md:mt-0">
        <Button
  label="Join"
  link="/Sign-Up"
  className="bg-yellow-400 w-full md:w-64 h-12"
/>
          <p className="font-bold text-[18px] ">Already an Alamo insider?</p>
          <Link href={"/Sign-In"} className="text-yellow-300 font-bold flex items-center gap-1">
            Sign In <IoIosArrowForward />
          </Link>
          <button className="md:hidden flex items-center gap-1  text-yellow-300 font-semibold text-[17px] cursor-pointer" onClick={()=>setTermsAndPolisiesOpen(prev=>!prev)}>
            <IoIosArrowDropdownCircle size={20} /> Terms & Conditions
          </button>
          {termsAndPoliciesOpen === true && <p className=" md:hidden inline">*On Pay Later retail rates in the United States, Canada, Mexico, Latin America and the Caribbean. Discount applies only to the base rate charge (time and mileage) and does not apply to applicable taxes, fees, surcharges, refueling, drop-off, delivery, youthful driver, additional driver, pick up, or one way charges or any optional product or service (such as optional damage waiver of $50 or less per day), which are the responsibility of the Renter.</p>}


        </div>
      </div>
    </div>
  );
};

export default SignInSignUpSection;
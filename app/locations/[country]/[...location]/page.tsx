"use client"
import Reservation from '@/component/Home/Reservation'
import Image from 'next/image'
import { FC, useState, useEffect } from 'react'
import map from "@/public/staticmap.png";
import { IoLocationSharp } from "react-icons/io5";

import { AiOutlineExport } from "react-icons/ai";
import useURLDecoder from '@/hooks/useURLDecoder';
import ScheduleDropDown from '@/component/location/scheduleDropDown';
import DirectionDropDown from '@/component/location/directionDropDown';
import ActionCard from '@/component/location/actionCard';

interface Props {
  params: {
    location: string
  }
}

const Page: FC<Props> = ({ params }) => {
  const {decodedLocation}=  useURLDecoder(params.location)
  return (
    <div>
      <Reservation title={`${decodedLocation} Car Rental`} pickUpLocation={decodedLocation as string} />
      <div className='bg-blue-500 w-full py-7 px-32 flex flex-col lg:flex-row items-center justify-between'>
        <div className='space-y-5'>
          <p className='text-white font-bold text-2xl'>{decodedLocation}</p>
          <Image src={map} height={550} width={550} alt='map'/>
        </div>
        {/* Your other divs */}
        <div className="flex min-w-sm flex-col gap-4 justify-between px-2 mt-10">
        <ActionCard link='/' address='123 Main St, Cityville'/>
        <ActionCard contactNumber='+989124687022'/>

  <DirectionDropDown/>
  <ScheduleDropDown/>
        </div>
      </div>
    </div>
  );
};

export default Page;




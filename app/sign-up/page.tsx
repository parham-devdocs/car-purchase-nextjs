"use client"
import Image from 'next/image'
import AlamoInsider from "../../public/alamo-insiders.avif";
import Link from 'next/link';
import Input from "../../component/textInput";
import PhoneNumberInput from '@/component/PhoneNumberInput';
import { useState } from 'react';
import Checkbox from '@/component/checkBox';
const page = () => {
  const [country,setCountry]=useState(false)
  return (
    <div className=' my-16  '>
      <div className=' bg-blue-500 w-full min-h-96 flex md:flex-row flex-col md:gap-64 gap-24  items-center md:items-start justify-between px-24 py-20'>
<div className=' flex flex-col gap-4 '>
  <h2 className=' text-white lg:text-5xl md:text-3xl text-2xl font-bold'>Alamo Insiders - Free and Easy to Join!</h2>
  <p className=' text-white text-[20px]'>It's free and easy to join! As an Alamo Insider, you'll save 5% off base rates of pay later reservations*. Already have an account? <Link href={"/sign-in"} className=' text-yellow-400'>sign in</Link></p>
<p className=' text-white text-[16px] leading-7'>*On Pay Later retail rates in the United States, Canada, Mexico, Latin America and the Caribbean. Discount applies only to the base rate charge (time and mileage) and does not apply to applicable taxes, fees, surcharges, refueling, drop-off, delivery, youthful driver, additional driver, pick up, or one way charges or any optional product or service (such as optional damage waiver of $50 or less per day), which are the responsibility of the Renter.</p>
</div>
<Image src={AlamoInsider} height={250} width={250} alt='alamo-insider'/>
      </div>
      <div className=' flex  flex-col gap-12 lg:w-2/3 w-full px-24 min-h-80 py-12'>

      <div className=' space-y-4'>
      <h3 className=' text-blue-500 text-3xl font-bold'>Account Information</h3>
     
        <div className=' grid lg:grid-cols-2 grid-cols-1 gap-3'>
        <Input label='First Name' required />
        <Input label='Last Name' required />
        <Input label='Email Address' required />
        <PhoneNumberInput/>
        {country ?         <Input label='Country Of Residence' required />  : <p>Country:United State <button className=' text-violet-500 font-bold' onClick={()=>setCountry(true)}>Change</button></p>}

        </div> </div>
        <div className=' space-y-4 lg:w-1/2 w-full'>
      <h3 className=' text-blue-500 text-3xl font-bold'>Create Password</h3>
        <Input label='Password' required />
        </div>
        <hr />
        <div className=' flex'>
          <Checkbox onChangeHandler={(value)=>{console.log(value.target.checked)}}  />
        </div>
      </div>
    </div>
  )
}

export default page
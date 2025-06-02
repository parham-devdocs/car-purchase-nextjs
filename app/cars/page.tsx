"use client"
import { Button } from '@/component'
import CountryDropDown from "../../component/countryDropDown";
import { FaFilter } from "react-icons/fa";

const page = () => {
  return (
    <div className=' bg-blue-600 mt-32 py-8 px-7 '>
        <div className=' flex flex-col lg:flex-row gap-5 lg:justify-between '>
            <h3 className=' lg:text-5xl text-2xl text-white text-center font-extrabold  '>Rental Car Options in United States</h3>
        <Button label='Start a Reservation' link='/' />
        </div>
        <div className=' lg:flex w-full gap-10 items-start mt-5 '>
            <div className=' w-48 h-96 bg-blue-900 lg:flex hidden'></div>
            <div className=' flex-1 h-96 bg-blue-900 py-3'>
                <div className=' lg:flex hidden'><CountryDropDown onChangeHandler={(e)=>console.log(e)} /></div>
            <div className='flex items-center justify-between border-t border-b border-white   py-4 mx-3 '>
                                    <h3>28 vehicle class option(s)</h3>
                                    
                                    <div className=' lg:flex hidden'><FilterButton /></div>
                                    <div className=' lg:hidden flex'><CountryDropDown onChangeHandler={(e)=>console.log(e)} /></div>

                </div>
            </div>

        </div>
        
    </div>
  )
}

export default page




const FilterButton = ({horizontal=true}:{horizontal?:boolean}) => {
  return (
<button className={` cursor-pointer text-yellow-300 font-semibold text-lg flex {${horizontal ? "flex-rox" :" flex-col"}} items-center gap-2`}><FaFilter/> Filters</button>
  )
}



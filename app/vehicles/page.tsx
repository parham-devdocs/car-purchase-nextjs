"use client"
import { Button } from '@/component'
import CountryDropDown from "../../component/countryDropDown";
import { FaFilter } from "react-icons/fa";
import Filters from '@/component/filters';
import { useState } from 'react';

const page = () => {
  const [isFilterSidebarShown, setIsFilterSidebarShown] = useState<boolean>(false)
  return (
    <div className="bg-blue-900 mt-32">

      {/* Backdrop overlay */}
      
      {isFilterSidebarShown && (
        <div 
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 backdrop-brightness-75"
          onClick={() => setIsFilterSidebarShown(false)}
        ></div>
      )}

      {/* Main Content Container */}
      <div className="py-8 px-7 relative z-10">
        <div className='flex flex-col lg:flex-row gap-5 lg:justify-between'>
          <h3 className='lg:text-5xl text-2xl text-white text-center font-extrabold'>
            Rental Car Options in United States
          </h3>
          <Button label='Start a Reservation' link='/' />
        </div>

        <div className='lg:flex w-full gap-10 items-start mt-5'>
          <div className='w-48 min-h-96 bg-blue-800 xl:flex hidden rounded-sm'>
            <Filters type passengers drive onCloseHandler={()=>setIsFilterSidebarShown(false)} />
          </div>

          <div className='flex-1 h-96 bg-blue-800 py-3 rounded-sm'>
            <div className='xl:flex hidden'>
              <CountryDropDown onChangeHandler={(e) => console.log(e)} />
            </div>

            <div className='flex items-center justify-between border-t border-b border-white py-4 mx-3'>
              <h3>28 vehicle class option(s)</h3>
              <div className='md:hidden flex'>
                <FilterButton onClickHandler={() => setIsFilterSidebarShown(true)} />
              </div>
              <div className='md:flex hidden'>
                <CountryDropDown onChangeHandler={(e) => console.log(e)} />
              </div>
            </div>

            <div className='w-full min-h-screen flex'>
              <div className='hidden md:flex justify-center xl:hidden h-fit w-20 py-5 z-50'>
                <FilterButton horizontal={false} onClickHandler={() => setIsFilterSidebarShown(true)} />
              </div>
              <div className='w-px bg-white mx-0 md:block hidden xl:hidden'> </div>
              <div className='flex w-full py-5'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar with animation */}
      <div
        className={`absolute top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-500 ease-in-out z-50 ${
          isFilterSidebarShown ? 'w-56 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <Filters isTogglable type passengers drive onCloseHandler={ ()=>setIsFilterSidebarShown(false)}   />
      </div>

    </div>
  )
}

export default page

// FilterButton Component
const FilterButton = ({ horizontal = true, onClickHandler }: { horizontal?: boolean, onClickHandler: () => void }) => {
  const direction = horizontal ? 'flex-row' : 'flex-col';
  return (
    <button
      className={`cursor-pointer text-yellow-300 font-semibold text-lg flex ${direction} items-center gap-2`}
      onClick={onClickHandler}
    >
      <FaFilter />
      <span>Filters</span>
    </button>
  );
};
import SearchPic from "../../public/find-a-reservation.avif";
import FilePic from "../../public/accelerated-check-in-l.avif";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
const ReservationLookupAndCheckIn = () => {
    return (
      <div className=" transition-all duration-500 bg-blue-800 text-white dark:bg-neutral-800 p-6 rounded-lg max-w-3xl mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">Already Have a Reservation?</h2>
  
        {/* Find Reservation Section */}
        <div className="mb-6">
            <Image src={SearchPic} alt="search" height={50} width={50}/>
          <h3 className="font-semibold text-lg mb-2">Find a Reservation</h3>
          <p className="mb-4">
            Need to check details or make a change to your reservation? Look up your Alamo reservation.
          </p>
          <Link href={"/reserve/view-modify-cancel"} className="text-yellow-300 flex items-center text-xl md:text-[18px] font-bold">Look Up Reservation<IoIosArrowForward/></Link>        </div>
  
        {/* Accelerated Check-In Section */}
        <div>
        <Image src={FilePic} alt="file" height={100} width={100}/>

          <h3 className="font-semibold text-lg mb-2">Activate Accelerated Check-in</h3>
          <p className="mb-4">
            Upcoming reservation? Get to the fun fast! Activate Accelerated Check-in to save time at the rental counter.
          </p>
          <Link href={"/reserve/check-in-lookup"} className="text-yellow-300 flex items-center text-xl md:text-[18px] font-bold">Start Accelerated Check-in<IoIosArrowForward/></Link>        </div>

         
    
      </div>
    );
  };
  
  export default ReservationLookupAndCheckIn;
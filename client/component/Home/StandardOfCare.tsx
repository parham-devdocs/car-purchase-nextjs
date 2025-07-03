import Image from "next/image";
import CarCarePic from "../../public/alamo-standard-of-care-600.avif";
import Button from "../Button";
const StandardOfCare = () => {
  return (
    <div className=' flex md:flex-row flex-col transition-all duration-500 bg-white dark:bg-black px-11 py-5'>
        <Image src={CarCarePic} alt="car" width={200} height={200}/>
        <div className=" flex flex-col gap-3 md:justify-start justify-center">
            <h3 className=" text-blue-800 text-2xl font-bold">Our Standard Of Care</h3>
            <p className=" text-blue-800 text-[18px]">We promise to put you first, with exceptional customer service and vehicles that are maintained and cleaned to our high-quality standards. Everything we do, we do with our Standard of Care.</p>
            <Button  label="Learn More" link="/Learn-More" className=" w-full md:w-56 h-14 text-[18px]"/>
        </div>
    </div>
  )
}

export default StandardOfCare
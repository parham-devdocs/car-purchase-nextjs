import Image from "next/image";
import CarPic from "../public/1727199981087.avif";
import { TbManualGearbox } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { IoBagSharp } from "react-icons/io5";
import { SiHotwire } from "react-icons/si";
import { GiCarDoor } from "react-icons/gi";
import Link from "next/link";

type CarProps={
  type:string
  name:string
  automatic:boolean | number
  passengers:number
  bags:number
  electric?:boolean
  doors?:number
  
}

const CarCard = ({type,name,automatic,passengers,bags,electric,doors}:CarProps) => {
  return (
    <Link className=' h-96 w-full  bg-white dark:bg-neutral-900 rounded-md flex  items-center justify-center ' href={`/vehicles/${type}/${name}`}>
        <div className=' w-72 flex flex-col items-center justify-center '>
            <div className=" flex flex-col items-center gap-2 text-center">
                <p className=" text-blue-950 dark:text-stone-400 text-2xl font-bold">{type}</p>
                 <p className=" text-md text-blue-900 dark:text-stone-200">{name}</p>
                 <div className=" flex gap-3 flex-wrap text-blue-900 dark:text-white font-bold">
                    <div className=" flex gap-1"><TbManualGearbox/> <span>{automatic ? "automatic" : automatic}</span> </div>
                    <div className=" flex gap-1"><IoMdPerson/> <span>{passengers}</span> </div>
                    <div className=" flex gap-1"><IoBagSharp/> <span>{bags}</span> </div>
                  {electric &&  <div className=" flex gap-1"><SiHotwire/> <span></span> </div>  } 
                    <div className=" flex gap-1"><GiCarDoor/> <span>{doors}</span> </div>


                 </div>

            </div>
<Image src={CarPic} alt="car" height={300} width={300}/>
        </div>

    </Link>
  )
}

export default CarCard
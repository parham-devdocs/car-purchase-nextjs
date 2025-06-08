import Image from 'next/image'
import BgImage from "../../public/mvt649_mb_bwest (2).png";
const Header = ({headerTitle}:{headerTitle:string}) => {
  return (
    <div >
 <div className=" relative lg:flex hidden justify-center items-center">
    <Image
      src={BgImage}
      alt="alamo car"
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
    />
    <h1 className=" absolute text-5xl text-blue-950 font-bold">{headerTitle}</h1>
    </div>
    <div className=' text-center bg-blue-500 py-10 lg:hidden block w-full  '> 
      <h4 className=' text-white font-bold text-2xl'>{headerTitle}</h4>
       </div>
    </div>
   
  )
}

export default Header
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
type ActionCardType={
    link?:string
    address?:string
    contactNumber?:string
}
const ActionCard = ({link,contactNumber,address}:ActionCardType) => {
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t-[2px] border-white relative">
    <div className="flex items-center space-x-2">
      <span className="flex items-center justify-center p-2 bg-yellow-500 text-white rounded-md">
        {link ? <FaLocationArrow className="w-5 h-5" /> : <FaPhoneAlt className=' w-5 h-5'/>  }
      </span>
      {link  ? <Link href={link}>{address}</Link> : <Link href={`skype:${contactNumber} `} target="_blank">{contactNumber}</Link>}

     
    </div>
   
</div>
  )}

export default ActionCard
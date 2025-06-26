import Image from "next/image"
import SearchImage from "@/public/download.svg";
import Input from "../textInput";
import Button from "../Button";
const Form = ({api,action}:{api?:string,action:"cancel"|"modify"|"view"}) => {
    const detailsAboutActions=[
        {action:"cancel",detail:" you can cancel a reservationa nd be sure that all your cancellation info is kept secret "},
        {action:"view",detail:"all the info related to your reservation is viewed"},
        {action:"modify",detail:" first search your reservation and then you can modify it"},


    ]
    const specificAction=detailsAboutActions.filter(e=>e.action===action)[0]
  return (
    <div className=' flex lg:flex-row flex-col bg-transparent lg:gap-24 gap-8'>
        <div className=" flex flex-col flex-1/2 gap-3 w-full max-w-md">
        <Input label="first name" color=" text-stone-200 dark:text-violet-500" />
        <Input label="last name" color=" text-stone-200 dark:text-violet-500"/>
        <Input label=" reservation Number" color=" text-stone-200 dark:text-violet-500" />
        <Button label={action}/>


        </div>
        <span className=" w-0.5 rounded-full h-full  bg-white"/>
        <hr className=" w-full lg:hidden h-0.5 bg-white"/>
        <div className=' flex items-center flex-1/2'>
            <Image src={SearchImage} alt="search" width={300} height={300} style={{width:"200px",height:"200px",objectFit:"cover"}}/>
            <p className=" text-white text-xl ">{specificAction.detail}</p>
        </div>

    </div>
  )
}

export default Form
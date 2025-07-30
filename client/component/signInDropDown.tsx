import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema } from "@/utils/validationSchemas"; // your schema import
import Link from "next/link";
import Input from "@/component/textInput";
import { IoMdArrowDropdown } from "react-icons/io";
import Button from "./Button";
import axiosInstance from "@/utils/axios";
import { ToastContainer, toast } from "react-toastify";
import setCookie from "@/utils/setCookie";

// ... inside your component
export default function LoginDropdown() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formLoginSchema),
  });

  const onSubmit =async (data:any) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        emailOrUsername:data.emailOrUsername,
        password:data.password
      })
    
      res.status === 200 && toast.success("successful login") && setCookie("accessToken",res.data.accessToken) && console.log(document.cookie)
      localStorage.setItem("role",res.data.role)
      

    } catch (error: any) {
      if (error.response) {
        const serverMessage = error.response.data?.message;
        const status=error.response.status
        
          if (status==401) {
            toast.error(  "User does not exist" );

            return
         }
     else{
      toast.error( serverMessage );

     }
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
      className="
        border-t-8 border-b-8 border-blue-600 dark:border-violet-500 px-8 py-5 w-[400px] absolute 
        lg:-left-40 -left-72 top-14 shadow-lg backdrop-blur-md bg-white/30
      "
    >
      <ToastContainer/>
      <IoMdArrowDropdown
        size={23}
        className="absolute right-7 -top-7 text-blue-600 dark:text-violet-500"
      />
  
      <div className="flex gap-6 flex-col text-center">
        <h2 className="text-2xl text-blue-900 font-bold">Alamo Insiders</h2>
        <p className="text-blue-900 text-sm font-bold -mt-6">
          Not a member yet?{" "}
          <Link className="underline text-violet-800" href="/Sign-Up">
            Join now
          </Link>
        </p>
  
        <Input
          color="text-violet-800"
          label="Email Address or Username"
          required
          {...register("emailOrUsername")}
        />
        {errors?.emailOrUsername?.message && (
          <p className="text-red-700 mb-4">{errors.emailOrUsername?.message}</p>
        )}
  
        <Input
          color="text-violet-800"
          label="Password"
          required
          type="password"
          {...register("password")}
        />
        {errors?.password?.message && (
          <p className="text-red-700 mb-4">{errors.password.message}</p>
        )}
        
        <div className="flex gap-3 items-center justify-center">
          <input
            type="checkbox"
            id="checkbox"
            className="w-5 h-5 checked:bg-violet-600 focus:ring-violet-600"
          />
          <label htmlFor="checkbox" className="text-violet-800 text-sm">
            Stay signed in
          </label>
        </div>
  
        <Button type="submit"    label="Sign In" className="h-16 text-xl font-bold" />
      </div>
    </form>
  );
}

import Link from "next/link";
import Button from "./Button";
import { IoMdArrowDropdown } from "react-icons/io";
import Input from "./textInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

export function SignInDropDown() {
  const FormSchema = z.object({
    email: z
      .string({ message: "email is required" })
      .email("Invalid email. Email must be a valid email address"),
    password: z
      .string({ message: "password is required" })
      .min(3, "Password must not be lesser than 3 characters")
      .max(16, "Password must not be greater than 16 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  type IFormInput = z.infer<typeof FormSchema>;
  function onSubmit() {
    console.log("submitted");
  }
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
                border-t-8 border-b-8 border-blue-600 dark:border-violet-500 px-8 py-5 w-[400px] absolute 
                lg:-left-40 -left-72 top-14 shadow-lg backdrop-blur-md bg-white/30
            "
    >
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
        color=" text-violet-800"
          label="Email Address or Username"
          required
          {...register("email")}
          onChangeHandler={(e)=>console.log(e.target.value)}
        />
        {errors?.email?.message && (
          <p className="text-red-700 mb-4">{errors.email.message}</p>
        )}

        <Input
        color=" text-violet-800"
          label="Password"
          required
          type="password"
          {...register("password")}
          onChangeHandler={(e)=>console.log(e.target.value)}

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

        <Button label="Sign In" className="h-16 text-xl font-bold" />
      </div>
    </form>
  );
}

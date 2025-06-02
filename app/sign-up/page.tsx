"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AlamoInsider from "../../public/alamo-insiders.avif";

// Components
import Input from "../../component/textInput";
import PhoneNumberInput from "@/component/PhoneNumberInput";
import Checkbox from "@/component/checkBox";
import { Button } from "@/component";

// Form validation
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { email } from "zod/v4";

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  country: z.string({ message: "Country is required" }).default("USA"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(16, "Password must not exceed 16 characters"),
});

type IFormInput = z.infer<typeof FormSchema>;

export default function Page() {
  const [country, setCountry] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [policies,setPolicies]=useState(false)
  const [emails,setEmails]=useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const isValidPhoneNumber = (number: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{7,14}$/; // Basic international validation
    return phoneRegex.test(number);
  };

  const onSubmit = (data: IFormInput) => {
    const isValidPhone = isValidPhoneNumber(phone);
    if (!isValidPhone) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    console.log("Submitted Data:", {
      ...data,
      phoneNumber: phone,
      policies,
      emails
    });
  };

  return (
    <form className="my-16" onSubmit={handleSubmit(onSubmit)}>
      {/* Hero Section */}
      <div className="bg-blue-500 w-full min-h-96 flex flex-col md:flex-row md:gap-64 gap-24 items-center justify-between px-24 py-20">
        <div className="flex flex-col gap-4">
          <h2 className="text-white lg:text-5xl md:text-3xl text-2xl font-bold">
            Alamo Insiders - Free and Easy to Join!
          </h2>
          <p className="text-white text-[20px]">
            It's free and easy to join! As an Alamo Insider, you'll save 5% off base rates of pay later reservations*. Already have an account?{" "}
            <Link href="/sign-in" className="text-yellow-400">
              Sign in
            </Link>
          </p>
          <p className="text-white text-[16px] leading-7">
            *On Pay Later retail rates in the United States, Canada, Mexico, Latin America and the Caribbean. Discount applies only to the base rate charge (time and mileage) and does not apply to applicable taxes, fees, surcharges, refueling, drop-off, delivery, youthful driver, additional driver, pick up, or one way charges or any optional product or service (such as optional damage waiver of $50 or less per day), which are the responsibility of the Renter.
          </p>
        </div>
        <Image src={AlamoInsider} height={250} width={250} alt="Alamo Insider" />
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-12 lg:w-2/3 w-full px-24 py-12">
        <div className="space-y-4">
          <h3 className="text-blue-500 text-3xl font-bold">Account Information</h3>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            {/* First Name */}
            <div className="space-y-1">
              <Input label="First Name" id="firstName" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <Input label="Last Name" id="lastName" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <Input label="Email Address" id="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <PhoneNumberInput
                onChangeHandler={(value: string) => {
                  setPhone(value);
                  setPhoneError(null);
                }}
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>

            {/* Country Of Residence */}
            <div className="space-y-1">
              {country ? (
                <Input
                  label="Country Of Residence"
                  {...register("country")}
                />
              ) : (
                <p>
                  Country: United States{" "}
                  <button
                    type="button"
                    className="text-violet-500 font-bold"
                    onClick={() => setCountry(true)}
                  >
                    Change
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-4 lg:w-1/2 w-full">
          <h3 className="text-blue-500 text-3xl font-bold">Create Password</h3>
          <Input label="Password" id="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <hr />

        {/* Marketing Consent */}
        <div className="flex gap-2 relative">
          <Checkbox onChangeHandler={(e)=>setEmails(e)} id="receiving-emails"  />
          <div className="text-sm">
            <div className="block">
              Sign up for Alamo email specials.
              <span className="text-green-500 mt-2 mb-4 text-base font-semibold">
                You're on your way to some great deals!
              </span>
            </div>
            By selecting this box, you would like to receive email promotions and offers from Alamo Car Rental (as well as affiliated entities). You also agree that we can use your information and interactions with emails to perform analytics and produce content and ads tailored to your interests. You may see these tailored advertisements and offers on non-Enterprise sites, including on social media and digital advertising platforms. Please understand that there is no charge and that you can unsubscribe at any time by (i) using the links provided in the emails, (ii) managing your preferences in your Alamo Insiders profile or (iii) contacting us. Please consult our Privacy Policy and our Cookie Policy to find out more.
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-gray-200 py-3 px-3 flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <Checkbox onChangeHandler={(e)=>setPolicies(e)} id="terms" />
            <p className="text-sm">
              I accept <span className="underline">Alamo Insiders Terms & Conditions*</span>
            </p>
          </div>
          <Button label="Join" className="w-60 font-bold h-12" />
        </div>
      </div>
    </form>
  );
}
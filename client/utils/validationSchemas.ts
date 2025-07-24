import { z } from "zod";


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
 const formSignUpSchema = z.object({
    email: z
      .string({ message: "email is required" })
      .email({ message: "email is not valid" }),
    firstName: z
      .string({ message: "firstname is required" })
      .min(3, { message: "firstname must have at least 3 characters" }),
    username: z
      .string({ message: "username is required" })
      .min(3, { message: "username must have at least 3 characters" }),
    lastName: z
      .string({ message: "lastname is required" })
      .min(3, { message: "lastname must have at least 3 characters" }),
    password: z
      .string({ message: "password is required" })
      .refine((value) => passwordRegex.test(value)),
    licenseNumber: z.coerce
      .number({ message: "licence number is required" })
      .min(7, { message: "licence number is not valid" }),
    age: z.coerce
      .number({ message: "drivers age is required" })
      .min(18, { message: "driver must not be under 18" }),
  });



 const  formLoginSchema = z.object({
    emailOrUsername: z.string().email('Invalid email address').or(z.string().min(3,{message:"username is required "})),
    password: z.string().refine((value) => passwordRegex.test(value), {
      message:
        'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
    }),
  });

  export {formLoginSchema,formSignUpSchema}
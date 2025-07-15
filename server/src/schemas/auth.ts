import { z } from 'zod';
import validator  from "validator";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export const  userLoginSchema = z.object({
  emailOrUsername: z.string().email('Invalid email address').or(z.string().min(3,{message:"username is required "})),
  password: z.string().refine((value) => passwordRegex.test(value), {
    message:
      'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
  }),
});


export const userRegisterSchema=z.object({
  email:z.string({message:"email is required"}).email({message:"email is not valid"}),
  firstName:z.string({message:"firstname is required"}).min(3,{message:"firstname must have at least 3 characters"}),
  username:z.string({message:"username is required"}).min(3,{message:"username must have at least 3 characters"}),
  lastName:z.string({message:"lastname is required"}).min(3,{message:"lastname must have at least 3 characters"}),
  phoneNumber:z.string({message:"phone number is required"}).refine(validator.isMobilePhone),
  password:z.string({message:"password is required"}).refine((value)=>passwordRegex.test(value)),
  receiveEmail:z.boolean({message:"this field is required"}).default(false),
  licenceNumber:z.number({message:"licence number is required"}).min(7,{message:"licence number is not valid"}),
  age:z.number({message:"drivers age is required"}).min(18,{message:"driver must not be under 18"}),
  refreshToken:z.string({message:"refresh is required"}).optional()

})

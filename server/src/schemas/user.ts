
import { z } from 'zod';


export const createUserSchema=z.object({
 email:z.string({message:"email is required"}),
  password:z.string({message:"password is required"}).min(6,{message:"password must have at least 6 characters"}),
lastName:z.string({message:"last name is required"}),
   firstName:z.string({message:"first name is required"}),
  username:z.string({message:"username is required"}),
  phoneNumber:z.string({message:"phone number is required"}),
  driversAge:z.number({message:"drivers age is required"}),
 licenceNumber:z.number({message:"licence number is required "}),
 receiveEmails:z.boolean({message:"receive number"}),

})

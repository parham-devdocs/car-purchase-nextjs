import {  z} from "zod";

export const createLocationModel=z.object({
    city:z.string({message:"city is required"}),
    country:z.string({message:"country is required"}),
    locationType:z.enum(["Airport","Hotel"],{message:"type must be either hotel or airport"}),
    address:z.string({message:"city is required"})
})

export type CreateLocationInput = z.infer<typeof createLocationModel>
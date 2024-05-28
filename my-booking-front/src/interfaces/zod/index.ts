import {z} from "zod";


export const AddressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    houseNumber: z.string().min(1, "House number is required"),
    longitude: z.string()
        .refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -180 && num <= 180;
        }, { message: "Longitude must be between -180 and 180" }),
     latitude: z.string()
         .refine((val) => {
             const num = parseFloat(val);
             return !isNaN(num) && num >= -90 && num <= 90;
         }, { message: "latitude must be between -90 and 90" }),
    cityId: z
        .string()
        .refine((val) => !isNaN(parseFloat(val)), {
            message: "City ID is required",
        })
        .transform((val) => parseInt(val))
        .refine((val) => val > 0, { message: "City ID must be a positive integer" }),
});

export const HotelCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    address: AddressSchema,
    photos: z.any(),
});

export type HotelCreateSchemaType = z.infer<typeof HotelCreateSchema>;
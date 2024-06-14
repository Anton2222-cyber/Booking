import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import { z } from "zod";

export const AddressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    houseNumber: z.string().min(1, "House number is required"),
    longitude: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -180 && num <= 180;
        },
        { message: "Longitude must be between -180 and 180" },
    ),
    latitude: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -90 && num <= 90;
        },
        { message: "latitude must be between -90 and 90" },
    ),
    cityId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "City is required",
    }),
});

export const HotelCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    typeId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Type is required",
    }),
    address: AddressSchema,
    photos: z.any(),
});

export type HotelCreateSchemaType = z.infer<typeof HotelCreateSchema>;

export const RoomCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num > 0;
        },
        { message: "Price must be greater than 0" },
    ),
    adultPlaces: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num > 0;
        },
        { message: "Adult places must be greater than 0" },
    ),
    childrenPlaces: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num);
        },
        { message: "Children places must be a number" },
    ),
    photos: z
        .any()
        .transform((files) => (files ? Array.from(files) : []))
        .refine((files: any[]) => files.length <= 5, `Max photo count is 5.`)
        .refine(
            (files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
            `Max file size is 5MB.`,
        )
        .refine(
            (files: any[]) =>
                files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
            "Only .jpg, .jpeg, .png and .webp files are accepted.",
        ),
    convenienceIds: z.array(z.number()).nonempty("Convenience IDs must be an array and cannot be empty"),
});

export type RoomCreateSchemaType = z.infer<typeof RoomCreateSchema>;

import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { ChangeEvent, useState } from "react";

const ReviewSchema = z.object({
    description: z.string().min(1, "Description is required"),
    score: z.number().min(0, "Score must be at least 0").max(10, "Score must be at most 10"),
    hotelId: z.number().int().min(1, "Hotel ID is required"),
    photos: z.array(z.instanceof(File)).optional(),
});

type ReviewSchemaType = z.infer<typeof ReviewSchema>;

const AddReview = ({ hotelId }: { hotelId: number }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReviewSchemaType>({ resolver: zodResolver(ReviewSchema) });

    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;

        if (file) {
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                for (let i = 0; i < file.length; i++) {
                    const validImageTypes = ["image/gif", "image/jpeg", "image/webp", "image/png"];
                    if (validImageTypes.includes(file[i].type)) {
                        const isDuplicate = updatedFiles.some(
                            (existingFile) => existingFile.name === file[i].name,
                        );
                        if (!isDuplicate) {
                            updatedFiles.push(file[i]);
                        }
                    }
                }
                return updatedFiles;
            });
        }
    };

    const onSubmit: SubmitHandler<ReviewSchemaType> = async (data) => {
        console.log("Review data:", data);
        // You can handle the review submission here, e.g., sending data to an API
    };

    return (
        <div className="w-full ">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("hotelId")} value={hotelId} />

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        id="description"
                        placeholder="Write your review..."
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.description && (
                        <FormError
                            className="mt-2 text-red-600"
                            errorMessage={errors.description.message as string}
                        />
                    )}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="score">
                        Score
                    </label>
                    <Input
                        {...register("score", { valueAsNumber: true })}
                        id="score"
                        type="number"
                        step={0.1}
                        min={0}
                        max={10}
                        placeholder="Rate out of 10"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.score && (
                        <FormError
                            className="mt-2 text-red-600"
                            errorMessage={errors.score.message as string}
                        />
                    )}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="photos">
                        Photos
                    </label>
                    <ImageUpload setFiles={setFiles} remove={() => {}} files={files}>
                        <Input
                            {...register("photos")}
                            onChange={handleFileChange}
                            multiple
                            id="photos"
                            type="file"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </ImageUpload>
                    {errors.photos && (
                        <FormError
                            className="mt-2 text-red-600"
                            errorMessage={errors.photos.message as string}
                        />
                    )}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <Button
                        size="lg"
                        type="submit"
                        className="bg-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Review
                    </Button>
                    <Button
                        size="lg"
                        type="button"
                        onClick={() => setFiles([])}
                        className="bg-sky text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:cursor-not-allowed"
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddReview;

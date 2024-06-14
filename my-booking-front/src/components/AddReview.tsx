import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useAddReviewMutation } from "services/review.ts";
import showToast from "utils/toastShow.ts";
import * as z from "zod";

import { ChangeEvent, useState } from "react";

const ReviewSchema = z.object({
    description: z.string().min(1, "Description is required"),
    photos: z.any(),
});

type ReviewSchemaType = z.infer<typeof ReviewSchema>;

const AddReview = ({ bookingId, isReview }: { bookingId: number; isReview: boolean }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReviewSchemaType>({ resolver: zodResolver(ReviewSchema) });

    const [isAddedReview, setIsAddedReview] = useState(isReview);
    const [rating, setRating] = useState<number>(5);
    const [files, setFiles] = useState<File[]>([]);
    const [create, { isLoading }] = useAddReviewMutation();

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
        try {
            await create({ ...data, bookingId: bookingId, score: rating }).unwrap();
            setIsAddedReview(true);
        } catch (err) {
            showToast(`Помилка додавання відгуку!`, "error");
        }
    };

    const handleRating = (rate: number) => {
        setRating(rate);
    };
    return (
        <div className="w-full ">
            {isAddedReview ? (
                <div className="bg-green/20 border px-4 py-3 rounded relative flex items-center gap-2 justify-center">
                    <strong className="font-bold">Успішно! </strong>
                    <span className=" inline">Ви вже залишили відгук на дане бронювання!</span>
                </div>
            ) : (
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Rating
                            iconsCount={10}
                            initialValue={5}
                            onClick={handleRating}
                            transition
                            allowFraction
                        />
                    </div>
                    <div>
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

                    <div className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            disabled={isLoading}
                            type="submit"
                            className="disabled:bg-sky/20 disabled:cursor-not-allowed"
                        >
                            Відправити
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddReview;

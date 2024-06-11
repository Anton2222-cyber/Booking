import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import { RoomCreateSchema, RoomCreateSchemaType} from "interfaces/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {useAddHotelMutation, useGetAllHotelsQuery} from "services/hotel.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import {useGetAllConveniencesQuery} from "services/convenience.ts";

const RoomCreatePage = () => {
    const { data: hotels } = useGetAllHotelsQuery();
    const {data: conveniences } = useGetAllConveniencesQuery();
    const [files, setFiles] = useState<File[]>([]);
    // const [create, { isLoading }] = useAddHotelMutation();
    // const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<RoomCreateSchemaType>({ resolver: zodResolver(RoomCreateSchema) });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            inputRef.current.files = dataTransfer.files;
        }
        setValue("photos", inputRef.current?.files);
    }, [files, setValue]);

    useEffect(() => {
        reset();
    }, [open, reset]);

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

    const removeImage = (file: string) => {
        setFiles(files.filter((x: File) => x.name !== file));
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        // if (!data.photos?.length) {
        //     setError("photos", {
        //         type: "required",
        //         message: "Hotel images is required!",
        //     });
        //     return;
        // // }
        try {
            // await create({ ...data, photos: files, cityId: Number(data.address.cityId) }).unwrap();
            //
            // navigate(`/search-results?cityId=${data.address.cityId}`);
        } catch (err) {
            console.log("Error created hotel: ", err);
        }
    });

    const onReset = () => {
        reset();
    };

    return (
        <div className="container mx-auto flex justify-center mt-5">
            <div className="w-full p-5">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Add New Room</h1>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div>
                        <label className="text-lightgray text-xl font-main" htmlFor="name">
                            Name
                        </label>
                        <Input {...register("name")} id="name" placeholder="Name..." className="w-full" />
                        {errors?.name && (
                            <FormError className="text-red" errorMessage={errors?.name?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-lightgray text-xl font-main" htmlFor="price">
                            Price
                        </label>
                        <Input
                            {...register("price")}
                            id="price"
                            type="number"
                            min={1.00}
                            step={0.01}
                            placeholder="Price..."
                            className="w-full"
                        />
                        {errors?.price && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.price?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-lightgray text-xl font-main" htmlFor="adultPlaces">
                            Adult places
                        </label>
                        <Input
                            {...register("adultPlaces")}
                            id="adultPlaces"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Adult places..."
                            className="w-full"
                        />
                        {errors?.adultPlaces && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.adultPlaces?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-lightgray text-xl font-main" htmlFor="childrenPlaces">
                            Children places
                        </label>
                        <Input
                            {...register("childrenPlaces")}
                            id="childrenPlaces"
                            type="number"
                            min={0}
                            step={1}
                            placeholder="Children places..."
                            className="w-full"
                        />
                        {errors?.childrenPlaces && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.childrenPlaces?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-lightgray text-xl font-main" htmlFor="typeId">
                            Hotel
                        </label>
                        <select
                            {...register("hotelId", { required: "Type is required" })}
                            id="hotelId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm "
                        >
                            <option disabled value="">
                                Select hotel
                            </option>
                            {hotels?.map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.name}
                                </option>
                            ))}
                        </select>
                        {errors?.hotelId && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.hotelId?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-lightgray text-xl font-main" htmlFor="convenienceIds">
                            Conveniences
                        </label>
                        <div className="flex flex-wrap gap-2 flex-col">
                            {conveniences?.map((convenience) => (
                                <label key={convenience.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        {...register("convenienceIds")}
                                        value={convenience.id}
                                    />
                                    <span>{convenience.name}</span>
                                </label>
                            ))}
                        </div>
                        {errors?.convenienceIds && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.convenienceIds?.message as string}
                            />
                        )}
                    </div>



                    <div>
                        <label className="text-lightgray text-xl font-main" htmlFor="photos">
                            Images
                        </label>
                        <ImageUpload setFiles={setFiles} remove={removeImage} files={files}>
                            <Input
                                {...register("photos")}
                                onChange={handleFileChange}
                                multiple
                                ref={inputRef}
                                id="photos"
                                type="file"
                                className="w-full"
                            />
                        </ImageUpload>
                        {errors?.photos && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.photos?.message as string}
                            />
                        )}
                    </div>

                    <div className=" text-white flex w-full items-center justify-center gap-5">
                        <Button

                            size="lg"
                            type="submit"
                            className="hover:bg-sky/70 disabled:cursor-not-allowed"
                        >
                            <IconCirclePlus />
                            Create
                        </Button>
                        <Button

                            size="lg"
                            type="button"
                            onClick={onReset}
                            className="hover:bg-sky/70 disabled:cursor-not-allowed"
                        >
                            <IconCircleX />
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomCreatePage;

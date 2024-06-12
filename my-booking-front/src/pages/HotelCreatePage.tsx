import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { HotelCreateSchema, HotelCreateSchemaType } from "interfaces/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useAddHotelMutation } from "services/hotel.ts";
import { useGetAllHotelTypesQuery } from "services/hotelTypes.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const HotelCreatePage = () => {
    const { data: cities } = useGetAllCitiesQuery();
    const { data: hotelTypes } = useGetAllHotelTypesQuery();
    const [files, setFiles] = useState<File[]>([]);
    const [create, { isLoading }] = useAddHotelMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<HotelCreateSchemaType>({ resolver: zodResolver(HotelCreateSchema) });

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
    }, [reset]);

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
        try {
            await create({ ...data, photos: files, cityId: Number(data.address.cityId) }).unwrap();

            navigate(`/search-results?cityId=${data.address.cityId}`);
        } catch (err) {
            console.log("Error created hotel: ", err);
        }
    });

    const onReset = () => {
        reset();
    };

    const sortedCities = cities ? [...cities].sort((a, b) => a.name.localeCompare(b.name)) : [];
    const selectedCityId = watch("address.cityId");

    useEffect(() => {
        if (selectedCityId) {
            const selectedCity = cities?.find((city) => city.id === parseInt(selectedCityId));
            if (selectedCity) {
                const minLatitude = selectedCity.latitude - 0.2;
                const maxLatitude = selectedCity.latitude + 0.2;
                const minLongitude = selectedCity.longitude - 0.2;
                const maxLongitude = selectedCity.longitude + 0.2;

                setValue("address.latitude", selectedCity.latitude.toString());
                setValue("address.longitude", selectedCity.longitude.toString());

                const latitudeInput = document.getElementById("latitude");
                const longitudeInput = document.getElementById("longitude");

                if (latitudeInput) {
                    latitudeInput.setAttribute("min", minLatitude.toString());
                    latitudeInput.setAttribute("max", maxLatitude.toString());
                }
                if (longitudeInput) {
                    longitudeInput.setAttribute("min", minLongitude.toString());
                    longitudeInput.setAttribute("max", maxLongitude.toString());
                }
            }
        }
    }, [selectedCityId, cities, setValue]);

    return (
        <div className="container mx-auto flex justify-center mt-5">
            <div className="w-full ">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Add New Hotel</h1>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div>
                        <Label htmlFor="name">Назва:</Label>

                        <Input {...register("name")} id="name" placeholder="Name..." className="w-full" />
                        {errors?.name && (
                            <FormError className="text-red" errorMessage={errors?.name?.message as string} />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="typeId">Тип готелю:</Label>
                        <select
                            {...register("typeId", { required: "Type is required" })}
                            id="typeId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm "
                        >
                            <option disabled value="">
                                Select type
                            </option>
                            {hotelTypes?.map((hotelType) => (
                                <option key={hotelType.id} value={hotelType.id}>
                                    {hotelType.name}
                                </option>
                            ))}
                        </select>
                        {errors?.typeId && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.typeId?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Опис:</Label>

                        <textarea
                            {...register("description")}
                            id="description"
                            placeholder="Description..."
                            className="p-3 border-gray-300 font-normal w-full text-sm placeholder:text-lightgray h-full rounded-md outline-none border"
                        />
                        {errors?.description && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.description?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="address.street">Вулиця:</Label>

                        <Input
                            {...register("address.street")}
                            id="address.street"
                            placeholder="Street..."
                            className="w-full"
                        />
                        {errors?.address?.street && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.street?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="address.houseNumber">№ будинку:</Label>

                        <Input
                            {...register("address.houseNumber")}
                            id="address.houseNumber"
                            placeholder="House Number..."
                            className="w-full"
                        />
                        {errors?.address?.houseNumber && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.houseNumber?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="cityId">Місто:</Label>

                        <select
                            {...register("address.cityId", { required: "City is required" })}
                            id="cityId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm"
                        >
                            <option disabled value="">
                                Select city
                            </option>
                            {sortedCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {errors?.address?.cityId && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.cityId?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="latitude">Широта:</Label>

                        <Input
                            {...register("address.latitude")}
                            id="latitude"
                            type="number"
                            step={0.0000000000000001}
                            placeholder="Latitude..."
                            className="w-full"
                        />
                        {errors?.address?.latitude && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.latitude?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="longitude">Довгота:</Label>

                        <Input
                            {...register("address.longitude")}
                            id="longitude"
                            type="number"
                            step={0.0000000000000001}
                            placeholder="Longitude..."
                            className="w-full"
                        />
                        {errors?.address?.longitude && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.longitude?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="longitude">Фото:</Label>

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
                            disabled={isLoading}
                            size="lg"
                            type="submit"
                            className="hover:bg-sky/70 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <IconCirclePlus />
                            Create
                        </Button>
                        <Button
                            disabled={isLoading}
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

export default HotelCreatePage;

import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import ImageUploadMulti from "components/ui/ImageUploadMulti.tsx";
import { Input } from "components/ui/Input.tsx";
import { HotelCreateSchema, HotelCreateSchemaType } from "interfaces/zod";
import { useForm } from "react-hook-form";
import { useGetAllCitiesQuery } from "services/city.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const HotelCreatePage = () => {
    const { data: cities } = useGetAllCitiesQuery();
    const [files, setFiles] = useState<File[]>([]);
    // const [createProduct, { isLoading }] = useAddProductMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        setError,
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
        console.log("begin validation photo");
        if (!data.photos?.length) {
            setError("photos", {
                type: "required",
                message: "Hotel images is required!",
            });
            return;
        }
        try {
            // await createProduct({ ...data }).unwrap();
            // showToast(`Category ${data.name} successful created!`, "success");
            // close();
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            showToast(`Error created ${data.name} category! ${err.error}`, "error");
        }
    });

    const onReset = () => {
        reset();
    };

    return (
        <div className="flex justify-center p-5">
            <div className="w-full max-w-3xl border rounded-md bg-sky p-5">
                <h1 className="pb-5 text-2xl font-semibold text-center text-white font-main font-bold">
                    Add New Hotel
                </h1>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div>
                        <label className="text-white text-xl font-main" htmlFor="name">
                            Name
                        </label>
                        <Input {...register("name")} id="name" placeholder="Name..." className="w-full" />
                        {errors?.name && <FormError errorMessage={errors?.name?.message as string} />}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="description">
                            Description
                        </label>
                        <Input
                            {...register("description")}
                            id="description"
                            placeholder="Description..."
                            className="w-full"
                        />
                        {errors?.description && (
                            <FormError errorMessage={errors?.description?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="street">
                            Street
                        </label>
                        <Input
                            {...register("address.street")}
                            id="address.street"
                            placeholder="Street..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError errorMessage={errors?.address.street?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="houseNumber">
                            House Number
                        </label>
                        <Input
                            {...register("address.houseNumber")}
                            id="address.houseNumber"
                            placeholder="House Number..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError errorMessage={errors?.address.houseNumber?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="cityId">
                            City
                        </label>
                        <select
                            {...register("address.cityId", { required: "City is required" })}
                            id="cityId"
                            defaultValue={0}
                            className="w-full text-md border px-3 py-1 rounded-sm"
                        >
                            <option disabled value={0}>
                                Select city
                            </option>
                            {cities?.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {errors?.address && (
                            <FormError errorMessage={errors?.address.cityId?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="longitude">
                            Longitude
                        </label>
                        <Input
                            {...register("address.longitude")}
                            id="longitude"
                            type="number"
                            defaultValue={10.0}
                            min={0.01}
                            step={0.01}
                            placeholder="Longitude..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError errorMessage={errors?.address.longitude?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="latitude">
                            Latitude
                        </label>
                        <Input
                            {...register("address.latitude")}
                            id="latitude"
                            type="number"
                            defaultValue={10.0}
                            min={0.01}
                            step={0.01}
                            placeholder="Latitude..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError errorMessage={errors?.address.latitude?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="photos">
                            Images
                        </label>
                        <ImageUploadMulti setFiles={setFiles} remove={removeImage} files={files}>
                            <Input
                                {...register("photos")}
                                onChange={handleFileChange}
                                multiple
                                ref={inputRef}
                                id="photos"
                                type="file"
                                className="w-full"
                            />
                        </ImageUploadMulti>
                        {errors?.photos && <FormError errorMessage={errors?.photos?.message as string} />}
                    </div>

                    <div className=" text-white flex w-full items-center justify-center gap-5">
                        <Button size="lg" type="submit" className="flex items-center gap-2 bg-yellow">
                            <IconCirclePlus />
                            Create
                        </Button>
                        <Button
                            size="lg"
                            type="button"
                            onClick={onReset}
                            className="flex items-center gap-2 bg-red"
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

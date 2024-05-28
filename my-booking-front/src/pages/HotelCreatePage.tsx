 import { zodResolver } from "@hookform/resolvers/zod";
// import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
// import ImageUploadMulti from "components/ImageUploadMulti.tsx";
// import { Button } from "components/ui/Button/button.tsx";
// import FormError from "components/ui/formError.tsx";
// import { Input } from "components/ui/input.tsx";
// import Label from "components/ui/label.tsx";
// import Modal from "components/ui/modal.tsx";
// import Title from "components/ui/title.tsx";
// import { ChangeEvent, useEffect, useRef, useState } from "react";
 import { useForm } from "react-hook-form";
// import { useGetCategoryNamesQuery } from "services/category.ts";
// import { useAddProductMutation } from "services/products.ts";
// import { CreateProductSchema, CreateProductSchemaType } from "types/zod";
// import showToast from "utils/toastUtils.ts";


import {ChangeEvent, useEffect, useRef, useState} from "react";
 import {Input} from "components/ui/Input.tsx";
 import FormError from "components/ui/FormError.tsx";
 import ImageUploadMulti from "components/ui/ImageUploadMulti.tsx";
 import {Button} from "components/ui/Button.tsx";
 import {IconCirclePlus, IconCircleX} from "@tabler/icons-react";
 import {HotelCreateSchema, HotelCreateSchemaType} from "interfaces/zod";
 import {useGetAllCitiesQuery} from "services/city.ts";


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
                        const isDuplicate = updatedFiles.some((existingFile) => existingFile.name === file[i].name);
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
       <>

            <h1 className="pb-5">Add new Hotel</h1>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <Input {...register("name")} id="name" placeholder="Name..." />
                {errors?.name && <FormError errorMessage={errors?.name?.message as string} />}

                <label htmlFor="description">Description</label>
                <Input {...register("description")} id="description" placeholder="Description..." />
                {errors?.description && <FormError errorMessage={errors?.description?.message as string} />}

                <label htmlFor="street">Street</label>
                <Input {...register("address.street")} id="address.street" placeholder="Street..." />
                {errors?.address && <FormError errorMessage={errors?.address.street?.message as string} />}

                <label htmlFor="houseNumber">HouseNumber</label>
                <Input {...register("address.houseNumber")} id="address.houseNumber" placeholder="Street..." />
                {errors?.address && <FormError errorMessage={errors?.address.houseNumber?.message as string} />}

                <label htmlFor="cityId">City</label>
                <select
                    {...register("address.cityId" , { required: "Category is required" })}
                    id="cityId"
                    defaultValue={0}
                    className="flex text-md disabled:cursor-not-allowed disabled:opacity-50 border px-3 py-1 rounded-sm w-full p-2.5"
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
                {errors?.address && <FormError errorMessage={errors?.address.cityId?.message as string} />}

                <label htmlFor="longitude">Longitude</label>
                <Input
                    {...register("address.longitude")}
                    id="longitude"
                    type="number"
                    defaultValue={100.00}
                    min={0.01}
                    step={0.01}
                    placeholder="longitude..."
                />
                {errors?.address && <FormError errorMessage={errors?.address.longitude?.message as string} />}

                <label htmlFor="latitude">Latitude</label>
                <Input
                    {...register("address.latitude")}
                    id="latitude"
                    type="number"
                    defaultValue={100.00}
                    min={0.01}
                    step={0.01}
                    placeholder="latitude..."
                />
                {errors?.address && <FormError errorMessage={errors?.address.latitude?.message as string} />}

                <label htmlFor="photos">Images</label>
                <ImageUploadMulti setFiles={setFiles} remove={removeImage} files={files}>
                    <Input
                        {...register("photos")}
                        onChange={handleFileChange}
                        multiple
                        ref={inputRef}
                        id="photos"

                        type="file"
                    />
                </ImageUploadMulti>
                {errors?.photos && <FormError errorMessage={errors?.photos?.message as string} />}

                <div className="flex w-full items-center justify-center gap-5">
                    <Button  size="lg" type="submit">
                        <IconCirclePlus />
                        Create
                    </Button>
                    <Button size="lg" type="button"  onClick={onReset}>
                        <IconCircleX />
                        Reset
                    </Button>
                </div>
            </form>
       </>
    );
};

export default HotelCreatePage;

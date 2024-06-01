import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { IconPhoto } from "@tabler/icons-react";
import ImageSortableContainer from "components/ImageSortableContainer.tsx";

import React from "react";

type ImageUploadMultiProps = {
    children: React.ReactNode;
    remove: (name: string) => void;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageUpload = (props: ImageUploadMultiProps) => {
    const { children, remove, files, setFiles } = props;

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, keyboardSensor);

    const reOrderFilesArray = (e: DragEndEvent) => {
        if (!e.over) {
            return;
        }

        const { active, over } = e;
        const activeIndex = files.findIndex((file) => file.name === active.id);
        const overIndex = files.findIndex((file) => file.name === over.id);

        if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
            return;
        }

        const newFiles = [...files];
        const [draggedFile] = newFiles.splice(activeIndex, 1);
        newFiles.splice(overIndex, 0, draggedFile);

        setFiles(newFiles);
    };
    return (
        <>
            <div className="mt-2 flex flex-col items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center flex gap-5 items-center">
                    <IconPhoto className="h-28 w-28" />
                    <div className=" gap-2 flex flex-col text-sm leading-6 items-center text-gray-600">
                        <label className="relative cursor-pointer font-semibold text-indigo-600 outline-none">
                            <span>Upload a file</span>
                            {children}
                        </label>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <DndContext sensors={sensors} onDragEnd={reOrderFilesArray}>
                        <SortableContext
                            items={files.map((i) => i.name)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {files.map((file: File) => (
                                <ImageSortableContainer remove={remove} key={file.name} file={file} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </>
    );
};

export default ImageUpload;

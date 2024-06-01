import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconTrash } from "@tabler/icons-react";

type ImageSortableProps = {
    remove: (name: string) => void;
    file: File;
};

const ImageSortableContainer = (props: ImageSortableProps) => {
    const { remove, file } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.name });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Transform.toString(transform), transition: transition, cursor: "grab" }}
        >
            <div className="relative">
                <button
                    type="button"
                    onClick={() => {
                        remove(file.name);
                    }}
                    className="absolute -right-2 -top-2 rounded-full text-red-600 bg-white/80 cursor-pointer"
                >
                    <IconTrash />
                </button>
                <img className="h-28 w-28 object-contain" alt={file.name} src={URL.createObjectURL(file)} />
            </div>
        </div>
    );
};

export default ImageSortableContainer;

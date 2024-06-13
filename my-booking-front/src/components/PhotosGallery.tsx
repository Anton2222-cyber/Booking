import { Photo } from "interfaces/photo";
import { API_URL } from "utils/getEnvData.ts";

import React from "react";

interface PhotosGalleryProps {
    images: Photo[];
}

const PhotosGallery: React.FC<PhotosGalleryProps> = (props) => {
    const { images } = props;

    const getGridClass = (index: number) => {
        switch (index) {
            case 0:
                return "col-span-2 row-span-2";
            case 1:
                return "col-span-2 row-span-1";
            case 2:
                return "col-span-2 row-span-1";
            case 3:
                return "col-span-1 row-span-1";

            default:
                return "col-span-1 row-span-1";
        }
    };
    return (
        <div className="col-span-6 grid grid-cols-6 gap-4 overflow-hidden">
            {images.map((photo, index) => (
                <div
                    key={index}
                    className={`rounded-lg overflow-hidden transform transition duration-500 hover:shadow-2xl hover:scale-105 ${getGridClass(index)}`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={`${API_URL}/images/800_${photo.name}`}
                        alt="gallery-photo"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default PhotosGallery;

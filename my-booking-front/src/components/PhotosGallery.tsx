import { Photo } from "interfaces/photo";
import { API_URL } from "utils/getEnvData.ts";

import React from "react";

interface PhotosGalleryProps {
    images: Photo[];
}

const PhotosGallery: React.FC<PhotosGalleryProps> = (props) => {
    const { images } = props;

    const getGridClass = (index: number) => {
        if (index % 7 === 0) {
            return "col-span-2 row-span-1";
        }
        if (index % 5 === 0) {
            return "col-span-2 row-span-1";
        }
        return "col-span-1";
    };

    return (
        <div className="col-span-6 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
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

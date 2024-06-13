import { Photo } from "interfaces/photo";
import { API_URL } from "utils/getEnvData.ts";

import React, { useState } from "react";

interface GalleryViewerProps {
    photos: Photo[];
}

const GalleryViewer: React.FC<GalleryViewerProps> = (props) => {
    const { photos } = props;
    const [active, setActive] = useState<string>(photos[0].name);

    return (
        <div className="md:flex-1 pe-4">
            <div className="grid gap-4">
                <div>
                    <img
                        className="h-80 w-full max-w-full object-fill"
                        src={`${API_URL}/images/1200_${active}`}
                        alt="main gallery-image"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {photos.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg">
                            <img
                                onClick={() => setActive(image.name)}
                                src={`${API_URL}/images/200_${image.name}`}
                                className="h-24 w-24 cursor-pointer object-cover object-center"
                                alt="gallery-image"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryViewer;

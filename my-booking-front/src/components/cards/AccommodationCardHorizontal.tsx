import { IconMapPin } from "@tabler/icons-react";
import { getRatingDescription } from "utils/getRating.ts";

import React from "react";

const AccommodationCardHorizontal: React.FC<IAccommodationCardProps> = (props) => {
    const { name, location, rating, numberOfReviews, imageSrc } = props;
    const ratingDescription = getRatingDescription(rating);

    return (
        <div className="w-full font-main bg-white rounded-lg shadow-lg overflow-hidden flex">
            <div className="overflow-hidden rounded-t-lg">
                <img className="bg-yellow h-32 w-52 object-cover" src={imageSrc} alt={name} />
            </div>
            <div className="px-4 py-2 flex flex-col justify-center gap-2">
                <h3 className="font-bold font-main text-xl text-black  ">{name}</h3>
                <div className="flex items-center text-xs">
                    <div className="bg-blue text-white text-sm font-main font-bold rounded-md w-7 h-7 flex items-center justify-center">
                        {rating}
                    </div>
                    <span className="ml-2 text-black">{ratingDescription}</span>
                    <span className="mx-2 text-gray">•</span>
                    <span className="text-gray">{numberOfReviews} reviews</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-black">
                    <IconMapPin className="h-7 w-7" />
                    <p className="font-main">{location}</p>
                    <span className="mx-1">•</span>
                    <span>40 km to center</span>
                </div>
            </div>
        </div>
    );
};

export default AccommodationCardHorizontal;

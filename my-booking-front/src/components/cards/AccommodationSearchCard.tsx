import { getRatingDescription } from "utils/getRating.ts";

import React from "react";

const AccommodationSearchCard: React.FC<IAccommodationCardProps> = (props) => {
    const { name, location, rating, imageSrc } = props;
    const ratingDescription = getRatingDescription(rating);

    return (
        <div className="max-w-64 mx-auto font-main bg-white overflow-hidden cursor-pointer">
            <div className="overflow-hidden rounded-lg">
                <img className="h-64 w-full object-cover" src={imageSrc} alt={name} />
            </div>
            <div className="py-3 text-xs text-gray flex flex-col gap-0.5">
                <p>{location}</p>
                <h1 className="text-black font-semibold text-sm">{name}</h1>
                <p className="text-sm">{`${rating} ${ratingDescription}`}</p>
                <p className="text-sm">Від UAH 3 500</p>
            </div>
        </div>
    );
};

export default AccommodationSearchCard;

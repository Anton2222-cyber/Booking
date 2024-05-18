import {IAccommodationCardProps} from "../../interfaces/cards/index.ts";
import React from 'react';

const AccommodationCard: React.FC<IAccommodationCardProps> = ({ imageSrc, title }) => {
    return (
        <div className="max-w-xs mx-auto">
            <div className="rounded overflow-hidden  p-2">
                <div className="mb-2">
                    <img className="w-full h-48 object-cover rounded-lg" src={imageSrc} alt={title} />
                </div>
                <div className="px-2 py-2">
                    <div className="text-black font-main font-bold">{title}</div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationCard;

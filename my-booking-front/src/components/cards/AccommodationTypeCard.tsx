import React from "react";

const AccommodationTypeCard: React.FC<IAccommodationTypeCardProps> = ({ imageSrc, title }) => {
    return (
        <div className="w-full max-w-xs mx-auto">
            <div className="rounded overflow-hidden ">
                <div className="mb-2">
                    <img className="w-full h-48 object-cover rounded-lg" src={imageSrc} alt={title} />
                </div>
                <div className="py-2">
                    <div className="text-black font-main font-bold">{title}</div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationTypeCard;

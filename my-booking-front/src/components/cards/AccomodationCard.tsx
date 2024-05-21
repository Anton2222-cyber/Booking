import React from "react";

const getRatingDescription = (rating: number): string => {
    if (rating >= 9.5) return "Відмінно";
    if (rating >= 9.0) return "Чудово";
    if (rating < 9.0) return "Блискуче";

    return "Задовільно";
};

const AccommodationCard: React.FC<IAccommodationCardProps> = ({
    imageSrc,
    name,
    location,
    rating,
    numberOfReviews,
}) => {
    const ratingDescription = getRatingDescription(rating);

    return (
        <div className="w-full max-w-xs mx-auto font-main bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-hidden rounded-t-lg">
                <img className="w-full h-48 object-cover" src={imageSrc} alt={name} />
            </div>
            <div className="px-4 py-4">
                <h3 className="font-bold font-main text-md text-black mb-2">{name}</h3>
                <p className="text-gray  text-xs font-main mb-2">{location}</p>
                <div className="flex  items-center text-xs">
                    <div className="bg-blue text-white  font-main font-bold rounded-md rounded-bl-none  w-7 h-7 flex items-center justify-center">
                        {rating}
                    </div>
                    <span className="ml-2 text-gray">{ratingDescription}</span>
                    <span className="mx-2 text-gray">•</span>
                    <span className="text-gray">{numberOfReviews} reviews</span>
                </div>
            </div>
        </div>
    );
};

export default AccommodationCard;

import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { Hotel } from "interfaces/hotel";
import { API_URL } from "utils/getEnvData.ts";
import { getRatingDescription } from "utils/getRating.ts";

import React, { useState } from "react";

// Переконайтеся, що ви встановили цю бібліотеку

const HotelCard: React.FC<Hotel> = (props) => {
    const { name, rating, description, photos, address } = props;
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const ratingText = getRatingDescription(rating);

    return (
        <div className="relative flex border border-lightgray/20 rounded-lg p-4 ">
            <div className="relative flex-none w-60">
                <img
                    src={`${API_URL}/images/800_${photos[0].name}`}
                    alt={name}
                    className="w-full h-60 object-cover rounded-lg"
                />
                <div
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer w-9 h-9 flex items-center justify-center"
                >
                    {isFavorite ? (
                        <IconHeartFilled size={20} color="red" />
                    ) : (
                        <IconHeart size={20} color="black" />
                    )}
                </div>
            </div>
            <div className="ml-4 flex-grow">
                <h2 className="text-xl text-sky text-extrabold font-bold hover:text-black cursor-pointer">
                    {name}
                </h2>
                <div className="text-xs mt-1">
                    <a href="#" className="text-sky underline">
                        {address.city.name}
                    </a>
                    <span className="mx-1 text-gray/20">&bull;</span>
                    <a href="#" className="text-sky underline">
                        Показати на карті
                    </a>
                    <span className="mx-1 text-gray/20">&bull;</span>
                    <span className="mx-1">{100} км від центру</span>
                </div>
                <div className="flex items-center mt-2 text-xs">{description}</div>
            </div>
            <div className="text-right flex flex-col gap-5 ml-4">
                <div className="flex items-center justify-end">
                    <div>
                        <span className="text-base font-semibold">{ratingText}</span>
                        <p className="text-gray text-xs -mt-1">{77} відгуків</p>
                    </div>
                    <div className="flex items-center ml-2">
                        <div className="bg-blue text-white text-sm font-main font-bold rounded-md rounded-bl-none w-8 h-8 flex items-center justify-center">
                            {rating}
                        </div>
                    </div>
                </div>
                <Button variant="primary" size="lg" className="text-nowrap">
                    Показати ціни
                </Button>
            </div>
        </div>
    );
};

export default HotelCard;

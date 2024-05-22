import React, { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import {Button} from "components/ui/Button.tsx";
import {getRatingDescription} from "utils/getRating.ts"; // Переконайтеся, що ви встановили цю бібліотеку



const HotelCard: React.FC<IHotelCardProps> = ({
                                                  hotelName,
                                                  description,
                                                  location,
                                                  distanceFromCenter,
                                                  imageUrl,
                                                  rating,
                                                  reviewCount,
                                              }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const ratingText = getRatingDescription(rating);

    return (
        <div className="relative flex border border-lightgray/20 rounded-lg p-4 ">
            <div className="relative flex-none w-60">
                <img
                    src={imageUrl}
                    alt="Hotel"
                    className="w-full h-60 object-cover rounded-lg"
                />
                <div
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer w-9 h-9 flex items-center justify-center"
                    style={{ width: '36px', height: '36px' }}
                >
                    {isFavorite ? (
                        <IconHeartFilled size={20} color="red" />
                    ) : (
                        <IconHeart size={20} stroke={2} color="black" />
                    )}
                </div>
            </div>
            <div className="ml-4 flex-grow">
                <h2 className="text-xl text-sky text-extrabold font-bold hover:text-black cursor-pointer">
                    {hotelName}
                </h2>
                <div className="text-xs mt-1">
                    <a href="#" className="text-sky underline">{location}</a>
                    <span className="mx-1 text-gray/20">&bull;</span>
                    <a href="#" className="text-sky underline">Показати на карті</a>
                    <span className="mx-1 text-gray/20">&bull;</span>
                    <span className="mx-1">{distanceFromCenter} км від центру</span>
                </div>
                <div className="flex items-center mt-2 text-xs">
                    {description}
                </div>
            </div>
            <div className=" top-4 right-4 text-right ml-4">
                <div className="flex items-center justify-end">
                    <div>
                        <span className="text-base font-semibold">{ratingText}</span>
                        <p className="text-gray text-xs -mt-1">{reviewCount} відгуків</p>
                    </div>
                    <div className="flex items-center ml-2">
                        <div
                            className="bg-blue text-white text-sm font-main font-bold rounded-md w-8 h-8 flex items-center justify-center"
                            style={{ borderRadius: '7px 7px 7px 0' }}
                        >
                            {rating}
                        </div>
                    </div>
                </div>
                <Button variant="primary" className="mt-5 px-3 py-1 h-9 bg-sky text-sm font-semibold text-white rounded-md whitespace-nowrap">
                    Показати ціни
                </Button>
            </div>
        </div>
    );
};

export default HotelCard;

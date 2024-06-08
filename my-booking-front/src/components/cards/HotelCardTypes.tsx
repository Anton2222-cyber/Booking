import { Button } from "components/ui/Button.tsx";
import { Hotel } from "interfaces/hotel";
import { Link } from "react-router-dom";
import { API_URL } from "utils/getEnvData.ts";
import { getRatingDescription } from "utils/getRating.ts";

import React from "react";

const HotelCardTypes: React.FC<Hotel> = (props) => {
    const { id, name, photos, description, rating, reviews, address } = props;

    const ratingDescription = getRatingDescription(rating);

    return (
        <div className="max-w-sm mx-auto font-main bg-white border border-lightgray/20 rounded-lg overflow-hidden">
            <div className="overflow-hidden rounded-t-lg">
                <img
                    className="w-full h-60 object-cover"
                    src={`${API_URL}/images/800_${photos[0].name}`}
                    alt={name}
                />
            </div>
            <div className="px-4 py-4">
                <h3 className="font-bold font-main text-xl text-black mb-2">{name}</h3>
                <p className="text-gray font-main mb-2">
                    {address.city.name}, {address.city.country.name}
                </p>
                <div className="flex items-center">
                    <div className="bg-blue text-white text-sm font-main font-bold rounded-md w-7 h-7 flex items-center justify-center">
                        {rating.toFixed(1)}
                    </div>
                    <span className="ml-2 text-sm">{ratingDescription}</span>
                    <span className="mx-2 text-sm text-lightgray">•</span>
                    <span className="text-sm text-lightgray">{reviews} reviews</span>
                </div>
                <p className="text-gray text-sm font-main mt-4 line-clamp-3">{description}</p>
                <Link to={`/hotel/${id}`} className="text-sky underline text-sm font-main mt-2 ">
                    Показати більше
                </Link>

                <Link to={`/hotel/${id}`}>
                    <Button variant="lightborder" size="sm">
                        Забронювати ці апартаменти
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HotelCardTypes;

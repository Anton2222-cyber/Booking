import NotFoundImage from "assets/icon-image-not-found-free-vector.jpg";
import { Hotel } from "interfaces/hotel";
import { Link } from "react-router-dom";
import { API_URL } from "utils/getEnvData.ts";
import { getRatingDescription } from "utils/getRating.ts";

import React from "react";

const AccommodationCard: React.FC<Hotel> = (props) => {
    const { id, name, rating, reviews, photos, address } = props;

    const ratingDescription = getRatingDescription(rating);

    return (
        <Link
            to={`/hotel/${id}`}
            className="w-full max-w-xs mx-auto font-main bg-white rounded-lg shadow-lg overflow-hidden"
        >
            <div className="overflow-hidden rounded-t-lg">
                <img
                    className="w-full h-48 object-cover"
                    src={photos.length > 0 ? `${API_URL}/images/800_${photos[0].name}` : NotFoundImage}
                    alt={name}
                />
            </div>
            <div className="px-4 py-4">
                <h3 className="font-bold font-main text-md text-black mb-2 truncate">{name}</h3>
                <p className="text-gray  text-xs font-main mb-2">{`${address.city.name}, ${address.city.country.name}`}</p>
                <div className="flex  items-center text-xs">
                    <div className="bg-blue text-white  font-main font-bold rounded-md rounded-bl-none  w-7 h-7 flex items-center justify-center">
                        {rating.toPrecision(2)}
                    </div>
                    <span className="ml-2 text-gray">{ratingDescription}</span>
                    <span className="mx-2 text-gray">•</span>
                    <span className="text-gray">{reviews} відгуків</span>
                </div>
            </div>
        </Link>
    );
};

export default AccommodationCard;

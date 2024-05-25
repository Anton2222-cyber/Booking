import NotFoundImage from "assets/icon-image-not-found-free-vector.jpg";
import { Hotel } from "interfaces/hotel";
import { Link } from "react-router-dom";
import { API_URL } from "utils/getEnvData.ts";
import { getRatingDescription } from "utils/getRating.ts";

import React from "react";

const MapHotelCard: React.FC<Hotel> = (props) => {
    const { id, name, rating, reviews, photos } = props;

    return (
        <div className="max-w-xs rounded overflow-hidden flex gap-3">
            <img
                src={photos.length > 0 ? `${API_URL}/images/800_${photos[0].name}` : NotFoundImage}
                alt={name}
                className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
                <h2 className="text-sm text-black text-extrabold font-bold">{name}</h2>

                <div className="flex items-center gap-2">
                    <div className="flex items-center ">
                        <div className="bg-blue text-white text-sm font-main font-bold rounded-md rounded-bl-none w-8 h-8 flex items-center justify-center">
                            {rating.toFixed(1)}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center ">
                        <span className="text-sm font-semibold">{getRatingDescription(rating)}</span>
                        <span className="text-gray  text-xs ">{reviews} відгуків</span>
                    </div>
                </div>

                <div className="text-xs mt-1">
                    <Link to={`/hotel/${id}`} className="text-sky underline">
                        Переглянути деталі
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MapHotelCard;

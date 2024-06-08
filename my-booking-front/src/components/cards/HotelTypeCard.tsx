import { HotelTypes } from "interfaces/hotelTypes";
import { Link } from "react-router-dom";

import React from "react";

const HotelTypeCard: React.FC<HotelTypes> = (props) => {
    const { id, name } = props;

    return (
        <Link to={`/search-types/${id}`} className="w-full max-w-xs mx-auto">
            <div className="rounded overflow-hidden ">
                <div className="mb-2">
                    <img
                        className="w-full h-48 object-cover rounded-lg"
                        src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                        alt={name}
                    />
                </div>
                <div className="py-2">
                    <div className="text-black font-main font-bold">{name}</div>
                </div>
            </div>
        </Link>
    );
};

export default HotelTypeCard;

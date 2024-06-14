import { Hotel } from "interfaces/hotel";
import { Link } from "react-router-dom";
import { useGetPageRoomsQuery } from "services/rooms.ts";
import { API_URL } from "utils/getEnvData.ts";
import { getRatingDescription } from "utils/getRating.ts";

import React from "react";

const HotelSearchCard: React.FC<Hotel> = (props) => {
    const { id, name, address, rating, photos } = props;

    const { data } = useGetPageRoomsQuery({
        hotelId: id,
    });

    const prices = data?.data?.map((item) => item.price) || [];
    const minPrice = prices.length > 0 ? Math.min(...prices) : "недоступно";
    const ratingDescription = getRatingDescription(rating);

    return (
        <Link
            to={`/hotel/${id}`}
            className="max-w-64 mx-auto font-main bg-white overflow-hidden cursor-pointer"
        >
            <div className="overflow-hidden rounded-lg">
                <img
                    className="h-64 w-full object-cover"
                    src={`${API_URL}/images/400_${photos[0].name}`}
                    alt={name}
                />
            </div>
            <div className="py-3 text-xs text-gray flex flex-col gap-0.5">
                <p>{address.city.name}</p>
                <h1 className="text-black font-semibold text-sm">{name}</h1>
                <p className="text-sm">{`${rating.toFixed(1)} ${ratingDescription}`}</p>
                <p className="text-sm">Від UAH {minPrice}</p>
            </div>
        </Link>
    );
};

export default HotelSearchCard;

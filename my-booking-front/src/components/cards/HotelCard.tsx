import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import NotFoundImage from "assets/icon-image-not-found-free-vector.jpg";
import { Button } from "components/ui/Button.tsx";
import { Hotel } from "interfaces/hotel";
import { Link } from "react-router-dom";
import {
    useAddToFavoriteMutation,
    useGetUserFavoriteHotelsQuery,
    useRemoveFromFavoriteMutation,
} from "services/favoriteHotels.ts";
import { API_URL } from "utils/getEnvData.ts";
import { getRatingDescription } from "utils/getRating.ts";
import { haversineDistance } from "utils/haversineDistance.ts";
import showToast from "utils/toastShow.ts";

import React from "react";

const HotelCard: React.FC<Hotel> = (props) => {
    const { id, name, rating, reviews, description, photos, address } = props;
    const [addToFavorite] = useAddToFavoriteMutation();
    const [removeFromFavorite] = useRemoveFromFavoriteMutation();
    const { data: favoriteHotels } = useGetUserFavoriteHotelsQuery();

    const handleFavoriteClick = async () => {
        if (!favoriteHotels?.data.some((hotel) => hotel.id === id)) {
            await addToFavorite(id);
            showToast(`${name} додано в обране`, "success");
        } else {
            await removeFromFavorite(id);
            showToast(`${name} видалено з обраного`, "error");
        }
    };

    return (
        <div className="relative flex border border-lightgray/20 rounded-lg p-4 ">
            <div className="relative flex-none w-60">
                <img
                    src={photos.length > 0 ? `${API_URL}/images/800_${photos[0].name}` : NotFoundImage}
                    alt={name}
                    className="w-full h-60 object-cover rounded-lg"
                />

                <div
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer w-9 h-9 flex items-center justify-center"
                >
                    {favoriteHotels?.data.some((hotel) => hotel.id === id) ? (
                        <IconHeartFilled size={20} color="red" />
                    ) : (
                        <IconHeart size={20} color="black" />
                    )}
                </div>
            </div>
            <div className="ml-4 flex-grow">
                <Link to={`/hotel/${id}`}>
                    <h2 className="text-xl text-sky text-extrabold font-bold hover:text-black cursor-pointer">
                        {name}
                    </h2>
                </Link>

                <div className="text-xs mt-1">
                    <a href="#" className="text-sky underline">
                        {address.city.name}
                    </a>
                    <span className="mx-1 text-gray/20">&bull;</span>
                    <a href="#" className="text-sky underline">
                        Показати на карті
                    </a>
                    <span className="mx-1 text-gray/20">&bull;</span>
                    <span className="mx-1">
                        {haversineDistance(
                            address.latitude,
                            address.longitude,
                            address.city.latitude,
                            address.city.longitude,
                        ).toFixed(2)}{" "}
                        км від центру
                    </span>
                </div>
                <p className=" mt-2 text-xs line-clamp-[11]">{description}</p>
            </div>
            <div className="text-right flex flex-col gap-5 ml-4">
                <div className="flex items-center justify-end">
                    <div>
                        <span className="text-base font-semibold">{getRatingDescription(rating)}</span>
                        <p className="text-gray text-xs -mt-1">{reviews} відгуків</p>
                    </div>
                    <div className="flex items-center ml-2">
                        <div className="bg-blue text-white text-sm font-main font-bold rounded-md rounded-bl-none w-8 h-8 flex items-center justify-center">
                            {rating.toFixed(1)}
                        </div>
                    </div>
                </div>
                <Link to={`/hotel/${id}`}>
                    <Button variant="primary" size="lg" className="text-nowrap">
                        Показати ціни
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HotelCard;

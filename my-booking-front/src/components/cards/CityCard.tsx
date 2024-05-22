import { City } from "interfaces/city";
import { useAppSelector } from "store/index.ts";
import { getUserLocation } from "store/slice/userSlice.ts";
import { API_URL } from "utils/getEnvData.ts";
import { haversineDistance } from "utils/haversineDistance.ts";

import React from "react";

const CityCard: React.FC<City> = (props) => {
    const { name, image, latitude, longitude } = props;
    const location = useAppSelector(getUserLocation);

    const distance = haversineDistance(
        latitude,
        longitude,
        location?.latitude || 0,
        location?.longitude || 0,
    );

    return (
        <div className=" w-full max-w-xs mx-auto">
            <div className="rounded overflow-hidden ">
                <div className="mb-2">
                    <img
                        className="w-full h-36 object-cover rounded-lg"
                        src={`${API_URL}/images/800_${image}`}
                        alt={name}
                    />
                </div>
                <div className="py-0.5">
                    <div className="text-black font-main font-bold">{name}</div>
                </div>
                <div className="py-0.5">
                    <div className="text-gray text-sm font-main">за {Math.ceil(distance)} км</div>
                </div>
            </div>
        </div>
    );
};

export default CityCard;

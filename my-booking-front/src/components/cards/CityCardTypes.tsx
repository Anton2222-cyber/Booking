import { City } from "interfaces/city";
import { useNavigate } from "react-router-dom";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { API_URL } from "utils/getEnvData.ts";

import React from "react";

const CityCardTypes: React.FC<City> = (props) => {
    const { id, name, country, image } = props;
    const navigate = useNavigate();

    const { data: hotels } = useGetPageHotelsQuery({
        address: {
            city: {
                id: id,
            },
        },
    });
    const handleClick = () => {
        const queryParams = new URLSearchParams({
            cityId: id.toString(),
            destination: name,
        });

        navigate(`/search-results?${queryParams.toString()}`);
    };
    return (
        <div
            onClick={handleClick}
            className="max-w-xs mx-auto border border-lightgray/20 rounded-lg overflow-hidden cursor-pointer"
        >
            <img className="w-full rounded-t-lg" src={`${API_URL}/images/800_${image}`} alt={name} />
            <div className="flex flex-col gap-1 px-4 py-4">
                <p className="font-bold font-main line-clamp-1">{name}</p>
                <p className="text-lightgray text-sm line-clamp-1">{country.name}</p>
                <p className="font-main text-black font-bold text-sm  line-clamp-1">
                    {hotels?.data.length} помешкань
                </p>
            </div>
        </div>
    );
};

export default CityCardTypes;

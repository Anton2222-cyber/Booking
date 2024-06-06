import { City } from "interfaces/city";


import React from "react";

const CityCardTest: React.FC<City> = ({ name, image, country }) => {
    return (
        <div className="max-w-xs mx-auto border border-lightgray/20 rounded-lg overflow-hidden">
            <img
                className="w-full rounded-t-lg"
                src={image}
                alt={name}
            />
            <div className="px-4 py-4">
                <div className="font-bold font-main text-base mb-2">{name}</div>
                <p className="text-lightgray text-sm">
                    {country.name}
                </p>
                <p className="font-main text-black font-bold text-sm mt-4">
                    12797 апартаментів
                </p>
            </div>
        </div>
    );
};

export default CityCardTest;

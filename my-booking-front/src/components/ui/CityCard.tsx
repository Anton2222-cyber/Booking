import React from "react";

const CityCard: React.FC<ICityCardProps> = ({ imageSrc, cityName, geolocation }) => {
    return (
        <div className=" w-full max-w-xs mx-auto">
            <div className="rounded overflow-hidden ">
                <div className="mb-2">
                    <img className="w-full h-36 object-cover rounded-lg" src={imageSrc} alt={cityName} />
                </div>
                <div className="py-0.5">
                    <div className="text-black font-main font-bold">{cityName}</div>
                </div>
                <div className="py-0.5">
                    <div className="text-gray text-sm font-main">за {geolocation} км</div>
                </div>
            </div>
        </div>
    );
};

export default CityCard;


import React from 'react';

const CityCard: React.FC<ICityCardProps> = ({ imageSrc, cityName, geolocation }) => {
    return (
        <div className="max-w-xs mx-auto">
            <div className="rounded overflow-hidden  p-2">
                <div className="mb-2">
                    <img className="w-full h-48 object-cover rounded-lg" src={imageSrc} alt={cityName} />
                </div>
                <div className="px-1 py-1">
                    <div className="text-black font-main font-bold">{cityName}</div>
                </div>
                <div className="px-1 py-1">
                    <div className="text-gray font-main ">за {geolocation} км</div>
                </div>
            </div>
        </div>
    );
};

export default CityCard;

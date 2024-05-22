import { IconMapPin } from "@tabler/icons-react";
import { useGetPageCitiesQuery } from "services/city.ts";

import React from "react";

interface ISearchCityAutocompleteProps {
    destination: string;
    setDestination: (value: string) => void;
    setIsFocused: (value: boolean) => void;
}

const SearchCityAutocomplete: React.FC<ISearchCityAutocompleteProps> = (props) => {
    const { destination, setDestination, setIsFocused } = props;

    const { data, isSuccess } = useGetPageCitiesQuery({
        name: destination,
        pageSize: 5,
        isRandomItems: true,
    });

    return (
        <div className="z-50 absolute mt-2 mb-2 top-full overflow-hidden rounded-md bg-white text-sm shadow w-full">
            {!isSuccess ? (
                <>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="p-2 animate-pulse flex items-center">
                            <IconMapPin className="w-6 h-6 text-gray mr-2" />
                            <div className="w-full">
                                <div className="h-4 bg-gray/20 rounded w-1/2"></div>
                                <div className="mt-2 h-4 bg-gray/20 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                data?.data?.map((city, index) => (
                    <div
                        onClick={() => {
                            setDestination(city.name);
                            setIsFocused(false);
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setDestination(city.name);
                            setIsFocused(false);
                        }}
                        key={index}
                        className="p-2 hover:bg-gray/20 cursor-pointer flex items-center"
                    >
                        <IconMapPin className="w-6 h-6 text-gray mr-2" />
                        <div>
                            <div className="font-bold">{city.name}</div>
                            <div className="text-sm text-gray">{city.country.name}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchCityAutocomplete;

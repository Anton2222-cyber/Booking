import { IconBed, IconCalendarWeek, IconMinus, IconUserFilled } from "@tabler/icons-react";
import SearchCityAutocomplete from "components/SearchCityAutocomplete.tsx";
import SelectPerson from "components/SelectPerson.tsx";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";

interface IHeroProps {
    title: string;
    subtitle: string;
    isButton: boolean;
    path?: string;
    img: string;
}

const Hero: React.FC<IHeroProps> = (props) => {
    const { title, subtitle, isButton, img, path } = props;
    const navigate = useNavigate();

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const [destination, setDestination] = useState<string>("");

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [adults, setAdults] = useState<number>(1);
    const [rooms, setRooms] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);

    // const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSearch = () => {
        if (destination.length < 3) {
            // setErrorMessage("Запит повинен бути не менше 3 символів.");
            return;
        }

        // setErrorMessage("");

        const queryParams = new URLSearchParams({
            destination,
            startDate: startDate ? startDate.toISOString() : "",
            endDate: endDate ? endDate.toISOString() : "",
            adults: adults.toString(),
            rooms: rooms.toString(),
            children: children.toString(),
        });

        navigate(`/search-results?${queryParams.toString()}`);
    };

    return (
        <div className={`h-96 bg-cover ${img}`}>
            <div className=" h-full container mx-auto">
                <div className="relative h-full grid grid-cols-2 pt-12 pb-24">
                    <div className="text-white col-span-1 flex flex-col justify-between">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">{title}</h1>
                            <h3 className="col-span-1 text-white text-3xl">{subtitle}</h3>
                        </div>
                        {isButton && (
                            <Link to={path || "/"}>
                                <Button variant="primary" size="lg">
                                    Шукати помешкання для відпустки
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="absolute -bottom-6 left-0 right-0 bg-yellow p-1 rounded-md flex gap-1">
                        <div
                            onMouseDown={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="relative flex-grow"
                        >
                            <label
                                htmlFor="destination"
                                className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                            >
                                <IconBed className="text-lightgray" />
                            </label>
                            <Input
                                value={destination}
                                variant="withIcon"
                                id="destination"
                                placeholder="Куди ви вирушаєте?"
                                onChange={(e) => setDestination(e.target.value)}
                            />
                            {isFocused && (
                                <SearchCityAutocomplete
                                    setIsFocused={setIsFocused}
                                    destination={destination}
                                    setDestination={setDestination}
                                />
                            )}
                            {/*{errorMessage && (*/}
                            {/*    <div className="z-50 absolute mt-2 mb-2 top-full overflow-hidden rounded-md bg-white text-sm shadow w-full text-red-500">*/}
                            {/*        {errorMessage}*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>

                        <div className="z-50 flex bg-white rounded-md  border border-white hover:border-yellow">
                            <div className="relative flex items-center">
                                <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                                    <IconCalendarWeek className="text-lightgray z-50" />
                                </div>

                                <DatePicker
                                    className="placeholder:text-lightgray font-bold w-44 outline-none ps-10 text-sm"
                                    selected={startDate}
                                    minDate={new Date()}
                                    maxDate={
                                        endDate ? new Date(new Date().setDate(endDate.getDate() - 1)) : null
                                    }
                                    placeholderText="Заїзд"
                                    onChange={(date: Date) => setStartDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>
                            <div className="relative flex items-center">
                                <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                                    <IconMinus className="text-lightgray z-50" />
                                </div>

                                <DatePicker
                                    className="placeholder:text-lightgray font-bold w-44 outline-none text-sm ps-10"
                                    placeholderText="Виїзд"
                                    selected={endDate}
                                    minDate={
                                        startDate
                                            ? new Date(new Date().setDate(startDate.getDate() + 1))
                                            : new Date(new Date().setDate(new Date().getDate() + 1))
                                    }
                                    onChange={(date: Date) => setEndDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>
                        </div>

                        <div className="relative bg-white rounded-md  border border-white hover:border-yellow">
                            <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                                <IconUserFilled className="text-lightgray z-50" />
                            </div>
                            <SelectPerson
                                adults={adults}
                                children={children}
                                rooms={rooms}
                                setAdults={setAdults}
                                setChildren={setChildren}
                                setRooms={setRooms}
                            />
                        </div>
                        <Button variant="primary" size="xl" onClick={handleSearch}>
                            Шукати
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

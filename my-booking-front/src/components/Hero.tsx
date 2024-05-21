import { IconBed, IconCalendarWeek, IconMinus, IconUserFilled } from "@tabler/icons-react";
import SelectPerson from "components/SelectPerson.tsx";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

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

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <div className={`h-96 bg-[url('${img}')] bg-cover`}>
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
                        <div className="relative flex-grow">
                            <label
                                htmlFor="destination"
                                className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                            >
                                <IconBed className="text-lightgray" />
                            </label>
                            <Input id="destination" placeholder="Куди ви вирушаєте?" />
                        </div>

                        <div className="  flex bg-white rounded-md  border border-white hover:border-yellow">
                            <div className="relative flex items-center">
                                <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                                    <IconCalendarWeek className="text-lightgray z-50" />
                                </div>

                                <DatePicker
                                    className="placeholder:text-lightgray font-bold w-44 outline-none ps-10 text-sm"
                                    selected={startDate}
                                    minDate={new Date()}
                                    maxDate={endDate}
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
                                    minDate={startDate || new Date()}
                                    onChange={(date: Date) => setEndDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>
                        </div>

                        <div className="relative bg-white rounded-md  border border-white hover:border-yellow">
                            <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                                <IconUserFilled className="text-lightgray z-50" />
                            </div>
                            <SelectPerson />
                        </div>
                        <Button variant="primary" size="xl">
                            Шукати
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

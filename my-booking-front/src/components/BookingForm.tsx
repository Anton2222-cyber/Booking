import { IconUserFilled } from "@tabler/icons-react";
import SelectPerson from "components/SelectPerson";
import { Button } from "components/ui/Button";

import React from "react";

import DatePickers from "./DatePickers";

interface BookingFormProps {
    adults: number;
    children: number;
    room: number;
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    setAdults: (value: number) => void;
    setChildren: (value: number) => void;
    setRooms: (value: number) => void;
    scrollToRooms: () => void;
}

const BookingForm: React.FC<BookingFormProps> = (props) => {
    const {
        adults,
        children,
        room,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        setAdults,
        setChildren,
        setRooms,
        scrollToRooms,
    } = props;

    return (
        <div className="bg-yellow p-1 mb-2 rounded-md flex justify-between gap-1">
            <DatePickers
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <div className="relative flex-grow bg-white rounded-md border border-white hover:border-yellow">
                <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                    <IconUserFilled className="text-lightgray z-50" />
                </div>
                <SelectPerson
                    adults={adults}
                    children={children}
                    rooms={room}
                    setRooms={setRooms}
                    setAdults={setAdults}
                    setChildren={setChildren}
                />
            </div>
            <Button variant="primary" onClick={scrollToRooms}>
                Перевірити наявність місць
            </Button>
        </div>
    );
};

export default BookingForm;

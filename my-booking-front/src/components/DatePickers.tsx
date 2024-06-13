import { IconCalendarWeek, IconMinus } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import {
    convertFromTimestamptz,
    convertToTimestamptz,
    handleEndDateChange,
    handleStartDateChange,
} from "utils/dateFormat";

import React from "react";

interface DatePickersProps {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
}

const DatePickers: React.FC<DatePickersProps> = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="z-50 flex bg-white rounded-md border border-white hover:border-yellow">
            <div className="relative flex items-center">
                <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                    <IconCalendarWeek className="text-lightgray z-50" />
                </div>
                <DatePicker
                    className="placeholder:text-lightgray font-bold w-44 outline-none ps-10 text-sm"
                    selected={convertFromTimestamptz(startDate)}
                    minDate={new Date()}
                    maxDate={((d) => new Date(d.setDate(d.getDate() - 1)))(
                        new Date(convertFromTimestamptz(endDate)),
                    )}
                    placeholderText="Заїзд"
                    onChange={(date: Date) => setStartDate(convertToTimestamptz(handleStartDateChange(date)))}
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
                    selected={convertFromTimestamptz(endDate)}
                    minDate={((d) => new Date(d.setDate(d.getDate() + 1)))(
                        new Date(convertFromTimestamptz(startDate)),
                    )}
                    onChange={(date: Date) => setEndDate(convertToTimestamptz(handleEndDateChange(date)))}
                    dateFormat="MMMM d, yyyy"
                />
            </div>
        </div>
    );
};

export default DatePickers;

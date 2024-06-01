import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { Booking } from "interfaces/booking";
import { Link } from "react-router-dom";
import { useGetHotelQuery } from "services/hotel.ts";
import { checkStatus } from "utils/checkBookingStatus.ts";
import { calculateDays, formatToShortDate } from "utils/dateFormat.ts";
import { API_URL } from "utils/getEnvData.ts";

import React from "react";

const BookingHotelCard: React.FC<Booking> = (props) => {
    const { to, from, room } = props;

    const { data } = useGetHotelQuery(room.hotelId.toString());

    return (
        <div className="flex items-center bg-white shadow rounded-lg p-4 hover:shadow-xl">
            <img
                src={`${API_URL}/images/800_${data?.photos[0].name}`}
                alt="Hotel"
                className="w-20 h-20 rounded-md"
            />
            <div className="ml-4 flex-grow flex flex-col gap-2">
                <Link
                    to={`/hotel/${data?.id}`}
                    className="text-lg font-semibold text-sky underline cursor-pointer"
                >
                    {data?.name}
                </Link>
                <p className="text-gray font-bold text-xs ">
                    {formatToShortDate(from)} – {formatToShortDate(to)} · {data?.address.city.name}
                </p>
                <p className={checkStatus(to) ? `text-red` : `text-green`}>
                    {checkStatus(to) ? "Завершено" : "Активно"}
                </p>
            </div>
            <div className="text-right flex justify-center items-center gap-2">
                <div>
                    <p className="text-lg font-semibold">UAH {calculateDays(from, to) * room.price}</p>
                    <p className="text-gray text-xs">за {calculateDays(from, to)} ночі</p>
                </div>
                <Button variant="rounded" className="text-sky hover:bg-lightgray/10">
                    <IconDotsVertical />
                </Button>
            </div>
        </div>
    );
};

export default BookingHotelCard;

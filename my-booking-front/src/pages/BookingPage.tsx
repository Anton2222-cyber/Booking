import {
    IconBuilding,
    IconCalendarMonth,
    IconChevronDown,
    IconCopy,
    IconEyeFilled,
    IconInfoCircle,
    IconList,
    IconMapPin,
    IconSearch,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useGetBookingQuery } from "services/booking.ts";
import { useGetHotelQuery } from "services/hotel.ts";
import { checkStatus } from "utils/checkBookingStatus.ts";
import { calculateDays, formatToShortDate } from "utils/dateFormat.ts";
import { API_URL } from "utils/getEnvData.ts";

import React, { useEffect, useState } from "react";

const BookingPage: React.FC = () => {
    const { id } = useParams();

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { data: booking } = useGetBookingQuery(id || "0");
    const [hotelId, setHotelId] = useState<string | null>(null);

    useEffect(() => {
        if (booking?.room.hotelId) {
            setHotelId(booking.room.hotelId.toString());
        }
    }, [booking]);

    const { data: hotel } = useGetHotelQuery(hotelId || "0", { skip: !hotelId });

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log("Скопійовано до буфера обміну: " + text);
            })
            .catch((err) => {
                console.error("Помилка копіювання: ", err);
            });
    };

    const confirmationNumber = "4828814194";
    const pinCode = "9099";

    return (
        <>
            {booking && (
                <div className="p-4 mx-40">
                    <div className="flex justify-between">
                        <div className="w-3/4 ">
                            <div className="flex justify-start mb-2">
                                <span
                                    className={`text-sm ${checkStatus(booking.to) ? "text-red" : "text-green"}`}
                                >
                                    {checkStatus(booking.to) ? "Завершено" : "Активно"}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold font-main mb-4">
                                Бронювання {checkStatus(booking.to) ? "завершено" : "активно"}
                            </h2>
                            <div className="flex justify-start items-center mb-4 space-x-4">
                                <div className="flex items-center space-x-2 cursor-pointer group">
                                    <IconBuilding className="text-sky group-hover:text-black" />
                                    <button className="text-sky text-sm group-hover:text-black group-hover:underline">
                                        Забронювати знову
                                    </button>
                                </div>

                                <div className="flex items-center space-x-2 px-5 cursor-pointer group">
                                    <IconSearch className="text-sky group-hover:text-black" />
                                    <button className="text-sky text-sm group-hover:text-black group-hover:underline">
                                        Знайдіть інший варіант проживання
                                    </button>
                                </div>
                            </div>
                            <div className="border border-lightgray/20 rounded-md p-2 mb-2">
                                <div className="flex items-center justify-between mb-0">
                                    <div className="flex items-center">
                                        <IconInfoCircle
                                            className="cursor-pointer text-brown h-8"
                                            onClick={toggleExpand}
                                        />
                                        <p className="font-bold ml-2 text-sm">Залишайтеся в безпеці онлайн</p>
                                    </div>
                                    <span
                                        className={`cursor-pointer ${isExpanded ? "rotate-180" : ""}`}
                                        onClick={toggleExpand}
                                    >
                                        <IconChevronDown />
                                    </span>
                                </div>
                                {isExpanded && (
                                    <div className="mt-2 pl-10">
                                        <p className="text-sm mb-2">
                                            Подбайте про свою безпеку: ніколи не повідомляйте свої персональні
                                            дані чи дані кредитної картки телефоном, електронною поштою чи в
                                            повідомленнях.
                                        </p>
                                        <a
                                            href="#"
                                            className="text-sky text-sm font-bold hover:underline hover:text-black"
                                        >
                                            Дізнатися більше
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="flex mb-4">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-sky">{hotel?.name}</h3>

                                    <div className="flex justify-between">
                                        <div>
                                            <div className="flex items-start mb-2 space-x-4 py-2">
                                                <IconCalendarMonth className="text-gray mt-2" />
                                                <div className="flex space-x-4 text-sm">
                                                    <div className="border-r border-lightgray/20 pr-4">
                                                        <p>Заїзд</p>
                                                        <p className="font-bold text-base">
                                                            {formatToShortDate(booking.from)}
                                                        </p>
                                                        <p className="text-lightgray">з 14:00</p>
                                                    </div>
                                                    <div>
                                                        <p>Виїзд</p>
                                                        <p className="font-bold text-base">
                                                            {formatToShortDate(booking.to)}
                                                        </p>
                                                        <p className="text-lightgray">до 12:00</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-4 mb-2 text-sm py-1">
                                                <IconList className="text-gray mt-2" />
                                                <div>
                                                    <p className="font-bold">Ваше бронювання</p>
                                                    <p>
                                                        Максимальні к-сть {booking.room.adultPlaces} дорослих
                                                        + {booking.room.childrenPlaces} дітей -{" "}
                                                        {calculateDays(booking.from, booking.to)} ночі, 1
                                                        номер
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 ml-4">
                                            <img
                                                src={`${API_URL}/images/800_${hotel?.photos[0].name}`}
                                                alt="Hotel"
                                                className="border border-lightgray/20 rounded-lg w-20 object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 mb-2 text-sm py-1">
                                        <IconMapPin stroke={2} className="text-gray mt-2" />
                                        <div>
                                            <p className="font-bold">Адреса</p>
                                            <p>
                                                {hotel?.address.city.name}, {hotel?.address.street},{" "}
                                                {hotel?.address.houseNumber},{" "}
                                                {hotel?.address.city.country.name}
                                            </p>

                                            <div className="relative">
                                                <Link to={"#"}>
                                                    <button className="text-sky text-sm group-hover:text-black underline">
                                                        Показати маршрут
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/4 pl-4 max-w-xs ">
                            <div className="border border-gray rounded-sm p-4 mb-4 text-sm bg-light2gray">
                                <p>
                                    Номер підтвердження:{" "}
                                    <span className="font-mono font-bold">{confirmationNumber}</span>
                                    <button
                                        className="ml-2"
                                        onClick={() => copyToClipboard(confirmationNumber)}
                                    >
                                        <IconCopy size={16} />
                                    </button>
                                </p>
                                <p>
                                    PIN-код: <span className="font-mono font-bold">{pinCode}</span>
                                    <button className="ml-2" onClick={() => copyToClipboard(pinCode)}>
                                        <IconCopy size={16} />
                                    </button>
                                </p>
                            </div>
                            <div className="border border-lightgray/20 rounded-sm p-4 ">
                                <div className="">
                                    <h3 className="text-base font-bold">Всі дані правильні?</h3>
                                    <p className="text-xs mb-2 py-2">
                                        Ви завжди можете переглянути або змінити своє бронювання онлайн
                                        (реєстрація не потрібна).
                                    </p>
                                    <div className="flex items-center space-x-2 py-2 cursor-pointer group border-b-2 border-lightgray/20 pb-6">
                                        <IconEyeFilled
                                            size={16}
                                            stroke={2}
                                            className=" text-black group-hover:text-black"
                                        />
                                        <button className="text-sky text-sm group-hover:text-black underline">
                                            Знайдіть інший варіант проживання
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-base font-bold">Зв'яжіться з помешканням</h3>
                                    <p className="text-lightgray text-sm font-semibold">
                                        Телефон:{" "}
                                        <a href="tel:+380445202609" className=" hover:underline">
                                            +380 44 520 2609
                                        </a>
                                    </p>
                                    <div className="text-sm font-bold mt-2">
                                        <button className="text-sky underline hover:text-black">
                                            Надіслати повідомлення
                                        </button>
                                        <button className="text-sky underline hover:text-black">
                                            Надіслати електронного листа
                                        </button>
                                    </div>
                                    <p className="text-xs text-lightgray mt-2">
                                        Підказка: Ви завжди можете внести зміни у це бронювання
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingPage;

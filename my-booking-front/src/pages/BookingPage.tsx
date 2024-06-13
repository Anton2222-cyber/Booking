import {
    IconBuilding,
    IconCalendarMonth,
    IconChevronDown,
    IconCopy,
    IconEyeFilled,
    IconInfoCircle,
    IconList,
    IconMapPin,
    IconPencil,
    IconSearch,
} from "@tabler/icons-react";
import AddReview from "components/AddReview.tsx";
import BookingPageSkeleton from "components/skeletons/BookingPageSkeleton.tsx";
import { Link, useParams } from "react-router-dom";
import { useGetBookingQuery } from "services/booking.ts";
import { useGetHotelQuery } from "services/hotel.ts";
import { useGetPageReviewsQuery } from "services/review.ts";
import { checkStatus } from "utils/checkBookingStatus.ts";
import { calculateDays, convertFromTimestamptz, formatToShortDate } from "utils/dateFormat.ts";
import { API_URL } from "utils/getEnvData.ts";

import React, { useEffect, useState } from "react";

const BookingPage: React.FC = () => {
    const { id } = useParams();

    const [hotelId, setHotelId] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isExpandedReview, setIsExpandedReview] = useState<boolean>(false);

    const { data: bookingData } = useGetBookingQuery(id || "0");
    const { data: hotelData, isSuccess } = useGetHotelQuery(hotelId || "0", { skip: !hotelId });
    const { data: reviewsData } = useGetPageReviewsQuery(
        { bookingId: bookingData?.id },
        { skip: !bookingData },
    );

    useEffect(() => {
        if (bookingData?.room.hotelId) {
            setHotelId(bookingData.room.hotelId.toString());
        }
    }, [bookingData]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleExpandReview = () => {
        setIsExpandedReview(!isExpandedReview);
    };

    return (
        <>
            {!isSuccess && <BookingPageSkeleton />}
            {bookingData && (
                <div className="container mx-auto mt-5">
                    <div className="flex justify-between gap-2">
                        <div className="w-3/4 flex flex-col gap-2">
                            <div className="flex justify-start">
                                <span
                                    className={`text-sm ${checkStatus(bookingData.to) ? "text-red" : "text-green"}`}
                                >
                                    {checkStatus(bookingData.to) ? "Завершено" : "Активно"}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold font-main mb-4">
                                Бронювання {checkStatus(bookingData.to) ? "завершено" : "активно"}
                            </h2>
                            <div className="flex justify-start items-center mb-4 space-x-4">
                                <div className="flex items-center space-x-2 cursor-pointer group">
                                    <IconBuilding className="text-sky group-hover:text-black" />
                                    <Link
                                        to={`/hotel/${hotelData?.id}`}
                                        className="text-sky text-sm group-hover:text-black group-hover:underline"
                                    >
                                        Забронювати знову
                                    </Link>
                                </div>

                                <div className="flex items-center space-x-2 px-5 cursor-pointer group">
                                    <IconSearch className="text-sky group-hover:text-black" />
                                    <Link
                                        to={`/search-results?cityId=${hotelData?.address.city.id}&destination=${hotelData?.address.city.name}`}
                                        className="text-sky text-sm group-hover:text-black group-hover:underline"
                                    >
                                        Знайдіть інший варіант проживання
                                    </Link>
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
                                    <h3 className="text-2xl font-bold text-sky">{hotelData?.name}</h3>

                                    <div className="flex justify-between">
                                        <div>
                                            <div className="flex items-start mb-2 space-x-4 py-2">
                                                <IconCalendarMonth className="text-gray mt-2" />
                                                <div className="flex space-x-4 text-sm">
                                                    <div className="border-r border-lightgray/20 pr-4">
                                                        <p>Заїзд</p>
                                                        <p className="font-bold text-base">
                                                            {formatToShortDate(bookingData.from)}
                                                        </p>
                                                        <p className="text-lightgray">з 14:00</p>
                                                    </div>
                                                    <div>
                                                        <p>Виїзд</p>
                                                        <p className="font-bold text-base">
                                                            {formatToShortDate(bookingData.to)}
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
                                                        Максимальні к-сть {bookingData.room.adultPlaces}{" "}
                                                        дорослих + {bookingData.room.childrenPlaces} дітей -{" "}
                                                        {calculateDays(bookingData.from, bookingData.to)}{" "}
                                                        ночі, 1 номер
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 ml-4">
                                            <img
                                                src={`${API_URL}/images/800_${hotelData?.photos[0].name}`}
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
                                                {hotelData?.address.city.name}, {hotelData?.address.street},{" "}
                                                {hotelData?.address.houseNumber},{" "}
                                                {hotelData?.address.city.country.name}
                                            </p>

                                            <div className="relative">
                                                <Link to={`/way-to-hotel/${hotelData?.id}`}>
                                                    <button className="text-sky text-sm group-hover:text-black underline">
                                                        Показати маршрут
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {convertFromTimestamptz(bookingData.to) < new Date() && (
                                <div className="border border-lightgray/20 rounded-md p-2 mb-2">
                                    <div className="flex items-center justify-between mb-0">
                                        <div className="flex items-center">
                                            <IconPencil
                                                className="cursor-pointer text-brown h-8"
                                                onClick={toggleExpandReview}
                                            />
                                            <p className="font-bold ml-2 text-sm">Залишити відгук</p>
                                        </div>
                                        <span
                                            className={`cursor-pointer ${isExpanded ? "rotate-180" : ""}`}
                                            onClick={toggleExpandReview}
                                        >
                                            <IconChevronDown />
                                        </span>
                                    </div>
                                    {isExpandedReview && (
                                        <AddReview
                                            isReview={Boolean(reviewsData?.data.length)}
                                            bookingId={bookingData.id}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="w-2/4 pl-4 max-w-xs ">
                            <div className="border border-gray rounded-sm p-4 mb-4 text-sm bg-light2gray">
                                <div className="inline-flex gap-2">
                                    Номер підтвердження: <span className="font-bold">{4828814194}</span>
                                    <button className="flex items-center justify-center">
                                        <IconCopy />
                                    </button>
                                </div>
                                <div className="inline-flex gap-2">
                                    PIN-код: <span className="font-bold">9584</span>
                                    <button className="flex items-center justify-center">
                                        <IconCopy />
                                    </button>
                                </div>
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

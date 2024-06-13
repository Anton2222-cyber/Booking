import {
    IconCalendarWeek,
    IconCheckbox,
    IconMapPin,
    IconMapPinFilled,
    IconMinus,
    IconUserFilled,
} from "@tabler/icons-react";
import AdvertisingContainer from "components/AdvertisingContainer.tsx";
import PhotosGallery from "components/PhotosGallery.tsx";
import RoomsTable from "components/RoomsTable.tsx";
import SelectPerson from "components/SelectPerson.tsx";
import Swiper from "components/Swiper.tsx";
import ReviewCard from "components/cards/ReviewCard.tsx";
import { Button } from "components/ui/Button.tsx";
import Drawer from "components/ui/Drawer.tsx";
import Label from "components/ui/Label.tsx";
import { Convenience } from "interfaces/room";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelQuery } from "services/hotel.ts";
import { useGetPageReviewsQuery } from "services/review.ts";
import { useGetPageRoomsQuery } from "services/rooms.ts";
import { SwiperSlide } from "swiper/react";
import {
    convertFromTimestamptz,
    convertToTimestamptz,
    handleEndDateChange,
    handleStartDateChange,
} from "utils/dateFormat.ts";
import { getRatingDescription } from "utils/getRating.ts";

import { useEffect, useMemo, useRef, useState } from "react";

const HotelPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const [adults, setAdults] = useState<number>(1);
    const [room, setRooms] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>(
        convertToTimestamptz(handleStartDateChange(new Date())),
    );
    const [endDate, setEndDate] = useState<string>(
        convertToTimestamptz(handleEndDateChange(new Date(new Date().setDate(new Date().getDate() + 1)))),
    );

    const { data } = useGetHotelQuery(id || "0");
    const roomsRef = useRef<HTMLLabelElement>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const { data: rooms } = useGetPageRoomsQuery({
        hotelId: Number(id),
        minAdultPlaces: adults,
        minChildrenPlaces: children,
        freeTime: {
            from: startDate,
            to: endDate,
        },
    });

    const { data: reviews } = useGetPageReviewsQuery({
        hotelId: Number(id),
    });

    const uniqueConveniences = useMemo(() => {
        const conveniencesMap = new Map<number, Convenience>();

        if (rooms) {
            rooms.data.forEach((room) => {
                room.conveniences.forEach((convenience) => {
                    if (!conveniencesMap.has(convenience.id)) {
                        conveniencesMap.set(convenience.id, convenience);
                    }
                });
            });
        }

        return Array.from(conveniencesMap.values());
    }, [rooms]);

    const handleShowOnMap = () => {
        navigate(`/search-map?destination=${data?.address.city.name}&cityId=${data?.address.city.id}`);
    };

    const scrollToRooms = () => {
        if (roomsRef.current) {
            roomsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container mx-auto mt-5 grid grid-cols-4 gap-5">
            <div className="col-span-1">
                <div className="sticky top-5 ">
                    <AdvertisingContainer />
                    <div className=" border border-gray/20 rounded-sm mt-5">
                        <div className="bg-map-bg py-10 gap-3 rounded flex flex-col items-center justify-center">
                            <IconMapPinFilled className="text-sky h-12 w-12" />
                            <Button onClick={handleShowOnMap} size="md" className="text-xs">
                                Показати на карті
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-3 flex flex-col ">
                <div className="flex items-center justify-between">
                    <Label variant="title">{data?.name}</Label>
                    <Button size="sm" onClick={scrollToRooms}>
                        Забронювати зараз
                    </Button>
                </div>
                <div className="flex items-center">
                    <IconMapPin />
                    <Label className="text-sm" variant="small">
                        {`${data?.address.houseNumber} ${data?.address.street}, ${data?.address.city.name}, ${data?.address.city.country.name}`}
                    </Label>
                </div>

                <div className="grid gap-5 grid-cols-6 mt-5">
                    <div className="col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4 ">
                        {data?.photos && <PhotosGallery images={data.photos} />}

                        <div className="col-span-6 text-black">
                            <p className="text-sm">{data?.description}</p>
                            <Label className="font-bold my-2">Найпопулярніші зручності</Label>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(uniqueConveniences.values()).map((convenience) => (
                                    <div className="flex items-center gap-1" key={convenience.id}>
                                        <IconCheckbox className="text-sky" /> {convenience.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Label ref={roomsRef} id="rooms" className=" my-2" variant="title">
                    Наявність місць
                </Label>

                <div className="bg-yellow p-1 mb-2 rounded-md flex justify-between gap-1">
                    <div className="z-50 flex bg-white rounded-md  border border-white hover:border-yellow">
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
                                onChange={(date: Date) =>
                                    setStartDate(convertToTimestamptz(handleStartDateChange(date)))
                                }
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
                                onChange={(date: Date) =>
                                    setEndDate(convertToTimestamptz(handleEndDateChange(date)))
                                }
                                dateFormat="MMMM d, yyyy"
                            />
                        </div>
                    </div>

                    <div className="relative flex-grow bg-white rounded-md  border border-white hover:border-yellow">
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

                <RoomsTable from={startDate} to={endDate} rooms={rooms?.data || []} />

                <div>
                    <Label className=" my-2" variant="title">
                        Відгуки гостей
                    </Label>
                    <div className="flex items-center gap-3 border-gray/20 border-b pb-2 -mx-4 px-4">
                        <div className="bg-blue text-white text-sm font-main font-bold rounded-md w-7 h-7 flex items-center justify-center">
                            {data?.rating.toPrecision(2)}
                        </div>
                        <div className="flex justify-center flex-col">
                            <span className="text-sm font-bold">
                                {getRatingDescription(data?.rating || 0)}
                            </span>
                            <span className="text-xs">{data?.reviews} відгуки</span>
                        </div>

                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="text-sm text-sky underline cursor-pointer"
                        >
                            Читати всі відгуки
                        </button>
                    </div>

                    {reviews?.data.length ? (
                        <Swiper id="swiper10" slidesPerView={3}>
                            {reviews.data?.map((review) => (
                                <SwiperSlide key={review.id}>
                                    <ReviewCard {...review} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : null}
                </div>
            </div>

            <Drawer open={isDrawerOpen} close={() => setIsDrawerOpen(false)}>
                {reviews && reviews.data.map((review) => <ReviewCard {...review} key={review.id} />)}
            </Drawer>
        </div>
    );
};

export default HotelPage;

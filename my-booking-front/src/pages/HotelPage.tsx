import { IconCheckbox, IconMapPin, IconMapPinFilled } from "@tabler/icons-react";
import AdvertisingContainer from "components/AdvertisingContainer.tsx";
import BookingForm from "components/BookingForm.tsx";
import PhotosGallery from "components/PhotosGallery.tsx";
import RoomsTable from "components/RoomsTable.tsx";
import Swiper from "components/Swiper.tsx";
import ReviewCard from "components/cards/ReviewCard.tsx";
import { Button } from "components/ui/Button.tsx";
import Drawer from "components/ui/Drawer.tsx";
import Label from "components/ui/Label.tsx";
import { Convenience } from "interfaces/room";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelQuery } from "services/hotel.ts";
import { useGetPageReviewsQuery } from "services/review.ts";
import { useGetPageRoomsQuery } from "services/rooms.ts";
import { SwiperSlide } from "swiper/react";
import { convertToTimestamptz, handleEndDateChange, handleStartDateChange } from "utils/dateFormat.ts";
import { getRatingDescription } from "utils/getRating.ts";

import { useEffect, useMemo, useRef, useState } from "react";

const HotelPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const roomsRef = useRef<HTMLLabelElement>(null);

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

    const { data: hotelData } = useGetHotelQuery(id || "0");
    const { data: reviewsData } = useGetPageReviewsQuery({
        hotelId: Number(id),
    });
    const { data: roomsData } = useGetPageRoomsQuery({
        hotelId: Number(id),
        minAdultPlaces: adults,
        minChildrenPlaces: children,
        freeTime: {
            from: startDate,
            to: endDate,
        },
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const uniqueConveniences = useMemo(() => {
        const conveniencesMap = new Map<number, Convenience>();
        if (roomsData) {
            roomsData.data.forEach((room) => {
                room.conveniences.forEach((convenience) => {
                    if (!conveniencesMap.has(convenience.id)) {
                        conveniencesMap.set(convenience.id, convenience);
                    }
                });
            });
        }

        return Array.from(conveniencesMap.values());
    }, [roomsData]);

    const handleShowOnMap = () => {
        navigate(
            `/search-map?destination=${hotelData?.address.city.name}&cityId=${hotelData?.address.city.id}`,
        );
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
                    <div className="border border-gray/20 rounded-sm mt-5">
                        <div className="bg-map-bg py-10 gap-3 rounded flex flex-col items-center justify-center">
                            <IconMapPinFilled className="text-sky h-12 w-12" />
                            <Button onClick={handleShowOnMap} size="md" className="text-xs">
                                Показати на карті
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-3 flex flex-col">
                <div className="flex items-center justify-between">
                    <Label variant="title">{hotelData?.name}</Label>
                    <Button size="sm" onClick={scrollToRooms}>
                        Забронювати зараз
                    </Button>
                </div>
                <div className="flex items-center">
                    <IconMapPin />
                    <Label className="text-sm" variant="small">
                        {`${hotelData?.address.houseNumber} ${hotelData?.address.street}, ${hotelData?.address.city.name}, ${hotelData?.address.city.country.name}`}
                    </Label>
                </div>

                <div className="grid gap-5 grid-cols-6 mt-5">
                    <div className="col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {hotelData?.photos && <PhotosGallery images={hotelData.photos} />}

                        <div className="col-span-6 text-black">
                            <p className="text-sm">{hotelData?.description}</p>
                            <Label className="font-bold my-2">Найпопулярніші зручності</Label>
                            <div className="flex flex-wrap gap-2">
                                {uniqueConveniences.map((convenience) => (
                                    <div className="flex items-center gap-1" key={convenience.id}>
                                        <IconCheckbox className="text-sky" /> {convenience.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Label ref={roomsRef} id="rooms" className="my-2" variant="title">
                    Наявність місць
                </Label>

                <BookingForm
                    adults={adults}
                    children={children}
                    room={room}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setAdults={setAdults}
                    setChildren={setChildren}
                    setRooms={setRooms}
                    scrollToRooms={scrollToRooms}
                />

                <RoomsTable from={startDate} to={endDate} rooms={roomsData?.data || []} />

                <Label className="my-2" variant="title">
                    Відгуки гостей
                </Label>
                <div className="flex items-center gap-3 border-gray/20 border-b pb-2   px-4">
                    <div className="bg-blue text-white text-sm font-main font-bold rounded-md w-7 h-7 flex items-center justify-center">
                        {hotelData?.rating.toPrecision(2)}
                    </div>
                    <div className="flex justify-center flex-col">
                        <span className="text-sm font-bold">
                            {getRatingDescription(hotelData?.rating || 0)}
                        </span>
                        <span className="text-xs">{hotelData?.reviews} відгуки</span>
                    </div>

                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="text-sm text-sky underline cursor-pointer"
                    >
                        Читати всі відгуки
                    </button>
                </div>

                {reviewsData && reviewsData.data.length > 0 && (
                    <Swiper id="swiper10" slidesPerView={3}>
                        {reviewsData.data.map((review) => (
                            <SwiperSlide key={review.id}>
                                <ReviewCard {...review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <Drawer open={isDrawerOpen} close={() => setIsDrawerOpen(false)}>
                {reviewsData && reviewsData.data.map((review) => <ReviewCard {...review} key={review.id} />)}
            </Drawer>
        </div>
    );
};

export default HotelPage;

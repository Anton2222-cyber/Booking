import { IconCalendar, IconHelp, IconMapPin, IconSearch } from "@tabler/icons-react";
import Swiper from "components/Swiper.tsx";
import ReviewCard from "components/cards/ReviewCard.tsx";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { useParams } from "react-router-dom";
import { useGetHotelQuery } from "services/hotel.ts";
import { useGetPageReviewsQuery } from "services/review.ts";
import { SwiperSlide } from "swiper/react";
import { API_URL } from "utils/getEnvData.ts";

const HotelPage = () => {
    const { id } = useParams();

    const { data } = useGetHotelQuery(id || "0");

    const { data: reviews } = useGetPageReviewsQuery({
        hotelId: Number(id) || 0,
        isRandomItems: true,
        pageSize: 20,
    });

    console.log(reviews);

    return (
        <div className="container mx-auto mt-5 grid grid-cols-4 gap-5">
            <div className="col-span-1">
                <div className="bg-yellow rounded-md p-4">
                    <Label variant="subtitle" className="text-black text-xl">
                        Шукати
                    </Label>
                    <Label className="pt-2" variant="small">
                        Місце / назва помешкання:
                    </Label>
                    <div className="relative flex-grow">
                        <label
                            htmlFor="destination"
                            className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                        >
                            <IconSearch className="text-lightgray w-4 h-4" />
                        </label>
                        <Input variant="withIcon" id="destination" className="py-1 font-normal" />
                    </div>
                    <Label className="pt-2" variant="small">
                        Дата заїзду:
                    </Label>
                    <div className="relative flex-grow">
                        <label
                            htmlFor="destination"
                            className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                        >
                            <IconCalendar className="text-lightgray w-4 h-4" />
                        </label>
                        <Input variant="withIcon" id="destination" className="py-1 font-normal" />
                    </div>
                    <Label className="pt-2" variant="small">
                        Дата виїзду:
                    </Label>
                    <div className="relative flex-grow">
                        <label
                            htmlFor="destination"
                            className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                        >
                            <IconCalendar className="text-lightgray w-4 h-4" />
                        </label>
                        <Input variant="withIcon" id="destination" className="py-1 font-normal" />
                    </div>
                    <div className="pt-2 gap-1 flex items-center justify-between">
                        <input id="allRooms" type="checkbox" />
                        <Label className="flex-grow" htmlFor="allRooms" variant="small">
                            Спершу помешкання повністю
                        </Label>
                        <IconHelp />
                    </div>
                    <div className="pt-2 gap-1 flex items-center justify-between">
                        <input id="inJob" type="checkbox" />
                        <Label className="flex-grow" htmlFor="inJob" variant="small">
                            Я подорожую у справах
                        </Label>
                        <IconHelp />
                    </div>
                    <div className="flex items-center justify-center pt-2">
                        <Button className="w-full">Шукати</Button>
                    </div>
                </div>
            </div>

            <div className="col-span-3 flex flex-col ">
                <div className="flex items-center justify-between">
                    <Label variant="title">{data?.name}</Label>
                    <Button size="sm">Забронювати зараз</Button>
                </div>
                <div className="flex items-center">
                    <IconMapPin />
                    <Label className="text-sm" variant="small">
                        {`${data?.address.houseNumber} ${data?.address.street}, ${data?.address.city.name}, ${data?.address.city.country.name}`}
                    </Label>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                    {data?.photos.map((photo, index) => (
                        <div key={index}>
                            <img
                                className="h-40 w-full max-w-full object-cover object-center"
                                src={`${API_URL}/images/800_${photo.name}`}
                                alt="gallery-photo"
                            />
                        </div>
                    ))}
                </div>

                {reviews && (
                    <Swiper id="swiper10" slidesPerView={3}>
                        {reviews.data?.map((review) => (
                            <SwiperSlide key={review.id}>
                                <ReviewCard {...review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default HotelPage;

import { IconMapPin, IconMapPinFilled } from "@tabler/icons-react";
import SideSearchMenu from "components/SideSearchMenu.tsx";
import Swiper from "components/Swiper.tsx";
import ReviewCard from "components/cards/ReviewCard.tsx";
import { Button } from "components/ui/Button.tsx";
import Label from "components/ui/Label.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelQuery } from "services/hotel.ts";
import { useGetPageReviewsQuery } from "services/review.ts";
import { SwiperSlide } from "swiper/react";
import { API_URL } from "utils/getEnvData.ts";
import { getRatingDescription } from "utils/getRating.ts";

const HotelPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useGetHotelQuery(id || "0");

    const { data: reviews } = useGetPageReviewsQuery({
        hotelId: Number(id) || 0,
        isRandomItems: true,
        pageSize: 20,
    });

    const handleShowOnMap = () => {
        navigate(`/search-map?destination=${data?.address.city.name}&cityId=${data?.address.city.id}`);
    };

    return (
        <div className="container mx-auto mt-5 grid grid-cols-4 gap-5">
            <div className="col-span-1">
                <SideSearchMenu />
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

                <div className="grid gap-5 grid-cols-6 mt-5">
                    <div className="col-span-4 grid grid-cols-2 gap-3 ">
                        {data?.photos.map((photo, index) => (
                            <div key={index}>
                                <img
                                    className="h-40 w-full max-w-full object-cover object-center"
                                    src={`${API_URL}/images/800_${photo.name}`}
                                    alt="gallery-photo"
                                />
                            </div>
                        ))}

                        <div className="col-span-2 text-black">
                            <p className="text-sm">{data?.description}</p>
                            <Label className="font-bold mt-2">Найпопулярніші зручності</Label>
                        </div>
                    </div>

                    <div className="col-span-2 border border-gray/20 rounded-sm p-4">
                        <div className="flex items-center justify-end gap-2 border-gray/20 border-b pb-2 -mx-4 px-4">
                            <div className="flex items-end justify-center flex-col">
                                <span className="text-sm font-bold">
                                    {getRatingDescription(data?.rating || 0)}
                                </span>
                                <span className="text-xs">{data?.reviews} відгуки</span>
                            </div>

                            <div className="bg-blue text-white text-sm font-main font-bold rounded-md w-7 h-7 flex items-center justify-center">
                                {data?.rating}
                            </div>
                        </div>

                        {reviews && (
                            <Swiper id="swiper10" slidesPerView={1}>
                                {reviews.data?.map((review) => (
                                    <SwiperSlide key={review.id}>
                                        <ReviewCard {...review} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        <div className="bg-map-bg py-10 gap-3 rounded flex flex-col items-center justify-center">
                            <IconMapPinFilled className="text-sky h-12 w-12" />
                            <Button onClick={handleShowOnMap} size="md" className="text-xs">
                                Показати на карті
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelPage;

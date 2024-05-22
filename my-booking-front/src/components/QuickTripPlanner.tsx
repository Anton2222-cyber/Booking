import { IconHeart } from "@tabler/icons-react";
import FakeSwiper from "components/FakeSwiper.tsx";
import Swiper from "components/Swiper.tsx";
import CityCard from "components/cards/CityCard.tsx";
import CityCardSkeleton from "components/cards/CityCardSkeleton.tsx";
import { Button } from "components/ui/Button.tsx";
import Label from "components/ui/Label.tsx";
import { useGetPageCitiesQuery } from "services/city.ts";
import { SwiperSlide } from "swiper/react";

const QuickTripPlanner = () => {
    const { data, isSuccess } = useGetPageCitiesQuery({ pageSize: 10, isRandomItems: true });

    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <div>
                <Label variant="title">Сплануйте поїздку швидко та просто</Label>
                <Label variant="subtitle">
                    Виберіть тип відпочинку та відвідайте найкращі місця в Україні
                </Label>
            </div>

            <div>
                <Button variant="rounded" className="border border-sky bg-sky/5 hover:bg-sky/5 text-sky">
                    <IconHeart className="h-5" />
                    Романтика
                </Button>
            </div>

            {!isSuccess ? (
                <FakeSwiper slidesPerView={5}>
                    <CityCardSkeleton />
                </FakeSwiper>
            ) : (
                <Swiper id="swiper1" slidesPerView={5}>
                    {data.data?.map((city) => (
                        <SwiperSlide key={city.id}>
                            <CityCard {...city} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default QuickTripPlanner;

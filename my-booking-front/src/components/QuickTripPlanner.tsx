import { IconHeart } from "@tabler/icons-react";
import Swiper from "components/Swiper.tsx";
import { Button } from "components/ui/Button.tsx";
import CityCard from "components/ui/CityCard.tsx";
import Label from "components/ui/Label.tsx";
import { SwiperSlide } from "swiper/react";

const QuickTripPlanner = () => {
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

            <Swiper slidesPerView={5}>
                {Array.from({ length: 25 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <CityCard cityName="Київ" geolocation={50} imageSrc="https://picsum.photos/500/700" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default QuickTripPlanner;

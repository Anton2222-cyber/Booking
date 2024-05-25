import Swiper from "components/Swiper.tsx";
import AccommodationCard from "components/cards/AccomodationCard.tsx";
import Label from "components/ui/Label.tsx";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { SwiperSlide } from "swiper/react";

const PopularAccommodations = () => {
    const { data } = useGetPageHotelsQuery({
        pageSize: 20,
        isRandomItems: true,
    });

    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <div>
                <Label variant="title">Забронюйте наші найпопулярніші унікальні помешкання</Label>
                <Label variant="subtitle">Від замків і вілл до ботелів та іглу – у нас є все</Label>
            </div>
            <Swiper id="swiper3" slidesPerView={4}>
                {data?.data.map((hotel) => (
                    <SwiperSlide key={hotel.id}>
                        <AccommodationCard {...hotel} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularAccommodations;

import Swiper from "components/Swiper.tsx";
import AccommodationCard from "components/cards/AccomodationCard.tsx";
import Label from "components/ui/Label.tsx";
import { SwiperSlide } from "swiper/react";

const PopularAccommodations = () => {
    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <div>
                <Label variant="title">Забронюйте наші найпопулярніші унікальні помешкання</Label>
                <Label variant="subtitle">Від замків і вілл до ботелів та іглу – у нас є все</Label>
            </div>
            <Swiper slidesPerView={4}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <AccommodationCard
                            rating={9.5}
                            numberOfReviews={100}
                            name="Hilton"
                            location="Київ"
                            imageSrc="https://picsum.photos/600/800"
                            key={index}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularAccommodations;

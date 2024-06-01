import Swiper from "components/Swiper.tsx";
import AccommodationTypeCard from "components/cards/AccommodationTypeCard.tsx";
import Label from "components/ui/Label.tsx";
import { SwiperSlide } from "swiper/react";

const HousingTypes = () => {
    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <Label variant="title">Пошук за типом помешкання</Label>

            <Swiper id="swiper2" slidesPerView={4}>
                {Array.from({ length: 24 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <AccommodationTypeCard
                            title="Апартаменти"
                            imageSrc="https://picsum.photos/500/800"
                            key={index}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HousingTypes;

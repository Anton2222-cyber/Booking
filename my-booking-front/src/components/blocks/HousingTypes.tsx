import Swiper from "components/Swiper.tsx";
import HotelTypeCard from "components/cards/HotelTypeCard.tsx";
import Label from "components/ui/Label.tsx";
import { useGetPageHotelTypesQuery } from "services/hotelTypes.ts";
import { SwiperSlide } from "swiper/react";

const HousingTypes = () => {
    const { data } = useGetPageHotelTypesQuery({
        pageIndex: 0,
        pageSize: 10,
        isRandomItems: true,
    });

    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <Label variant="title">Пошук за типом помешкання</Label>

            <Swiper id="swiper2" slidesPerView={4}>
                {data?.data.map((type, index) => (
                    <SwiperSlide key={index}>
                        <HotelTypeCard {...type} key={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HousingTypes;

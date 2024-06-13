import Swiper from "components/Swiper.tsx";
import AccommodationsContainer from "components/blocks/AccommodationsContainer.tsx";
import Hero from "components/blocks/Hero.tsx";
import HowDoesItWork from "components/blocks/HowDoesItWork.tsx";
import HotelSearchCard from "components/cards/HotelSearchCard.tsx";
import { Hotel } from "interfaces/hotel";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { SwiperSlide } from "swiper/react";

const PersonalizedHotelResultsPage = () => {
    const { data: popularHotels } = useGetPageHotelsQuery({
        pageIndex: 0,
        pageSize: 10,
        minRating: 8,
        isRandomItems: true,
    });

    const { data: randomHotels } = useGetPageHotelsQuery({
        pageIndex: 0,
        pageSize: 100,
        isRandomItems: true,
    });

    const getRandom = (hotels: Hotel[] | undefined) => {
        if (!hotels || hotels.length === 0) return undefined;
        const shuffled = [...hotels].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    };

    return (
        <>
            <Hero
                title={"Знайдіть ідеальне помешкання для відпустки"}
                subtitle={"Знайдіть помешкання для відпустки, які вам сподобаються найбільше"}
                isButton={false}
                img={"bg-hero-search"}
            />

            <AccommodationsContainer title={"Гості люблять ці приватні помешкання"}>
                <Swiper id="swiper4" slidesPerView={4}>
                    {getRandom(popularHotels?.data)?.map((hotel, index) => (
                        <SwiperSlide key={index}>
                            <HotelSearchCard {...hotel} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </AccommodationsContainer>

            <AccommodationsContainer
                title={"Додаткові послуги"}
                subtitle={"Стійка реєстрації заїзду, прибирання тощо"}
            >
                <Swiper id="swiper5" slidesPerView={4}>
                    {getRandom(popularHotels?.data)?.map((hotel, index) => (
                        <SwiperSlide key={index}>
                            <HotelSearchCard {...hotel} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </AccommodationsContainer>

            <AccommodationsContainer
                title={"Весь простір лише для вас"}
                subtitle={"Окремі приватні помешкання й житло цілком"}
            >
                <Swiper id="swiper6" slidesPerView={4}>
                    {getRandom(randomHotels?.data)?.map((hotel, index) => (
                        <SwiperSlide key={index}>
                            <HotelSearchCard {...hotel} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </AccommodationsContainer>

            <AccommodationsContainer
                title={"Для вашої поїздки з друзями"}
                subtitle={"Хороша оцінка від груп мандрівників"}
            >
                <Swiper id="swiper7" slidesPerView={4}>
                    {getRandom(popularHotels?.data)?.map((hotel, index) => (
                        <SwiperSlide key={index}>
                            <HotelSearchCard {...hotel} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </AccommodationsContainer>

            <AccommodationsContainer
                title={"Для поїздки на будь-який строк"}
                subtitle={"Приватні помешкання, де є все необхідне"}
            >
                <Swiper id="swiper8" slidesPerView={4}>
                    {getRandom(popularHotels?.data)?.map((hotel, index) => (
                        <SwiperSlide key={index}>
                            <HotelSearchCard {...hotel} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </AccommodationsContainer>

            <HowDoesItWork />
        </>
    );
};

export default PersonalizedHotelResultsPage;

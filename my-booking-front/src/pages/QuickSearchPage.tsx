import AccommodationsContainer from "components/blocks/AccommodationsContainer.tsx";
import Hero from "components/blocks/Hero.tsx";
import HowDoesItWork from "components/blocks/HowDoesItWork.tsx";
import HotelSearchCard from "components/cards/HotelSearchCard.tsx";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { SwiperSlide } from "swiper/react";

const QuickSearchPage = () => {
    const { data } = useGetPageHotelsQuery({
        pageIndex: 0,
        pageSize: 20,
        isRandomItems: true,
    });

    return (
        <>
            <Hero
                title={"Знайдіть ідеальне помешкання для відпустки"}
                subtitle={"Знайдіть помешкання для відпустки, які вам сподобаються найбільше"}
                isButton={false}
                img={"bg-hero-search"}
            />

            <AccommodationsContainer id="swiper4" title={"Гості люблять ці приватні помешкання"}>
                {data?.data.map((hotel, index) => (
                    <SwiperSlide key={index}>
                        <HotelSearchCard {...hotel} />
                    </SwiperSlide>
                ))}
            </AccommodationsContainer>

            <AccommodationsContainer
                id="swiper5"
                title={"Додаткові послуги"}
                subtitle={"Стійка реєстрації заїзду, прибирання тощо"}
            >
                {data?.data.map((hotel, index) => (
                    <SwiperSlide key={index}>
                        <HotelSearchCard {...hotel} />
                    </SwiperSlide>
                ))}
            </AccommodationsContainer>

            <AccommodationsContainer
                id="swiper6"
                title={"Весь простір лише для вас"}
                subtitle={"Окремі приватні помешкання й житло цілком"}
            >
                {data?.data.map((hotel, index) => (
                    <SwiperSlide key={index}>
                        <HotelSearchCard {...hotel} />
                    </SwiperSlide>
                ))}
            </AccommodationsContainer>

            <AccommodationsContainer
                id="swiper7"
                title={"Для вашої поїздки з друзями"}
                subtitle={"Хороша оцінка від груп мандрівників"}
            >
                {data?.data.map((hotel, index) => (
                    <SwiperSlide key={index}>
                        <HotelSearchCard {...hotel} />
                    </SwiperSlide>
                ))}
            </AccommodationsContainer>

            <AccommodationsContainer
                id="swiper8"
                title={"Для поїздки на будь-який строк"}
                subtitle={"Приватні помешкання, де є все необхідне"}
            >
                {data?.data.map((hotel, index) => (
                    <SwiperSlide key={index}>
                        <HotelSearchCard {...hotel} />
                    </SwiperSlide>
                ))}
            </AccommodationsContainer>

            <HowDoesItWork />
        </>
    );
};

export default QuickSearchPage;

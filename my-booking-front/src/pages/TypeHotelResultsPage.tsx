import FakeSwiper from "components/FakeSwiper.tsx";
import Swiper from "components/Swiper.tsx";
import Hero from "components/blocks/Hero.tsx";
import CityCardTypes from "components/cards/CityCardTypes.tsx";
import HotelCardTypes from "components/cards/HotelCardTypes.tsx";
import CityCardSkeleton from "components/skeletons/CityCardSkeleton.tsx";
import HotelCardTypesSkeleton from "components/skeletons/HotelCardTypesSkeleton.tsx";
import Label from "components/ui/Label.tsx";
import { useParams } from "react-router-dom";
import { useGetPageCitiesQuery } from "services/city.ts";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { SwiperSlide } from "swiper/react";
import { getRandomCity } from "utils/getRandomItemsFromArr.ts";

const TypeHotelResultsPage = () => {
    const { id } = useParams();

    const { data: citiesData, isSuccess } = useGetPageCitiesQuery({
        pageIndex: 0,
        pageSize: 10,
        isRandomItems: true,
    });

    const { data: popularHotels, isSuccess: isPopularHotelsSuccess } = useGetPageHotelsQuery({
        typeId: Number(id),
        minRating: 7,
        isRandomItems: true,
    });

    const { data: cityHotels, isSuccess: isCityHotelsSuccess } = useGetPageHotelsQuery(
        {
            address: {
                city: { countryId: getRandomCity(citiesData?.data) },
            },
            isRandomItems: true,
        },
        { skip: !citiesData },
    );

    return (
        <>
            <Hero
                title={"Знайдіть ідеальні помешкання на Booking.com "}
                subtitle={"Від недорогих помешкань до 5-зіркових розкішних готелів і багато іншого"}
                isButton={false}
                img={"bg-hero-types"}
            />
            <div className="flex flex-col container mx-auto mt-10 gap-2">
                <Label variant="title">Популярні напрямки з {popularHotels?.data[0].type.name}</Label>
                <Label variant="subtitle">
                    Перегляньте напрямки, які зараз популярні серед інших мандрівників
                </Label>

                {!isSuccess ? (
                    <FakeSwiper slidesPerView={3}>
                        <CityCardSkeleton />
                    </FakeSwiper>
                ) : (
                    <Swiper id="swiper16" slidesPerView={6}>
                        {citiesData.data?.map((city) => (
                            <SwiperSlide key={city.id}>
                                <CityCardTypes {...city} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                <Label variant="title">Ми обожнюємо ці помешкання</Label>

                {!isPopularHotelsSuccess ? (
                    <FakeSwiper slidesPerView={3}>
                        <HotelCardTypesSkeleton />
                    </FakeSwiper>
                ) : (
                    <Swiper id="swiper17" slidesPerView={3}>
                        {popularHotels?.data.map((hotel, index) => (
                            <SwiperSlide key={index}>
                                <HotelCardTypes {...hotel} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                <Label variant="title">
                    Чудовий вибір апартаментів в регіоні {cityHotels?.data[0].address.city.country.name}
                </Label>

                {!isCityHotelsSuccess ? (
                    <FakeSwiper slidesPerView={3}>
                        <HotelCardTypesSkeleton />
                    </FakeSwiper>
                ) : (
                    <Swiper id="swiper18" slidesPerView={3}>
                        {cityHotels?.data.map((hotel, index) => (
                            <SwiperSlide key={index}>
                                <HotelCardTypes {...hotel} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </>
    );
};

export default TypeHotelResultsPage;

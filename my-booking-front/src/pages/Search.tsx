import AccommodationBlock from "components/AccommodationBlock.tsx";
import Hero from "components/Hero.tsx";
import AccommodationSearchCard from "components/cards/AccommodationSearchCard.tsx";
import HowDoesItWork from "components/ui/HowDoesItWork.tsx";
import { SwiperSlide } from "swiper/react";

const SearchPage = () => {
    return (
        <>
            <Hero
                title={"Знайдіть ідеальне помешкання для відпустки"}
                subtitle={"Знайдіть помешкання для відпустки, які вам сподобаються найбільше"}
                isButton={false}
                img={"../../public/searchHero.jpg"}
            />

            <AccommodationBlock title={"Гості люблять ці приватні помешкання"}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <AccommodationSearchCard
                            location="Київ, Україна"
                            rating={10}
                            name="Cracow Best Location Apartment"
                            imageSrc="https://picsum.photos/500/800"
                            key={index}
                            numberOfReviews={0}
                        />
                    </SwiperSlide>
                ))}
            </AccommodationBlock>

            <AccommodationBlock
                title={"Додаткові послуги"}
                subtitle={"Стійка реєстрації заїзду, прибирання тощо"}
            >
                {Array.from({ length: 20 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <AccommodationSearchCard
                            location="Лондон, Велика Британія"
                            rating={10}
                            name="Cracow Best Location Apartment"
                            imageSrc="https://picsum.photos/600/800"
                            key={index}
                            numberOfReviews={0}
                        />
                    </SwiperSlide>
                ))}
            </AccommodationBlock>

            <AccommodationBlock
                title={"Весь простір лише для вас"}
                subtitle={"Окремі приватні помешкання й житло цілком"}
            >
                {Array.from({ length: 20 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <AccommodationSearchCard
                            location="Лондон, Велика Британія"
                            rating={10}
                            name="Cracow Best Location Apartment"
                            imageSrc="https://picsum.photos/550/800"
                            key={index}
                            numberOfReviews={0}
                        />
                    </SwiperSlide>
                ))}
            </AccommodationBlock>

            <AccommodationBlock
                title={"Для вашої поїздки з друзями"}
                subtitle={"Хороша оцінка від груп мандрівників"}
            >
                {Array.from({ length: 20 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <AccommodationSearchCard
                            location="Лондон, Велика Британія"
                            rating={10}
                            name="Cracow Best Location Apartment"
                            imageSrc="https://picsum.photos/570/800"
                            key={index}
                            numberOfReviews={0}
                        />
                    </SwiperSlide>
                ))}
            </AccommodationBlock>

            <AccommodationBlock
                title={"Для поїздки на будь-який строк"}
                subtitle={"Приватні помешкання, де є все необхідне"}
            >
                {Array.from({ length: 20 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <AccommodationSearchCard
                            location="Лондон, Велика Британія"
                            rating={10}
                            name="Cracow Best Location Apartment"
                            imageSrc="https://picsum.photos/555/800"
                            key={index}
                            numberOfReviews={0}
                        />
                    </SwiperSlide>
                ))}
            </AccommodationBlock>

            <HowDoesItWork />
        </>
    );
};

export default SearchPage;

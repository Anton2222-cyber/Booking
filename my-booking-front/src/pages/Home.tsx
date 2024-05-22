import BannerLoginAdvantages from "components/BannerLoginAdvantages.tsx";
import Discount from "components/Discount.tsx";
import Hero from "components/Hero.tsx";
import HousingTypeSearch from "components/HousingTypeSearch.tsx";
import NextTripSearchBanner from "components/NextTripSearchBanner.tsx";
import PopularAccommodations from "components/PopularAccommodations.tsx";
import QuickTripPlanner from "components/QuickTripPlanner.tsx";
import HotelCard from "components/cards/HotelCard.tsx";

const HomePage = () => {
    return (
        <>
            <Hero
                title={"Візьміть із собою всю коробку з іграшками"}
                subtitle={"Розслабтеся в будинку для відпочинку"}
                isButton={true}
                path={"/search-accommodation"}
                img="bg-hero-home"
            />
            <Discount />
            <QuickTripPlanner />
            <HousingTypeSearch />
            <PopularAccommodations />
            <NextTripSearchBanner />
            <BannerLoginAdvantages />

        </>
    );
};

export default HomePage;

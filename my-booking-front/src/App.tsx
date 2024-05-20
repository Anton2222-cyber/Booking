import BannerLoginAdvantages from "components/BannerLoginAdvantages.tsx";
import BottomNavigation from "components/BottomNavigation.tsx";
import Discount from "components/Discount.tsx";
import Footer from "components/Footer.tsx";
import Header from "components/Header.tsx";
import Hero from "components/Hero.tsx";
import HousingTypeSearch from "components/HousingTypeSearch.tsx";
import NextTripSearchBanner from "components/NextTripSearchBanner.tsx";
import PopularAccommodations from "components/PopularAccommodations.tsx";
import QuickTripPlanner from "components/QuickTripPlanner.tsx";

function App() {
    return (
        <>
            <Header />
            <Hero />
            <Discount />
            <QuickTripPlanner />
            <HousingTypeSearch />
            <PopularAccommodations />
            <NextTripSearchBanner />
            <BannerLoginAdvantages />
            <BottomNavigation />
            <Footer />
        </>
    );
}

export default App;

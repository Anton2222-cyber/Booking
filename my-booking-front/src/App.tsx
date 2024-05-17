import Header from "components/Header.tsx";
import Hero from "components/Hero.tsx";

import { useEffect } from "react";
import CountryCard from "components/ui/CityCard.tsx";
import AccommodationCard from "components/ui/AccommodationCard.tsx";

function App() {
    useEffect(() => {
        if (!navigator.geolocation) {
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
            });
        }
    }, [location]);

    return (
        <>
            {/*<Header />*/}
            {/*<Hero />*/}
            <AccommodationCard imageSrc={"https://cf.bstatic.com/xdata/images/hotel/square600/255854447.webp?k=f9c9d47f18b3156fdcc5596749d137f35e3cf4962a8d3d37d69be0066ec9bfc3&o="} rating={9.3} location={"Фінляндія, Lillandet"} name={"Gyttja Västergårds"} numberOfReviews={198}/>
            {/*<div>*/}
            {/*    <div className="container mx-auto">*/}
            {/*        <Button variant="primary" size="lg">*/}
            {/*            Шукати помешкання для відпустки*/}
            {/*        </Button>*/}

            {/*        <div className="h-4"></div>*/}

            {/*        <Button variant="primary" size="xl">*/}
            {/*            Шукати*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default App;

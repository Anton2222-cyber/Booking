import Header from "components/Header.tsx";
import Hero from "components/Hero.tsx";
import AccommodationCard from "components/ui/AccomodationCard.tsx";

function App() {
    // useEffect(() => {
    //     if (!navigator.geolocation) {
    //     } else {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             console.log(position);
    //         });
    //     }
    // }, [location]);

    return (
        <>
            <Header />
            <Hero />

            <div className="h-40"></div>

            <AccommodationCard
                imageSrc="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o="
                title="Room"
            />

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

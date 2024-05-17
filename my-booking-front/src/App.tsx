import Header from "components/Header.tsx";
import Hero from "components/Hero.tsx";

import { useEffect } from "react";

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
            <Header />
            <Hero />
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

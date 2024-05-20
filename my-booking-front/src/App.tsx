import Discount from "components/Discount.tsx";
import Header from "components/Header.tsx";
import Hero from "components/Hero.tsx";
import QuickTripPlanner from "components/QuickTripPlanner.tsx";

function App() {
    return (
        <>
            <Header />
            <Hero />
            <Discount />
            <QuickTripPlanner />
        </>
    );
}

export default App;

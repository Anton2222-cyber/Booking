import Discount from "components/Discount.tsx";
import Header from "components/Header.tsx";
import Hero from "components/Hero.tsx";
import Login from "pages/login";

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
            <Discount />
            <Login/>
        </>
    );
}

export default App;

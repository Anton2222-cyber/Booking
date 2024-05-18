import Discount from "components/Discount.tsx";
import Header from "components/Header.tsx";
import Hero from "components/Hero.tsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RECAPTCHA_CLIENT_ID = import.meta.env.VITE_RECAPTCHA_CLIENT_ID;

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
            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_CLIENT_ID}>
                <Header />
            </GoogleReCaptchaProvider>
            <Hero />
            <Discount />
        </>
    );
}

export default App;

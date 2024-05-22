import AccountLayout from "components/layout/AccountLayout.tsx";
import Layout from "components/layout/Layout.tsx";
import HomePage from "pages/Home.tsx";
import LoginPage from "pages/Login.tsx";
import SearchPage from "pages/Search.tsx";
import SearchWithParamsPage from "pages/SearchWithParams.tsx";
import { Route, Routes } from "react-router-dom";
 
import { useAppDispatch } from "store/index.ts";
import { setLocation } from "store/slice/userSlice.ts";

import { useEffect } from "react";
 

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!navigator.geolocation) {
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(
                    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
                );
            });
        }
    }, []);

    console.log(location);

    return (
        // <Routes>
        //     <Route path="/" element={<Layout />}>
        //         <Route index element={<HomePage />} />
        //         <Route path="search-accommodation" element={<SearchPage />} />
        //         <Route path="search-results" element={<SearchWithParamsPage />} />
        //     </Route>
        //
        //     <Route path="/auth/" element={<AccountLayout />}>
        //         <Route path="login" element={<LoginPage />} />
        //     </Route>
        // </Routes>

        <HotelCard hotelName="FULL HOUSE apart hotel"
                   location="Рівне"
                   description="Помешкання FULL HOUSE apart hotel розташовано у Рівному.
                    Гості можуть забронювати комфортабельні варіанти розміщення."
                   imageUrl="https://cf.bstatic.com/xdata/images/hotel/square600/518249296.webp?k=e7bd32148dd985b791800146322d22c814356cf5e39d801e734fa77277c2f3fd&o="
                   rating={9.6}
                   reviewCount={58}
                   distanceFromCenter={1.1}
        />
    );
}

export default App;

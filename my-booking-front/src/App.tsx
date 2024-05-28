import AccountLayout from "components/layout/AccountLayout.tsx";
import Layout from "components/layout/Layout.tsx";
import CityHotelsMapPage from "pages/CityHotelsMap.tsx";
import HomePage from "pages/HomePage.tsx";
import HotelPage from "pages/HotelPage.tsx";
import LoginPage from "pages/LoginPage.tsx";
import ParameterisedSearchPage from "pages/ParameterisedSearchPage.tsx";
import QuickSearchPage from "pages/QuickSearchPage.tsx";
import RegisterPage from "pages/RegisterPage.tsx";
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

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="search-accommodation" element={<QuickSearchPage />} />
                <Route path="search-results" element={<ParameterisedSearchPage />} />
                <Route path="search-map" element={<CityHotelsMapPage />} />
                <Route path="hotel/:id" element={<HotelPage />} />
            </Route>

            <Route path="/auth/" element={<AccountLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
}

export default App;

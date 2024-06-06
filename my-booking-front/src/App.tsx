import AccountLayout from "components/layout/AccountLayout.tsx";
import Layout from "components/layout/Layout.tsx";
import BookingPage from "pages/BookingPage.tsx";
import CityHotelsMapPage from "pages/CityHotelsMap.tsx";
import HomePage from "pages/HomePage.tsx";
import HotelCreatePage from "pages/HotelCreatePage.tsx";
import HotelPage from "pages/HotelPage.tsx";
import HotelWayPage from "pages/HotelWayPage.tsx";
import LoginPage from "pages/LoginPage.tsx";
import MyBookingsPage from "pages/MyBookingsPage.tsx";
import ParameterisedSearchPage from "pages/ParameterisedSearchPage.tsx";
import QuickSearchPage from "pages/QuickSearchPage.tsx";
import RegisterPage from "pages/RegisterPage.tsx";
import SavedPage from "pages/SavedPage.tsx";
import TypesSearchPage from "pages/TypesSearchPage.tsx";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "store/index.ts";
import { setLocation } from "store/slice/userSlice.ts";


function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!navigator.geolocation) {
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(
                    setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude}),
                );
            });
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="search-accommodation" element={<QuickSearchPage />} />
                <Route path="search-types/:id" element={<TypesSearchPage />} />
                <Route path="search-map" element={<CityHotelsMapPage />} />
                <Route path="hotel/:id" element={<HotelPage />} />
                <Route path="hotel/create" element={<HotelCreatePage />} />
                <Route path="my-bookings" element={<MyBookingsPage />} />
                <Route path="my-saved" element={<SavedPage />} />{" "}
                <Route path="search-results" element={<ParameterisedSearchPage />} />
                <Route path="booking/:id" element={<BookingPage />} />
                <Route path="way-to-hotel/:id" element={<HotelWayPage />} />
            </Route>

            <Route path="/auth/" element={<AccountLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
        //  <CityCardTest {...cityData}/>
        //<HotelCardTest {...hotelData}/>
    );
}

export default App;

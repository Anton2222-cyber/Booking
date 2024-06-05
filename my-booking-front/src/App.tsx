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
import {Route, Routes} from "react-router-dom";
import {useAppDispatch} from "store/index.ts";
import {setLocation} from "store/slice/userSlice.ts";

import {useEffect} from "react";
import CityCardTest from "components/cards/CityCardTest.tsx";
import {City} from "interfaces/city";
import HotelCardTest from "components/cards/HotelCardTest.tsx";
import {Hotel} from "interfaces/hotel";


// const cityData: City = {
//     id: 1,
//     name: 'Київ',
//     image: 'https://cf.bstatic.com/xdata/images/city/square250/977220.webp?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o=',
//     longitude: 30.5234,
//     latitude: 50.4501,
//     country: { name: 'Україна', image:"dkkdkdkd.jsk", id: 1 }
// };

// const hotelData: Hotel = {
//     id: 1,
//     name: 'Mr. Soof - By TLV2GO',
//     photos: [{name: 'https://cf.bstatic.com/xdata/images/hotel/max300/282136945.webp?k=2f946ef37ad423cae516b82744484b54ddbe68293a623a11ab29fa0b58c41a2a&o=', priority: 1}],
//     description: 'Помешкання Mr. Soof - By TLV2GO оптимально розташовано в місті Ейлат, неподалік від таких пам\'яток, як Пляж Кісускі, Пляж Перл-Біч і Пляж Мікі. До послуг гостей номери з чудовим видом на гори.',
//     rating: 9.1,
//     reviews: 1461,
//     address: {
//         city: {
//             name: 'Ейлат', image: "dkkdkdkd.jsk", id: 1,
//             country: {name: 'Ізраїль', image: "dkkdkdkd.jsk", id: 1},
//             longitude: 0,
//             latitude: 0
//         },
//         id: 0,
//         street: "",
//         houseNumber: "",
//         latitude: 0,
//         longitude: 0
//     }
//
// };



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
                <Route path="search-results" element={<ParameterisedSearchPage />} />
                <Route path="search-map" element={<CityHotelsMapPage />} />
                <Route path="hotel/:id" element={<HotelPage />} />
                <Route path="hotel/create" element={<HotelCreatePage />} />
                <Route path="my-bookings" element={<MyBookingsPage />} />
                <Route path="my-saved" element={<SavedPage />} />
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

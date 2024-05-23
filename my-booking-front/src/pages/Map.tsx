import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useAppSelector } from "store/index.ts";
import { getUserLocation } from "store/slice/userSlice.ts";
import { API_URL } from "utils/getEnvData.ts";

import React from "react";

// layers: [
//     new L.TileLayer("https://tms{s}.visicom.ua/2.0.0/planet3/base_uk/{z}/{x}/{y}.png", {
//         attribution: "Дані карт  2021 ЧАО «<a href='https://api.visicom.ua/'>Визиком</a>»",
//         subdomains: "123",
//         maxZoom: 19,
//         tms: true
//     })
// ]

const Map = () => {
    const location = useAppSelector(getUserLocation);
    const { data, isSuccess } = useGetAllCitiesQuery();

    if (!location || !isSuccess) {
        return <div>Loading...</div>;
    }

    const { latitude, longitude } = location;

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={8}
            scrollWheelZoom={true}
            className="-mb-5"
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map((city) => (
                <Marker key={city.id} position={[city.latitude, city.longitude]}>
                    <Popup>
                        <div className="max-w-xs rounded  overflow-hidden  ">
                            <img
                                className="w-full"
                                src={`${API_URL}/images/800_${city.image}`}
                                alt={city.name}
                            />
                            <div className="px-6 py-4">
                                <div className="font-bold mb-2">{city.name}</div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;

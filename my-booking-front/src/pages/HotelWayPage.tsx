import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useGetHotelQuery } from "services/hotel.ts";
import { useAppSelector } from "store/index.ts";
import { getUserLocation } from "store/slice/userSlice.ts";

import React from "react";

// Define your custom icons
const customStartIcon = new L.Icon({
    iconUrl: "https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const customEndIcon = new L.Icon({
    iconUrl: "https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface RoutingMachineProps {
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ start, end }) => {
    const map = useMap();

    React.useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
            // @ts-ignore
            createMarker: function (i, waypoint, _n) {
                const icon = i === 0 ? customStartIcon : customEndIcon;
                return L.marker(waypoint.latLng, { icon });
            },
            routeWhileDragging: true,
            addWaypoints: false,
            // @ts-ignore
            draggableWaypoints: false,
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, start, end]);

    return null;
};

const HotelWayPage: React.FC = () => {
    const { id } = useParams();
    const location = useAppSelector(getUserLocation);

    const { data } = useGetHotelQuery(id || "0");

    const start = { lat: location?.latitude || 0, lng: location?.longitude || 0 };
    const end = { lat: data?.address.latitude || 0, lng: data?.address.longitude || 0 };

    return (
        <MapContainer
            center={[location?.latitude || 0, location?.longitude || 0]}
            zoom={10}
            scrollWheelZoom={true}
            className="-mb-5"
            style={{ height: "75vh", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {location && data && <RoutingMachine start={start} end={end} />}
        </MapContainer>
    );
};

export default HotelWayPage;

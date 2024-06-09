import MapHotelCard from "components/cards/MapHotelCard.tsx";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { useQuery } from "utils/query.ts";

// Define your custom icon
const customIcon = L.icon({
    iconUrl: "https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const CityHotelsMapPage = () => {
    const query = useQuery();

    const destination = query.get("destination") || "";
    const cityId = Number(query.get("cityId")) || undefined;

    const { data, isSuccess } = useGetPageHotelsQuery({
        address: { city: { name: destination, id: cityId } },
    });

    if (!isSuccess || !data) {
        return <div className="-mb-5 animate-pulse bg-lightgray/20 h-[75vh] w-full"></div>;
    }

    return (
        <MapContainer
            center={[data.data[0].address.latitude, data.data[0].address.longitude]}
            zoom={10}
            scrollWheelZoom={true}
            className="-mb-5"
            style={{ height: "75vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.data.map((hotel) => (
                <Marker
                    key={hotel.id}
                    draggable={false}
                    position={[hotel.address.latitude, hotel.address.longitude]}
                    icon={customIcon} // Apply the custom icon here
                >
                    <Popup className="w-80">
                        <MapHotelCard {...hotel} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default CityHotelsMapPage;

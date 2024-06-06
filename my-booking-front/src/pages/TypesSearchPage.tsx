import HotelCard from "components/cards/HotelCard.tsx";
import { useParams } from "react-router-dom";
import { useGetPageHotelsQuery } from "services/hotel.ts";

const TypesSearchPage = () => {
    const { id } = useParams();
    const { data } = useGetPageHotelsQuery({
        typeId: Number(id),
    });
    return (
        <div className="container mx-auto mt-5">
            {data?.data.map((hotel) => <HotelCard key={hotel.id} {...hotel} />)}
        </div>
    );
};

export default TypesSearchPage;

import NotFoundResult from "components/NotFoundResult.tsx";
import AccommodationCard from "components/cards/HotelPopularCard.tsx";
import HotelCardSkeleton from "components/skeletons/HotelCardSkeleton.tsx";
import Label from "components/ui/Label.tsx";
import { useGetUserFavoriteHotelsQuery } from "services/favoriteHotels.ts";

const SavedPage = () => {
    const { data, isLoading } = useGetUserFavoriteHotelsQuery();

    return (
        <div className="container mx-auto mt-5 flex flex-col gap-5">
            <Label variant="extra">Моя наступна подорож</Label>
            {isLoading && (
                <div className="grid grid-cols-4 gap-5 gap-y-5 ">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <HotelCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {data?.data.length === 0 ? (
                <NotFoundResult text="Збережених помешканних немає" />
            ) : (
                <div className="grid grid-cols-4 gap-5 gap-y-5 ">
                    {data?.data.map((hotel) => <AccommodationCard key={hotel.id} {...hotel} />)}
                </div>
            )}
        </div>
    );
};

export default SavedPage;

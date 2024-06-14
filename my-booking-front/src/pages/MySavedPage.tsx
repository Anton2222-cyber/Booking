import NotFoundResult from "components/NotFoundResult.tsx";
import HotelCard from "components/cards/HotelCard.tsx";
import HotelCardSkeleton from "components/skeletons/HotelCardSkeleton.tsx";
import Label from "components/ui/Label.tsx";
import { useGetUserFavoriteHotelsQuery } from "services/favoriteHotels.ts";

const MySavedPage = () => {
    const { data: hotelsData, isLoading } = useGetUserFavoriteHotelsQuery();

    return (
        <div className="container mx-auto mt-5 flex flex-col gap-5">
            <Label variant="extra">Моя наступна подорож</Label>
            {isLoading && (
                <div className="grid grid-cols-1 gap-5 gap-y-5 ">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <HotelCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {hotelsData?.data.length === 0 ? (
                <NotFoundResult text="Збережених помешканних немає" />
            ) : (
                <div className="grid grid-cols-1 gap-5 gap-y-5 ">
                    {hotelsData?.data.map((hotel) => <HotelCard key={hotel.id} {...hotel} />)}
                </div>
            )}
        </div>
    );
};

export default MySavedPage;

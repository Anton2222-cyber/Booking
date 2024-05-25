import { IconMapPinFilled, IconSearch } from "@tabler/icons-react";
import Discount from "components/Discount.tsx";
import NotFoundResult from "components/NotFoundResult.tsx";
import HotelCard from "components/cards/HotelCard.tsx";
import HotelCardSkeleton from "components/cards/HotelCardSkeleton.tsx";
import { Button } from "components/ui/Button.tsx";
import SideSearchMenu from "components/ui/SideSearchMenu.tsx";
import { Hotel } from "interfaces/hotel";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPageHotelsQuery } from "services/hotel.ts";

import { useEffect, useState } from "react";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchWithParamsPage = () => {
    const query = useQuery();
    const destination = query.get("destination") || "";
    const cityId = Number(query.get("cityId")) || undefined;
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { data, isLoading, isError } = useGetPageHotelsQuery({
        pageIndex: page,
        pageSize: 5,
        address: { city: { name: destination, id: cityId } },
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        if (data) {
            if (data.data.length === 0) {
                setHasMore(false);
            } else {
                setHotels((prev) => [...prev, ...data.data]);
            }
        }
    }, [data]);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleShowOnMap = () => {
        navigate(`/search-map?destination=${destination}&cityId=${cityId}`);
    };

    return (
        <div className="container mx-auto mt-5 grid grid-cols-4 gap-5">
            <div className="col-span-1 flex flex-col gap-5">
                <SideSearchMenu />
                <div className="bg-map-bg py-10 gap-3 rounded flex flex-col items-center justify-center">
                    <IconMapPinFilled className="text-sky h-12 w-12" />
                    <Button onClick={handleShowOnMap} size="md" className="text-xs">
                        Показати на карті
                    </Button>
                </div>
            </div>

            <div className="col-span-3 flex flex-col gap-5">
                <Discount isFullWidth={true} />

                <div className="flex items-center justify-between">
                    <h1 className=" text-2xl text-black font-bold flex items-center">
                        <IconSearch />
                        {`${destination.toUpperCase()}: знайдено ${data?.itemsAvailable} помешкань`}
                    </h1>
                    <div className="bg-map-bg w-36 h-16 rounded flex items-center justify-center">
                        <Button onClick={handleShowOnMap} size="md" className="text-xs">
                            Показати на карті
                        </Button>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <HotelCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {hotels.length > 0 && data && (
                    <InfiniteScroll
                        dataLength={data.itemsAvailable}
                        scrollThreshold={0.5}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-10 h-10 bg-gray/50 rounded-full animate-pulse"></div>
                                <div className="w-10 h-10 bg-gray/50 rounded-full animate-pulse delay-200"></div>
                                <div className="w-10 h-10 bg-gray/50 rounded-full animate-pulse delay-400"></div>
                            </div>
                        }
                    >
                        <div className="flex my-4 flex-col gap-4">
                            {hotels.map((hotel) => (
                                <HotelCard key={hotel.id} {...hotel} />
                            ))}
                        </div>
                    </InfiniteScroll>
                )}

                {isError && <NotFoundResult />}
            </div>
        </div>
    );
};

export default SearchWithParamsPage;

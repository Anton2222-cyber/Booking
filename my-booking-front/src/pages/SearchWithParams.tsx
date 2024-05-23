import { IconCalendar, IconHelp, IconSearch } from "@tabler/icons-react";
import Discount from "components/Discount.tsx";
import NotFoundResult from "components/NotFoundResult.tsx";
import HotelCard from "components/cards/HotelCard.tsx";
import HotelCardSkeleton from "components/cards/HotelCardSkeleton.tsx";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { useLocation } from "react-router-dom";
import { useGetPageHotelsQuery } from "services/hotel.ts";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchWithParamsPage = () => {
    const query = useQuery();
    const destination = query.get("destination") || "";
    // const startDate = query.get("startDate") || "";
    // const endDate = query.get("endDate") || "";
    // const adults = query.get("adults") || "1";
    // const rooms = query.get("rooms") || "1";
    // const children = query.get("children") || "0";

    const { data, isSuccess, isLoading, isError } = useGetPageHotelsQuery({
        cityName: destination,
        pageSize: 10,
    });

    return (
        <div className="container mx-auto mt-5 grid grid-cols-4 gap-5">
            <div className="col-span-1">
                <div className="bg-yellow rounded-md p-4">
                    <Label variant="subtitle" className="text-black text-xl">
                        Шукати
                    </Label>
                    <Label className="pt-2" variant="small">
                        Місце / назва помешкання:
                    </Label>
                    <div className="relative flex-grow">
                        <label
                            htmlFor="destination"
                            className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                        >
                            <IconSearch className="text-lightgray w-4 h-4" />
                        </label>
                        <Input variant="withIcon" id="destination" className="py-1 font-normal" />
                    </div>
                    <Label className="pt-2" variant="small">
                        Дата заїзду:
                    </Label>
                    <div className="relative flex-grow">
                        <label
                            htmlFor="destination"
                            className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                        >
                            <IconCalendar className="text-lightgray w-4 h-4" />
                        </label>
                        <Input variant="withIcon" id="destination" className="py-1 font-normal" />
                    </div>
                    <Label className="pt-2" variant="small">
                        Дата виїзду:
                    </Label>
                    <div className="relative flex-grow">
                        <label
                            htmlFor="destination"
                            className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                        >
                            <IconCalendar className="text-lightgray w-4 h-4" />
                        </label>
                        <Input variant="withIcon" id="destination" className="py-1 font-normal" />
                    </div>
                    <div className="pt-2 gap-1 flex items-center justify-between">
                        <input id="allRooms" type="checkbox" />
                        <Label className="flex-grow" htmlFor="allRooms" variant="small">
                            Спершу помешкання повністю
                        </Label>
                        <IconHelp />
                    </div>
                    <div className="pt-2 gap-1 flex items-center justify-between">
                        <input id="inJob" type="checkbox" />
                        <Label className="flex-grow" htmlFor="inJob" variant="small">
                            Я подорожую у справах
                        </Label>
                        <IconHelp />
                    </div>
                    <div className="flex items-center justify-center pt-2">
                        <Button className="w-full">Шукати</Button>
                    </div>
                </div>
            </div>

            <div className="col-span-3 flex flex-col gap-5">
                <Discount isFullWidth={true} />

                {isSuccess && (
                    <>
                        <h1 className=" text-2xl text-black font-bold">{`${destination.toUpperCase()}: знайдено 100 помешкань`}</h1>
                        <div className="flex mt-4 flex-col gap-4">
                            {data.data?.map((hotel) => <HotelCard key={hotel.id} {...hotel} />)}
                        </div>
                    </>
                )}

                {isLoading && (
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <HotelCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {isError && <NotFoundResult />}
            </div>
        </div>
    );
};

export default SearchWithParamsPage;

import HotelsTable from "components/HotelsTable.tsx";
import NotFoundResult from "components/NotFoundResult.tsx";
import HotelsTableSkeleton from "components/skeletons/HotelsTableSkeleton.tsx";
import Label from "components/ui/Label.tsx";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { useAppSelector } from "store/index.ts";
import { getUser } from "store/slice/userSlice.ts";

const MyHotelsPage = () => {
    const user = useAppSelector(getUser);

    const {
        data: hotelsData,
        isLoading,
        isError,
    } = useGetPageHotelsQuery({ userId: Number(user?.id) }, { skip: !user });

    return (
        <div className="container mx-auto mt-5 flex flex-col gap-5">
            <Label variant="extra" className="-mb-5">
                Мої готелі
            </Label>
            {isLoading && <HotelsTableSkeleton />}
            {hotelsData && <HotelsTable hotels={hotelsData.data} />}
            {(isError || hotelsData?.data.length === 0) && <NotFoundResult text="У вас немає готелів" />}
        </div>
    );
};

export default MyHotelsPage;

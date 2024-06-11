import HotelsTableSkeleton from "components/skeletons/HotelsTableSkeleton.tsx";
import Label from "components/ui/Label.tsx";
import { useGetPageHotelsQuery } from "services/hotel.ts";
import { useAppSelector } from "store/index.ts";
import { getUser } from "store/slice/userSlice.ts";

import HotelsTable from "../HotelsTable.tsx";

const MyHotelsPage = () => {
    const user = useAppSelector(getUser);

    const { data: hotels, isLoading } = useGetPageHotelsQuery({ userId: Number(user?.id) }, { skip: !user });

    return (
        <div className="container mx-auto mt-5 flex flex-col gap-5">
            <Label variant="extra">Мої готелі</Label>

            {isLoading && <HotelsTableSkeleton />}
            {hotels && <HotelsTable hotels={hotels.data} />}
        </div>
    );
};

export default MyHotelsPage;

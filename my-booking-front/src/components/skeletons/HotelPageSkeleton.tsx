const HotelPageSkeleton = () => {
    return (
        <div className="col-span-3 flex flex-col animate-pulse">
            <div className="flex items-center justify-between">
                <div className="h-6 bg-gray/20 rounded w-1/2"></div>
                <div className="h-6 bg-gray/20 rounded w-1/4"></div>
            </div>
            <div className="flex items-center">
                <div className="h-4  bg-gray/20 rounded w-1/2"></div>
            </div>
            <div className="grid gap-5 grid-cols-6 mt-5">
                <div className="col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="h-64  bg-gray/20 rounded"></div>
                    <div className="h-64 bg-gray/20 rounded"></div>
                    <div className="col-span-6 text-black">
                        <div className="h-4 bg-gray/20 rounded w-full my-2"></div>
                        <div className="h-4 bg-gray/20 rounded w-full mt-1"></div>
                        <div className="h-4 bg-gray/20 rounded w-3/4 mt-2"></div>
                        <div className="h-4 bg-gray/20 rounded w-1/2 mt-2"></div>
                        <div className="h-4 bg-gray/20 rounded w-1/2 mt-2"></div>
                    </div>
                </div>
            </div>
            <div className="h-64 bg-gray/20 rounded my-2"></div>
            <div className="h-64 bg-gray/20 rounded"></div>
        </div>
    );
};

export default HotelPageSkeleton;
